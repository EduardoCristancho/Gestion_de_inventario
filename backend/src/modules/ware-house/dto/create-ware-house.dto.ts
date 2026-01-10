import { IsEmail, IsString, MaxLength } from "class-validator";

export class CreateWareHouseDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    address: string;
    @IsString()
    @MaxLength(12)
    phone: string;
}
