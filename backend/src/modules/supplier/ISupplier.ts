import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";

export interface ISupplierRepository  {
    findAll(company_id: number, limit?: number, page?: number)
    create(createSupplierDto: CreateSupplierDto, companyId: number);
    findOne(id: number, companyId: number);
    findOneComplete(id: number, companyId: number);
    update(id: number, updateSupplierDto: UpdateSupplierDto, companyId: number);
    remove(id: number, companyId: number);
}