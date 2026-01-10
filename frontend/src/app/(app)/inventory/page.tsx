"use client";

import { products } from "@/data/productsData";

import useInventoryData from "@/hooks/useInventoryData";
import Pagination from "@/components/inventory/Pagination";

import ProductModal from "@/components/inventory/ProductModal";
import { InventoryOperations } from "@/components/inventory/InventoryOperations";
import SearchAndAddInventory from "@/components/inventory/SearchAndAddInventory";
import InventoryItems from "@/components/inventory/InventoryItems";

export default function Inventory() {
  const {
    currentPage,
    totalPages,
    currentItems,
    pageNumbers,
    filteredProducts,
    goToPage,
    actionsProducts,
    selectedProduct,
    allSelectedProduct,
    setSelectedProduct,
  } = useInventoryData(products);

  return (
    <div className="flex flex-col items-center justify-center flex-grow min-h-[calc(100vh-160px)]  w-full mx-auto bg-primary">
      {/* Search and Add */}
      <SearchAndAddInventory />

      {/* Inventory Items */}
      <InventoryItems
        currentItems={currentItems}
        actionsProducts={actionsProducts}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        goToPage={goToPage}
        filteredProducts={filteredProducts}
        itemsPerPage={9}
      />

      {/* Inventory Operations */}
      <InventoryOperations />

      {/* ProductModal */}
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          allSelectedProduct={allSelectedProduct}
        />
      )}
    </div>
  );
}
