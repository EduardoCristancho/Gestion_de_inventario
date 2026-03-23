'use client';
import {useState, useRef, useEffect, } from 'react';
import DisplayClientData from './DisplayClientData';
import findClientService from '@/lib/findClientService';
import LoadingComponent from '../LoadingComponent';
import { useProducts } from '../../app/(app)/sales/productContext';
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
    const {asignClient} = useProducts();
    const {setDisplayFindClient} = props;
    const [requestClientIdentifier, setRequestClientIdentifier] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [client, setClientData] = useState<clientsInterface | null>(null);
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFindClient = async () => {
        if (!requestClientIdentifier) return;
        if (displayMessage) setDisplayMessage(false);
        
        // Validate input
        if (isNaN(parseInt(requestClientIdentifier))) {
            alert("El campo no puede estar vacío o no es un número válido");
            return;
        }
        
        if (loading) return;
        setLoading(true);
        
        inputRef.current?.blur();
        try {    
            const response = await findClientService(requestClientIdentifier);
            setClientData(response || null);
        } catch (error: any) {
            console.error("Error al buscar cliente:", error);
            alert("Ocurrió un error al buscar el cliente. Intenta de nuevo.");
        } finally {
            setDisplayMessage(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleFindClient();
        }, 300);

        return () => clearTimeout(timer);
    }, [requestClientIdentifier]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-tertiary rounded-2xl w-full max-w-md mx-auto shadow-2xl">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h1 className="text-xl font-semibold text-white">Buscar cliente</h1>
                    <button 
                        onClick={() => setDisplayFindClient(false)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>

                {/* Search Section */}
                <div className="p-6 space-y-4">
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <InputGroup 
                                value={requestClientIdentifier} 
                                setValue={setRequestClientIdentifier}
                                placeholder="Número de cédula"
                            />
                        </div>
                        <button className="p-2 bg-[var(--color-success)] hover:bg-[var(--color-success)]/80 rounded-xl transition-colors">
                            <img src="/addIcon.png" alt="Crear Cliente" className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Results Section */}
                    <div className="min-h-[200px] max-h-[400px] overflow-y-auto">
                        {loading && (
                            <div className="flex justify-center items-center py-12">
                                <LoadingComponent />
                            </div>
                        )}

                        {displayMessage && !loading && (
                            client === null ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-white/80 text-sm">No se encontró el cliente</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <DisplayClientData clientData={client} />
                                    <button 
                                        className="w-full bg-[var(--color-success)] hover:bg-[var(--color-success)]/80 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                                        onClick={() => {
                                            asignClient(client.id, client.name, client.identifier); 
                                            setDisplayFindClient(false); 
                                            setDisplayMessage(false);
                                        }}
                                    >
                                        Seleccionar cliente
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
