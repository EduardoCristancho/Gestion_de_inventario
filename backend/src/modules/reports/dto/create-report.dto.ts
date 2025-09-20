import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNumber, IsNumberString, isNumberString, IsOptional, IsString } from "class-validator";

export class salesReportDto {
    @IsString()
    period: string; // 'daily', 'weekly', 'monthly'

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;
    
    @IsNumberString()
    @IsOptional()
    userId?: number; // Optional, if you want to filter by user
    
    @IsNumberString()
    @IsOptional()
    wareHouseId?: number; // Optional, if you want to filter by warehouse

  
}

export class saleReportDataDto {
    date: string; // Date in 'DD-MM-YYYY' format
    totalSales: number; // Total sales amount for the day
    cost: number;
    profit: number;

    static fromEntity(entity: any): saleReportDataDto {
        const dto = new saleReportDataDto();
        dto.date = new Date(entity.periodo).toString(); 
        dto.totalSales = entity.total_ventas;
        dto.cost = entity.costos;
        dto.profit = entity.ganancias;
        return dto;
    }
}
