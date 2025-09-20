import { BadRequestException, Inject, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { saleDataToUpdateDto, UpdateSaleDto } from './dto/edit-sale.dto';
import { ISalesRepository } from './interfaces/ISalesRepository';
import { paginationQueryDto } from '../clients/dto/pagination.dto';
import { paymenthMethod, ProductDomain, saleLineDomain, salesDomain } from './domain/salesDomain';
import IClientsRepository from '../clients/interfaces/IClientsRepository';
import { InventoryRepository } from '../inventory/inventory.repository';
import { GetSalesDto, saleDto, salesFilterDto } from './dto/get-sales.dto';
import { ProductEntity } from './entities/sale.entity';
import { PaymentMethod } from './dto/get-sales.dto';

@Injectable()
export class SalesService {
  constructor(
    @Inject('ISalesRepository') private readonly salesRepository: ISalesRepository,
    @Inject('IClientsRepository') private readonly clientsService: IClientsRepository,
    private readonly productsService: InventoryRepository
) {}
  async create(createSaleDto: CreateSaleDto, companyId: number) {
    const warehouseId = 1;
    //validamos que exista un cliente
    if(createSaleDto.clientId){
      const client = await this.clientsService.findOne(createSaleDto.clientId, companyId);
      if(!client){
        throw new BadRequestException('El cliente que realiza la venta no existe');
      }
    }else{
      createSaleDto.clientId = 0;
    }
    //iniciamos la venta
    const sale = new salesDomain(createSaleDto.clientId);

    //Validamos que existan los productos
    const validatedProducts = await Promise.all(
      createSaleDto.products.map(async (product) => {
        const resultProduct : ProductEntity | null = await this.productsService.findOne(product.id);
        if(!resultProduct){
          throw new BadRequestException('El producto ' + product.id + ' no existe');
        }
        return {resultProduct, quantity: product.quantity};
      })
    )
    //cargamos los productos a la venta 
    for(const {resultProduct, quantity} of validatedProducts){

      const productDomain = ProductDomain.fromPrimitive(resultProduct, warehouseId );
      const saleLine = new saleLineDomain(productDomain, quantity);
      sale.loadProducts(saleLine);

    }
    //validamos que los metodos de pago existan
    const validatedPaymentMethods = await Promise.all(
      createSaleDto.paymentMethods.map(async (paymentMethod) => {
        const resultPaymentMethod = await this.salesRepository.findOnePaymentMethod(paymentMethod.id, paymentMethod.currency);
        if(!resultPaymentMethod){
          throw new BadRequestException('El metodo de pago ' + paymentMethod.id + ' no existe');
        }
        return {resultPaymentMethod, amount: paymentMethod.amount};
      })
    )
    //cargamos los metodos de pago
    for(const {resultPaymentMethod, amount} of validatedPaymentMethods){
      const payment = new paymenthMethod(resultPaymentMethod.payment_coin_id, amount, {id: resultPaymentMethod.currency_id, name: resultPaymentMethod.Currency.currency_name, exchange_rate: resultPaymentMethod.Currency.exchange_rate} );
      sale.loadPaymentMethod(payment);
    }

    //validamos que el total de la venta coincida con el total de los metodos de pago
    sale.validateTotalAmount();

    //guardamos la venta
    const result = await this.salesRepository.save(sale, 1);

    //si no se guardo la venta lanzamos una excepcion
    if(!result) throw new BadRequestException('Error al guardar la venta');
    
    return result;
  }

  async findAll(paginationQuery: paginationQueryDto, filters: salesFilterDto, CompanyId: number) {
    
      let paginationOptions : {skip: number, take: number} | undefined = undefined;
      
      if (paginationQuery.page !== undefined && paginationQuery.limit !== undefined) {
         //si existe la paginacion, llamamos al repositorio para obtener los clientes paginados
          paginationOptions = {
            skip: paginationQuery.page * paginationQuery.limit,
            take:  paginationQuery.limit,
          }
      }
      const result = await this.salesRepository.findAll(CompanyId,paginationOptions, filters);
      if (result.length === 0) {
        //si no existen ventas, lanzamos una excepcion 404
        throw new NotFoundException('No sales found');
      }
      //mapeamos al dto de salida          //mapeamos al dto de salida
      const sales : GetSalesDto[] = result.sales.map((sale) => {
          const getSaleDto = new GetSalesDto(); 
          getSaleDto.parseToGetSalesDto(sale);
          return getSaleDto;
        })

      return {sales, length: result.length};
    
  }

  public static validateDateFormat(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    return dateRegex.test(date);
  }

  async findOne(id: number, companyId: number) {
    const sale = await this.salesRepository.findOne(id, companyId);
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto, companyId: number) {
    const sale : saleDto | null = await this.salesRepository.findOne(id, companyId);
    const dataToUpdate : saleDataToUpdateDto = new saleDataToUpdateDto();
    let newTotal = 0;
    let newPaymentTotal = 0;
    if (sale === null) {
      //si no se encuentra la venta, lanzamos una excepcion 404
      throw new NotFoundException('Sale not found');
    }
    //comenzamos las validaciones
    for (const product of sale.products) {
      newTotal += product.subtotal;
      let productPrice = product.subtotal/product.quantity;
      let productCoincidence : {id: number, quantity: number, subTotal: number} | undefined = undefined;
      for (const productToUpdate of updateSaleDto.products) {
        if (productToUpdate.productId === product.productId){
          productCoincidence = {
            id: productToUpdate.id, 
            quantity: productToUpdate.quantity, 
            subTotal: productToUpdate.quantity * productPrice
          };
        }
      }

      if (productCoincidence === undefined) {
        //si no se encuentra el producto en la actualizacion, lo agregamos a la lista de productos a eliminar y actualizamos el total
        newTotal -= product.subtotal; 
        dataToUpdate.productsToDelete.push(product.id);
        continue;
      }
      //si se encuentra el producto en la actualizacion, lo agregamos a la lista de productos a actualizar
      if (product.quantity !== productCoincidence!.quantity) {
        if(product.quantity < productCoincidence!.quantity) throw new BadRequestException('Solo puede hacer disminuciones en la cantidad de productos');
        newTotal -= product.subtotal;
        newTotal += productCoincidence!.subTotal;
        dataToUpdate.productsToUpdate.push(productCoincidence);
        continue;
      }
    }

    //validamos los metodos de pago.
    for (const paymentMethod of sale.paymentMethods) {
      
      newPaymentTotal += paymentMethod.amount;

      const paymentMethodToUpdate = updateSaleDto.paymentMethods.find((paymentMethodToUpdate) => {
        return paymentMethod.PaymentId === paymentMethodToUpdate.PaymentId ?  paymentMethodToUpdate : undefined;  
      })
      if (paymentMethodToUpdate === undefined) {
        //si no se encuentra el metodo de pago en la actualizacion, lo agregamos a la lista de metodos de pago a eliminar
        newPaymentTotal -= paymentMethod.amount;
        dataToUpdate.paymentMethodsToDelete.push(paymentMethod.id!);
        continue;
      }
      //si se encuentra el metodo de pago en la actualizacion, lo agregamos a la lista de metodos de pago a actualizar
      if (paymentMethod.amount !== paymentMethodToUpdate.amount) {
          dataToUpdate.paymentMethodsToUpdate.push(paymentMethodToUpdate);
          newPaymentTotal -= paymentMethod.amount;
          newPaymentTotal += paymentMethodToUpdate.amount;
          continue;
      }
      
    }

     //validamos que los montos coincidan
    if (newTotal !== newPaymentTotal) {
      throw new BadRequestException('El monto a cancelar no coincide con el monto total de la venta hay una diferencia de '+ (Math.abs(newTotal - newPaymentTotal)).toFixed(2));
    }
    
    dataToUpdate.saleTotal = newTotal !== sale.total ? newTotal : undefined;
    
    //actualizamos la venta
    const result = await this.salesRepository.update(id, dataToUpdate ,companyId,);
    return result;

  }

  async remove(id: number, companyId: number) {
    const result = await this.salesRepository.remove(id, companyId);
    if (result === null) {
      throw new NotFoundException('Sale not found');
    }
    return result;
  }
}
