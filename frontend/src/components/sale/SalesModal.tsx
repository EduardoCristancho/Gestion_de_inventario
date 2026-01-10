import { useContext, useEffect, useRef, useState } from "react";
import { saleIdContext } from "@/app/(app)/sales/salesRecords/page";
import LoadingComponent from "../LoadingComponent";
import { saleDto, SaleModalWithData } from "./SaleModalWithData";


export function SalesModal(props: any) {
  const saleId = useContext(saleIdContext);
  const [saleData, setSaleData] = useState<saleDto | null>(null);
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [messageOfFailure, setMessageOfFailure] = useState<string>('') ; 
  const {setIsSaleDisplayed} = props
  useEffect(() => {
    // Aquí puedes hacer algo con el saleId, como cargar datos de la venta
    const fecthSaleData = async () => {
        setLoading(true);
        const response = await fetch(`/api/sales/${saleId}`,{
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
           setMessageOfFailure("Ups, Hubo un error al cargar los datos de la venta, Inténtalo más tarde");
        }
        const data = await response.json();
        return data
    }
    const callFunction = async () => {
      try {
        setLoading(true);
        buttonRef.current?.classList.add("hidden"); 
        const data = await fecthSaleData();
        console.log("Datos de la venta:", data);
        if (data.statusCode === 404) {
          setMessageOfFailure("No se encontraron datos de la venta");
          return 
        }
        setSaleData(data as saleDto);
      } catch (error) {
        console.error("Error fetching sale data:", error);
      } finally {
        setLoading(false);
        buttonRef.current?.classList.remove("hidden");
      }
    }
    callFunction();
    
  }, [saleId])
    return <>
      <div className="h-screen w-screen fixed inset-0 z-100 flex justify-center items-center backdrop-blur-sm">
          <div className="relative w-[95%] max-w-6xl max-h-[95%] h-auto bg-tertiary rounded-3xl text-globalone overflow-hidden flex flex-col p-4 gap-1">
              <button ref={buttonRef} className="absolute top-3 right-3 z-100 cursor-pointer   flex items-center justify-center " onClick={(e) => {e.preventDefault(); setIsSaleDisplayed(false)}}  >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 " viewBox="0 0 24 24" fill="none"  >
                                    <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="var(--color-globalone)" strokeWidth="2"/>
                                    <path d="M9 9L15 15M15 9L9 15" stroke="var(--color-globalone)" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
              </button>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <LoadingComponent />
                </div>
              ) : saleData ? (
                <SaleModalWithData saleData={saleData as saleDto} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-3">
                  <h2 className="text-2xl font-bold text-secondary">Error</h2>
                  <p className="text-lg text-globalone">{messageOfFailure}</p>
                </div>
              )}
      </div>
    </div>
  </>
}

