import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, ParseIntPipe, Put } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { User } from '../userDecorator';
import { paginationQueryDto, PaginationResponse } from '../clients/dto/pagination.dto';
import { GetSupplierCompleteDto, GetSupplierDto } from './dto/get-supplier.dto';


@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  async create(@User() user : User, @Body(new ValidationPipe({transform: true})) createSupplierDto: CreateSupplierDto) {
    const result = await this.supplierService.create(createSupplierDto, user.companyId);
    return GetSupplierDto.parseToGetSupplierDto(result);
  }

  @Get()
  async findAll( @User() user : User, @Query(new ValidationPipe({transform: true})) paginationQuery: paginationQueryDto) {
    const result = await this.supplierService.findAll(user.companyId, paginationQuery);
    if(result.length === 0){
      return { message: 'No suppliers found' };
    }
    if(paginationQuery.limit !== undefined && paginationQuery.page !== undefined){
      const anwser: PaginationResponse<GetSupplierDto> = new PaginationResponse(result.suppliers.map((supplier) => GetSupplierDto.parseToGetSupplierDto(supplier)), result.total, paginationQuery.page, paginationQuery.limit)
      return anwser;
    }
    const anwser: PaginationResponse<GetSupplierDto> = new PaginationResponse(result.suppliers.map((supplier) => GetSupplierDto.parseToGetSupplierDto(supplier)), result.total)
    return anwser;
  }

  @Get('/:id')
  async findOne(@User() user : User, @Param('id', ParseIntPipe) id: number) {
    const result = await this.supplierService.findOne(id, user.companyId);
    return GetSupplierDto.parseToGetSupplierDto(result);
  }
  @Get('/complete/:id')
  async findOneComplete(@User() user : User, @Param('id', ParseIntPipe) id: number) {
    const result = await this.supplierService.findOneComplete(id, user.companyId);
    
    return GetSupplierCompleteDto.parseToGetSupplierCompleteDto(result);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto, @User() user : User) {
    return this.supplierService.update(+id, updateSupplierDto, user.companyId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user : User) {
    const result = await this.supplierService.remove(+id, user.companyId);
    return { message: 'Supplier deleted successfully' };
  }
}
