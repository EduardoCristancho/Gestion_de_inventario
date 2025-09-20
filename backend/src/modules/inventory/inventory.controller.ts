import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { get } from 'http';
import { User } from '../userDecorator';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

   @Get()
  async findAllProducts( @User() user : User) {
    return await this.inventoryService.findAll(user.companyId);
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
