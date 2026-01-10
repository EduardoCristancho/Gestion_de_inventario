import Product from "@/types/interface/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: number[];
  goToPage: (page: number) => void;
  filteredProducts: Product[];
  itemsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageNumbers,
  goToPage,
  filteredProducts,
  itemsPerPage,
}: PaginationProps) {
  return (
    <>
      {filteredProducts.length > 0 && (
        <div className="flex justify-center items-center py-2 bg-primary border-t">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-6 h-6 flex items-center justify-center text-cyan-500 border border-cyan-500 rounded-full mr-2 cursor-pointer transition-transform duration-200  hover:scale-125 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-6 h-6 mx-1 cursor-pointer rounded-full flex items-center justify-center text-xs transition-transform duration-150  hover:scale-125 ${
                currentPage === page
                  ? "bg-cyan-500 text-white"
                  : "text-globalone"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-6 h-6 flex items-center justify-center text-cyan-500 border border-cyan-500 rounded-full ml-2 cursor-pointer transition-transform duration-200  hover:scale-125 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="text-center text-xs text-globalone bg-primary pb-2 pt-2">
          Mostrando {Math.min(itemsPerPage, filteredProducts.length)} de{" "}
          {filteredProducts.length} productos
        </div>
      )}
    </>
  );
}
