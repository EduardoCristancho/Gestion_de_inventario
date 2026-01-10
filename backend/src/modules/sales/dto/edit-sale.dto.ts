import { PaymentMethod, saleDto } from "./get-sales.dto";
import { PickType } from "@nestjs/mapped-types";

export class UpdateSaleDto extends PickType(saleDto, ['products', 'paymentMethods','total']) {
    
}
export class saleDataToUpdateDto {
    saleTotal?: number | undefined;
    productsToDelete: number[] = [];
    paymentMethodsToDelete: number[] = [];
    productsToUpdate: {id: number, quantity: number, subTotal: number}[] = [];
    paymentMethodsToUpdate: PaymentMethod[] = [];
}