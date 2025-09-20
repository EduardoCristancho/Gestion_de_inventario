export interface PaymentMethod {
    id: number;
    PaymentId: number;
    PaymentMethod: string;
    currencyId : number;
    currency: string;
    amount: number;
    exchangeRate: number

}
function getBsExchangeRate() {
    const exchangeRate = 105;
    return exchangeRate;
}
export function SalePaymentMethod(props: PaymentMethod){
    const {PaymentMethod, currency, exchangeRate, amount} = props
    return(
        <>  
            <div className=""><p>{`${PaymentMethod} (${currency})`}</p></div>
            <div className=""><p>{amount}</p></div>
            <div className=""><p>{currency === "Bs" ? Math.round(amount*exchangeRate*100)/100 : Math.round(amount*getBsExchangeRate()*100)/100}</p></div>
        </>
    )
}