"use client";

import { IoTrashOutline, IoCloseCircle } from "react-icons/io5";
import { cartProduct, useProducts } from "./productContext";
import { totalPrice } from "./confirmationContainer";

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
    <div className="flex items-center gap-2 mt-auto mb-2 justify-between px-5">
      <div className="flex justify-center">
        <span className="font-bold text-xl text-globalone">
          Total: {product.totalPrice}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <img
          src="/flechaatras.svg"
          alt=""
          className="w-[35px] h-[35px] flex items-center justify-center hover:cursor-pointer"
          onClick={() => {
            changeQuantity(product, "-");
          }}
        />
        <input
          className="text-globalone w-8 text-center"
          value={product.quantity}
          onChange={(e) => {
            const value = e.target.value;

            if (!/^[0-9]*$/.test(value)) {
              return;
            }
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
            if (value === "") {
              modifyQuantity(product, 1);
            }
            if (product.quantity === 0) {
              modifyQuantity(product, 1);
            }
          }}
        ></input>
        <img
          src="/flechaalante.svg"
          alt=""
          className="w-[35px] h-[35px] hover:cursor-pointer"
          onClick={() => {
            changeQuantity(product, "+");
          }}
        />
      </div>
    </div>
  );
}

export function ClientContainer() {
  const { generalSellInfo } = useProducts();

  return (
    <div className="relative bg-secondary flex sm:justify-center items-center w-95/100 md:w-9/10 lg:w-8/10 xl:w-7/10 h-[55px] sm:h-[35px] px-3 py-1 text-lg rounded-3xl mt-2 sm:mt-2 transition-all duration-300 ease-in-out">
      <img src="/customers.png" alt="" className="absolute sm:static left-[5.2%] h-7 sm:h-9" />
      <span className="text-white ml-3 sm:ml-0.5 md:ml-3 hidden sm:block">Cliente</span>
      <button
        className="flex items-center justify-end sm:justify-center bg-info rounded-2xl sm:rounded-xl sm:rounded-br-sm text-white px-2.5 lg:px-9 sm:ml-1.5 h-11 sm:h-6 w-30 sm:w-auto hover:cursor-pointer"
        onClick={() => {}}
      >
        <span className="hidden sm:block">Seleccionar</span>
        <span className="sm:hidden">Cliente</span>
      </button>
      <div className="flex ml-3 sm:ml-2.5 md:ml-3 items-center text-white w-36/100 sm:w-auto">
        <span className="text-[15px] sm:text-lg text-bold hidden sm:block">Nombre:</span>
        <div className="bg-white text-secondary rounded-xl px-2 w-full sm:w-30 md:w-35 lg:w-50 xl:w-60 flex items-center h-6 sm:ml-2 ">
          {generalSellInfo.clientName}
        </div>
      </div>
      <div className="flex ml-3 sm:ml-1 md:ml-3 items-center text-white w-3/10 sm:w-auto">
        <span className="text-[15px] sm:text-lg text-bold hidden sm:block">C.I:</span>
        <div className="bg-white text-secondary rounded-xl px-2 w-full sm:w-24 md:w-25 lg:w-30 xl:w-40 flex items-center justify-center h-6 sm:ml-2">
          {generalSellInfo.clientIdentification === 0
            ? ""
            : generalSellInfo.clientIdentification}
        </div>
      </div>
      <IoTrashOutline className="relative h-7 w-7 ml-3 sm:ml-1 md:ml-3 hover:cursor-pointer" />
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
          className="flex flex-col h-[70vh] w-95/100 bg-primary rounded-xl text-2xl items-center justify-center transition-all duration-300 ease-in-out"
        >
          <h5>Aún no hay productos</h5>
        </div>
      );
    }

    return (
      <div
        id="cartContainer"
        className="h-full w-99/100 bg-primary rounded-xl flex flex-col items-center transition-all duration-300 ease-in-out"
      >
        <ClientContainer />
        <div className={`w-full overflow-x-hidden min-h-[380px] h-[58.5dvh] max-h-[57dvh] sm:h-full bg-primary justify-center place-items-center gap-1 px-3 md:px-15 lg:px-3 mt-2 pb-6 sm:pb-5 ${cartProducts.length < 4 ? "lg:flex lg:items-center lg:justify-center lg:gap-[2.5dvw] grid grid-cols-1 md:grid-cols-2" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
          {cartProducts.map((product: cartProduct, idx) => (
            <div key={product.productId}>
              <div
                id={product.productId.toString()}
                className={`relative bg-tertiary flex flex-col h-[50dvh] w-[310px] overflow-hidden shadow-xl border-1 border-neutral sm:mt-5.5 rounded-xl ${idx === 0 ? "mt-5" : "mt-8"}`}
              >
                <button
                  className="absolute top-[4px] right-[5px] rounded-xl flex items-center text-danger font-bold text-4xl hover:cursor-pointer"
                  onClick={() => {
                    removeProduct(product.productId);
                  }}
                >
                  <IoCloseCircle />
                </button>
                <img
                  src={product.image}
                  className="mt-4 h-40/100 w-6/10 sm:static self-center mx-3 rounded-2xl"
                  alt=""
                />

                <div className="flex flex-col rounded-lg overflow-hidden mt-2 mx-5">
                  <span className="text-info font-bold text-sm">
                    SKU: <span>{product.sku}</span>
                  </span>
                  <div className="overflow-hidden max-h-[50px] text-md font-bold">
                    <span className="text-globalone">{product.name}</span>
                  </div>
                  <div className="overflow-hidden max-h-[100px] text-sm">
                    <span className="text-globalone">
                      {product.description}
                    </span>
                  </div>
                </div>
                <QuantityContainer product={product} />
              </div>
            </div>
          ))}
        </div>
        <div className="border h-[8.5dvh] flex text-xl justify-between sm:justify-center items-center w-full px-4 self-end">
          <button
            className={`bg-danger rounded-xl flex justify-center items-center py-2 px-5 text-white hover:cursor-pointer ${showConfirmationContainer ? "z-2" : ""}`}
            onClick={() => setCartProducts([])}
          >
            Vaciar
          </button>
          <span className="font-bold text-globalone text-xl mx-3 text-center sm:w-35">
            Total: <br />{totalPrice(cartProducts)}
          </span>
          <button
            className={`bg-success py-2 px-3 rounded-xl flex items-center justify-center text-white hover:cursor-pointer ${showConfirmationContainer ? "z-2" : ""}`}
            onClick={() => setShowConfirmationContainer(true)}
          >
            Confirmar
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error al obtener obtener el carrito", error);
    alert("Error al obtener el carrito");
  }
}

export default CartContainer;
