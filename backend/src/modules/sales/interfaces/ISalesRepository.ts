import { paginationQueryDto } from "src/modules/clients/dto/pagination.dto";
import { GetSalesDto, saleDto, salesFilterDto } from "../dto/get-sales.dto";
import { salesDomain } from "../domain/salesDomain";
import { saleDataToUpdateDto } from "../dto/edit-sale.dto";

paginationQueryDto
export interface ISalesRepository {
    findAll(CompanyId: number,paginationQuery? : {skip: number, take: number}, filters?: salesFilterDto): Promise<{sales: any, length: number }>
    save(sale: salesDomain, userId: number): Promise<salesDomain>
    findOnePaymentMethod(id: number, currency: number)
    findOne(id: number, companyId : number): Promise<saleDto | null>
    update(id: number, SaleDataToUpdate: saleDataToUpdateDto, company_id: number)
    remove(id: number, company_id: number)
}