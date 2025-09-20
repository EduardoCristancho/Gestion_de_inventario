import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { IEmployeRepository } from './interfaces/IEmployeRepository';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { IWareHouseRepository } from '../ware-house/IWareHouseRepository';
import { Employe, getEmploye } from './entities/employe.entity';
import { GetAllEmployeDto, GetEmployeDto } from './dto/get-employe.dto';

@Injectable()
export class EmployeService {
  constructor(
      @Inject('IEmployeRepository') private readonly employeRepository: IEmployeRepository,
      @Inject('IWareHouseRepository') private readonly warehouseRepository: IWareHouseRepository,
  ) {}
  async create(createEmployeDto: CreateEmployeDto, company_id: number) {
    //validar que el usuario no exista
    const existingEmploye = await this.employeRepository.findOne(company_id, createEmployeDto.userName);
    if (existingEmploye) {
      throw new ConflictException('User already exists');
    }
    //validar que el rol exista
    this.rolExists( createEmployeDto.rolId);
    //validar que el almacen exista
    const warehouse = await this.warehouseRepository.findOne(createEmployeDto.wareHouseId, company_id);
    if (!warehouse) {
      throw new Error('Warehouse does not exist');
    }
    const employe = await this.employeRepository.create(createEmployeDto, company_id);
    return employe;
  }

  async findAll(company_id: number) {
    const employes = await this.employeRepository.findAll(company_id);
    if(employes.length === 0){
      throw new NotFoundException('No se encontraron empleados');
    }
    const employesDto = employes.map(employes => {
      const newEmploye = new GetAllEmployeDto();
      newEmploye.parseToGetAllEmployeDto(employes);
      return newEmploye;
    })

    return employesDto;
    
  }

  findAllRols() {
    return this.employeRepository.findAllRols();
  }

  async findOne(identifier: string, companyId: number) {
    let employe: getEmploye | null = null;

    if (/^\d+$/.test(identifier)) {
      // Si es número, buscar por ID
      employe = await this.employeRepository.findOne(companyId, undefined, Number(identifier));
    }else {
      employe = await this.employeRepository.findOne(companyId, identifier);
    }

    if(!employe) {
      throw new NotFoundException('No se pudo encontrar el empleado');
    }

    const newEmploye = new GetEmployeDto();
    newEmploye.parseToGetEmployeDto(employe);
    return newEmploye;
  }

  async update(id: number, updateEmployeDto: UpdateEmployeDto, company_id: number) {
    
    const existingEmploye = await this.employeRepository.findOne(company_id, undefined, id);
    if (!existingEmploye) {
      throw new NotFoundException('Employe not found');
    }
    if (updateEmployeDto.rolId) {
      this.rolExists(updateEmployeDto.rolId);
    }
    if (updateEmployeDto.wareHouseId) {
      const warehouse = await this.warehouseRepository.findOne(updateEmployeDto.wareHouseId,company_id);
      if (!warehouse) {
        throw new BadRequestException('Warehouse does not exist');
      }
    }
    // validar el formato de la contraseña cuando se tenga

    const updatedEmploye = await this.employeRepository.update(id, updateEmployeDto, company_id);
    const newEmploye = new CreateEmployeDto();
    newEmploye.parseToCreateEmployeDto(updatedEmploye);
    return newEmploye;

  }

  async remove(id: number, company_id: number) {
    return await this.employeRepository.remove(id, company_id)
  }

  rolExists( rolId: number) {
    if (rolId !== 1  && rolId !== 2 && rolId !== 3) {
      throw new Error('Rol does not exist');
    }
  }
}
