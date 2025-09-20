import { saleContext } from "@/app/(app)/sales/edit/[id]/page";
import { productDetails } from "./sale/SaleProduct";
import { useState, useEffect, useContext } from "react";
import { PaymentMethod } from "./sale/salesPaymenthMethod";

interface paymentMethod {
  id: number;
  name: string;
  currency: string;
}

interface paymentMethodAsigned {
  id: number;
  name: string;
  currency: string;
  amount: number;
}

interface productsSend {
  productId: number,
  productQuantity: number,
  productPrice: number,
  productSubtotal: number,
}

function formatNumber(num: number | string) {
  const n = Number(num);
  if (isNaN(n)) return "";
  return n % 1 === 0 ? n.toString() : n.toFixed(2);
}

export function totalPrice(products: productDetails[]){
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.subtotal;
  });

  return parseFloat(totalPrice.toFixed(2));
}

function totalMethodsAsignedAmount(payMethodAsigneds: PaymentMethod[]) {
  let totalPrice = 0;
  payMethodAsigneds.forEach((payMethod) => {
    totalPrice += payMethod.amount;
  });
  return parseFloat(totalPrice.toFixed(2));
}

/* async function fetchDollar(setDollarPrice: (setDollarPrice: number) => void) {
  {
    try {
      const response = await fetch(
        "https://openexchangerates.org/api/latest.json?app_id=6bf1c8f004494ba4ae6b8104690c8911"
      );
      const dolarPrice = await response.json();
      setDollarPrice(parseFloat(dolarPrice.rates.VES.toFixed(2)));
    } catch (error) {
      alert("Hubo un error al obtener el precio del dolar");
      console.error("Error al obtener el precio del dolar:", error);
    }
  }
} */

function asignNewPayMethod(
  newPayMethod: paymentMethod,
  payMethodsAsigned: paymentMethodAsigned[],
  setPayMethodsAssigned: (payMethodsAssigned: paymentMethodAsigned[]) => void
) {
  setPayMethodsAssigned([
    ...payMethodsAsigned,
    {
      id: newPayMethod.id,
      name: newPayMethod.name,
      currency: newPayMethod.currency,
      amount: 0,
    },
  ]);
  console.log(payMethodsAsigned);
}

function returnPayMethods() {
  return [
    {
      id: 0,
      name: "Efectivo",
      currency: "Bs",
    },
    {
      id: 1,
      name: "Efectivo",
      currency: "USD",
    },
    {
      id: 2,
      name: "Transferencia",
      currency: "Bs",
    },
    {
      id: 3,
      name: "Zelle",
      currency: "USD",
    },
  ];
}

function PaymentAmountInput({
  payMethodAsigned,
  idx,
  dollarPrice,
  setPayMethodsAsigned,
}: {
  payMethodAsigned: any;
  idx: number;
  dollarPrice: number;
  setPayMethodsAsigned: any;
}) {
  const [isFocused, setIsFocused] = useState<"usd" | "bs" | null>(null);
  const [inputUSD, setInputUSD] = useState("");
  const [inputBs, setInputBs] = useState("");

  useEffect(() => {
    if (!isFocused) {
      setInputUSD(
        payMethodAsigned.amount === 0
          ? ""
          : formatNumber(payMethodAsigned.amount)
      );
      setInputBs(
        payMethodAsigned.amount * dollarPrice === 0
          ? ""
          : formatNumber(payMethodAsigned.amount * dollarPrice)
      );
    }
  }, [
    payMethodAsigned.amount,
    dollarPrice,
    isFocused,
    payMethodAsigned.currency,
  ]);

  return (
    <div className="flex gap-2 items-center">
      <input
        className="bg-white text-black ml-1 px-1 w-15 sm:w-25 border-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden rounded"
        type="number"
        min="0"
        placeholder="USD"
        value={
          isFocused === "usd" ? inputUSD : formatNumber(payMethodAsigned.amount)
        }
        onFocus={() => {
          setIsFocused("usd");
          setInputUSD(
            payMethodAsigned.amount === 0
              ? ""
              : formatNumber(payMethodAsigned.amount)
          );
        }}
        onBlur={() => setIsFocused(null)}
        onChange={(e) => {
          setInputUSD(e.target.value);
          const value = parseFloat(parseFloat(e.target.value).toFixed(2)) || 0;
          setPayMethodsAsigned((prev: any) =>
            prev.map((element: any, index: number) =>
              index === idx ? { ...element, amount: value } : element
            )
          );
        }}
      />
      <input
        className="bg-white text-black px-1 w-17 md:w-25 border-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden rounded"
        type="number"
        min="0"
        placeholder="Bs"
        value={
          isFocused === "bs"
            ? inputBs
            : formatNumber(payMethodAsigned.amount * dollarPrice)
        }
        onFocus={() => {
          setIsFocused("bs");
          setInputBs(
            payMethodAsigned.amount * dollarPrice === 0
              ? ""
              : formatNumber(payMethodAsigned.amount * dollarPrice)
          );
        }}
        onBlur={() => setIsFocused(null)}
        onChange={(e) => {
          setInputBs(e.target.value);
          const value = parseFloat(parseFloat(e.target.value).toFixed(2)) || 0;
          setPayMethodsAsigned((prev: any) =>
            prev.map((element: any, index: number) =>
              index === idx
                ? { ...element, amount: value / dollarPrice }
                : element
            )
          );
        }}
      />
    </div>
  );
}

export default function ConfirmationContainer({
  showConfirmationContainer,
  setShowConfirmationContainer,
}: {
  showConfirmationContainer: boolean;
  setShowConfirmationContainer: (value: boolean) => void;
}) {
  const [dollarPrice, setDolarPrice] = useState(100);
  const [payMethods, setPayMethods] = useState<paymentMethod[]>(
    returnPayMethods()
  );
  const saleData = useContext(saleContext);
  const [payMethodsAsigned, setPayMethodsAsigned] = useState<PaymentMethod[]>(saleData!.paymentMethods || []);

  return (
    <div
      id="confirmationContainer"
      className={`fixed  z-20 left-0 w-full min-w-[370px] self-center mx-auto  sm:w-8/10 md:w-7/10 lg:w-6/10 lg:z-100 xl:w-5/10   md:left-[50%] transform md:-translate-x-1/2 md:top-[50%] md:-translate-y-1/2 lg:left-[50%]  lg:-translate-x-1/2 lg:top-[50%] lg:-translate-y-1/2  xl:top-[100%] xl:-translate-y-1/6    bg-tertiary flex flex-col justify-start rounded-t-lg p-9 pb-20 sm:pb-9 shadow-[0_-4px_6px_rgba(0,0,0,0.7)] sm:shadow-[4px_4px_6px_rgba(0,0,0,0.7)] sm:rounded-xl text-xl text-globalone sm:bottom-[12.6%] transition-all duration-300 ease-in-out ${
        showConfirmationContainer ? "bottom-[2%]" : "bottom-[-90%] sm:hidden"
      }`}
    >
      <button
        className="absolute top-[20px] right-[20px] h-[35px] w-[35px] flex items-center justify-center rounded-md text-white text-3xl  hover:cursor-pointer"
        onClick={() => setShowConfirmationContainer(false)}
      >
        X
      </button>
      <h5 className="text-3xl font-bold self-center">Confirmar Venta</h5>
      <div className="mt-2">
        <p>Cliente: {saleData?.client.name || "Generico"}</p>
        <div className="flex">
          <span className="sm:whitespace-nowrap sm:text-ellipsis overflow-hidden">
            Precio: {totalPrice(saleData!.products)}${" "}
            {(totalPrice(saleData!.products) * dollarPrice).toFixed(2) !== "NaN"
              ? "o " +
                (totalPrice(saleData!.products) * dollarPrice).toFixed(2) +
                `Bs (Tasa del BCV: ${dollarPrice}Bs/$)`
              : "Por favor, ingrese el monto del dolar para obtener el precio en Bs"}
          </span>
        </div>
        <div className="flex"></div>
      </div>
      <div className="flex justify-center items-center mt-1 gap-2"></div>
      <div
        className={`flex flex-col items-center mt-1 h-47 md:h-58 p-2 overflow-auto border-2 gap-3 lg:w-35/40] self-center transition-all transform duration-300 ease-in-out ${
          payMethodsAsigned.length > 0 ? "w-auto" : "w-full"
        }`}
      >
        {payMethodsAsigned.length > 0 && (
          <div className="flex justify-between w-full">
            <span className="ml-[3%] md:ml-[8%] lg:ml-[9%]">
              Métodos de Pago
            </span>
            <span className="ml-[-5%] sm:ml-[-13%] md:ml-[-6.6%] lg:ml-[-5.7%]">
              USD
            </span>
            <span className="mr-[24.5%] sm:mr-[23.5%] md:mr-[26.4%] lg:mr-[25.7%]">
              Bs
            </span>
          </div>
        )}
        {payMethodsAsigned.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <span className="text-xl text-globalone">
              No hay métodos de pago asignados
            </span>
          </div>
        ) : (
          payMethodsAsigned.map((payMethodAsigned, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-1 pl-1 sm:gap-2 sm:px-3 md:ml-2 lg:ml-4 ${
                idx === 0 ? "mt-[-5px]" : ""
              }`}
            >
              <select
                className="bg-info w-40 rounded md:w-50 flex text-center"
                value={payMethodAsigned.PaymentId}
                disabled = {payMethodsAsigned.length > 0}
              >
                {payMethods.map((payMethod) => (
                  <option key={payMethod.id} value={payMethod.id}>
                    {payMethod.name} ({payMethod.currency})
                  </option>
                ))}
              </select>
              <PaymentAmountInput
                payMethodAsigned={payMethodAsigned}
                idx={idx}
                dollarPrice={dollarPrice}
                setPayMethodsAsigned={setPayMethodsAsigned}
              />
            </div>
          ))
        )
      }
     
      </div>
      <span className="mt-2">
        Total métodos de pago: {totalMethodsAsignedAmount(payMethodsAsigned)} $
        o{" "}
        {(totalMethodsAsignedAmount(payMethodsAsigned) * dollarPrice).toFixed(
          2
        )}{" "}
        Bs
      </span>
      <span>
        Diferencia:{" "}
        {(
          totalPrice(saleData!.products) -
          totalMethodsAsignedAmount(payMethodsAsigned)
        ).toFixed(2) +
          "$ o " +
          (
            (totalPrice(saleData!.products) -
              totalMethodsAsignedAmount(payMethodsAsigned)) *
            dollarPrice
          ).toFixed(2)}{" "}
        Bs
      </span>
      <button
        className="flex bg-success justify-center items-center mt-4 py-2 px-4 rounded-xl self-center text-primary  hover:cursor-pointer"
        onClick={() => {
          if (payMethodsAsigned.length === 0) {
            alert("No hay métodos de pago asignados");
            return;
          }
          const invalid = payMethodsAsigned.some((payMethod, idx) => {
            if (payMethod.amount <= 0) {
              alert(
                `El monto asignado para el metodo de pago número ${idx + 1} (${
                  payMethod.PaymentMethod
                }, ${
                  payMethod.currency
                } ) no puede ser igual a 0, por favor, elimine el mismo o asigne un monto mayor a 0`
              );
              return true;
            }
            return false;
          });
          if (invalid) return;
          if (
            totalMethodsAsignedAmount(payMethodsAsigned) <
            totalPrice(saleData!.products)
          ) {
            alert(
              "El monto asignado no es suficiente para cubrir el total de la venta, por favor, verifique los montos asignados"
            );
            return;
          }
          if (
            totalMethodsAsignedAmount(payMethodsAsigned) >
            totalPrice(saleData!.products)
          ) {
            alert(
              "El monto asignado es mayor al total de la venta, por favor, verifique los montos asignados"
            );
            return;
          }
          if (dollarPrice === 0) {
            alert(
              "No se pudo obtener el valor del dolar, por favor, actualice su valor"
            );
            return;
          }
          let productsSend: productDetails[] = [];
          saleData!.products.forEach((p) => {
            productsSend = [
                ...productsSend,
                {
                id: p.id,
                productId: p.productId,
                quantity: p.quantity,
                subtotal: parseFloat((p.subtotal).toFixed(2)),
                sku: p.sku,
                name: p.name,
                description: p.description,
                }
          ]
          });

          fetch(`/api/sales/${saleData?.id}`, {
            method: "PUT",
            body: JSON.stringify({
              total: totalPrice(saleData!.products),
              paymentMethods: payMethodsAsigned,
              products: productsSend,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Error en la red: " + response.statusText);
              }
              return response.json();
            })
            .then((data) => {
              setShowConfirmationContainer(false);
              console.log("Venta actualizada:", data);
             
            })
            .catch((error) => {
              console.error("Error al insertar en ventas:", error);
            });
        }}
      >
        Confirmar
      </button>
    </div>
  );

}
