

import {Html5Qrcode} from "html5-qrcode";
import {useEffect, Dispatch, SetStateAction, useRef, useState } from "react";


interface codeScannerParams {
    setValue : Dispatch<SetStateAction<string>>,
    setClosed : Dispatch<SetStateAction<boolean>>
}

enum scanMode {
  barCode = 2,
  qrCode = 1
}
export default function CodeScanner (params:codeScannerParams ){
  const { setValue, setClosed} = params
  const [mode, setMode] = useState<scanMode>(scanMode.qrCode)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef(true)
  const containerId = `reader-${mode}`; // ID dinámico por modo
  function onScanSuccess(decodedText : any, decodedResult : any) {
    
    if (!isScanningRef.current) return;

    // 2. BLOQUEAMOS EL PASO INMEDIATAMENTE
    isScanningRef.current = false;

  // 3. ACTIVAMOS TU ANIMACIÓN TAILWIND
  setIsSuccess(true);
    setTimeout(() => {
      setValue(decodedText);
      isScanningRef.current = true;
      setClosed(false); 
      setIsSuccess(false) 
    }, 1500); // 1.5 segundos de duración para la animación
  }

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    setValue("");
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = Number(e.target.value) as scanMode; 
    setMode(valor);
  };

  useEffect(() => {
    // 1. Pequeño delay para asegurar que el DOM de React esté listo
    const timer = setTimeout(async () => {
      const element = document.getElementById(containerId);
      if (!element) return;

      // Limpiamos cualquier residuo manual
      element.innerHTML = "";
      
      const scanner = new Html5Qrcode(containerId);
      scannerRef.current = scanner;

      try {
        await scanner.start(
          { facingMode: "environment" },
          { 
            fps: 20,
            aspectRatio: mode == scanMode.qrCode ? 1.0 : 2.0,
            qrbox: (w, h) => {
              // Si por alguna razón el ancho es muy pequeño (inicialización), 
              // devolvemos un valor seguro para que no lance el error.
              if (w < 50 || h < 50) return { width: 50, height: 50 };

              if (mode === scanMode.qrCode) {
                // Calculamos el 60%, pero nos aseguramos que no baje de 150px para QR
                const size = Math.max(Math.min(w, h) * 0.6, 150);
                return { width: size, height: size };
              } else {
                // Para barras, aseguramos un mínimo de 200x80 para que sea legible
                return { 
                  width: Math.max(w * 0.7, 200), 
                  height: Math.max(h * 0.3, 80) 
                };
              }
            },
            
          },
          onScanSuccess,
          onScanFailure
        );
      } catch (err) {
        console.error("Error al iniciar escáner:", err);
      }
    }, 150); // El delay es clave en Next.js

    // 2. LIMPIEZA AGRESIVA
    return () => {
      clearTimeout(timer);
      if (scannerRef.current) {
        const instance = scannerRef.current;
        if (instance.isScanning) {
          // No esperamos al .then() porque React ya está desmontando
          instance.stop().catch(() => {}).finally(() => {
            instance.clear();
            const el = document.getElementById(containerId);
            if (el) el.innerHTML = "";
          });
        }
      }
    };
  }, [mode]); // El efecto se reinicia limpiamente al cambiar de modo
  
  return(
    <>
        {/* 1. Fondo del Modal: Traslúcido para ver tu app detrás */}
<div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-6">
  <div className="relative w-full max-w-xs flex flex-col items-center">
    <h2 className="text-globalone font-bold">Tipo de Codigo</h2>
    <div className="relative w-full max-w-xs flex justify-center">  
      <select name="" id="" className="block w-3/4 m-2 appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 pr-10 text-slate-700 shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-50" onChange={handleChange} value={mode}>
        <option value={scanMode.qrCode}>QR Code</option>
        <option value={scanMode.barCode}>Bar Code</option>
      </select>
    {/* icono de flecha */}
      <div className="pointer-events-none absolute inset-y-0 right-10 flex items-center px-3 text-slate-500">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
  
  {/* 2. Contenedor de la Cámara: Solo el tamaño del QRBox */}
  <div className={`relative m-4 transition-all duration-300 bg-black rounded-3xl overflow-hidden border-4 border-primary shadow-[0_0_20px_rgba(0,0,0,0.5)] 
  ${mode === scanMode.qrCode ? 'w-64 h-64 md:w-80 md:h-80' : 'w-80 h-40 md:w-96 md:h-56'} 
  ${isSuccess ? 'border-green-500 shadow-green-500/50 scale-105' :'border-primary shadow-black/50 scale-100'}`} >
    
    {/* El ID 'reader' ahora está limitado a este cuadrito */}
    <div 
          id={containerId}
          
          className={`w-full h-full [&>video]:object-cover [&>video]:w-full [&>video]:h-full
          ${mode === scanMode.qrCode ? 'w-64 h-64' : 'w-80 h-48'}`}></div>
   
  </div>

  {/* Texto debajo del cuadro */}
  <p className="mt-4 text-white font-medium bg-black/50 px-4 py-1 rounded-full backdrop-blur-md">
    Apunta al código <span>{mode == scanMode.qrCode ? "QR" : " de Barras"}</span>
  </p>

  {/* Botón para cerrar */}
  <button 
    onClick={() => setClosed(false)}
    className="mt-8 text-white/80 underline decoration-primary underline-offset-4"
  >
    Cerrar escáner
  </button>
</div>
    </>
    
  )
} 