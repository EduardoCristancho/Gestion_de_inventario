import { BadRequestException } from "@nestjs/common";
import { ProductEntity } from "../entities/sale.entity";
export class salesDomain {
    private saleId?: number;
    private clientId?: number;
    private date?: Date;
    private amount: number;
    private saleLine: saleLineDomain[];
    private paymentMethod: paymenthMethod[] = [];

    constructor(clientId?: number, saleId?: number){
        this.clientId = clientId;
        this.saleId = saleId;
        this.amount = 0;
        this.saleLine = [];
    }

    loadProducts(saleline: saleLineDomain){
        this.saleLine.push(saleline);
        this.amount += saleline.getTotal();
    }

    loadPaymentMethod(paymentMethod: paymenthMethod){
        this.paymentMethod.push(paymentMethod);
    }

    validateTotalAmount(){
        let total = 0;
        this.paymentMethod.forEach((payment) => {
            total += payment.getAmount();
        });
        if(total !== this.amount){
            throw new BadRequestException('El monto total no coincide con el monto de la venta que es de '+this.amount);
        }
    }


    getSaleline(): saleLineDomain[]{
        return this.saleLine
    }

    getPaymentMethod(): paymenthMethod[]{
        return this.paymentMethod;
    }
    getAmount(): number{
        return this.amount;
    }

    getClientId(): number | undefined{
        return this.clientId;
    }

    getSaleId(): number | undefined{
        return this.saleId;
    }

    setId(id: number){
        this.saleId = id
    }
    getDate(): Date | undefined{
        return this.date;
    }
    setDate(date: Date){
        this.date = date;
    }


}

export class saleLineDomain{
    private productDomain: ProductDomain;
    private quantity: number;
    private total: number
    constructor(productDomain: ProductDomain, quantity: number){
        this.productDomain = productDomain;
        this.quantity = quantity
        if(!this.validateStock(this.quantity)){
            throw new BadRequestException('No hay stock suficiente para el producto '+this.productDomain.getId());
        }    
        this.total =  this.productDomain.getPrice() * this.quantity;
    }

    validateStock(quantity: number){
        this.productDomain.getStock()
        if(this.productDomain.getStock() < quantity){
            return false;
        }
        return true
    }

    getTotal(): number{
        return this.total;

    }

    getProductDomain(): ProductDomain{
        return this.productDomain;
    }
    getQuantity(): number{
        return this.quantity;
    }
}

export class ProductDomain{
    private id: number;
    private price: number;
    private stock: number;
    private warehouseId: number;
    constructor(id: number, price: number, stock: number, wahrehouseId: number){
        this.id = id;
        this.price = price;
        this.stock = stock;
        this.warehouseId = wahrehouseId
    }
    getStock(){
        return this.stock;
    }

    getPrice(): number {
        return this.price;
    }
    
    getId(): number {
        return this.id;
    }

    getWarehouseId(): number {
        return this.warehouseId;
    }

    static fromPrimitive(data: ProductEntity, warehouseId: number): ProductDomain{
        return new ProductDomain(
            data.model_product_id,
            data.price.toNumber(),
            data.totalStock,
            warehouseId
        );
    }
}

export class paymenthMethod{
    private id: number;
    private amount: number;
    private currency: {
        id: number;
        name: string;
        exchange_rate: number;
    }
    constructor(id: number, amount: number, currency: {id: number, name: string, exchange_rate: number}){
        this.currency = currency
        this.id = id;
        this.amount = amount;
    }

    getId(): number{
        return this.id;
    }
    getAmount(): number{
        return this.amount;
    }
    getCurrencyId(): number{
        return this.currency.id;
    }
    getCurrencyName(): string{
        return this.currency.name;
    }
    getExchangeRate(): number{
        return this.currency.exchange_rate;
    }
}