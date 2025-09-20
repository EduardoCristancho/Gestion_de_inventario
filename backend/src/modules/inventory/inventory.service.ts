import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository){}

  async findAll(company_id: number) {
    const result = await this.inventoryRepository.findAll(company_id);
    if (result.length === 0) {
      throw new NotFoundException('No products found');
    }
    
    const products = result.map((product : any)=>{ return {
      id: product.product_id,
      name: product.name,
      description: product.description
    }});
    return products;
  }

  async findOne(id: number) {
    return await this.inventoryRepository.findOne(id);
  }
  async mostSoldCategory(companyId: number, warehouseId?: number| undefined) {
   const result : any = await this.inventoryRepository.mostSoldCategory(companyId, warehouseId);
   if (result.length === 0) {
    throw new NotFoundException('No products found');
   }
   return result.map((product)=> {
      return {
      name: product.name,
      quantity: parseInt(product.quantity)
    }
  });
  }

}
