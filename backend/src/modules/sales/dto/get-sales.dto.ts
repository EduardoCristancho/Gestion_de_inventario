import { IsDate, IsDecimal, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { Sale, SaleEntityUnique } from "../entities/sale.entity";


export class GetSalesDto {
    id: number;
    client: {
        id: number;
        name: string;
    };
    date: string;
    total: number;

    parseToGetSalesDto(sale: Sale) {
        this.id = sale.sale_id;
        this.client = {
            id: sale.customer_id ?? 0,
            name: sale.customer? sale.customer.first_name as string + " " + sale.customer.last_name as string : "Generico",
        };
        this.date = sale.date.toString();
        this.total = sale.total_amount.toNumber();
    }
}

export class salesFilterDto {

    @IsOptional()
    startDate: string;

 
    @IsOptional()
    endDate: string;

    @IsOptional()
    clientName: string;
}

export class saleDto{

    
    @IsNumber()
    @Type(() => Number)
    id: number;

    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNumber()
    @Type(() => Number)
    total: number;

    seller: sellerDetails;

    client: clientDetails;

    paymentMethods: PaymentMethod[];

    products: productDetails[];

    parseToSaleDto(sale: SaleEntityUnique) {
        this.id = sale.sale_id;
        this.date = sale.date;
        this.total = sale.total_amount.toNumber();
        this.seller = {
            id: sale.User.user_id,
            User: sale.User.username
        };
        this.client = {
            id: sale.Customer?.customer_id ?? 0,
            identifier: sale.Customer?.id_card ?? "sin cedula",
            name: sale.Customer ? sale.Customer?.first_name + " " + (sale.Customer?.last_name ?? "") : "Generico",
            phone: sale.Customer?.phone ?? "sin telefono"
        };
        this.paymentMethods = sale.SalePayment.map(payment => ({
            id: payment.sale_payment_id,
            PaymentId: payment.payment_coin_id,
            PaymentMethod: payment.PaymentCoin.PaymentMethod.name,
            currencyId: payment.PaymentCoin.Currency.currency_id,
            currency: payment.PaymentCoin.Currency.symbol? payment.PaymentCoin.Currency.symbol: "$",
            amount: payment.amount_paid_usd? payment.amount_paid_usd.toNumber(): 0,
            exchangeRate: payment.exchange_rate? payment.exchange_rate.toNumber(): 0
        }));
        this.products = sale.ProductList.map(product => ({
            id : product.product_list_id,
            productId: product.ModelProduct.model_product_id,
            sku: product.ModelProduct.sku,
            name: product.ModelProduct.name,
            description: product.ModelProduct.description ?? "sin descripcion",
            quantity: product.quantity,
            subtotal: product.total_price.toNumber()
        }));
    }

}

class sellerDetails{
    @IsNumber()
    @Type(() => Number)
    id: number;

    @Type(() => String)
    User: string;
}

class clientDetails{
    @IsNumber()
    @Type(() => Number)
    id: number;

    identifier: string;

    @Type(() => String)
    name: string;

    @Type(() => String)
    phone: string;
}

export class PaymentMethod {
    @IsNumber()
    @Type(() => Number)
    id: number;

    @IsNumber()
    @Type(() => Number)
    PaymentId: number ;

    @IsNumber()
    @Type(() => String)
    PaymentMethod: string;

    @IsNumber()
    @Type(() => Number)
    currencyId : number;

    @Type(() => String)
    currency: string;
    @Type(() => Number)

    @IsNumber()
    @Type(() => Number)
    amount: number;

    @IsNumber()
    @Type(() => Number)
    exchangeRate: number;

}

export class productDetails {
    @IsNumber()
    @Type(() => Number)
    productId: number;

    @IsNumber()
    @Type(() => Number)
    id: number;

    @Type(() => String)
    sku: string;

    @Type(() => String)
    name: string;

    @Type(() => String)
    description: string;

    @IsNumber()
    @Type(() => Number)
    quantity: number;

    @IsNumber()
    @Type(() => Number)
    subtotal: number;
}
    


