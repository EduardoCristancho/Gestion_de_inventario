import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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

  async findOne(id: number){
    const product = await this.prisma.modelProduct.findUnique({
    where: { model_product_id: id },
    include: {
      stock: true, // trae todos los registros de stock asociados
    },
  });

  if (!product) return null;

  // Sumar todas las cantidades de stock
  const totalStock = product.stock.reduce((acc, item) => acc + item.quantity, 0);

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