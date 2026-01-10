"use client";

import { LuSearch } from "react-icons/lu";
import { useEffect } from "react";
import { useProducts } from "./productContext";

function SearchInput({
  setShowSearchContainer,
}: {
  setShowSearchContainer: (show: boolean) => void;
}) {
  const { searchProducts, setSearchProducts, setFilteredProducts } =
    useProducts();

  useEffect(() => {
    /* async function fetchProducts() {
      try {
        const response = await fetch("/api/getproducts");
        const products = await response.json();
        setSearchProducts(products);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert("Error al obtener los productos. Por favor, inténtelo de nuevo más tarde.");
      }
    }
    fetchProducts(); */

    const products = [
      {
        sku: 454884,
        image: "/PC.png",
        productId: 158,
        name: "Laptop Lenovo IdeaPad 3",
        description: "Laptop de alto rendimiento para gaming y edición",
        price: 1500.75,
        quantity: 69,
      },
      {
        sku: 77885,
        image: "/PC.png",
        productId: 160,
        name: "Laptop Lenovo IdeaPad 5",
        description: "Laptop de alto rendimiento para gaming y edición",
        price: 1900.75,
        quantity: 80,
      },
      {
        sku: 515118,
        image: "/PC.png",
        productId: 1689,
        name: "Smartphone Samsung Galaxy A55",
        description:
          "Smartphone de serie A, RAM: 8GB, ROM: 128GB, Batería: 5000mA, Pantalla: 6.7 pulgadas, 120hz, Blanco",
        price: 3500.96,
        quantity: 135,
      },
      {
        sku: 454511,
        image: "/PC.png",
        productId: 163,
        name: "Smartphone Samsung Galaxy A20",
        description:
          "Smartphone de serie A, RAM: 3GB, ROM: 32GB, Batería: 4000mA, Pantalla: 6.1 pulgadas, 60hz, Amarillo",
        price: 1200.96,
        quantity: 50,
      },
      {
        sku: 1459959,
        image: "/PC.png",
        productId: 16303,
        name: "Smartphone Samsung Galaxy A10",
        description:
          "Smartphone de serie A, RAM: 2GB, ROM: 32GB, Batería: 3000mA, Pantalla: 5.1 pulgadas, 60hz, Rojo",
        price: 500.01,
        quantity: 5,
      },
      {
        sku: 6554654,
        image: "/PC.png",
        productId: 1334,
        name: "Smartphone Samsung Galaxy A54",
        description:
          "Smartphone de serie A, RAM: 6GB, ROM: 128GB, Batería: 5000mA, Pantalla: 6.5 pulgadas, 120hz, Morado",
        price: 500.01,
        quantity: 5,
      },
      {
        sku: 7878454,
        image: "/PC.png",
        productId: 1479,
        name: "Smartphone Samsung Galaxy A53",
        description:
          "Smartphone de serie A, RAM: 6GB, ROM: 128GB, Batería: 5000mA, Pantalla: 6.2 pulgadas, 120hz, Azul",
        price: 500.01,
        quantity: 5,
      },
      {
        sku: 54544,
        image: "/PC.png",
        productId: 1478,
        name: "Smartphone Samsung Galaxy S24 Ultra",
        description:
          "Smartphone de serie S, RAM: 12GB, ROM: 256GB, Batería: 5000mA, Pantalla: 6.9 pulgadas, 120hz, Morado",
        price: 500.01,
        quantity: 5,
      },
    ];
    setSearchProducts(products);
  }, []);

  return (
    <div className="relative flex justify-center items-center mt-2 gap-2 w-full">
      <LuSearch className="absolute right-[6%] md:right-[12%] lg:right-[12%] xl:right-[16.5%]" />
      <input
        className="bg-white text-2xl text-black font-bold w-95/100 md:w-9/10 xl:w-7/10 h-[50px] p-5 rounded-lg justify-center items-center shadow-xl hover:shadow-2xl hover:placeholder:text-black duration-500"
        type="text"
        id="searchInput"
        placeholder="Buscar producto"
        onClick={() => setShowSearchContainer(true)}
        onChange={(e) => {
          const searchValue = e.target.value.toLowerCase();
          if (searchValue === "") {
            setFilteredProducts([]);
            return;
          }

          const filteredProducts = searchProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(searchValue) ||
              product.sku.toString().includes(searchValue)
          );

          setFilteredProducts(filteredProducts);
        }}
        onBlur={(e) => {
          e.target.value = "";
          const relatedTarget = e.relatedTarget as HTMLElement | null;
          const searchContainer = document.getElementById("searchContainer");
          if (
            searchContainer &&
            relatedTarget &&
            searchContainer.contains(relatedTarget)
          ) {
            return;
          }
          setFilteredProducts([]);
          setShowSearchContainer(false);
        }}
      />
    </div>
  );
}

export default SearchInput;
