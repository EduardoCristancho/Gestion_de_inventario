"use client";

import { LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useProducts } from "./productContext";
import { LuNotebookTabs } from "react-icons/lu";
import { CiBarcode } from "react-icons/ci";
import Link from "next/link";
import CodeScanner from "@/components/codeScanner";
import { includes, string } from "zod";
import { checkCameraAvailability } from "@/hooks/checkCamara";
function SearchInput({
  setShowSearchContainer,
}: {
  setShowSearchContainer: (show: boolean) => void;
}) {
  const { searchProducts, setSearchProducts, setFilteredProducts } =
    useProducts();
  const [showScan,setShowScan] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [hasCamara, setHasCamara] = useState<boolean>(false)
  
  //verificamos que el dispositivo sea compatible con la opcion de scanear
  useEffect(()=>{
    const hasCamara = (async ()=>{
      const isCamaraAvailable = await checkCameraAvailability();
      if(isCamaraAvailable){
        setHasCamara(true)
      }else{
        setHasCamara(false);
      }
    })

    hasCamara();
  },[])


  useEffect(() => {
    if (!query.trim() && !code.trim()) {
      setFilteredProducts([]);
      return
    }

  // 1. Establecemos el timer para el "Debounce"
  const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(`/api/inventory/models?modelName=${query}&sku=${code}`,
          {
            method: "GET",
            credentials: "include"
          }
        );
        //mostramos el contenedor despues de haber escaneado el codigo con la camara
        if(showScan == false && code.trim() != ""){
          setShowSearchContainer(true);
        }

        const products = await response.json();
        //asignamos la data al state
        setFilteredProducts(products.data.map((product: any)=>{ return {
            sku: product.sku,
            image: '/noimage',
            productId: product.model_product_id,
            description: product.description,
            name: product.name,
            price: parseInt(product.price),
            stock: parseInt(product.stock)
        } }));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert("Error al obtener los productos. Por favor, inténtelo de nuevo más tarde.");
      }
  }, 400); // 400ms es el "sweet spot" entre velocidad y ahorro de recursos

  // 3. Limpiamos el timer si el usuario sigue escribiendo
  return () => clearTimeout(delayDebounceFn);

  }, [code, query]);


  return (
    <div className="relative flex justify-center items-center mt-2 gap-2 w-full">
        {/*Notebook Icon */}
        <Link href="/sales/salesRecords" className="absolute md:left-20 left-[2%] md:left-[10%] text-globalone">
          <LuNotebookTabs className="size-10 hover:size-11 transition-all duration-[200ms]" />
        </Link>
        
      <LuSearch className="absolute right-[18%] md:right-[12%] lg:right-[12%] xl:right-[16.5%]" />
      <input
        className="bg-white text-2xl text-black font-bold w-70/100 md:w-9/10 xl:w-7/10 h-[50px] p-5 rounded-lg justify-center items-center shadow-xl hover:shadow-2xl hover:placeholder:text-black duration-500"
        type="text"
        id="searchInput"
        placeholder="Buscar producto"
        value={query}
        onClick={() => setShowSearchContainer(true)}
        onChange={(e) => {
          const searchValue = e.target.value.toLowerCase();
          setQuery(searchValue);
          
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

      {/**Barcode Icon*/}
      {hasCamara && (
        <button className="absolute text-globalone right-[2%] md:right-[10%]" onClick={()=>{setShowScan(true)}} >
          <CiBarcode className="size-10" />
        </ button>
      )}
      {showScan && hasCamara && (
        <CodeScanner setValue={setCode} setClosed={setShowScan}/>
      )}
    </div>
    
  );
}

export default SearchInput;
