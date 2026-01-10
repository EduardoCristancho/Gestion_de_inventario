import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ISupplierRepository } from "./ISupplier";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";

@Injectable()
export class SupplierRepository implements ISupplierRepository {

    constructor(private readonly prisma: PrismaService) {}

    create(createSupplierDto: CreateSupplierDto, companyId: number) {
        try {
            return this.prisma.supplier.create({
                data: {
                    name: createSupplierDto.name,
                    RIF: createSupplierDto.rif,
                    email: createSupplierDto.email,
                    phone: createSupplierDto.phone,
                    address: createSupplierDto.address,
                    company_id: companyId
                }
            })
        }catch (error) {
            throw new InternalServerErrorException('Error creating supplier');
        }
    }
    async findAll(company_id: number, skip?: number, take?: number) {
        const result = await this.prisma.$transaction(async (prisma) =>{
            const data = await prisma.supplier.findMany({
                where: {
                    company_id: company_id,
                    visibility: true
                },
                skip: skip,
                take: take
            });

            const count = await prisma.supplier.count({
                where: {
                    company_id: company_id,
                    visibility: true
                }
            });
            return {suppliers: data, total: count};
        });

        return result;
        
    }
    async findOne(id: number, companyId: number) {
        try{
            const result = await this.prisma.supplier.findFirst({
                where: {
                    OR: [{supplier_id: id}, {RIF: id.toString()}],
                    company_id: companyId,
                    visibility: true
                }
            });
            return result;
        }catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error finding supplier');
        }
    }
    async findOneComplete(id: number, companyId: number) {
        try{
            const result = await this.prisma.$transaction(async (prisma) => {
                const supplierData = await prisma.supplier.findFirst({
                    where: {
                        supplier_id: id,
                        company_id: companyId,
                        visibility: true
                    }
                });

             

                const producData : any = await prisma.$queryRawUnsafe(
                    `SELECT 
                        mp.model_product_id,
                        mp.name,
                        mp.description,
                        mp.sku,
                        SUM(S.quantity) AS stock
                    FROM "ModelProduct" AS mp
                    INNER JOIN "Product" AS p ON mp.product_id = p.product_id
                    INNER JOIN "Stock" AS S ON mp.model_product_id = S.model_product_id
                    WHERE mp.supplier_id = ${id} AND p.company_id = ${companyId}
                    GROUP BY mp.model_product_id
                    HAVING SUM(S.quantity) > 0;`
                )
                

                if(supplierData === null && producData.length === 0){
                    return null;
                }

                return {...supplierData, products: producData};
            });

            return result;
        }catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error finding supplier');
        }
    }   

    update(id: number, updateSupplierDto: UpdateSupplierDto, companyId: number) {
        const data : any = {};
        for (const key in updateSupplierDto) {
            if (key == 'rif'){
                data.RIF = updateSupplierDto[key];
                continue;
            }
            if (updateSupplierDto[key] !== undefined){
                data[key] = updateSupplierDto[key];
            } 
        }

        try{
            return this.prisma.supplier.update({
                where:{
                    supplier_id: id,
                    company_id: companyId
                },
                data: {
                    ...data
                }
            });
        }catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error updating supplier');
        }
    }

    remove(id: number, companyId: number) {
        try{
            return this.prisma.supplier.update({
                where: {
                    supplier_id: id,
                    company_id: companyId
                },
                data: {
                    visibility: false
                }
            });
        }catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Error removing supplier');
        }
    }
}