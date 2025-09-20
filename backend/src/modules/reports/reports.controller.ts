import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { salesReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { MostSelledDto, MostSelledTroughTimeDto } from './dto/most-selled..dto';
import { lowStockDto } from './dto/lowStock.dto';
import { Roles } from '../auth/authorizationUtils/authorizationDecorator';
import { permittedRoles } from '../auth/authorizationUtils/permittedRoles';
import { User } from '../userDecorator';


@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('sales')
  salesTroughTime(@Query(new ValidationPipe({ transform: true })) salesReportDto: salesReportDto, @User() user : User) {
    return this.reportsService.salesTroughTime(salesReportDto, user.companyId);
  }

  @Get('products')
  MostSelled(@Query(new ValidationPipe({ transform: true })) mostSelled: MostSelledDto,  @User() user : User) {
    return this.reportsService.MostSelled(mostSelled, user.companyId);
  }

  @Get('products/time')
  MostSelledTroughTime(@Query(new ValidationPipe({ transform: true })) mostSelled: MostSelledTroughTimeDto,  @User() user : User) {
    return this.reportsService.MostSelledTroughTime(mostSelled, user.companyId);
  }

  @Get('products/lowStock')
  GetLowStock(@Query(new ValidationPipe({transform: true}))lowStockParams: lowStockDto,  @User() user : User ) {
    return this.reportsService.GetLowStock(user.companyId, 10, lowStockParams);
  }
}
