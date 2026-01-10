'use client'
import FormProvider from "@/components/provider/formProvider";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {  useState } from "react";
import {z} from "zod";

export const providerValidator = z.object({
        name: z.string().min(2, { message: "El nombre debe tener al menos 3 caracteres" }),
        rif: z.string().refine(val => !isNaN(Number(val)), { message: "El rif debe ser un número válido" }),
        email: z.email("El formato del correo electronico no es valido"),
        address: z.string(),
        phone: z.string().refine(val => !isNaN(Number(val)), { message: "El telefono debe ser un número valido" })
    })
export type Provider = z.infer<typeof providerValidator>;

export default function CreateProvider(){

    
    const [provider, setProvider] = useState<Provider>({
        name: "",
        rif: "",
        email: "",
        address: "",
        phone: ""
    });
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    

    async function createProvider(data: Provider = provider) {
            try {
                const response = await fetch('/api/supplier', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setShowMessage(true);
                setMessage("Proveedor creado exitosamente");
            }catch (error) {
                setShowMessage(true);
                setMessage("No se pudo crear el proveedor, intente de nuevo mas tarde");
            }
        }
    function handleSubmit(){
        try{
            const validation = providerValidator.safeParse(provider);
            if (!validation.success) {
                throw new Error(validation.error.issues[0].message);   
            }
            createProvider();
            handleClear();
        }catch (error : any) {
            setShowMessage(true);
            setMessage(error.message);
        }finally{
                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);
        }
    }
    function handleClear(){
        setProvider({
            name: "",
            rif: "",
            email: "",
            address: "",
            phone: ""
        })
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
        Registrar Proveedor
      </h1>
    </div>

    {/* Contenido */}
    <div className="w-full flex justify-center">
      <div className="w-full sm:w-[90%]">
        <FormProvider
          provider={provider}
          setProvider={setProvider}
          handleSubmit={handleSubmit}
          handleClear={handleClear}
        />

        {showMessage && (
          <div
            className="
              absolute 
              top-1/2 left-1/2 
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
                  message === "Proveedor creado exitosamente"
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