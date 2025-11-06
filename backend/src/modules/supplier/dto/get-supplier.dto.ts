import { ProductResponseDto } from "src/modules/inventory/dto/get-product.dto";

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


export class GetSupplierCompleteDto extends GetSupplierDto {
    products: { id: number; name: string; sku: string ; description: string }[];

    static parseToGetSupplierCompleteDto(supplier: any): GetSupplierCompleteDto {
        const getSupplierCompleteDto = new GetSupplierCompleteDto();
        getSupplierCompleteDto.id = supplier.supplier_id;
        getSupplierCompleteDto.name = supplier.name;
        getSupplierCompleteDto.rif = supplier.RIF;
        getSupplierCompleteDto.email = supplier.email;
        getSupplierCompleteDto.phone = supplier.phone;
        getSupplierCompleteDto.address = supplier.address;
        getSupplierCompleteDto.products = supplier.products.map((product: any) => {return { id: product.model_product_id, name: product.name, sku: product.sku, description: product.description, stock: parseInt(product.stock) }});
        return getSupplierCompleteDto;
    }
}