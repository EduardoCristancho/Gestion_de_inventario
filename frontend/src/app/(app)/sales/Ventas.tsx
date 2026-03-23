"use client";

import { useState } from "react";
import { ProductsProvider, useProducts } from "./productContext";
import SearchInput from "./searchInput";
import SearchContainer from "./searchContainer";
import CartContainer from "./cartContainer";
import ConfirmationContainer from "./confirmationContainer";
import FindClient from "@/components/sale/findClient";

function Ventas() {

  const [ShowConfirmationContainer, setShowConfirmationContainer] = useState(false)
  const [showSearchContainer, setShowSearchContainer] = useState(false)
  const {displayFindClient,setDisplayFindClient} = useProducts();

  return (
    <>
      <div
        className={`relative h-full flex flex-col items-center gap-2 transition-all duration-300 ease-in-out ${ShowConfirmationContainer ? "pointer-events-none blur-sm" : "pointer-events-auto"}`}
      >
      
        <SearchInput setShowSearchContainer={setShowSearchContainer} />
        <SearchContainer showSearchContainer={showSearchContainer}  setShowSearchContainer={setShowSearchContainer} />
        <CartContainer setShowConfirmationContainer={setShowConfirmationContainer} showConfirmationContainer={ShowConfirmationContainer}/>
        
      </div>
      {
              displayFindClient && (
                <div className="fixed inset-0 z-100  opacity-100  backdrop-blur-sm   flex items-center justify-center ">
                  <FindClient  setDisplayFindClient={setDisplayFindClient} />
                </div>
              )
      }
      <ConfirmationContainer showConfirmationContainer={ShowConfirmationContainer} setShowConfirmationContainer={setShowConfirmationContainer} />
  </>
  );
  
}

export default Ventas;