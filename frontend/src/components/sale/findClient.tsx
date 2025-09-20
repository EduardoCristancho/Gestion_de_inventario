'use client';
import {useState, useRef } from 'react';
import DisplayClientData from './DisplayClientData';
import findClientService from '@/lib/findClientService';
import LoadingComponent from '../LoadingComponent';
import { InputGroup } from '../inputGroup';

interface clientsInterface {
    id: number;
    identifier: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}
export default function FindClient(props: any ){
    const {setClient, setDisplayFindClient} = props;
    const [requestClientIdentifier, setRequestClientIdentifier] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const selectClient = useRef<HTMLButtonElement>(null);
    const [client, setClientData] = useState<clientsInterface | null>(null);
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFindClient = async () => {
        if(!selectClient.current?.classList.contains('hidden')) selectClient.current?.classList.add('hidden'); 
        if (displayMessage) setDisplayMessage(false); // Reset display message state
        
        // Validate input
        if (!requestClientIdentifier || isNaN(parseInt(requestClientIdentifier))) {
            alert("El campo no puede estar vacio o no es un numero valido");
            return;
        }
        
        if (loading) return; // Prevent multiple submissions
        setLoading(true);
        
        // close focus on input field
        inputRef.current?.blur();
        try {    
            //call service to find client
            const response = await findClientService(requestClientIdentifier);
            //assign client data to state
            if (response) {
                setClientData(response);
            } else {
                setClientData(null); // Cliente no encontrado
            }
        } catch (error: any) {
            console.error("Error al buscar cliente:", error);
            alert("Ocurrió un error al buscar el cliente. Intenta de nuevo.");
        } finally {
            setDisplayMessage(true); // Show message after response
            setRequestClientIdentifier("");
            setLoading(false); // Reset loading state
        }
    }

    return (
        <>

            <div className = " rounded-3xl bg-[var(--color-tertiary)]  py-6 px-5 text-white w-[90%] max-h-[90vh] min-h-[30vh]   md:max-w-[60vw] md:max-h-[80vh]  relative z-150  lg:min-w-[30vw] lg:max-w-[50vw] lg:max-h-[80vh] ">
                
                {/* Header */}

                <div className='flex justify-center mb-4'>
                    <h1 className='text-center text-2xl md:text-4xl font-bold relative md:static '>Buscar cliente</h1>
                    <button className='cursor-pointer' onClick={() => {setDisplayFindClient(false)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 absolute top-2 right-3" viewBox="0 0 24 24" fill="none">
                            <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="var(--color-globalone)" strokeWidth="2"/>
                            <path d="M9 9L15 15M15 9L9 15" stroke="var(--color-globalone)" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {/* search client group */}

                <div className='flex gap-2  w-full justify-center'>
                    <div className='relative lg:static flex md:gap-5 w-8/10'>
                        <InputGroup value={requestClientIdentifier} setValue={setRequestClientIdentifier} functionOnSubmit={handleFindClient} />
                    </div>
                    
                    {/* Add Client Button */}

                    <button className='w-7 h-8 md:h-10 md:w-10 cursor-pointer hover:opacity-90 hover:scale-110 transition-all ' >
                        <img src="/addIcon.png" alt="Crear Cliente" />
                    </button>
  
                </div>

                {/* Display Request Result */}
                <div className='relative mt-4 flex flex-col px-5 gap-3 items-center self-center rounded-xl p-2 w-full max-h-[60vh] md:max-h-[40vh] lg:max-h-[55vh]   md:px-10 text-White text-sm font-semibold  focus:outline-none overflow-y-auto'>
                    {loading && (
                        <div className='flex my-auto flex-col gap-2 md:gap-5 w-8/10 self-center h-[20%] justify-center items-center'>
                            <LoadingComponent />
                        </div>
                    )}

                    { displayMessage  && (
                            
                            client === null ?
                                
                                    <p className='text-center self-center justify-center my-auto text-white text-lg md:text-lg font-semibold'>No se encontro el cliente</p>
                                
                            : 
                            <>
                           
                                <DisplayClientData clientData={client}/>
                                {selectClient.current?.classList.remove('hidden')}
                            <button className='rounded-xl  w-5/10 md:w-[60%] lg:w-[40%] mt-5 p-2 cursor-pointer hover:opacity-80  bg-[var(--color-success)] text-white   ' ref={selectClient}
                                onClick={() => {setClient(client?.identifier); setDisplayFindClient(false); setDisplayMessage(false);}}> seleccionar</button>
                                
                            </>
                        )
                    }
                    
                    
                </div>
               
            
                
            </div>
        </>
    )
}
