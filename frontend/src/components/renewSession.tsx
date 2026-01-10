"use client";
import { AuthContext, User } from "@/hooks/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useState } from "react";

export function RenewSession({ exp }: { exp: number }) {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const auth = useContext(AuthContext)
  useEffect(() => {
    if (!exp) return;
    const timeout = exp * 1000 - Date.now() - 30 * 60 * 1000; // 30 minutos antes de expirar
    if (timeout > 0) {
      const timer = setTimeout(() => setShowPopup(true), timeout);
      return () => clearTimeout(timer);
    }
  }, [exp]);
  const handleExtend = async () => {
  const response = await fetch("/api/auth/extendSession", {
    credentials: "include"
  });
  if (!response.ok) return;

  const data = await response.json();
  auth?.setUser(data);
  setShowPopup(false);
  router.refresh();
}
  if (!showPopup) return null;

   return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay semitransparente */}
      <div className="fixed inset-0 bg-black/50"></div>

      {/* Contenedor del pop-up */}
      <div className="relative z-10 mx-auto max-w-sm rounded-lg bg-white p-6 shadow-2xl transition-all duration-300 transform scale-100 opacity-100 animate-slide-in">
        <h1 className="mb-4 text-center text-xl font-bold text-gray-800">
          Su sesión está por expirar
        </h1>
        <p className="mb-6 text-center text-gray-600">
          ¿Desea extender su sesión para seguir trabajando?
        </p>
        <div className="flex justify-center space-x-4">
          <form action="/api/auth/logout">
            <button type="submit" className="rounded-md bg-gray-200 px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Cerrar
            </button>
          </form>
            <button onClick={handleExtend} className="rounded-md bg-blue-600 px-4 py-2 cursor-pointer font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Extender
            </button>
        </div>
      </div>
    </div>
   );
}