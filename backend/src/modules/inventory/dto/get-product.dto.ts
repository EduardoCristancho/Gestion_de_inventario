
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

