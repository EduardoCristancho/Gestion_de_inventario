import { IsEmail, IsNumberString, IsString } from "class-validator";
export class CreateSupplierDto {
    @IsString()
    name: string;
    @IsString()
    rif: string;
    @IsEmail()
    email: string;
    @IsString()
    address: string;
    @IsNumberString()
    phone: string;
}
