import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWareHouseDto } from './dto/create-ware-house.dto';

import { IWareHouseRepository } from './IWareHouseRepository';

@Injectable()
export class WareHouseService {
  constructor(
    @Inject('IWareHouseRepository') private readonly wareHouseRepository: IWareHouseRepository,
  ){}
  async create(createWareHouseDto: CreateWareHouseDto, companyId: number) {
    return await this.wareHouseRepository.create(createWareHouseDto, companyId);
    
  }

  findAll(company_id: number) {
    return this.wareHouseRepository.findAll(company_id); // Replace with actual company_id if needed
  }

  async findOne(id: number, company_id: number) {
    return await this.wareHouseRepository.findOne(id, company_id); // Replace with actual company_id
  }

  async update(id: number, updateWareHouseDto: CreateWareHouseDto, companyId) {
    const existingWareHouse = await this.wareHouseRepository.findOne(id, companyId);
    if (!existingWareHouse) {
      throw new NotFoundException('Warehouse not found');
    }
    return this.wareHouseRepository.update(id, updateWareHouseDto, companyId);
  }

  async remove(id: number, company_id: number) {
    const wareHouse = await this.wareHouseRepository.findOne(id, company_id);
    if (!wareHouse) {
      throw new NotFoundException('Warehouse not found');
    }
    return this.wareHouseRepository.delete(id, company_id); 
  }
}
