
import { ProductEntity } from "../entities/product.entity";

export class ProductResponseDto {
    idProducto: number;
    nombre: string;
    sku: number;
    price: number;
    description: string;
    stock: number;

    parseToProductResponseDto(product: ProductEntity): ProductResponseDto {
        this.idProducto = product.idProducto;
        this.nombre = product.nombre;
        this.sku = product.sku;
        this.price = product.price;
        this.description = product.description;
        this.stock = product.stock;
        return this;
    }
}

export class GetProductDto {
    model_product_id: number;
    name: string;
    sku: number;
    description: string;
    cost: number;
    price: number;
    stock: number;
    
    static parseToGetProductDto(product: any): GetProductDto {
        const productDto = new GetProductDto();
        productDto.model_product_id = product.model_product_id;
        productDto.name = product.name;
        productDto.sku = product.sku;
        productDto.description = product.description;
        productDto.cost = product.cost;
        productDto.price = product.price;
        productDto.stock = parseInt(product.stock.toString());
        return productDto;
    }
}

