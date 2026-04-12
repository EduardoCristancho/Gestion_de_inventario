import {IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, IsUrl, Matches, Max, MaxLength, Min, MinLength, NotContains } from "class-validator";



export class CreateCompanyDto {
    @IsOptional()
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    @IsUrl()
    Image : string
    
    @IsString()
    Name: string

    @IsOptional()
    @IsEmail({},{message:"El formato de correo electronico no es valido"})
    Email: string

    @IsOptional()
    @IsString()
    @Matches(/^[V|J|E|G|P]\d{8,9}$/, {
        message: "El rif debe tener una letra valida seguida de 8 0 9 numeros."
    })
    @MinLength(9)
    @MaxLength(10)
    Rif : string

    @IsString()
    @IsOptional()
    Address: string

    @IsString()
    @IsOptional()
    phone: string

    @IsString()
    @Matches(/^\S+$/, {message:"El nombre de usuario no debe contener espacios en blanco"})
    @MinLength(4,{message:"El nombre de ususario debe contener al menos 4 caracteres"})
    UserName: string
    
    @IsString()
    @IsStrongPassword({},{message:"La contraseña debe tener al menos 8 caracteres, combinando mayusculas y minusculas y haciendo uso de algun numero y caracter especial (#&%-)."})
    Password: string
}

export class CompanyDto {
    Photo?: string
    
    Name: string

    Email?: string

    Rif?: string

    address?: string

    phone?: string

    static parseFromCreate(company: CreateCompanyDto){
        const dto = new CompanyDto();
        dto.Photo = company.Image ?? "";
        dto.Name = company.Name;
        dto.Rif = company.Rif ?? "";
        dto.address = company.Address ?? "";
        dto.phone = company.phone ?? "";
        dto.Email = company.Email ?? "";
        return dto;
    }
}
