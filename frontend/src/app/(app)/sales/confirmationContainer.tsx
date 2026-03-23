import { useProducts, cartProduct } from "./productContext";
import { IoCloseCircle, IoClose, IoAdd, IoTrash } from "react-icons/io5";
import { useState, useEffect } from "react";

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
  productId: number;
  productQuantity: number;
  productPrice: number;
  productSubtotal: number;
}

function formatNumber(num: number | string) {
  const n = Number(num);
  if (isNaN(n)) return "";
  return n % 1 === 0 ? n.toString() : n.toFixed(2);
}

export function totalPrice(products: cartProduct[]) {
  

    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.totalPrice;
    });
    
    return parseFloat(totalPrice.toFixed(2));
  
}

function totalMethodsAsignedAmount(payMethodAsigneds: paymentMethodAsigned[]) {
  let totalPrice = 0;
  payMethodAsigneds.forEach((payMethod) => {
    totalPrice += payMethod.amount;
  });
  return parseFloat(totalPrice.toFixed(2));
}

function returnPayMethods() {
  return [
    { id: 0, name: "Efectivo", currency: "USD" },
    { id: 1, name: "Efectivo", currency: "Bs" },
    { id: 2, name: "Transferencia", currency: "Bs" },
    { id: 3, name: "Zelle", currency: "USD" },
  ];
}

function PaymentMethodItem({
  payMethodAsigned,
  idx,
  setPayMethodsAsigned,
}: {
  payMethodAsigned: paymentMethodAsigned;
  idx: number;
  setPayMethodsAsigned: React.Dispatch<React.SetStateAction<paymentMethodAsigned[]>>;
}) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-[var(--color-success)] rounded-full"></div>
        <div>
          <span className="text-white font-medium text-sm">
            {payMethodAsigned.name}
          </span>
          <span className="text-white/60 text-sm ml-2">
            ({payMethodAsigned.currency})
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-white font-semibold">
          ${formatNumber(payMethodAsigned.amount)}
        </span>
        <button
          className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => {
            setPayMethodsAsigned((prev) => prev.filter((_, index) => index !== idx));
          }}
        >
          <IoTrash className="text-red-400 text-lg" />
        </button>
      </div>
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
  const [payMethods] = useState<paymentMethod[]>(returnPayMethods());
  const [payMethodsAsigned, setPayMethodsAsigned] = useState<paymentMethodAsigned[]>([]);
  
  // Estados para los inputs generales
  const [selectedPayMethodId, setSelectedPayMethodId] = useState(0);
  const [isFocused, setIsFocused] = useState<"usd" | "bs" | null>(null);
  const [inputUSD, setInputUSD] = useState("");
  const [inputBs, setInputBs] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0);

  const { generalSellInfo, cartProducts, setCartProducts, asignClient } = useProducts();

  const total = totalPrice(cartProducts);
  const totalPaid = totalMethodsAsignedAmount(payMethodsAsigned);
  const remaining = total - totalPaid;

  // Actualizar inputs cuando cambia el monto actual
  useEffect(() => {
    if (!isFocused) {
      setInputUSD(currentAmount === 0 ? "" : formatNumber(currentAmount));
      setInputBs(currentAmount * dollarPrice === 0 ? "" : formatNumber(currentAmount * dollarPrice));
    }
  }, [currentAmount, dollarPrice, isFocused]);

  const handleAddPaymentMethod = () => {
    if (currentAmount <= 0) {
      alert("Debe ingresar un monto válido");
      return;
    }

    const selectedPayMethod = payMethods.find(pm => pm.id === selectedPayMethodId);
    if (!selectedPayMethod) return;

    setPayMethodsAsigned([
      ...payMethodsAsigned,
      {
        id: selectedPayMethod.id,
        name: selectedPayMethod.name,
        currency: selectedPayMethod.currency,
        amount: currentAmount,
      },
    ]);

    // Limpiar inputs después de agregar
    setCurrentAmount(0);
    setInputUSD("");
    setInputBs("");
  };

  const handleConfirm = () => {
    if (payMethodsAsigned.length === 0) {
      alert("No hay métodos de pago asignados");
      return;
    }
    const invalid = payMethodsAsigned.some((payMethod, idx) => {
      if (payMethod.amount <= 0) {
        alert(
          `El monto asignado para el método de pago número ${idx + 1} (${payMethod.name}, ${payMethod.currency}) no puede ser igual a 0`
        );
        return true;
      }
      return false;
    });
    if (invalid) return;
    if (totalPaid < total) {
      alert("El monto asignado no es suficiente para cubrir el total de la venta");
      return;
    }
    if (totalPaid > total) {
      alert("El monto asignado es mayor al total de la venta");
      return;
    }
    if (dollarPrice === 0) {
      alert("No se pudo obtener el valor del dólar");
      return;
    }
    if (generalSellInfo.idClient === 0 && !confirm("¿Realizar venta sin colocar cliente?")) {
      return;
    }

    const productsSend: productsSend[] = cartProducts.map((p) => ({
      productId: p.productId,
      productQuantity: p.quantity,
      productPrice: p.price,
      productSubtotal: parseFloat((p.quantity * p.price).toFixed(2)),
    }));

    fetch("venta-realizada", {
      method: "POST",
      body: JSON.stringify({
        idClient: generalSellInfo.idClient,
        amount: total,
        payMethods: payMethodsAsigned,
        products: productsSend,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la red: " + response.statusText);
        return response.json();
      })
      .then((data) => {
        setShowConfirmationContainer(false);
        console.log("Venta realizada:", data);
        asignClient(0, "", 0);
        setCartProducts([]);
      })
      .catch((error) => console.error("Error al insertar en ventas:", error));
  };

  if (!showConfirmationContainer) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={() => setShowConfirmationContainer(false)}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-x-0 bottom-12 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50 p-0 sm:p-4">
        <div className="bg-[var(--color-tertiary)] w-full sm:w-[650px] sm:max-w-[90vw] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[80vh]">
          
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 sm:col-span-2">
            <button
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setShowConfirmationContainer(false)}
            >
              <IoClose className="text-2xl text-white/70" />
            </button>
            
            <div className="text-center">
              <p className="text-white/60 text-sm mb-1">Total</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white">
                $ {formatNumber(total)}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                {formatNumber(total * dollarPrice)} Bs (Tasa: {dollarPrice} Bs/$)
              </p>
            </div>

            {/* Client Info */}
            {generalSellInfo.clientName && (
              <div className="mt-4 bg-white/5 rounded-xl px-4 py-2 text-center">
                <span className="text-white/60 text-sm">Cliente: </span>
                <span className="text-white text-sm font-medium">{generalSellInfo.clientName}</span>
              </div>
            )}
          </div>

          {/* Payment Input Section */}
          <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
    
    {/* Columna Izquierda: Inputs (Scrollable en móvil, fijo/scrollable en PC) */}
    <div className="px-6  sm:border-r sm:border-white/5">
      <div className="mb-4">
        <label className="text-white/60 text-sm font-medium block mb-2">Método de pago</label>
        <select
          className="w-full bg-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
          value={selectedPayMethodId}
          onChange={(e) => setSelectedPayMethodId(Number(e.target.value))}
        >
          {payMethods.map((payMethod) => (
            <option key={payMethod.id} value={payMethod.id} className="bg-[var(--color-tertiary)] text-white">
              {payMethod.name} ({payMethod.currency})
            </option>
          ))}
        </select>
      </div>

      {/* Amount Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">

        {/* USD Input */}

        <div className="space-y-1">
          <label className="text-white/60 text-xs font-medium block">Monto USD</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-sm">$</span>
            <input
              className="bg-white/10 text-white text-right pl-6 pr-3 py-3 w-full rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={isFocused === "usd" ? inputUSD : formatNumber(currentAmount)}
              onFocus={() => {
                setIsFocused("usd");
                setInputUSD(currentAmount === 0 ? "" : formatNumber(currentAmount));
              }}

              onBlur={() => setIsFocused(null)}
              onChange={(e) => {
                setInputUSD(e.target.value);
                const value = parseFloat(parseFloat(e.target.value).toFixed(2)) || 0;
                setCurrentAmount(value);
              }}
            />
          </div>
        </div>


        {/* Bs Input */}

        <div className="space-y-1">
          <label className="text-white/60 text-xs font-medium block">Monto Bs</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 text-sm">Bs</span>
            <input
              className="bg-white/10 text-white text-right pl-7 pr-3 py-3 w-full rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={
                isFocused === "bs"
                  ? inputBs
                  : formatNumber(currentAmount * dollarPrice)
              }

              onFocus={() => {
                setIsFocused("bs");
                setInputBs(
                  currentAmount * dollarPrice === 0
                    ? ""
                    : formatNumber(currentAmount * dollarPrice)
                );
              }}

              onBlur={() => setIsFocused(null)}
              onChange={(e) => {
                setInputBs(e.target.value);
                const value = parseFloat(parseFloat(e.target.value).toFixed(2)) || 0;
                setCurrentAmount(value / dollarPrice);
              }}
            />
          </div>
        </div>

            
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 rounded-xl text-white font-medium transition-colors mb-4"
        onClick={handleAddPaymentMethod}
      >
        <IoAdd className="text-xl" />
        <span>Agregar</span>
      </button>
    </div>

    {/* Columna Derecha: Lista de Métodos (Aquí activamos el scroll independiente) */}
    <div className="flex flex-col min-h-0 overflow-hidden">
        <h3 className="text-white/60 text-sm font-medium mb-3 px-6">Métodos agregados</h3>
        <div className="flex-1 overflow-y-auto px-6 space-y-2 mb-4 custom-scrollbar">
          {payMethodsAsigned.length > 0 ? (
            payMethodsAsigned.map((payMethodAsigned, idx) => (
              <PaymentMethodItem
                key={idx}
                payMethodAsigned={payMethodAsigned}
                idx={idx}
                setPayMethodsAsigned={setPayMethodsAsigned}
              />
            ))
          ) : (
            <div className="text-center py-8 text-white/40">
              <p className="text-sm">No hay métodos agregados</p>
            </div>
          )}
        </div>
    </div>
  </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-4 space-y-3 ">
            {/* Remaining Amount */}
            <div className={`flex items-center justify-between px-4 py-3 rounded-xl ${
              remaining === 0 
                ? 'bg-[var(--color-success)]/20 border border-[var(--color-success)]/30' 
                : remaining > 0 
                  ? 'bg-[var(--color-warning)]/20 border border-[var(--color-warning)]/30'
                  : 'bg-[var(--color-danger)]/20 border border-[var(--color-danger)]/30'
            }`}>
              <span className={`text-sm font-medium ${
                remaining === 0 ? 'text-[var(--color-success)]' : remaining > 0 ? 'text-[var(--color-warning)]' : 'text-[var(--color-danger)]'
              }`}>
                Restante:
              </span>
              <span className={`text-lg font-bold ${
                remaining === 0 ? 'text-[var(--color-success)]' : remaining > 0 ? 'text-[var(--color-warning)]' : 'text-[var(--color-danger)]'
              }`}>
                $ {formatNumber(Math.abs(remaining))}
              </span>
            </div>

            {/* Confirm Button */}
            <button
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                remaining === 0 
                  ? 'bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 cursor-pointer' 
                  : 'bg-white/20 cursor-not-allowed'
              }`}
              onClick={handleConfirm}
              disabled={remaining !== 0}
            >
              Confirmar Venta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
