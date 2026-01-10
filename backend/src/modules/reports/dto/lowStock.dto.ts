import { IsNumberString, IsOptional } from "class-validator";

export class lowStockDto {
    @IsNumberString()
    @IsOptional()
    wareHouseId: number

    @IsNumberString()
    @IsOptional()
    supplierId: number

    @IsNumberString()
    @IsOptional()
    categoryId: number
}


export class products {
    id: number;
    sku: string;
    name: string;
    description: string;
    stock: number;

    static fromEntity(entity: any): products {
        const dto = new products();
        dto.id = entity.model_product_id;
        dto.sku = entity.sku;
        dto.name = entity.name;
        dto.description = entity.description;
        dto.stock = parseInt(entity.stock);
        return dto;
    }
}