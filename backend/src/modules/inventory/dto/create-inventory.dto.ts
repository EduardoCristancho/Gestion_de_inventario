import { Type } from "class-transformer";
import { IsString, IsNumberString, IsOptional, Min } from "class-validator";
export class CreateInventoryDto{}
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