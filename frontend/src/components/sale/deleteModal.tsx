
import { useState } from "react";

export function DeleteModal(props: any){
    const {setDeleteModal, elementId, data, setData} = props;
    const [success, setSuccess] = useState<boolean| null>(null);
    async function handleDelete(){
        try{
            const response = await fetch(`/api/sales/${elementId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) return setSuccess(false);
            
            setData(data.filter((item: any)=> item.id !== elementId));
            setSuccess(true);
        }catch(err){
            return setSuccess(false);
        }
    }
    return (
        <div className="absolute border-1 border-cyan-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-tertiary rounded-lg">
            {
               success === null ?( 
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <img src="/warning.png" className="w-20 h-20 object-contain self-center" alt="" />
                    </div>
                    <p className="text-lg text-center text-globalone">¿Estás seguro de que deseas eliminar esta venta?</p>
                    <div className="flex justify-between w-[50%] self-center mt-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2 cursor-pointer" onClick={() => setDeleteModal(false)}>Cancelar</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer" onClick={handleDelete}>Eliminar</button>
                    </div>
                </div>
                ) : success === true ? (
                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <img src="/succes.png" className="w-20 h-20 object-contain self-center" alt="" />
                        </div>
                        <p className="text-lg text-center text-globalone">¡Venta Eliminada Correctamente! </p>
                        <div className="flex justify-center w-[50%] self-center mt-4">
                            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded cursor-pointer" onClick={() => setDeleteModal(false)}>Aceptar</button>
                        </div>
                    </div>

                ) : (

                    <div className="flex flex-col">
                        <div className="flex justify-center">
                            <img src="/error.png" className="w-20 h-20 object-contain self-center" alt="" />
                        </div>
                        <p className="text-lg text-center text-globalone">¡Error al Eliminar la Venta!</p>
                        <div className="flex justify-center w-[50%] self-center mt-4">
                            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer" onClick={() => setDeleteModal(false)}>Aceptar</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}