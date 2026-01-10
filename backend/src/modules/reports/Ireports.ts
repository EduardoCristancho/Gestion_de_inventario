import { salesReportDto } from "./dto/create-report.dto";
import { lowStockDto } from "./dto/lowStock.dto";

export interface IReports {
    salesTroughTime(salesReportDto: salesReportDto, companyId: number);
    mostSelled(MostSelledDto: any,company_id: number);
    mostSelledTroughTime(MostSelledDto: any,company_id: number);
    GetLowStock(companyId: number, limit: number, lowStockParams: lowStockDto);
}