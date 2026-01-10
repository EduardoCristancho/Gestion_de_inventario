import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ISupplierRepository } from './ISupplier';
import { GetSupplierDto } from './dto/get-supplier.dto';
import { paginationQueryDto } from '../clients/dto/pagination.dto';
@Injectable()
export class SupplierService {
  constructor(@Inject('ISupplierRepository') private readonly supplierRepository: ISupplierRepository) {}
  create(createSupplierDto: CreateSupplierDto, companyId: number) {
    return this.supplierRepository.create(createSupplierDto, companyId);
  }

  async findAll(company_id: number, paginationQuery: paginationQueryDto) {

    if(paginationQuery.limit !== undefined && paginationQuery.page !== undefined){
      const skip = paginationQuery.page * paginationQuery.limit;
      const take = paginationQuery.limit;
      return this.supplierRepository.findAll(company_id, skip, take);
    }
    return this.supplierRepository.findAll(company_id);
  }

  async findOne(id: number, companyId: number) {
    const supplier = await this.supplierRepository.findOne(id, companyId);
    if(!supplier){
      throw new NotFoundException('Supplier not found');
    }
    return supplier;
  }
  async findOneComplete(id: number, companyId: number) {
    const supplier = await this.supplierRepository.findOneComplete(id, companyId);
    if(!supplier){
      throw new NotFoundException('Supplier not found');
    }
    return supplier;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto, companyId: number) {
    if(!updateSupplierDto){
      throw new NotFoundException('No data to update');
    }

    //si el proveedor no existe, se lanza una excepcion
    const supplier = this.findOne(id, companyId);
    return this.supplierRepository.update(id, updateSupplierDto, companyId);
  }

  remove(id: number, companyId: number) {
    //si el proveedor no existe, se lanza una excepcion
    const supplier = this.findOne(id, companyId);
    return this.supplierRepository.remove(id, companyId);
  }
}
