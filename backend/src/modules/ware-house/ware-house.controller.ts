import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, InternalServerErrorException, NotFoundException, Put } from '@nestjs/common';
import { WareHouseService } from './ware-house.service';
import { CreateWareHouseDto } from './dto/create-ware-house.dto';
import { User } from '../userDecorator';


@Controller('ware-house')
export class WareHouseController {
  constructor(private readonly wareHouseService: WareHouseService) {}

  @Post()
  async create(@Body(new ValidationPipe({ transform: true })) createWareHouseDto: CreateWareHouseDto, @User() user : User) {
    return this.wareHouseService.create(createWareHouseDto, user.companyId);
  }

  @Get()
  async findAll( @User() user : User) {
    const result = await  this.wareHouseService.findAll(user.companyId);
    if (result.length === 0) {
      throw new NotFoundException('No warehouses found');
    }
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string,  @User() user : User) {
    const result = await this.wareHouseService.findOne(+id, user.companyId);
    if (!result) {
      throw new NotFoundException('Warehouse not found');
    }
    return result;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe({ transform: true })) updateWareHouseDto: CreateWareHouseDto,  @User() user : User) {
    return this.wareHouseService.update(+id, updateWareHouseDto, user.companyId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,  @User() user : User) {
    const result = await this.wareHouseService.remove(+id, user.companyId);
    if (result) {
      throw new InternalServerErrorException('Error removing warehouse');
    }

    return { message: 'Warehouse removed successfully'};
  }
}
