import { IsDateString, IsNumberString, IsString, IsOptional, isNumberString } from "class-validator"

export class MostSelledDto {
    @IsNumberString()
    limit: number

    @IsNumberString()
    @IsOptional()
    categoryId: number

    @IsNumberString()
    @IsOptional()
    supplierId: number

    @IsDateString()
    @IsOptional()
    startDate: string

    @IsDateString()
    @IsOptional()
    endDate: string

    @IsNumberString()
    @IsOptional()
    wareHouseId: number
    
}

export class MostSelledDataDto {
    productName: string;
    unitsSold: string; 
    totalProfit: number;

    static fromEntity(entity: any): MostSelledDataDto {
        const dto = new MostSelledDataDto();
        dto.productName = entity.name; 
        dto.unitsSold = entity.unidades_vendidas.toString();
        dto.totalProfit = entity.ganancias;
        return dto;
    }
}

export class MostSelledTroughTimeDto extends MostSelledDto {
    @IsString()
    period: string
}

export class MostSelledTroughTimeDataDto extends MostSelledDataDto {
    id: number;
    date: string;

    static fromEntity(entity: any): MostSelledTroughTimeDataDto {
        const dto = new MostSelledTroughTimeDataDto();
        dto.productName = entity.name; 
        dto.unitsSold = entity.unidades_vendidas.toString();
        dto.totalProfit = entity.ganancias;
        dto.id = entity.model_product_id;
        dto.date = new Date(entity.periodo).toLocaleDateString();
        return dto;
    }
}

