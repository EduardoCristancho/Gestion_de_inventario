import { CreateEmployeDto } from "../dto/create-employe.dto";
import { UpdateEmployeDto } from "../dto/update-employe.dto";
import { Employe, getEmploye } from "../entities/employe.entity";

export interface IEmployeRepository {
    create(createEmployeDto: CreateEmployeDto, company_id: number): Promise<CreateEmployeDto>;
    findAll(company_id: number): Promise<getEmploye[]>;
    findOne(companyId: number, username?: string, userId?: number): Promise<getEmploye | null>;
    findAllRols();
    update(id: number, updateEmployeDto: UpdateEmployeDto, company_id: number): Promise<Employe>;
    remove(id: number, company_id: number): Promise<void>;

}