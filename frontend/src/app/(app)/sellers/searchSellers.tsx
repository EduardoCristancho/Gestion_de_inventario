"use client";

import { LuSearch } from "react-icons/lu";
import { seller } from "./page";

function searchSellers({sellers, setFilteredSellers}: {sellers: seller[], setFilteredSellers: (sellers: seller[]) => void}) {
  return (
    <div className="relative flex justify-center items-center mt-2 gap-2 w-full">
      <LuSearch className="absolute right-[6%] md:right-[12%] lg:right-[12%] xl:right-[16.5%]" />
      <input
        className="bg-white text-2xl text-black font-bold w-95/100 md:w-9/10 xl:w-7/10 h-[50px] p-5 rounded-lg justify-center items-center shadow-xl hover:shadow-2xl hover:placeholder:text-black duration-500"
        type="text"
        placeholder="Buscar Vendedor"
        onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = sellers.filter((seller) =>
                seller.username.toLowerCase().includes(searchTerm) ||
                seller.rol.toLowerCase().includes(searchTerm) ||
                seller.warehouse.toLowerCase().includes(searchTerm)
            );
            setFilteredSellers(filtered);
        }}
      />
    </div>
  )
}

export default searchSellers
