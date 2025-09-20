import { paymenthMethod, salesDomain } from "../domain/salesDomain";
import { GetSalesDto, saleDto, salesFilterDto } from "../dto/get-sales.dto";
import { ISalesRepository } from "../interfaces/ISalesRepository";
import { Injectable, NotFoundException, RequestTimeoutException, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { ProductList, Sale, saleEntity, SaleEntityUnique, salePaymentEntity } from "../entities/sale.entity";
import { saleDataToUpdateDto } from "../dto/edit-sale.dto";
import { SalesService} from "src/modules/sales/sales.service";
@Injectable()
export default class salesRepository implements ISalesRepository {
    
    constructor(private readonly prisma: PrismaService) {}

    async findAll(CompanyId: number ,paginationQuery?: { skip: number; take: number; }, filters?: salesFilterDto): Promise<{ sales: any; length: number; }> {
      
        try{
            let where: any = {user: {company_id: CompanyId}, state_id: 1};
            if (SalesService.validateDateFormat(filters?.startDate as string) && SalesService.validateDateFormat(filters?.endDate as string)) {
            where.date = {
                gte: new Date(filters?.startDate as string),
                lte: new Date(filters?.endDate as string)
            };
            } else if (SalesService.validateDateFormat(filters?.startDate as string)) {
            where.date = {
                gte: new Date(filters?.startDate as string)
            };
            } else if (SalesService.validateDateFormat(filters?.endDate as string)) {
            where.date = {
                lte: new Date(filters?.endDate as string)
            };
            }

            if (filters?.clientName) {
            where.customer = {
                first_name: {
                contains: filters?.clientName?? undefined,
                mode: 'insensitive'
                }
            };
            }

            const result = await this.prisma.$transaction(async (prisma) => {
            
                const sales = await prisma.sale.findMany({
                    where: where,
                    orderBy:{
                        date: 'desc'
                    },
                    include:{
                        customer: {
                            select: {
                                first_name: true,
                                last_name: true
                            }
                        }
                    },
                    skip: paginationQuery?.skip,
                    take: paginationQuery?.take,
                });

                const totalSales = await prisma.sale.count({
                    where: where,
                });

                return { sales: sales, length: totalSales };

            }) 
  

            return { sales: result.sales, length: result.length };
        } catch (error) {
            console.error('Error fetching sales:', error);
            throw new ServiceUnavailableException('Error fetching sales');
        }



    }

    async save(sale: salesDomain, userId: number): Promise<salesDomain> {
        const transaction = await this.prisma.$transaction(async (prisma) => {

            //mapeamos el dominio de la venta a la entidad de la base de datos Y la guardamos
            const storedSale = await prisma.sale.create({data: saleEntity.parseToSaleEntity(sale, 4)});

            if(!storedSale) throw new RequestTimeoutException('Error saving sale');
            
            sale.setId(storedSale.sale_id);
            sale.setDate(storedSale.date);

            //guardamos los productos que se cargaron a la venta
            await prisma.productList.createMany({data: sale.getSaleline().map((product)=>{
                return ProductList.parseToProductList(product, sale.getSaleId() as number)
            })});

            //guardamos los metodos de pago
            await prisma.salePayment.createMany({data: sale.getPaymentMethod().map((paymenthMethod)=>{
                return salePaymentEntity.ParseToSalePaymentEntity(paymenthMethod, sale.getSaleId() as number);
            })})
            
       })

        return sale;
    }

    async findOne(id: number, companyId : number): Promise<saleDto> {
        const sale : SaleEntityUnique | null = await this.prisma.sale.findUnique({
            where: {
                sale_id: id,
                user: {
                    company_id: companyId
                },
                state_id: 1
            },
            select: {
                sale_id: true,
                date: true,
                total_amount: true,
                customer: {
                    select: {
                        customer_id: true,
                        id_card: true,
                        first_name: true,
                        last_name: true,
                        phone: true,
                    }
                },
                user:{
                    select: {
                        user_id: true,
                        username: true,
                    }
                },
                product_list: {
                    select: {
                        product_list_id: true,
                        quantity: true,
                        total_price: true,
                        modelproduct: {
                            select: {
                                model_product_id: true,
                                sku: true,
                                name: true,
                                description: true,  
                            }
                        }
                    }
                },
                sale_payments: {
                    select: {
                        sale_payment_id: true,
                        payment_coin_id: true,
                        amount_paid_usd: true,
                        exchange_rate: true,
                        PaymentCoin: {
                            select: {
                                PaymentMethod:{
                                    select: {
                                        payment_method_id: true,
                                        name: true
                                    }
                                    
                                },
                                Currency:{
                                    select: {
                                        currency_id: true,
                                        symbol: true,
                                        exchange_rate: true
                                    }
     
                                }
                            }
                        }
                    } 
                }
            }
        })
        if (!sale) {
            throw new NotFoundException(`Sale with id ${id} not found`);
        }
        // mapeamos la entidad a un dto de salida

        const SaleDto = new saleDto();
        SaleDto.parseToSaleDto(sale);

        return SaleDto;
        
        
    }

    async findOnePaymentMethod(id: number, currency: number) {
        return await this.prisma.paymentCoin.findFirst({
            where: {
                AND: [
                    { payment_method_id: id },
                    { currency_id: currency }
                ]
            },
            include: {
                Currency: {
                    select: {
                        name: true,
                        exchange_rate: true
                    }
                }
            }
        });
    }
    async update(id: number, saleDataToUpdate: saleDataToUpdateDto, company_id: number) : Promise<saleDto>  {
        const transaction = await this.prisma.$transaction(async(prisma) => {
            if(saleDataToUpdate.saleTotal !== undefined){
                await prisma.sale.update({
                    where: {
                        sale_id: id,
                        user: {
                            company_id: company_id
                        }
                    },
                    data: {
                        total_amount: saleDataToUpdate.saleTotal as number
                    }
                })
            }
            // 2. Eliminar productos
            if (saleDataToUpdate.productsToDelete.length > 0) {
                await prisma.productList.deleteMany({
                    where: {
                        product_list_id: {
                        in: saleDataToUpdate.productsToDelete,
                        },
                    },
                });
            }

            // 3. Actualizar productos existentes
            if (saleDataToUpdate.productsToUpdate.length > 0) {
                await Promise.all(saleDataToUpdate.productsToUpdate.map(async (product) => {
                    await prisma.productList.update({
                        where: {
                        product_list_id: product.id,
                        },
                        data: {
                        quantity: product.quantity,
                        total_price: product.subTotal,
                        },
                    });
                }));
            }

            // 4. Eliminar métodos de pago
            if (saleDataToUpdate.paymentMethodsToDelete.length > 0) {
                await prisma.salePayment.deleteMany({
                    where: {
                        sale_payment_id: {
                        in: saleDataToUpdate.paymentMethodsToDelete,
                        },
                    },
                });
            }

            // 5. Actualizar métodos de pago existentes
            if (saleDataToUpdate.paymentMethodsToUpdate.length > 0) {
                await Promise.all(saleDataToUpdate.paymentMethodsToUpdate.map(async (paymentMethod) => {
                    await prisma.salePayment.update({
                        where: {
                        sale_payment_id: paymentMethod.id,
                        },
                        data: {
                        amount_paid_usd: paymentMethod.amount,
                        },
                    });
                }));
            }
        })
        const saleUpdated = await this.findOne(id, company_id);

        return saleUpdated;
    } 

    remove(id: number, company_id: number){
        try{
            return this.prisma.sale.update({
                where: {
                    sale_id: id,
                    user: {
                        company_id: company_id
                    }
                },
                data: {
                    state_id: 2
                }
            })
        }catch (error) {
            console.error('Error removing sale:', error);
            throw new ServiceUnavailableException('Error eliminando la venta, intenta de nuevo mas tarde');
        }
    }
}
