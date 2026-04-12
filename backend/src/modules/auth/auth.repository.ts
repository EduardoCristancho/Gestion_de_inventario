import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { credentialsDTO } from "./dto/credentialsDTO";
import { IAuth } from "./IAuth";
import { companyDTO } from "./dto/companyDTO";
import { CreateCompanyDto } from "../company/dto/create-company.dto";

@Injectable()
export class authRepository implements IAuth{
    constructor(private readonly prisma: PrismaService){}
    
    async signUp(company: CreateCompanyDto){
                return await this.prisma.$transaction(async (tx) => {
                // Crear la Empresa y sus registros por defecto (Proveedor y Cliente)
                const newCompany = await tx.company.create({
                data: {
                    name: company.Name,
                    rif: company.Rif,
                    address: company.Address,
                    email: company.Email,
                    phone: company.phone,
                    company_logo: company.Image,
                    Warehouse: {
                    create: {
                        name: "Almacén Principal",
                        is_default: true,
                    }
                    },
                    Supplier: {
                    create: { name: "Proveedor General", is_default: true }
                    },
                    Customer: {
                    create: { 
                        first_name: "Consumidor Final", 
                        id_card: "0000000", 
                        is_default: true 
                    }
                    }
                },
                include: {
                    Warehouse: true 
                }
                });
    
                // 2. Extraer el ID del Almacén General que se acaba de crear
                const defaultWarehouseId = newCompany.Warehouse[0].warehouse_id;
    
                // 3. Crear el Usuario Administrador
                // Lo vinculamos a la Empresa Y al Almacén
                const adminUser = await tx.user.create({
                data: {
                    username: company.UserName,
                    password: company.Password,
                    role_id: 1,
                    company_id: newCompany.company_id,
                    warehouse_id: defaultWarehouseId 
                }
                });
            
                return { company: newCompany};
            })
        }

    login(credentials: credentialsDTO) {
        
    }
    async logout(token: string, userId: number) {
        const revokedToken = await this.prisma.revokedToken.create({
            data: {
                token: token,
                user_id: userId,
                revoked_at: new Date(),
                reason: 'logout'
            }
        })
        return revokedToken
    }
    registerCompany(Company: companyDTO) {
        
    }

   async findToken(token: string) {
        const TokenRevoked = await this.prisma.revokedToken.findFirst({
            where:{
                token: token
            }
        })
        return TokenRevoked;
    }
}