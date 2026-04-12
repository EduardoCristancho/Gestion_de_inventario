"use client";

import { useProducts } from "./productContext";
import { Package } from "lucide-react";
import {showToast} from  "nextjs-toast-notify"

function SearchContainer({showSearchContainer, setShowSearchContainer}: {showSearchContainer: boolean, setShowSearchContainer: (show: boolean) => void}) {
  
  const { filteredProducts, setFilteredProducts, addProduct } = useProducts();

  if ( filteredProducts.length === 0 ){
    return (
      <div
        id="searchContainer"
        className={`absolute flex flex-col w-95/100 md:w-9/10 xl:w-7/10 top-[60px] md:top-[62px] bg-quaternary backdrop-blur-md rounded-xl shadow-xl border border-white/10 transition-all duration-300 z-20 overflow-hidden ${
          showSearchContainer ? "max-h-[200px] py-8" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-3 text-white/60">
          <Package className="w-12 h-12" strokeWidth={1.5} />
          <span className="text-sm font-medium">No hay productos disponibles</span>
        </div>
      </div>
    )
  }

  return (
    <div
      id="searchContainer"
      className={`absolute flex flex-col w-95/100 md:w-9/10 xl:w-7/10 top-[60px] md:top-[62px] bg-quaternary  rounded-xl shadow-xl border border-white/10 transition-all duration-300 z-20 overflow-hidden ${
        showSearchContainer ? "max-h-[65vh] sm:max-h-[70vh]" : "max-h-0"
      }`}
    >
      <div className="overflow-y-auto overflow-x-hidden">
        {
        filteredProducts.map((product, index) => (
          <div key={product.sku}>
            <div
              className={`flex flex-col sm:flex-row gap-3 p-3 hover:bg-white/5 transition-colors cursor-pointer ${
                index === 0 ? 'rounded-t-xl' : ''
              }`}
              tabIndex={0}
              onClick={() => {
                //validamos que el producto tenga stock suficiente
                if(product.stock < 1){
                  showToast.info("Solo se pueden agregar productos con stock disponible.", {
                    duration: 5000,
                    progress: true,
                    position: "top-center",
                    transition: "bounceIn",
                    sound: true,
                  })
                  setShowSearchContainer(false);
                  setFilteredProducts([]);
                  return;
                }
                addProduct(product);
                setShowSearchContainer(false);
                const searchInput = document.getElementById("searchInput") as HTMLInputElement;
                if (searchInput) {
                  searchInput.value = "";
                  setFilteredProducts([]);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  addProduct(product);
                  setShowSearchContainer(false);
                  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
                  if (searchInput) {
                    searchInput.value = "";
                    setFilteredProducts([]);
                  }
                }
              }}
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-full h-32 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-quaternary/20 ring-1 ring-white/10">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 
                    className="text-white font-semibold text-sm sm:text-base line-clamp-2 sm:line-clamp-1"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <span className="flex-shrink-0 text-[var(--color-info)] text-xs font-medium bg-[var(--color-info)]/10 px-2 py-1 rounded-md whitespace-nowrap">
                    SKU: {product.sku}
                  </span>
                </div>
                <p className="text-white/60 text-xs sm:text-sm line-clamp-2 mb-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-white/50">Precio:</span>
                    <span className="text-[var(--color-success)] font-semibold">${product.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-white/50">Stock:</span>
                    <span className={`font-semibold ${
                      product.stock > 10 ? 'text-[var(--color-success)]' : 
                      product.stock > 5 ? 'text-[var(--color-warning)]' : 
                      'text-[var(--color-danger)]'
                    }`}>
                      {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            {index < filteredProducts.length - 1 && (
              <div className="mx-3 border-b border-white/10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchContainer;
