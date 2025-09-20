'use client'

import { redirect } from "next/navigation";
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react";

export default function LastSales(){
    const [sales, setSales] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await fetch('/api/sales?page=1&limit=5',
                    {
                        credentials: 'include'
                    }
                );
                if (!response.ok) {
                    console.error("Error al obtener las ventas:", response.statusText);
                    return;
                }
                const results = await response.json();
                setSales(results.data);
            } catch (error) {
                console.error("No se pudo conectar al servidor:", error);
            }
        }
        fetchData();
    },[])

    return(
        // Contenedor principal ahora es flexible y ocupa toda la altura/anchura
        <div className="rounded-lg w-full flex flex-col text-globalone max-h-[40dvh] bg-quaternary p-4 lg:h-full">
            {/* Encabezado */}
            <div className="relative flex justify-center items-center p-4 rounded-lg mb-4 flex-shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold text-center">Últimas Ventas del Día</h2>
                <button 
                    className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-1 px-3 py-2 cursor-pointer text-xs sm:text-sm rounded-full bg-gray-700 hover:bg-green-600 text-white transition" 
                    onClick={()=>redirect('/sales/salesRecords')}
                >
                    <span className="hidden sm:inline">Ver todas</span>
                    <ArrowRight size={16} />
                </button>
            </div>
            
            {sales.length === 0 ? (
                <div className="flex flex-col flex-grow items-center justify-center text-center p-6">   
                    <img src="/data-not-found.svg" alt="No hay datos" className="w-24 h-24 mb-4" />
                    <p className="text-gray-400">No hay ventas recientes.</p>
                </div>
            ) : (
                // La lista ahora es flexible y tomará el espacio restante
                <div className="w-full flex-grow overflow-y-auto flex flex-col gap-4">
                    {sales.map((sale: any) => (
                       <div key={sale.id} className="bg-tertiary p-3 px-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-center sm:text-left ">
                            <div className="flex  justify-around sm:justify-start sm:items-center sm:gap-6 w-full sm:w-auto">
                                <div className="flex-1 sm:flex-none">
                                    <p className="font-bold text-sm text-zinc-400">Hora:</p>    
                                    <p className="text-base">{new Date(sale.date).toLocaleTimeString('es-VE', {hour:'2-digit', minute:'2-digit'})}</p>
                                </div>
                                <div className="flex-1 sm:flex-none">
                                    <p className="font-bold text-sm text-zinc-400">Cliente:</p>
                                    <p className="text-base truncate">{sale.client.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                                <div className="text-center sm:text-right">
                                    <p className="font-bold text-sm text-zinc-400">Total:</p>    
                                    <p className="text-lg font-bold text-green-400">${sale.total}</p>
                                </div>
                                <img src="/succes.png" alt="Venta exitosa" className="w-5 h-5 flex-shrink-0" />
                            </div>
                       </div>
                    ))}
                </div>
            )}
        </div>    
    )
}
