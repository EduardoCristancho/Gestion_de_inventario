import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ISupplierRepository } from './ISupplier';
import { GetSupplierDto } from './dto/get-supplier.dto';
@Injectable()
export class SupplierService {
  constructor(@Inject('ISupplierRepository') private readonly supplierRepository: ISupplierRepository) {}
  create(createSupplierDto: CreateSupplierDto) {
    return 'This action adds a new supplier';
  }

  async findAll(company_id: number) {
    const result = await this.supplierRepository.findAll(company_id);
    if (result.length === 0) {
      throw new NotFoundException('No suppliers found');
    }
    const suppliers = result.map((supplier : any)=>{ return GetSupplierDto.parseToGetSupplierDto(supplier)});;
    return suppliers;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
