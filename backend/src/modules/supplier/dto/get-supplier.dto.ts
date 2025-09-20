export class GetSupplierDto {
    id: number;
    name: string;
    rif: string;
    email: string;
    phone: string;
    address: string;

    static parseToGetSupplierDto(supplier: any): GetSupplierDto {
        const getSupplierDto = new GetSupplierDto();
        getSupplierDto.id = supplier.supplier_id;
        getSupplierDto.name = supplier.name;
        getSupplierDto.rif = supplier.RIF;
        getSupplierDto.email = supplier.email;
        getSupplierDto.phone = supplier.phone;
        getSupplierDto.address = supplier.address;
        return getSupplierDto;
    }
}