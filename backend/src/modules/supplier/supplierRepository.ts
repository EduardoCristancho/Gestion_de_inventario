import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ISupplierRepository } from "./ISupplier";

@Injectable()
export class SupplierRepository implements ISupplierRepository {

    constructor(private readonly prisma: PrismaService) {}

    findAll(company_id: number) {
        return this.prisma.supplier.findMany(
            {
                where: {
                    company_id: company_id
                }
            }
        );
        
    }
}