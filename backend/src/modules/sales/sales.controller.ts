import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, ParseIntPipe, Put, BadRequestException, ServiceUnavailableException, InternalServerErrorException } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/edit-sale.dto';
import { paginationQueryDto, PaginationResponse } from '../clients/dto/pagination.dto';
import { GetSalesDto, salesFilterDto } from './dto/get-sales.dto';
import { User } from '../userDecorator';


@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body(new ValidationPipe({ transform: true })) createSaleDto: CreateSaleDto, @User() user : User) {
    //llamamos al servicio para guardarlo.
      const result = await this.salesService.create(createSaleDto, user.companyId);
      //retornamos la respuesta
      return result; 
  
  }

  @Get()
  async findAll( 
    @Query(new ValidationPipe({ transform: true })) paginationQuery: paginationQueryDto, 
    @Query(new ValidationPipe({ transform: true })) filters: salesFilterDto,
     @User() user : User
  ){
      const result = await this.salesService.findAll(paginationQuery, filters, user.companyId);
      
      if (paginationQuery.page !== undefined && paginationQuery.limit !== undefined) {
        //se retorna la respuesta con los metadatos
        const anwser : PaginationResponse<GetSalesDto> = new PaginationResponse(result.sales, result.length, paginationQuery.page, paginationQuery.limit)
        return anwser
      }
      //se retorna la respuesta sin los metadatos de paginacion
      const anwser : PaginationResponse<GetSalesDto> = new PaginationResponse(result.sales, result.length)
      return anwser ;
      
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number,  @User() user : User) {
      const result = await this.salesService.findOne(id, user.companyId);
      return result;  

  }
  @Put(':id')
  async updateSale(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe({ transform: true })) updateSaleDto: UpdateSaleDto,  @User() user : User) {
      const result = await this.salesService.update(+id, updateSaleDto, user.companyId);
      if (!result) {
        throw new BadRequestException('No se pudo actualizar la venta');
        
      }
      return result;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user : User) {
    const result = this.salesService.remove(id, user.companyId);
    return {message: 'Sale removed successfully'};
  }
}
