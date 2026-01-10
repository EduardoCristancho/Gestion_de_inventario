import { OmitType } from "@nestjs/mapped-types";
import { Employe, getEmploye } from "../entities/employe.entity";

export class GetEmployeDto {
     id: number;
    userName: string;
    email: string;
    password: string;
    rol: string;
    warehouse: string;

    parseToGetEmployeDto(employe: getEmploye): GetEmployeDto {
        this.id = employe.user_id;
        this.userName = employe.username;
        this.rol = employe.role.name;
        this.password = employe.password;
        this.warehouse = employe.warehouse.name;
        return this;
    }
}
export class GetAllEmployeDto extends OmitType(GetEmployeDto, ['password']) {
    parseToGetAllEmployeDto(employe: getEmploye): GetAllEmployeDto {
        this.id = employe.user_id;
        this.userName = employe.username;
        this.rol = employe.role.name;
        this.warehouse = employe.warehouse.name;
        return this;
    }
    
}