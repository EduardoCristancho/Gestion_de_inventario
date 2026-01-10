"use client";

import { useProducts } from "./productContext";

function SearchContainer({showSearchContainer, setShowSearchContainer}: {showSearchContainer: boolean, setShowSearchContainer: (show: boolean) => void}) {
  
  const { filteredProducts, setFilteredProducts, addProduct } = useProducts();

  if ( filteredProducts.length === 0 ){
    return (
      <div
        id="searchContainer"
        className={`absolute flex flex-col w-95/100 md:w-9/10 xl:w-7/10 top-[60px] md:top-[62px] bg-primary overflow-y-auto rounded-md gap-1 transition-all z-2 text-globalone overflow-hidden ${showSearchContainer ? " h-[72dvh] border-neutral-400 border-2" : "h-0" }`}
      >
        <div className="flex items-center justify-center h-full">
          <span className="text-xl text-globalone">No hay productos disponibles</span>
        </div>
      </div>
    )
  }

  return (
    <div
      id="searchContainer"
      className={`absolute flex flex-col w-95/100 md:w-8/10 xl:w-7/10 top-[60px] md:top-[62px] bg-primary overflow-y-auto rounded-md gap-1 transition-all z-2 text-globalone overflow-x-hidden ${showSearchContainer ? " h-[65vh] sm:h-[70vh] border-neutral-400 border-2" : "h-0 overflow-hidden" }`}
    >
      {filteredProducts.map((product) => (
        <div key={product.sku}>
          <div
            className="flex w-full ml-2 overflow-hidden py-3 text-globalone hover:cursor-pointer items-center"
            tabIndex={0}
            onClick={() => {
              addProduct(product);
              setShowSearchContainer(false);
              const searchInput = document.getElementById("searchInput") as HTMLInputElement;
              if (!searchInput) {
                alert("No se encontró el input de búsqueda");
                return;
              }
              searchInput.value = "";
              setFilteredProducts([]);
            }}
          >
            <img src={`${product.image}`} alt="" className="h-25 rounded-2xl" />
            <div>
            <div className="flex overflow-hidden h-[35px] pt-1 px-2 text-xl">
              <span>
                SKU: {product.sku}. {product.name}
              </span>
            </div>
            <div className="overflow-hidden max-h-[70px] px-2 mb-2">
              <span>{product.description}</span>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

function closeSearchContainer() {
  const searchContainer = document.getElementById(
    "searchContainer"
  ) as HTMLDivElement;
  searchContainer.classList.remove("h-[calc(100vh-211px)]");
  searchContainer.classList.add("h-0");
  setTimeout(() => {
    searchContainer.classList.add("hidden");
  }, 700);
}

export default SearchContainer;
