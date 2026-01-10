import { CreateEmployeDto } from "./dto/create-employe.dto";
import { IEmployeRepository } from "./interfaces/IEmployeRepository";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import { Employe, getEmploye } from "./entities/employe.entity";
import { UpdateEmployeDto } from "./dto/update-employe.dto";

@Injectable()
export class employeRepository implements IEmployeRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    async create(createEmployeDto: CreateEmployeDto, company_id: number): Promise<CreateEmployeDto> {
        try {
            const employe = await this.prisma.user.create({
                data: {
                    company_id: company_id,
                    username: createEmployeDto.userName,
                    password: createEmployeDto.password,
                    role_id: createEmployeDto.rolId,
                    warehouse_id: createEmployeDto.wareHouseId,
                }
            });
            if (!employe) {
                throw new ServiceUnavailableException('Error creando el empleado, intenta de nuevo mas tarde');
            }
            const createEmploye = createEmployeDto.parseToCreateEmployeDto(employe);
            return  createEmploye;
        }catch (error) {
            console.error('Error creating employe:', error);
            throw new ServiceUnavailableException('Error creando el empleado, intenta de nuevo mas tarde');
        }
    }
    findAll(company_id: number): Promise<getEmploye[]> {
        try{
            return this.prisma.user.findMany({
                where: {
                    company_id: company_id,
                    visibility: true
                },
                include: {
                    role: {
                        select: {
                            role_id: true,
                            name: true
                        }
                    },
                    warehouse: {
                        select: {
                            warehouse_id: true,
                            name: true
                        }
                    }
                }
            })
        }catch(error){
            console.error('Error finding all employes:', error);
            throw new ServiceUnavailableException('Error buscando los empleados, intenta de nuevo mas tarde');
        }
    }

    async findAllRols(){
        const rols = await this.prisma.role.findMany({
            select: {
                role_id: true,
                name: true
            }
        });
        return rols.map(rol => {
            return {roleId: rol.role_id, name: rol.name};
        })
    }
    async findOne(companyId?: number, username?: string, userId?: number): Promise<getEmploye | null> {
        try{
            const whereCondition: any = { visibility: true};
            if (companyId) {
                whereCondition.company_id = companyId;
            }
            if (!username && !userId) {
                throw new ServiceUnavailableException('Debe proporcionar un nombre de usuario o un ID de usuario');
            }
            if (userId){
                whereCondition.user_id = userId;
            }else{
                whereCondition.username = username;
            }

            return await this.prisma.user.findFirst({
                where: whereCondition,
                include: {
                    role: {
                        select: {
                            role_id: true,
                            name: true
                        }
                    },
                    warehouse: {
                        select: {
                            warehouse_id: true,
                            name: true
                        }
                    }
                }
            });

        }catch(error){
            console.error('Error finding employe:', error);
            throw new ServiceUnavailableException('Error buscando el empleado, intenta de nuevo mas tarde');
        }
    }

    async update(id: number, updateEmployeDto: UpdateEmployeDto, company_id: number): Promise<Employe> {
        try{
            return await this.prisma.user.update({
                where: {
                    user_id: id,
                    company_id: company_id
                },
                data: {
                    username: updateEmployeDto.userName,
                    password: updateEmployeDto.password,
                    role_id: updateEmployeDto.rolId,
                    warehouse_id: updateEmployeDto.wareHouseId,
                }
            })

        }catch(error){
            console.error('Error updating employe:', error);
            throw new ServiceUnavailableException('Error actualizando el empleado, intenta de nuevo mas tarde');
        }
    }

    async remove(id: number, company_id: number): Promise<void> {
        try{
            await this.prisma.user.update({
                where:{
                    user_id: id,
                    company_id: company_id
                },
                data: {
                    visibility: false
                }
            })
        }catch(error){
            console.error('Error removing employe:', error);
            throw new ServiceUnavailableException('Error eliminando el empleado, intenta de nuevo mas tarde');
        }
    }
}