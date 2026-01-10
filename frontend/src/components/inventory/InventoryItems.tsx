import React from "react";

import Image from "next/image";

import ImageLaptop from "@/assets/images/laptop.png";
import Product from "@/types/interface/product";
import ProductItemDetails from "./ProductItemDetails";

export default function InventoryItems({
  currentItems,
  actionsProducts,
}: {
  currentItems: Product[];
  actionsProducts: (item: Product) => void;
}) {
  return (
    <div className="bg-primary grid sm:grid-cols-2 pb-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  mt-4 ">
      {currentItems.length > 0 ? (
        currentItems.map((item, index) => (
          <div
            key={index}
            className="p-2 items-center justify-center mx-auto bg-primary "
            onClick={() => actionsProducts(item)}
          >
            <div className="grid grid-cols-1 justify-center items-center bg-boxone rounded-md p-1.5 text-globalone cursor-pointer transition-opacity duration-150 hover:opacity-80 w-60 h-60">
              <div className="mx-auto  bg-gray-200 rounded-md overflow-hidden">
                <Image
                  src={ImageLaptop}
                  alt="Product"
                  className=" w-40 h-20 object-fill"
                />
              </div>
              <ProductItemDetails item={item} />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-40 p-8 text-globalone">
          <p>No se encontraron productos</p>
        </div>
      )}
    </div>
  );
}
