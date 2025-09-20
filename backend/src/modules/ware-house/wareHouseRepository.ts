
import { Injectable, NotFoundException } from "@nestjs/common";
import { IWareHouseRepository } from "./IWareHouseRepository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateWareHouseDto } from "./dto/create-ware-house.dto";
@Injectable()
export class WareHouseRepository implements IWareHouseRepository {
    constructor(private readonly prisma: PrismaService) {}
    async findOne(id: number, company_id: number) {
        const wareHouse = await this.prisma.warehouse.findFirst({
            where: {
                warehouse_id: id,
                company_id: company_id,
                visibility: true
            }
        });
        if (!wareHouse) {
            return null;
        }
        return {
            id: wareHouse.warehouse_id,
            name: wareHouse.name,
            email: wareHouse.email,
            address: wareHouse.address,
            phone: wareHouse.phone
        };
    }
    async create(createWareHouseDto: CreateWareHouseDto, companyId: number) {
        const wareHouse = await this.prisma.warehouse.create({
            data: {
                name: createWareHouseDto.name,
                email: createWareHouseDto.email,
                address: createWareHouseDto.address,
                phone: createWareHouseDto.phone,
                company_id: companyId
            }
        });
        return {
            id: wareHouse.warehouse_id, 
            name: wareHouse.name,
            email: wareHouse.email,
            address: wareHouse.address,
            phone: wareHouse.phone
        };
    }

    async delete(id: number, company_id: number) {
        const wareHouse = await this.prisma.warehouse.update({
            where: {
                warehouse_id: id,
                company_id: company_id
            },
            data: {
                visibility: false
            }
        });     
        return wareHouse.visibility;
    }

    async findAll(company_id: number) {
        const wareHouses = await this.prisma.warehouse.findMany({
            where: {
                company_id: company_id,
                visibility: true
            }
        });
        return wareHouses.map(wareHouse => ({
            id: wareHouse.warehouse_id,
            name: wareHouse.name,
            email: wareHouse.email,
            address: wareHouse.address,
            phone: wareHouse.phone
        }));
    }

    async update(id: number, updateWareHouseDto: CreateWareHouseDto, company_id: number) {
        const wareHouse = await this.prisma.warehouse.update({
            where: {
                warehouse_id: id,
                company_id: company_id
            },
            data: {
                name: updateWareHouseDto.name,
                email: updateWareHouseDto.email,
                address: updateWareHouseDto.address,
                phone: updateWareHouseDto.phone
            }
        });
        return {
            id: wareHouse.warehouse_id,
            name: wareHouse.name,
            email: wareHouse.email,
            address: wareHouse.address,
            phone: wareHouse.phone
        };
    }
}