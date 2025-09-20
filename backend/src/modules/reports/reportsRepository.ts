import { Injectable } from "@nestjs/common";
import { salesReportDto } from "./dto/create-report.dto";
import { IReports } from "./Ireports";
import { PrismaService } from "../prisma/prisma.service";
import { MostSelledDto } from "./dto/most-selled..dto";
import { lowStockDto } from "./dto/lowStock.dto";

@Injectable()
export class reportsRepository implements IReports {
    constructor(private readonly prisma: PrismaService) {}
    async salesTroughTime(salesReportDto: salesReportDto, companyId: number) {
        let whereClause = ` WHERE s.date BETWEEN '${salesReportDto.startDate}' AND '${salesReportDto.endDate}' AND s.state_id = 1 AND u.company_id = ${companyId} `;
        let InnerJoinClause = '';
        
        if (salesReportDto.userId) {
            whereClause += ` AND s.user_id = ${salesReportDto.userId} `;
        }
        if (salesReportDto.wareHouseId) {
            whereClause += ` AND pl.warehouse_id = ${salesReportDto.wareHouseId} `;
        }

        const sql = `
            SELECT DATE_TRUNC('${salesReportDto.period}' , s.date AT TIME ZONE 'America/Caracas') AS periodo,
                SUM(s.total_amount) AS total_ventas,
                SUM(p.cost * pl.quantity) AS costos,
                SUM(s.total_amount) - SUM(p.cost * pl.quantity) AS ganancias
            FROM "Sale" s
            INNER JOIN "User" u ON s.user_id = u.user_id
            INNER JOIN "ProductList" pl ON s.sale_id = pl.sale_id
            INNER JOIN "ModelProduct" p ON pl.model_product_id = p.model_product_id
            ${InnerJoinClause}
            ${whereClause}
            GROUP BY periodo
            ORDER BY periodo;
        `;

        const result = await this.prisma.$queryRawUnsafe(sql);
        return result;
        }

        mostSelled(MostSelledDto: MostSelledDto, company_id: number) {
            
            let whereClause = `WHERE s.state_id = 1 AND p.company_id = ${company_id} `;
            
            if(MostSelledDto.categoryId) whereClause += ` AND mp.product_id = ${MostSelledDto.categoryId} `;
            if(MostSelledDto.supplierId) whereClause += ` AND mp.supplier_id = ${MostSelledDto.supplierId} `;
            if(MostSelledDto.wareHouseId) whereClause += ` AND pl.warehouse_id = ${MostSelledDto.wareHouseId} `;
            if(MostSelledDto.startDate) whereClause += ` AND s.date >= '${MostSelledDto.startDate}' `;
            if(MostSelledDto.endDate) whereClause += ` AND s.date <= '${MostSelledDto.endDate}' `;
            const sql = `
            SELECT 
                mp.model_product_id,
                mp.name, 
                SUM(pl.quantity) AS unidades_vendidas,
                SUM(pl.total_price) - SUM(mp.cost * pl.quantity) AS ganancias
            FROM "Sale" s
            INNER JOIN "ProductList" pl ON s.sale_id = pl.sale_id
            INNER JOIN "ModelProduct" mp ON pl.model_product_id = mp.model_product_id
            INNER JOIN "Product" p ON mp.product_id = p.product_id
            ${whereClause}
            GROUP BY mp.model_product_id
            ORDER BY unidades_vendidas DESC
            LIMIT ${MostSelledDto.limit}
            ;`;

            return this.prisma.$queryRawUnsafe(sql);
        }
    
        mostSelledTroughTime(MostSelledDto: any, company_id: number) {
            let whereClause = `WHERE s.state_id = 1 AND p.company_id = ${company_id} `;
            if(MostSelledDto.categoryId) whereClause += ` AND mp.product_id = ${MostSelledDto.categoryId} `;
            if(MostSelledDto.supplierId) whereClause += ` AND mp.supplier_id = ${MostSelledDto.supplierId} `;
            if(MostSelledDto.wareHouseId) whereClause += ` AND pl.warehouse_id = ${MostSelledDto.wareHouseId} `;
            if(MostSelledDto.startDate) whereClause += ` AND s.date >= '${MostSelledDto.startDate}' `;
            if(MostSelledDto.endDate) whereClause += ` AND s.date <= '${MostSelledDto.endDate}' `;
            const sql = `
            WITH top_products AS(
                SELECT 
                mp.model_product_id,
                mp.name, 
                SUM(pl.quantity) AS unidades_vendidas,
                SUM(pl.total_price) - SUM(mp.cost * pl.quantity) AS ganancias
            FROM "Sale" s
            INNER JOIN "ProductList" pl ON s.sale_id = pl.sale_id
            INNER JOIN "ModelProduct" mp ON pl.model_product_id = mp.model_product_id
            INNER JOIN "Product" p ON mp.product_id = p.product_id
            ${whereClause}
            GROUP BY mp.model_product_id
            ORDER BY unidades_vendidas DESC
            LIMIT ${MostSelledDto.limit}
            )
            SELECT
                mp.model_product_id,
                mp.name,
                DATE_TRUNC('${MostSelledDto.period}' , s.date AT TIME ZONE 'America/Bogota') AS periodo,
                SUM(pl.quantity) AS unidades_vendidas,
                SUM(pl.total_price) - SUM(mp.cost * pl.quantity) AS ganancias
            FROM "Sale" s
            INNER JOIN "ProductList" pl ON s.sale_id = pl.sale_id
            INNER JOIN "ModelProduct" mp ON pl.model_product_id = mp.model_product_id
            INNER JOIN "Product" p ON mp.product_id = p.product_id
            INNER JOIN top_products tp ON mp.model_product_id = tp.model_product_id 
            ${whereClause}
            GROUP BY mp.model_product_id, periodo
            ORDER BY unidades_vendidas DESC;
            `;
           
            return this.prisma.$queryRawUnsafe(sql);
        }

    async GetLowStock(companyId: number, limit: number, lowStockParams: lowStockDto) {
        
        let whereClause = `WHERE p.company_id = ${companyId} AND mp.visibility = true`;
        if(lowStockParams.categoryId) whereClause += ` AND mp.product_id = ${lowStockParams.categoryId} `;
        if(lowStockParams.supplierId) whereClause += ` AND mp.supplier_id = ${lowStockParams.supplierId} `;
        if(lowStockParams.wareHouseId) whereClause += ` AND S.warehouse_id = ${lowStockParams.wareHouseId} `;

        const sql = `
        SELECT 
            mp.model_product_id,
            mp.name,
            mp.description,
            mp.sku,
            SUM(S.quantity) AS stock
        FROM "ModelProduct" AS mp
        INNER JOIN "Product" AS p ON mp.product_id = p.product_id
        INNER JOIN "Stock" AS S ON mp.model_product_id = S.model_product_id
        ${whereClause}
        GROUP BY mp.model_product_id
        HAVING SUM(S.quantity) < ${limit};
        `;
        const result = await this.prisma.$queryRawUnsafe(sql);
        
        return result;
    }
}