import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, ValidationPipe, NotFoundException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { paginationQueryDto } from './dto/pagination.dto';
import { User } from '../userDecorator';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Body(new ValidationPipe({transform: true})) clientData: CreateClientDto,  @User() user : User ) {
    const clientCreated = await this.clientsService.create(clientData, user.companyId) 
    return { message : 'Client created successfully' , clientData: clientCreated }; ;
  }

  @Get()
  async findAll(@Query(new ValidationPipe({ transform: true })) paginationQuery: paginationQueryDto,  @User() user : User) {
      const clients = await this.clientsService.findAll(paginationQuery, user.companyId);
      return clients;
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string | number,  @User() user : User) {
      const client = await this.clientsService.findOne(id, user.companyId);
      return client;

  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateClientDto: UpdateClientDto,  @User() user : User) {
    const clientUpdated = await this.clientsService.update(id, updateClientDto, user.companyId);

    return { message: 'Client updated successfully', clientData: clientUpdated};
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number,  @User() user : User) {
    await this.clientsService.remove(id, user.companyId);
    return { message: 'Client deleted successfully'};
  }
}
