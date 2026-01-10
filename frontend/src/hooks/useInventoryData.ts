import { useState, useEffect, useMemo } from "react";
import  Product  from "@/types/interface/product";
import {
  filterProducts,
  calculateTotalPages,
  calculateCurrentItems,
  calculatePageNumbers,
} from "@/utils/inventoryUtils";

const ITEMS_PER_PAGE = 9;

export default function useInventoryData(initialProducts: Product[]) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [allSelectedProduct, setAllSelectedProduct] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(
    () => filterProducts(initialProducts, searchTerm),
    [initialProducts, searchTerm]
  );

  const totalPages = calculateTotalPages(filteredProducts, ITEMS_PER_PAGE);
  const currentItems = calculateCurrentItems(filteredProducts, currentPage, ITEMS_PER_PAGE);
  const pageNumbers = useMemo(
    () => calculatePageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const actionsProducts = (item: Product) => {
    setSelectedProduct(item);
    setAllSelectedProduct(
      initialProducts.filter((product) => product.parent_product_id === item.product_id)
    );
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const closeModal = () => setSelectedProduct(null);

  return {
    searchTerm,
    currentPage,
    totalPages,
    currentItems,
    pageNumbers,
    filteredProducts,
    handleSearchChange,
    goToPage,
    selectedProduct,
    setSelectedProduct,
    allSelectedProduct,
    actionsProducts,
    closeModal,
  };
}