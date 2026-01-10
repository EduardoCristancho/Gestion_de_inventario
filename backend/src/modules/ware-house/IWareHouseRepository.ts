
export interface IWareHouseRepository {
    findOne(id: number, company_id: number);
    create(createWareHouseDto: any, companyId: number);
    delete(id: number, company_id: number);
    findAll(company_id: number);
    update(id: number, updateWareHouseDto: any, company_id: number);
}