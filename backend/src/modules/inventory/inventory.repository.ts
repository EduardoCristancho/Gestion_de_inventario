import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { paginationQueryDto } from "../clients/dto/pagination.dto";
import { getUnifiedParams } from "./dto/create-inventory.dto";

@Injectable()
export class InventoryRepository {
  constructor(private readonly prisma: PrismaService){}

  async findAll(company_id: number){
    return await this.prisma.product.findMany({
      where: {
        AND: [
          {company_id: company_id},
          {visibility: true}
      ],
      },
      select : {
          product_id: true,
          name: true,
          description: true
        }
    });
  }

  async findUnifiedSearch(company_id: number, warehouse_id: number | undefined, filters: getUnifiedParams): Promise<{products: any[], models: any[], total: number}> {
    /*Lista la devolucion de la busqueda unificada y el filtrado
    por cantidades, proveedores y precio, falta  ajustar la ui a que despliegue
    la card correspondiente a cada resultado, dependiendo de si es 
    producto o modelo*/

    //Filtramos dinamicamente.
    let commonWhereClause = `WHERE p.company_id = ${company_id} AND s.warehouse_id = ${warehouse_id} `
    let havingClause = ``
    if(filters.minQuantity != undefined) havingClause += ` having sum(s.quantity) >= ${filters.minQuantity} `
    if(filters.maxQuantity != undefined) havingClause += `${filters.minQuantity != undefined? ' AND ': ' having ' } sum(s.quantity) <= ${filters.maxQuantity} ` 
    if(filters.minPrice != undefined) commonWhereClause += ` AND mp.price >= ${filters.minPrice} `
    if(filters.maxPrice != undefined) commonWhereClause += ` AND mp.price <= ${filters.maxPrice} `
    if(filters.provider != undefined) commonWhereClause += ` AND mp.supplier_id = ${filters.provider} `

    try{
      const transaction = await this.prisma.$transaction(async (prisma)=>{
            //Query que obtiene los productos que coinciden con el search
        
            const productQuery = `
              SELECT
                p.product_id,
                p.name,
                p.description,
                count(distinct mp.model_product_id) as models
              FROM "Product" as p
              INNER JOIN "ModelProduct" as mp on p.product_id = mp.product_id
              INNER JOIN "Stock" as s on mp.model_product_id = s.model_product_id
              ${commonWhereClause}
              AND (p.name ILIKE '%${filters.search}%' OR p.description ILIKE '%${filters.search}%')
              GROUP BY p.product_id
              ${havingClause}
              ORDER BY p.name ASC
            `
            const ProductQueryResult = await prisma.$queryRawUnsafe(productQuery);
            
            const ModelQuery = `
              SELECT
                mp.model_product_id,
                mp.name,
                mp.sku,
                mp.description,
                mp.cost,
                mp.price,
                sum(s.quantity) as stock
              from "Product" as p
              inner join "ModelProduct" as mp on p.product_id = mp.product_id
              inner join "Supplier" as sup on mp.supplier_id = sup.supplier_id
              inner join "Stock" as s on mp.model_product_id = s.model_product_id
              ${commonWhereClause}
              AND (mp.name ILIKE '%${filters.search}%' OR mp.description ILIKE '%${filters.search}%')
              GROUP BY mp.model_product_id
              ${havingClause}
              ORDER BY mp.name ASC
            `
            const ModelQueryResult = await prisma.$queryRawUnsafe(ModelQuery);

            const productCountQuery = `
              SELECT
                  COUNT(*) -- Contamos las filas resultantes
              FROM (
                  SELECT
                      p.product_id -- No necesitamos el resto de columnas
                  FROM "Product" as p
                  INNER JOIN "ModelProduct" as mp on p.product_id = mp.product_id
                  INNER JOIN "Stock" as s on mp.model_product_id = s.model_product_id
                  ${commonWhereClause}
                  AND (p.name ILIKE '%${filters.search}%' OR p.description ILIKE '%${filters.search}%')
                  GROUP BY p.product_id
                  ${havingClause}
              ) AS CountedProducts;
            `;
            const productTotalCount : [{count: number}] = await prisma.$queryRawUnsafe(productCountQuery);
            const modelCountQuery = `
              SELECT
                  COUNT(*) -- Contamos las filas resultantes
              FROM (
                  SELECT
                      mp.model_product_id -- No necesitamos el resto de columnas
                  FROM "Product" as p
                  INNER JOIN "ModelProduct" as mp on p.product_id = mp.product_id
                  INNER JOIN "Supplier" as sup on mp.supplier_id = sup.supplier_id
                  INNER JOIN "Stock" as s on mp.model_product_id = s.model_product_id
                  ${commonWhereClause}
                  AND (mp.name ILIKE '%${filters.search}%' OR mp.description ILIKE '%${filters.search}%')
                  GROUP BY mp.model_product_id
                  ${havingClause}
              ) AS CountedModels;
            `;
            const modelTotalCount : [{count: number}] = await prisma.$queryRawUnsafe(modelCountQuery);
          
            return {products: ProductQueryResult as any[], models: ModelQueryResult as any[], total: productTotalCount[0].count + modelTotalCount[0].count };
          })
          return transaction;
    }catch(e: any){
      console.log(e);
      throw new InternalServerErrorException('Algo salio mal, por favor intente mas tarde')
    }
  }
  

  async findAllModels(
    company_id: number, 
    warehouse_id: number | undefined, 
    skip?: number, 
    take?: number, 
    modelName?: string, 
    sku?: string
  ){
    let whereClause = `WHERE p.company_id = ${company_id}`;
    let pagination = ``;
    
    if(skip !== undefined && take !== undefined){
      pagination = `limit ${take} offset ${skip}`;
    }
    
    if(warehouse_id !== undefined){
      whereClause += ` AND s.warehouse_id = ${warehouse_id}`;
    }

    // Filtro por nombre del modelo
    if(modelName !== undefined && modelName.trim() !== ''){
      whereClause += ` AND (mp.name ILIKE '%${modelName}%' OR mp.sku ILIKE '${modelName}')`;
    }

    // Filtro por SKU
    if(sku !== undefined && sku.trim() !== ''){
      whereClause += ` AND mp.sku ILIKE '${sku}'`;
    }

    const query = `
      SELECT
        mp.model_product_id,
        mp.name,
        mp.sku,
        mp.description,
        mp.cost,
        mp.price,
        sum(s.quantity) as stock
      from "Product" as p
      inner join "ModelProduct" as mp on p.product_id = mp.product_id
      inner join "Stock" as s on mp.model_product_id = s.model_product_id
      ${whereClause}
      GROUP BY mp.model_product_id
      ORDER BY stock DESC
      ${pagination}
    `
    const countQuery = `
      SELECT  
        mp.model_product_id
      from "Product" as p
      inner join "ModelProduct" as mp on p.product_id = mp.product_id
      inner join "Stock" as s on mp.model_product_id = s.model_product_id
      ${whereClause}
      GROUP BY mp.model_product_id
    `
    const result = await this.prisma.$queryRawUnsafe(query);
    const count : [{id: number}] = await this.prisma.$queryRawUnsafe(countQuery);
    return {products: result, total: count.length};
  }

  async findOne(id: number){
    const product = await this.prisma.modelProduct.findUnique({
    where: { model_product_id: id },
    include: {
      Stock: true, // trae todos los registros de stock asociados
    },
  });

  if (!product) return null;

  // Sumar todas las cantidades de stock
  const totalStock = product.Stock.reduce((acc, item) => acc + item.quantity, 0);

  // Agregar la propiedad totalStock al resultado
  return {
    ...product,
    totalStock,
  };
  }

  mostSoldCategory(companyId: number, warehouseId: number | undefined){
    try{
      let whereClause = `WHERE s.state_id = 1 AND p.company_id = ${companyId}`;
      if(warehouseId) whereClause += ` AND pl.warehouse_id = ${warehouseId}`;
      const sql = `
      SELECT 
        p.name,
        SUM (pl.quantity) as quantity
      FROM "Sale" as s
      INNER JOIN "ProductList" as pl ON s.sale_id = pl.sale_id
      INNER JOIN "ModelProduct" as mp ON pl.model_product_id = mp.model_product_id
      INNER JOIN "Product" as p ON mp.product_id = p.product_id
      ${whereClause}
      GROUP BY p.product_id
      ORDER BY quantity DESC
      LIMIT 10;
      `
      return this.prisma.$queryRawUnsafe(sql);
    }catch(e){
      console.log(e);
    }
  }
}