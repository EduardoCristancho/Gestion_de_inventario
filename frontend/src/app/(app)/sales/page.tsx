"use client";

import { useState } from "react";
import { ProductsProvider } from "./productContext";
import SearchInput from "./searchInput";
import SearchContainer from "./searchContainer";
import CartContainer from "./cartContainer";
import ConfirmationContainer from "./confirmationContainer";

function Ventas() {

  const [ShowConfirmationContainer, setShowConfirmationContainer] = useState(false)
  const [showSearchContainer, setShowSearchContainer] = useState(false)

  return (
    <ProductsProvider>
      <div
        className={`relative border flex flex-col items-center place-content-between bg-primary min-w-[380px] min-h-[500px] h-[83.5dvh] sm:h-[81.5dvh] transition-all duration-300 ease-in-out overflow-x-hidden sm:overflow-auto ${ShowConfirmationContainer ? "pointer-events-none blur-sm" : "pointer-events-auto"}`}
      >
        <SearchInput setShowSearchContainer={setShowSearchContainer} />
        <SearchContainer showSearchContainer={showSearchContainer}  setShowSearchContainer={setShowSearchContainer} />
        <CartContainer setShowConfirmationContainer={setShowConfirmationContainer} showConfirmationContainer={ShowConfirmationContainer}/>
      </div>
      <ConfirmationContainer showConfirmationContainer={ShowConfirmationContainer} setShowConfirmationContainer={setShowConfirmationContainer} />
    </ProductsProvider>
  );
}

export default Ventas;