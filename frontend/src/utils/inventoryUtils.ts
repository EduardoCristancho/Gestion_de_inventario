import  Product  from "@/types/interface/product";

export const filterProducts = (products: Product[], searchTerm: string) => {
  let result = products.filter((product) => product.parent_product_id === null);
  
  if (searchTerm) {
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.includes(searchTerm)
    );
  }
  
  return result;
};

export const calculateTotalPages = (filteredProducts: Product[], itemsPerPage: number) =>
  Math.ceil(filteredProducts.length / itemsPerPage);

export const calculateCurrentItems = (
  filteredProducts: Product[],
  currentPage: number,
  itemsPerPage: number
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
};

export const calculatePageNumbers = (currentPage: number, totalPages: number) => {
  const maxVisiblePages = 5;
  const pages = [];
  
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) pages.push(i);
  }
  
  return pages;
};