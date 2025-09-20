'use client'

import { useEffect, useRef, useState } from "react"
import SearchableSelect from "./SearchableSelect";
import { redirect } from "next/navigation";
import { FilterSidebar } from "./FilterSidebar";
import { Filter } from "lucide-react";

export default function LowStock(
    props:{
        wareHouseId?:number,
        displayComplete?:boolean
    }
) {
    // ... (El resto del componente permanece igual)
    const {displayComplete, wareHouseId} = props
    const [products, setProducts]= useState([]);
    const [warehouses, setWarehouses] = useState<any[]>([]);
    const [warehouseId, setWarehouseId] = useState(wareHouseId || 0);
    const [supplierId, setSupplierId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const elementsToShow = useRef(3);

    useEffect(()=>{
        const fetchProducts = async()=>{
            let params = '?';
            if (warehouseId !== 0) params += `wareHouseId=${warehouseId}&`;
            if (supplierId !== 0) params += `supplierId=${supplierId}&`;
            if (categoryId !== 0) params += `categoryId=${categoryId}&`;
            
            const response = await fetch('/api/reports/products/lowStock'+params, { credentials: 'include' });
            if (!response.ok) {
                console.error('Network response was not ok');
                return;
            }
            const data = await response.json();
            setProducts(data);

            if(displayComplete) elementsToShow.current = data.length;
        }

        const fetchWarehouses = async()=>{
            const response = await fetch('/api/ware-house');
            if (!response.ok) {
                console.error('Network response was not ok');
                return;
            }
            const data = await response.json();
            setWarehouses(data);
        }
        fetchWarehouses();
        fetchProducts();
        
    },[warehouseId, supplierId, categoryId, displayComplete]);

    const filterContent = (
        <>
            <div className='flex flex-col items-center justify-center w-full'>
                <label htmlFor="">Categorias:</label>
                <SearchableSelect setId={setCategoryId} url="/api/inventory"/>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <label htmlFor="">Proveedor:</label>
                <SearchableSelect setId={setSupplierId} url="/api/supplier"/>
            </div>
            <div className='flex flex-col items-center justify-center w-full'>
                <label htmlFor="">Almacenes:</label>
                <select className='bg-tertiary rounded-xl p-1 w-[80%]' onChange={(e) => setWarehouseId(parseInt(e.target.value))}>
                    <option value={0}>Todos</option>
                    {warehouses.map((warehouse : any) => (
                        <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                    ))}
                </select>
            </div>
            <div className='flex bg-secondary rounded-lg w-full lg:w-1/4  flex-col items-center justify-center text-tertiary p-2'>
                <p className="text-md font-bold">Productos: <span className="block text-center text-md font-bold">{products.length}</span></p>
            </div>
        </>
    );


    if(!displayComplete){
        return(
            <div className="w-full flex flex-col h-full bg-quaternary p-4 gap-4 rounded-lg">
                <div className="w-full flex items-center justify-center flex-shrink-0">
                    <h1 className="text-2xl font-bold text-globalone text-center">Productos con Bajo Stock</h1>
                </div>
                <div className="relative flex justify-center items-center w-full h-[75%] bg-tertiary self-center rounded-xl p-4 text-globalone text-sm flex-shrink-0">
                    <button className="px-3 py-2 absolute top-2 right-2  cursor-pointer text-sm rounded-full bg-gray-700 hover:bg-green-600 text-white transition" onClick={()=>redirect('/reports#lowStock')}>
                        Ver todos
                    </button>
                    <div className="rounded-lg flex-grow flex justify-center items-center ">
                    {products.length > 0 ? (
                        <div>
                            <div className="flex justify-center gap-2 items-center">
                                <img src="/not-available.png" className="h-15 w-15 " alt="Todo en orden" />
                                <p className="text-5xl font-bold text-secondary">{products.length}</p>
                            </div>
                            <p className="text-lg text-zinc-400">Productos necesitan atención</p>
                        </div>
                    ) : (
                         <div className="text-center">
                            <p className="text-lg text-green-500 mt-2">Todo en orden</p>
                        </div>
                    )}
                </div>
                </div>
            </div>
        )
    }

    // ... (El resto del componente permanece igual)
    return (
        <div id="lowStock" className="flex flex-col items-center w-full mt-6 pb-4 gap-3">
            <div className="w-full flex items-center justify-center gap-4 ">
                <h1 className="text-2xl font-bold text-globalone ">Productos con Bajo Stock</h1>
                <div className="lg:hidden">
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className="bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                        aria-label="Abrir filtros"
                    >
                        <Filter size={24} />
                    </button>
                </div>

            </div>

            <div className="hidden lg:flex justify-between w-[90%] bg-quaternary rounded-xl p-3 text-globalone text-sm">
                {filterContent}
            </div>
            <div className="lg:hidden">
                <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
                    {filterContent}
                </FilterSidebar>
            </div>
            <div className=" flex flex-col w-[90%] lg:w-[90%] max-h-[50dvh] overflow-y-auto pt-6 rounded-lg gap-4 text-globalone">
                {
                    products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-quaternary rounded-lg p-4">
                        <img src="/data-not-found.svg" className="w-50 h-50" alt="" />
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                            No hay productos con bajo stock.
                        </p>
                    </div>
                    ) : 
                    products.slice(0, elementsToShow.current).map((product: any, index) => {
                        return(
                            <div key={index} className="bg-tertiary rounded-xl p-3 flex flex-col sm:flex-row justify-between items-center gap-4 border border-red-500/40">
                                {/* --- Sección de Información del Producto --- */}
                                <div className="flex items-center gap-3 w-full">
                                    <img src="/Laptop1.jpg" className="w-16 h-16 rounded-xl object-contain flex-shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-globalone font-semibold text-base sm:text-md truncate">{product.name}</p>
                                        <p className="text-zinc-400 text-sm">{product.sku}</p>
                                        {/* Ocultar descripción en pantallas muy pequeñas para ahorrar espacio */}
                                        <p className="text-zinc-500 text-xs hidden sm:block">{product.description}</p>
                                    </div>
                                </div>
                                {/* --- Sección de Acciones y Stock --- */}
                                <div className="flex flex-row sm:flex-col items-center justify-around sm:justify-center gap-3 w-full sm:w-auto mt-3 sm:mt-0">
                                        <button className="px-4 py-2 text-xs sm:text-sm rounded-full bg-gray-700 hover:bg-green-600 text-white transition whitespace-nowrap">
                                            Reabastecer
                                        </button>
                                        <div className="bg-secondary text-center text-tertiary px-3 py-1 rounded-lg font-bold shadow-md">
                                            <h3 className="text-xs sm:text-sm">Unidades</h3>
                                            <span className="text-base sm:text-lg">
                                                {product.stock} 
                                            </span>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
 
    )
}
