import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto, getUnifiedParams } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryRepository } from './inventory.repository';
import { paginationQueryDto } from '../clients/dto/pagination.dto';

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

  async unifiedSearch(companyId: number , warehouseId: number | undefined , filters: getUnifiedParams){
    const result : {products: any[], models: any[], total : number} = await this.inventoryRepository.findUnifiedSearch(companyId,warehouseId, filters);
    if (result.products.length === 0 && result.models.length === 0) {
      throw new NotFoundException('No products found');
    }
    //Guardamos los productos catalogados en el objeto de respuesta
    let products : any[] = result.products.map((product : any)=>{ return {
      type: 'product',
      id: product.product_id,
      name: product.name,
      description: product.description,
      models: parseInt(product.models.toString())
    }});
    //Guardamos los modelos catalogados en el objeto de respuesta
    products.push(...result.models.map((model : any)=>{ return {
      type: 'model',
      id: model.model_product_id,
      name: model.name,
      description: model.description,
      sku: model.sku,
      cost: model.cost,
      price: model.price,
      stock: parseInt(model.stock.toString())
    }}));
    products.sort((a, b) => a.name.localeCompare(b.name));
    
    return {data:products, total: result.total.toString()};
  }

  async findAllModels(
    companyId: number, 
    warehouseId: number | undefined, 
    paginationQuery: paginationQueryDto, 
    modelName?: string, 
    sku?: string
  ){
    if(paginationQuery.limit !== undefined && paginationQuery.page !== undefined){
      const skip = paginationQuery.page * paginationQuery.limit;
      const take = paginationQuery.limit;
      return this.inventoryRepository.findAllModels(companyId, warehouseId, skip, take, modelName, sku);
    }
    const result = await this.inventoryRepository.findAllModels(companyId, warehouseId, undefined, undefined, modelName, sku);
    return result;
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
