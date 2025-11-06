import { providerContext } from "@/app/(app)/management/providers/page";
import { useContext, useEffect, useState } from "react";

export interface supplierComplete{
    id: number,
    name: string,
    rif: string,
    email: string,
    phone: string,
    address: string,
    products: {
        id: number,
        name: string,
        sku: string,
        description: string
        stock: number
    }[]
}
export function ProviderModal(props: any) {
    const supplierId = useContext(providerContext)
    const {setShowMore} = props;
    const [supplierComplete, setSupplierComplete] = useState<supplierComplete | null>(null);

    async function fetchSupplierInfo(){
        try{
            const response = await fetch('/api/supplier/complete/'+ supplierId, {
                credentials: 'include'
            })
            if(!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setSupplierComplete(data);
        }catch(error: any){
            console.log(error);
        }
    }
    useEffect(() => {
        fetchSupplierInfo();
    },[supplierId])

    if(!supplierComplete) return(
        <div className="fixed  inset-0 bg-black/40 flex items-center justify-center z-60">
            <div className=" relative bg-tertiary rounded-2xl shadow-xl p-4 w-[90%] max-w-6xl h-[80%] md:[90%] flex flex-col justify-center items-center">
                
                <button className="absolute top-2 right-2 p-2 cursor-pointer rounded-full" onClick={() => setShowMore(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-15 h-15 hover:w-16 hover:h-16 transition-all duration-75" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="var(--color-globalone)" strokeWidth="2"/>
                        <path d="M9 9L15 15M15 9L9 15" stroke="var(--color-globalone)" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                <img src="/not-available.png" className="w-[20%] h-[40%]" alt="" />
                <h1 className="text-center font-bold text-2xl">
                    No se pudo cargar el proveedor
                </h1>
            </div>
        </div>
        );
    return (
        <div className="fixed  inset-0 bg-black/40 flex items-center justify-center z-60">
            <div className="bg-tertiary rounded-2xl shadow-xl p-4 w-[90%] max-w-6xl h-[80%] md:[90%] flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <img src="/providers.png" className="w-12 h-12 object-contain" alt="logo" />
                        <h2 className="text-xl font-semibold text-secondary">{supplierComplete?.name}</h2>
                    </div>
                    <button className=" p-2 cursor-pointer rounded-full" onClick={() => setShowMore(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 hover:w-11 hover:h-11 transition-all duration-75" viewBox="0 0 24 24" fill="none">
                        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="var(--color-globalone)" strokeWidth="2"/>
                        <path d="M9 9L15 15M15 9L9 15" stroke="var(--color-globalone)" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                </div>

                {/* Body */}
                <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
                    
                    {/* Información proveedor */}
                    <div className="md:w-1/3 bg-quaternary rounded-xl p-4 flex flex-col gap-3 text-sm text-globalone">
                        <div>
                            <p className="text-secondary">RIF</p>
                            <p className="font-medium">{supplierComplete?.rif}</p>
                        </div>
                        <div>
                            <p className="text-secondary">Dirección</p>
                            <p className="font-medium">{supplierComplete?.address}</p>
                        </div>
                        <div>
                            <p className="text-secondary">Correo</p>
                            <p className="font-medium">{supplierComplete?.email}</p>
                        </div>
                        <div>
                            <p className="text-secondary">Teléfono</p>
                            <p className="font-medium">{supplierComplete?.phone}</p>
                        </div>
                    </div>

                    {/* Productos */}
                    <div className="md:w-2/3 flex flex-col overflow-hidden ">
                        <h3 className="text-lg font-semibold mb-3 text-globalone text-center md:text-center">
                            Productos que distribuye
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 overflow-y-auto ">
                            {   
                                supplierComplete.products.length > 0 && ( 
                                    supplierComplete?.products.map((p) => (
                                        <div key={p.id} className="flex items-center gap-3 bg-quaternary border border-secondary rounded-xl p-3 shadow-md hover:shadow-lg transition">
                                            <img src="/laptop.jpg" className="w-14 h-14  object-contain" alt="producto" />
                                            <div className="flex-1">
                                                <p className="font-medium text-secondary">{p.name}</p>
                                                <p className="text-sm text-globalone">SKU: {p.sku}</p>
                                                <div className="flex gap-4 mt-1 text-sm">
                                                    <span className="text-success font-semibold">Disponible: {p.stock}</span>
                                                </div>
                                            </div>
                                            <button className="px-3 py-1 text-sm border rounded-lg cursor-pointer hover:bg-globalone/20">
                                                Editar
                                            </button>
                                        </div>
                                    ))
                                ) || (
                                    <div className="flex items-center gap-3 bg-quaternary border border-secondary rounded-xl p-3 shadow-md hover:shadow-lg transition">
                                        <img src="/not-available.png" className="w-14 h-14  object-contain" alt="producto" />
                                        <div className="flex-1">
                                            <p className="font-medium text-secondary">Sin productos</p>
                                        </div>
                                    </div>
                                )
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

