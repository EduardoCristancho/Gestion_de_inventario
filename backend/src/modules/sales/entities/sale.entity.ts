import { Decimal } from "@prisma/client/runtime/library";
import { paymenthMethod, salesDomain } from "../domain/salesDomain";
import { saleLineDomain } from "../domain/salesDomain"
export class Sale {
    date: Date;
    sale_id: number;
    customer: {
        first_name: string;
        last_name: string | null;
    }| null;
    user_id: number;
    customer_id: number | null;
    state_id: number;
    total_amount: Decimal;
}

export class saleEntity{

    date: Date | undefined;
    sale_id: number ;
    user_id: number;
    customer_id: number | null;
    state_id: number;
    total_amount: Decimal;

    static parseToSaleEntity(sale: salesDomain, userId: number) {
        return {
            date : sale.getDate(),
            user_id : userId,
            customer_id : sale.getClientId()? sale.getClientId() : null,
            state_id : 1,
            total_amount : new Decimal(sale.getAmount())
        }
    }
}

export class ProductList {
    product_list_id: number
    product_id : number
    sale_id  : number
    quantity : number
    unit_price : Decimal
    total_price  : Decimal

    static parseToProductList(productList: saleLineDomain, saleId: number){ 
        return {
            model_product_id : productList.getProductDomain().getId(),
            sale_id : saleId,
            quantity : productList.getQuantity(),
            unit_price : new Decimal(productList.getProductDomain().getPrice()),
            total_price : new Decimal(productList.getTotal()),
            warehouse_id : productList.getProductDomain().getWarehouseId()
        }
    }
}

export class ProductEntity{

    model_product_id: number;
    product_id: number | null;
    state_id: number;
    supplier_id: number | null;
    visibility: boolean;
    sku: string;
    name: string;
    photo: string|null;
    description: string | null;
    cost: Decimal | null;
    price: Decimal;
    stock: 
    {
      stock_id: number;
      model_product_id: number;
      warehouse_id: number;
      stock_movement_id: number;
      quantity: number;
      created_at: Date;
      updated_at: Date;
    }[];
  totalStock: number
}

export class salePaymentEntity{

    sale_payment_id: number;
    sale_id: number;
    payment_coin_id: number;
    exchange_rate: Decimal;
    amount_paid_usd: Decimal;
    date: Date;

    static ParseToSalePaymentEntity(payment: paymenthMethod, saleId: number){
        return {
            sale_id: saleId,
            payment_coin_id: payment.getId(),
            exchange_rate: new Decimal(payment.getExchangeRate()),
            amount_paid_usd: new Decimal(payment.getAmount()),
            date: new Date()
        }
    }
}

export class SaleEntityUnique {
    sale_id: number;
    date: Date;
    total_amount: Decimal;   
    user: {
        user_id: number;
        username: string;
    };
    customer: {
        customer_id: number;
        id_card: string | null;
        first_name: string;
        last_name: string | null;
        phone: string | null;
     }| null;
    sale_payments: {
        sale_payment_id: number;
        payment_coin_id: number;
        exchange_rate: Decimal | null;
        amount_paid_usd: Decimal | null;
        PaymentCoin: {
            PaymentMethod: {
                payment_method_id: number;
                name: string;
            };
            Currency: {
                currency_id: number;
                symbol: string|null;
                exchange_rate: Decimal | null;
            };
        }
    }[];
    product_list: {
        product_list_id: number,
        quantity: number,
        total_price: Decimal,
        modelproduct: {
            model_product_id: number,
            sku: string,
            name: string,
            description: string | null,  
        }
    }[];
}