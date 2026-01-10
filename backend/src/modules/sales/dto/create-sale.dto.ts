import { ArrayMinSize, IsOptional, IsPositive, Min} from "class-validator";
import { Type } from "class-transformer";
export class CreateSaleDto {
    @Type(() => Number)
    @IsOptional()
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'El valor debe ser mayor a 0'})
    saleId: number;

    @IsOptional()
    @Type(() => Number)
    clientId: number;
    
    @Type(() => Date)
    @IsOptional()    
    date: Date;

    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'El monto de la venta debe ser mayor a 0'})    
    amount: number;

    @ArrayMinSize(1)
    products: ProductsDto[];

    @ArrayMinSize(1)
    paymentMethods: PaymentMethodDto[];
    
}

export class ProductsDto{
    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })    
    id: number;

    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'La cantidad debe ser mayor a 0'})
    quantity: number;

    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'El precio debe ser mayor a 0'})
    price: number;

    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'El total debe ser mayor a 0'})
    total: number;
}

class PaymentMethodDto {
    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'El valor del id debe ser mayor a 0'})
    id: number;

    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'El monto del pago debe ser mayor a 0'})
    amount: number;

    @Type(() => Number)
    @IsPositive({ message: 'El valor debe ser un número positivo' })
    @Min(1,{message: 'El id de la moneda debe ser mayor a 0'})
    currency: number;
}

