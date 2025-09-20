import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class GetWareHouseDto {
    @IsOptional()
    @IsNumber()
    wareHouseId: number;

    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;
    
    @IsString()
    address: string;

    @IsString()
    phone: string;

}