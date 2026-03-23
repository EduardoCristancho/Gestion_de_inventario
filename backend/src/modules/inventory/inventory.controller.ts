import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, ParseIntPipe, NotFoundException, Injectable } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { User } from '../auth/userDecorator';
import { paginationQueryDto, PaginationResponse } from '../clients/dto/pagination.dto';
import { permittedRoles } from '../auth/authorizationUtils/permittedRoles';
import { GetProductDto } from './dto/get-product.dto';
import { Transform } from 'class-transformer';
import { getUnifiedParams } from './dto/create-inventory.dto';
@Controller('inventory')
@Injectable()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAllProducts( @User() user : User) {
    return await this.inventoryService.findAll(user.companyId);
  }

  @Get('unifiedSearch')
  async unifiedSearch(
    @User() user: User,
    @Query(new ValidationPipe({transform: true})) filters : getUnifiedParams){
      let result : any;
      if(user.rol === permittedRoles.WAREHOUSEMAN){
        result = await this.inventoryService.unifiedSearch(user.companyId, user.warehouseId, filters);  
      }else{
        result = await this.inventoryService.unifiedSearch(user.companyId, filters.warehouseId, filters);
      }
      return result;
  }

  @Get('models')
  async findAllModels(
    @User() user: User, 
    @Query(new ValidationPipe({transform: true})) paginationQuery: paginationQueryDto,  
    @Query('warehouseId', new ParseIntPipe({optional: true})) warehouseId?: number, 
    @Query('modelName') modelName?: string,
    @Query('sku') sku?: string
  ){
     let result : any;
    if(user.rol === permittedRoles.WAREHOUSEMAN){
      result = await this.inventoryService.findAllModels(user.companyId, user.warehouseId, paginationQuery, modelName, sku);  
    }else{
      result = await this.inventoryService.findAllModels(user.companyId, warehouseId, paginationQuery, modelName, sku);
    }
    if(result.length === 0){
    throw new NotFoundException('No products where found');
    }
    if(paginationQuery.limit !== undefined && paginationQuery.page !== undefined){
      const anwser: PaginationResponse<GetProductDto> = new PaginationResponse(result.products.map((product) => GetProductDto.parseToGetProductDto(product)), result.total, paginationQuery.page, paginationQuery.limit)
      return anwser;
    }
    const anwser: PaginationResponse<GetProductDto> = new PaginationResponse(result.products.map((product) => GetProductDto.parseToGetProductDto(product)), result.total)
    return anwser;
  }
  
  @Get('mostSoldCategory')
  mostSoldCategory(){
    const companyId = 123456789;
    return this.inventoryService.mostSoldCategory(companyId);
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: number) {
    return await this.inventoryService.findOne(id);
  }

  
}
