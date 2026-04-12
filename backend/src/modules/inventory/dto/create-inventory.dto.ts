import { Type } from "class-transformer";
import { IsString, IsNumberString, IsOptional, Min, IsNumber, min, IsArray, ValidateNested } from "class-validator";

export class ProductModelDto {

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    modelId?: number

    @IsString()
    name: string

    @IsString()
    @IsOptional()
    imgUrl?: string

    @IsString()
    sku: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    @Type(()=> Number)
    quantity: number

    @IsNumber()
    @Min(0)
    @Type(() => Number) // Transforma el string del FormData a número
    cost: number;

    @IsNumber()
    @Min(0)
    @Type(() => Number) // Transforma el string del FormData a número
    price: number;

    @IsNumber()
    @Min(0)
    @Type(()=> Number)
    supplierId: number;


}

export class CreateInventoryDto{
    @IsNumber( )
    @IsOptional()
    @Type(() => Number)
    productId?: number

    @IsString()
    name: string

    @IsString()
    description : string
    
    @IsArray() // 1. Indica que es una lista
    @ValidateNested({ each: true })
    @Type(() => ProductModelDto)
    models: ProductModelDto[]
}


export class getUnifiedParams{
    @IsString()
    search: string;
    
    @IsOptional()
    @Type(()=> Number)
    @Min(0)
    minQuantity: Number

    @IsOptional()
    @Type(()=> Number)
    maxQuantity: number

    @IsOptional()
    @Type(()=> Number)
    @Min(0)
    minPrice: number

    @IsOptional()
    @Type(()=> Number)
    maxPrice: number

    @IsOptional()
    @Type(()=> Number)
    @Min(0)
    provider: number

    @Type(()=> Number)
    @IsOptional()
    warehouseId: number
}