import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { Employe } from '../entities/employe.entity';
export class CreateEmployeDto {
    @IsOptional()
    @IsNumber()
    userId: number;

 
    @IsString()
    userName: string;

    @IsString()
    password: string;


    @IsNumber()
    rolId: number;

    @IsNumber()
    wareHouseId: number;

    parseToCreateEmployeDto(employe: Employe): CreateEmployeDto {
        this.userId = employe.user_id;
        this.userName = employe.username;
        this.password = employe.password;
        this.rolId = employe.role_id;
        this.wareHouseId = employe.warehouse_id;
        return this;
    }
}
