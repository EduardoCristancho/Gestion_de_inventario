import useInventoryData from "@/hooks/useInventoryData";
import Link from "next/link";
import React from "react";
import { products } from "@/data/productsData";
import { Plus, Search } from "lucide-react";

export default function SearchAndAddInventory() {
  const { searchTerm, handleSearchChange } = useInventoryData(products);
  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-1 items-center px-3 py-2 bg-boxone border rounded-md">
          <input
            type="text"
            placeholder="Nombre o código"
            className="w-56 sm:w-72 md:w-96 outline-none text-sm text-globalone"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search size={18} className="text-gray-400" />
        </div>
        <Link
          href="/dashboard/add"
          className="flex items-center justify-center w-8 h-8 text-globalone bg-buttonplus transition-all duration-300ms hover:opacity-80 hover:scale-110 rounded-full"
        >
          <Plus size={20} />
        </Link>
      </div>
    </div>
  );
}
