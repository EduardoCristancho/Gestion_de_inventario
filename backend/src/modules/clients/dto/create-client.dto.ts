import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsEmail } from "class-validator";

export  class CreateClientDto {
    @Type(()=> String)
    identifier: string

    @Type(()=> String)
    firstName: string
    
    @Type(()=> String)
    lastName: string

    @Type(()=> String)
    phone: string

    @Type(()=> String)
    address: string

    @IsEmail()
    @Type(()=> String)
    email: string
}

