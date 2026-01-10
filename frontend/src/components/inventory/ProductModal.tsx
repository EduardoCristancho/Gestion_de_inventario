import Image from "next/image";
import React from "react";
import ImageLaptop from "@/assets/images/laptop.png";
import { Pencil } from "lucide-react";
import { ProductModalProps } from "@/types/interface/productModalProps";

export default function ProductModal({
  selectedProduct,
  setSelectedProduct,
  allSelectedProduct,
}: ProductModalProps) {
  return (
    /* Product Modal Container */
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm mb-10">
      <div className="relative bg-card rounded-xl w-[80%] max-h-[80%] overflow-y-auto shadow-lg p-6">
        {/* Close button */}
        <button
          className="absolute top-2 right-3 text-globalone transition-all duration-100 hover:bg-globalone/20 px-1.5 py-0.2 rounded-md "
          onClick={() => setSelectedProduct(null)}
        >
          ✕
        </button>
        {/*  Product Information*/}
        <div className="relative flex flex-col items-center justify-center ">
          <Image
            src={ImageLaptop}
            alt="Product"
            className=" h-[150px] md:h-[300px] max-w-[60%] md:max-w-[50%] mt-4 rounded-xl mb-3"
          />
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-secondary mb-1">
                <strong>SKU:</strong> {selectedProduct.sku}
              </p>
              <h2 className="text-sm font-bold ml-3 mb-2 text-globaltwo">
                {selectedProduct.name}
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-normal text-globaltwo">
                <strong>Costo</strong>
              </p>
              <p className="text-3xl font-bold text-globalsecond">
                {"$" + selectedProduct.cost}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-normal text-globaltwo">
                <strong>Precio</strong>
              </p>
              <p className="text-3xl font-bold text-globalsecond">
                {"$" + selectedProduct.price}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            <p className="text-sm text-globaltwo mb-1">
              <strong>Descripcion:</strong>
            </p>
            <p className="text-sm text-globalsecond font-semibold mb-1">
              {selectedProduct.description}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="flex items-center justify-center gap-1.5 text-2xl text-secondary mb-1 font-bold">
              {selectedProduct.quantity}{" "}
              <strong className="text-sm"> Disponible</strong>
            </p>
          </div>
        </div>
        {/* Product Models*/}
        <div className="flex-1 overflow-auto max-h-[100%]">
          <h2 className="text-2xl text-center font-bold text-globaltwo my-2">
            MODELOS
          </h2>
          {allSelectedProduct.length > 0 ? (
            allSelectedProduct.map((item, index) => (
              <div key={index} className="p-4  bg-primary">
                <div className="grid grid-cols-7 items-center justify-center bg-boxone rounded-md p-1.5 text-globalone cursor-pointer transition-all duration-150 hover:brightness-105 hover:scale-[103%] m-2">
                  <Image
                    src={ImageLaptop}
                    alt="Product"
                    width={48}
                    height={48}
                    className="object-cover col-span-2"
                  />

                  <div className="flex flex-col items-center justify-center gap-2 col-span-2">
                    <span className="text-xs font-semibold text-secondary">
                      SKU: {item.sku}
                    </span>
                    <span className="ml-1 text-xs font-semibold">
                      Modelo: {item.name}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 col-span-2">
                    <p className=" text-globalsecond text-md text-center font-semibold">
                      <span className="text-sm text-globalone">Disponible</span>{" "}
                      {item.status === "disponible" ? item.quantity : 0}
                    </p>
                    {item.quantity === 0 && (
                      <p className=" text-globalone text-sm px-3 border border-white rounded-2xl bg-danger  text-center">
                        Agotado
                      </p>
                    )}
                  </div>
                  <button className="rounded-md cursor-pointer p-1 hover:bg-globalinverse mx-auto">
                    <Pencil size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 p-8 text-globaltwo">
              <p>Este producto no tiene modelos asociados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
