import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { User } from '../userDecorator';

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Post()
  async create(@Body(new ValidationPipe({transform: true})) createEmployeDto: CreateEmployeDto,  @User() user : User) {

    return await this.employeService.create(createEmployeDto, user.companyId); 
  }

  @Get()
  async findAll( @User() user : User) {
    
    return await this.employeService.findAll(user.companyId);
  }

  @Get('rols')
  async findAllRols() {
    return await this.employeService.findAllRols();
  }

  @Get(':identifier')
  async findOne(@Param('identifier') username: string,  @User() user : User) {
    return this.employeService.findOne(username, user.companyId) 
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeDto: UpdateEmployeDto,  @User() user : User) {
    return await this.employeService.update(id, updateEmployeDto, user.companyId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number,  @User() user : User) {
    await this.employeService.remove(id, user.companyId);
    return {message: 'Employe removed successfully'};
  }
}
