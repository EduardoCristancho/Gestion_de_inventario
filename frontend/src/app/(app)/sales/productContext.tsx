"use client";

import { createContext, useContext, useState } from "react";

export interface searchProduct {
  sku: number;
  image: string;
  productId: number;
  description: string;
  name: string;
  price: number;
  quantity: number;
}

export interface cartProduct {
  sku: number;
  image: string;
  productId: number;
  name: string;
  description: string;
  price: number;  
  quantityMax: number;
  quantity: number;
  totalPrice: number;
}

export interface generalSellInfo {
  idClient: number;
  clientName: string;
  clientIdentification: number;
}

interface productContextType {
  searchProducts: searchProduct[];
  setSearchProducts: (products: searchProduct[]) => void;
  filteredProducts: searchProduct[];
  setFilteredProducts: (products: searchProduct[]) => void;
  cartProducts: cartProduct[];
  setCartProducts: (products: cartProduct[]) => void;
  addProduct: (product: searchProduct) => void;
  modifyQuantity: (product: cartProduct, quantity: number) => void;
  removeProduct: (variantId: number) => void;
  generalSellInfo: generalSellInfo;
  asignClient: (
    idClient: number,
    clientName: string,
    clientLastName: string, 
    clientIdentification: number,
  ) => void;
}

const ProductContext = createContext<productContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    console.log("useProducts must be used within a ProductsProvider");
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [searchProducts, setSearchProducts] = useState<searchProduct[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<searchProduct[]>([]);

  const [cartProducts, setCartProducts] = useState<cartProduct[]>([])

  const addProduct = (product: searchProduct) => {

    const productExists = cartProducts.some((cartProduct) => cartProduct.productId === product.productId);

    if (productExists) {
        alert("El producto ya está registrado en el carrito.");
        return;
    }

    setCartProducts([
      ...cartProducts,
      {
        sku: product.sku,
        image: product.image,
        productId: product.productId,
        name: product.name,
        description: product.description,
        price: product.price,
        quantityMax: product.quantity,
        quantity: 1, 
        totalPrice: product.price,
      },
    ]);
  };

  const modifyQuantity = (producto: cartProduct, newQuantity: number) => {
    const updatedProducts = cartProducts.map((product) => {
      if (product.productId === producto.productId) {
        return {
          ...product,
          quantity: newQuantity,
          totalPrice: parseFloat((product.price * newQuantity).toFixed(2)),
        };
      }
      return product;
    });
    setCartProducts(updatedProducts);
  };

  function removeProduct(productId: number) {
    setCartProducts(cartProducts.filter((product) => product.productId !== productId));
  }

  const [generalSellInfo, setGeneralSellInfo] = useState<generalSellInfo>({
    idClient: 0,
    clientName: "",
    clientIdentification: 0,
  });

  const asignClient = (
    idClient: number,
    clientName: string,
    clientLastName: string, 
    clientIdentification: number,
  ) => {
    setGeneralSellInfo({
      ...generalSellInfo,
      idClient: idClient,
      clientName: `${clientName} ${clientLastName}`,
      clientIdentification: clientIdentification,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        searchProducts,
        setSearchProducts,
        filteredProducts, 
        setFilteredProducts,
        cartProducts,
        setCartProducts,
        addProduct,
        modifyQuantity,
        removeProduct,
        generalSellInfo,
        asignClient,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
