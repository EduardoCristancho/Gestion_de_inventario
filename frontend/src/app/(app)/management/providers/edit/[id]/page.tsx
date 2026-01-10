'use client'
import FormProvider from "@/components/provider/formProvider";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { providerValidator, Provider } from "../../create/page";
import { set } from "zod";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function editProvider(){
    const params = useParams();
   const [provider, setProvider] = useState<Provider>({
        name: "",
        rif: "",
        email: "",
        address: "",
        phone: ""
    });
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [providerOriginal, setProviderOriginal] = useState<Provider>(provider);
       
    async function fetchData(){
        try {
            const response = await fetch('/api/supplier/' + params.id, {credentials: 'include'});
            if(!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setProvider(data);
            setProviderOriginal(data);
        }catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    async function updateProvider(data: Partial<Provider>){
        try{
            const response = await fetch('/api/supplier/' + params.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            })   
            if(!response.ok) throw new Error('Network response was not ok');
        }catch(error){
            setShowMessage(true);
            setMessage("No se pudo actualizar el proveedor, intente de nuevo mas tarde");
        }
    }
    function handleSubmit(){
        try{
            const validation = providerValidator.safeParse(provider);
            if(!validation.success) throw new Error(validation.error.issues[0].message);
            const data: Partial<Provider> = {}; 
            for (const campo  in provider ){
                const key = campo as keyof Provider;
                if(provider[key] !== providerOriginal[key]){
                    data[key] = validation.data[key];
                }
            }
            console.log(data);
            updateProvider(data);
            setShowMessage(true);
            setMessage("Proveedor actualizado exitosamente");
        }catch(error: any){
            setShowMessage(true);
            setMessage(error.message);
        }finally{
            setTimeout(() => {
                setShowMessage(false);
            }, 5000)
        }
    }
    function handleClear(){
        setProvider(providerOriginal);
    }
    return (
<div className="w-full flex flex-col pt-6 gap-4 justify-center min-h-[90vh] px-4 sm:px-6">
  <div
    className="
      relative 
      bg-tertiary 
      rounded-xl 
      self-center 
      flex flex-col 
      gap-2 
      px-4 
      py-6 
      w-full 
      sm:w-[90%] 
      md:w-[70%] 
      lg:w-[55%] 
      xl:w-[50%]
      shadow-md
    "
  >
    {/* Encabezado */}
    <div className="w-full flex relative justify-center items-center p-4">
      <img
        src="/providers.png"
        className="
          w-10 h-10 
          sm:w-14 sm:h-14 
          object-contain 
          absolute 
          left-4 sm:left-10
        "
        alt="Proveedor"
      />
      <h1
        className="
          text-center 
          font-bold 
          text-xl 
          sm:text-2xl 
          mt-2 
          text-globalone
        "
      >
        Editar Proveedor
      </h1>
    </div>

    {/* Contenido principal */}
    <div className="w-full flex justify-center">
      <div className="w-full sm:w-[90%]">
        <FormProvider
          provider={provider}
          setProvider={setProvider}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />

        {/* Mensaje de éxito/error */}
        {showMessage && (
          <div
            className="
              absolute 
              top-1/2 
              left-1/2 
              transform 
              -translate-x-1/2 
              -translate-y-1/2 
              p-6  
              bg-quaternary 
              rounded-lg 
              text-globalone 
              border 
              border-cyan-100 
              shadow-lg
              w-[90%]
              sm:w-[70%]
              md:w-[60%]
              lg:w-[50%]
              animate-fadeIn
            "
          >
            <div className="w-full h-full flex flex-col items-center gap-4 text-center relative">
              <button
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowMessage(false)}
              >
                <AiOutlineCloseCircle color="var(--globalone)" size={35} />
              </button>

              <img
                src={
                  message === "Proveedor actualizado exitosamente"
                    ? "/succes.png"
                    : "/error.png"
                }
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain self-center"
                alt="Estado"
              />
              <p className="text-sm sm:text-base">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

    )    
}