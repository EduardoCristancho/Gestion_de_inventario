"use client";

import { IoTrashOutline, IoCloseCircleSharp} from "react-icons/io5";
import { cartProduct, useProducts } from "./productContext";
import { totalPrice } from "./confirmationContainer";
import TextExpandable from "@/components/TextExpandable";


function QuantityContainer({ product }: { product: cartProduct }) {
  const { modifyQuantity } = useProducts();

  function changeQuantity(product: cartProduct, sign: string) {
    const newQuantity =
      sign === "+" ? product.quantity + 1 : product.quantity - 1;
    if (newQuantity > product.quantityMax) {
      return;
    }
    if (newQuantity < 1) {
      return;
    }
    modifyQuantity(product, newQuantity);
  }
  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-white/10">
      <div className="flex flex-col">
        <span className="text-globalone/60 text-xs font-medium">Total</span>
        <span className="font-bold text-lg text-[var(--color-success)]">
          ${product.totalPrice}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-white/10 rounded-lg px-2 py-1">
        <button
          className="p-1 hover:bg-white/10 rounded transition-colors"
          onClick={() => changeQuantity(product, "-")}
        >
          <img
            src="/flechaatras.svg"
            alt="Disminuir"
            className="w-6 h-6"
          />
        </button>
        <input
          className="bg-transparent text-globalone w-10 text-center font-semibold focus:outline-none"
          value={product.quantity}
          onChange={(e) => {
            const value = e.target.value;
            if (!/^[0-9]*$/.test(value)) return;
            if (value === "" || /^[0-9]*$/.test(value)) {
              modifyQuantity(product, value === "" ? 0 : parseInt(value, 10));
            }
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue) && parsedValue > 0) {
              modifyQuantity(
                product,
                parsedValue > product.quantityMax
                  ? product.quantityMax
                  : parsedValue
              );
            }
          }}
          onBlur={(e) => {
            const value = e.target.value;
            if (value === "" || product.quantity === 0) {
              modifyQuantity(product, 1);
            }
          }}
        />
        <button
          className="p-1 hover:bg-white/10 rounded transition-colors"
          onClick={() => changeQuantity(product, "+")}
        >
          <img
            src="/flechaalante.svg"
            alt="Aumentar"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
}

export function ClientContainer() {
  const { generalSellInfo, setDisplayFindClient,asignClient} = useProducts();
  //Si el id es diferente de 0 el cliente existe y es valido
  const hasClient = generalSellInfo.idClient != 0 ? true : false ;

  return (
      <div className={`
        bg-secondary flex items-center px-4 py-3 rounded-3xl mt-2 
        transition-all duration-300 ease-in-out text-lg
        ${hasClient 
          ? 'w-full max-w-2xl  mx-auto' // Se expande hasta 896px y se centra
          : 'max-w-xs gap-2  mx-auto' // Se queda pequeño y centrado
        }
      `}>
      
      {/* Icon */}
      <div className="flex-shrink-0">
        <img src="/customers.png" alt="Cliente" className="h-6 w-6 sm:h-7 sm:w-7" />
      </div>

      {/* Label - Hidden on mobile, only show when no client */}
      {!hasClient && (
        <span className="text-white ml-2 block flex-shrink-0 text-base">Cliente</span>
      )}

      {/* Select Button */}
      <button
        className={`flex items-center justify-center bg-info rounded-xl text-white px-3 py-1 hover:cursor-pointer transition-all hover:bg-info/90 flex-shrink-0 ${
          hasClient ? 'ml-2 sm:ml-3' : 'ml-auto sm:ml-3'
        }`}
        onClick={() => setDisplayFindClient(true)}
      >
        <span className="text-sm sm:text-base whitespace-nowrap">
          {hasClient ? "Cambiar" : "Seleccionar"}
        </span>
      </button>

      {/* Client Info - Only show if client is selected */}
      {hasClient && (
        <>
          {/* Name Field */}
          <div className="flex items-center text-white ml-2 sm:ml-3 min-w-0 flex-1">
            <span className="text-sm sm:text-base font-medium hidden sm:block flex-shrink-0 mr-2">
              Nombre:
            </span>
            <div className="bg-white text-secondary rounded-lg px-2 py-1 flex items-center min-w-0 flex-1 max-w-[120px] sm:max-w-[200px] lg:max-w-[250px]">
              <span className="text-xs sm:text-sm truncate">
                {generalSellInfo.clientName}
              </span>
            </div>
          </div>

          {/* ID Field */}
          <div className="flex items-center text-white ml-2 sm:ml-3 flex-shrink-0">
            <span className="text-sm sm:text-base font-medium hidden sm:block mr-2">
              C.I:
            </span>
            <div className="bg-white text-secondary rounded-lg px-2 py-1 flex items-center justify-center min-w-[60px] sm:min-w-[80px]">
              <span className="text-xs sm:text-sm">
                {generalSellInfo.clientIdentification || ""}
              </span>
            </div>
          </div>

          {/* Delete Button */}
          <div className="flex-shrink-0 ml-2 sm:ml-3" onClick={()=> asignClient(0,'',0)}>
            <IoTrashOutline className="h-5 w-5 sm:h-6 sm:w-6 text-white hover:cursor-pointer hover:text-red-300 transition-colors" />
          </div>
        </>
      )}
    </div>
  );
}

function CartContainer({
  setShowConfirmationContainer, showConfirmationContainer,
}: {
  setShowConfirmationContainer: (value: boolean) => void;
  showConfirmationContainer: boolean;
}) {
  try {
    const { cartProducts, removeProduct, setCartProducts } = useProducts();

    if (cartProducts.length === 0) {
      return (
        <div
          id="cartContainer"
          className="flex flex-col h-full w-full bg-primary rounded-xl items-center justify-center transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-center gap-4 text-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h5 className="text-xl font-medium">Carrito vacío</h5>
            <p className="text-sm">Agrega productos para comenzar una venta</p>
          </div>
        </div>
      );
    }

    return (
      <div
        id="cartContainer"
        className="relative h-full w-full bg-primary rounded-xl flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
      >
        <ClientContainer />
        
        {/* Products Grid */}
        <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 pb-20 md:pb-4">
          <div className={`
            grid gap-3 md:gap-4
            ${cartProducts.length === 1 ? 'grid-cols-1 place-items-center' : ''}
            ${cartProducts.length === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
            ${cartProducts.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
            ${cartProducts.length >= 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}
          `}>
            {cartProducts.map((product: cartProduct) => (
              <div
                key={product.productId}
                id={product.productId.toString()}
                className="relative bg-tertiary rounded-xl border border-neutral-700 shadow-sm hover:shadow-md transition flex flex-col overflow-hidden max-w-sm mx-auto w-full"
              >
                {/* Delete Button */}
                <button
                  className="absolute top-2 right-2 z-10 p-1 bg-black/20 hover:bg-black/40 rounded-lg transition-colors"
                  onClick={() => removeProduct(product.productId)}
                >
                  <IoCloseCircleSharp className="text-danger text-2xl" />
                </button>

                {/* Product Image - Same for mobile and desktop */}
                <div className="w-full h-36 rounded-xl overflow-hidden ring-1 ring-black/5 mt-3 mx-auto px-3">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover rounded-xl"
                    alt={product.name}
                  />
                </div>

                {/* Product Info - Same layout for mobile and desktop */}
                <div className="p-3 pt-2">
                  <div className="grid grid-cols-12 gap-2 text-xs md:text-sm w-full">
                    <div className="col-span-12 min-w-0">
                      <div className="font-semibold text-sm md:text-lg text-secondary/80">
                        <TextExpandable texto={product.name} lineas={1} />
                      </div>
                    </div>
                    <div className="col-span-8 min-w-0">
                      <div className="font-medium text-gray-400 mb-1">Descripción</div>
                      <div className="text-globalone">
                        <TextExpandable texto={product.description} lineas={2} />
                      </div>
                    </div>
                    <div className="col-span-4 min-w-0">
                      <div className="font-medium text-gray-400 text-center">Stock</div>
                      <div className="text-secondary bg-quaternary/40 rounded-full font-semibold text-center text-sm md:text-md">
                        {product.quantityMax}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls */}
                <QuantityContainer product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions - Desktop: Full buttons */}
        <div className="hidden md:flex border-t border-white/10 bg-tertiary/50 backdrop-blur-sm px-4 py-3 gap-3 items-center justify-between">
          <button
            className="bg-[var(--color-danger)] hover:bg-[var(--color-danger)]/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            onClick={() => setCartProducts([])}
          >
            Vaciar carrito
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-xs font-medium">Total a pagar</span>
            <span className="text-[var(--color-success)] text-2xl font-bold">
              ${totalPrice(cartProducts)}
            </span>
          </div>

          <button
            className="bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            onClick={() => setShowConfirmationContainer(true)}
          >
            Confirmar venta
          </button>
        </div>

        {/* Footer Actions - Mobile: Compact bar with icons */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-tertiary/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between z-30 ">
          {/* Vaciar button - Icon only */}
          <button
            className="flex items-center justify-center w-12 h-12 bg-[var(--color-danger)]/20 hover:bg-[var(--color-danger)]/30 rounded-xl transition-colors"
            onClick={() => setCartProducts([])}
            title="Vaciar carrito"
          >
            <IoTrashOutline className="text-[var(--color-danger)] text-2xl" />
          </button>

          {/* Total - Center */}
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-[10px] font-medium">Total</span>
            <span className="text-[var(--color-success)] text-xl font-bold">
              ${totalPrice(cartProducts)}
            </span>
          </div>

          {/* Confirmar button - Icon only */}
          <button
            className="flex items-center justify-center w-12 h-12 bg-[var(--color-success)]/20 hover:bg-[var(--color-success)]/30 rounded-xl transition-colors"
            onClick={() => setShowConfirmationContainer(true)}
            title="Confirmar venta"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--color-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    alert("Error al obtener el carrito");
  }
}

export default CartContainer;
