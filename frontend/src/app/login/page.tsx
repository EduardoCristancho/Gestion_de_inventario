"use client";
import {useState, useContext} from "react";
import { Building, Lock, ArrowRight, User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { AuthContext } from "@/hooks/authContext";

export default function Login() {
  const router = useRouter();
  const [failedLogin, setFailedLogin] = useState(false);
  
  // async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   try {
  //    const response = await fetch ("/api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username: e.currentTarget.username.value,
  //       password: e.currentTarget.password.value,
  //     })
  //    }) 
  //    if(!response.ok){
  //       setFailedLogin(true);
  //       setTimeout(() => {
  //         setFailedLogin(false);
  //       }, 3000);
  //       return;
  //     }
  //     return ;
      
  //   }catch (error) {
  //     console.log(error);
  //   }
  // }
  return (
    <div className="bg-[#586C8C] min-h-screen flex items-center justify-center font-sans ">
      {/* Contenedor principal para el diseño de escritorio */}
      <div className="w-full max-w-4xl lg:grid lg:grid-cols-2 lg:gap-10 lg:bg-white/10 lg:p-6 lg:rounded-2xl lg:shadow-xl">
        
        {/* --- Columna Izquierda (Visible solo en escritorio) --- */}
        <div className="hidden lg:flex flex-col justify-between p-8 bg-[#0284c7] text-white rounded-xl shadow-lg relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-3xl font-bold">Excesoft</h2>
            <p className="mt-2 text-white/80">
              La solución completa para optimizar tu stock y potenciar tus ventas.
            </p>
          </div>
          <div className="z-10 text-center flex justify-center">
             <img src="/company.svg" alt="" />
          </div>
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-white/10 rounded-full"></div>
          <div className="absolute -top-10 -left-20 w-48 h-48 bg-white/10 rounded-full"></div>
        </div>

        {/* --- Formulario de Login (Móvil y Escritorio) --- */}
        <div className="w-full  mx-auto lg:max-w-none relative flex flex-col justify-center min-h-[100vh] lg:min-h-0">
          
          {/* Olas decorativas (Móvil) */}
          <div className="absolute top-0 left-0 transform scale-x-[-1] w-full max-h-[20vh]  z-20 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none" viewBox="0 0 362 134.222" fill="none">
              <path d="M0 0L362 0L362 102C362 102 341.944 123.75 312.864 131C283.784 138.25 269.244 131 269.244 131C219.925 122.131 206.821 102 116.321 102C25.8212 102 1.00269 40.5845 1.00269 40.5845L0 0Z" fill="#1FCAE8" fillRule="evenodd"/>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full max-h-[20vh]  z-10   lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none" viewBox="0 0 362 134.22" fill="none">
              <path d="M0 0L362 0L362 102C362 102 341.944 123.75 312.864 131C283.784 138.25 269.244 131 269.244 131C219.925 122.131 206.821 102 116.321 102C25.8212 102 1.00265 40.5845 1.00265 40.5845L0 0Z" fill="#1A80E5" fillRule="evenodd"/>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-full max-h-[20vh]  transform rotate-180 z-20  lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none" viewBox="0 0 362 134.222" fill="none">
              <path d="M0 0L362 0L362 102C362 102 341.944 123.75 312.864 131C283.784 138.25 269.244 131 269.244 131C219.925 122.131 206.821 102 116.321 102C25.8212 102 1.00269 40.5845 1.00269 40.5845L0 0Z" fill="#1FCAE8" fillRule="evenodd"/>
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-full max-h-[20vh]  transform rotate-180 z-10 scale-x-[-1]  lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none" viewBox="0 0 362 134.22" fill="none">
              <path d="M0 0L362 0L362 102C362 102 341.944 123.75 312.864 131C283.784 138.25 269.244 131 269.244 131C219.925 122.131 206.821 102 116.321 102C25.8212 102 1.00265 40.5845 1.00265 40.5845L0 0Z" fill="#1A80E5" fillRule="evenodd"/>
            </svg>
          </div>

          {/* Nombre de la empresa */}
          <div className="absolute top-10 w-full text-center z-20 lg:hidden">
            <span className="text-white font-semibold">Ecxelsoft C.A.</span>
          </div>
          
          <div className="relative z-10 w-full px-6">
            <div className=" flex flex-col text-center items-center mb-8">
              <img src="/company.svg" alt="" />
              <h1 className="text-4xl font-bold text-white lg:text-gray-800 mt-2">Login</h1>
            </div>

            <form className="space-y-4" action={"/api/auth/login"} method="POST" >
              {/* Input RIF/Usuario */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Ingrese su nombre de usuario..."
                  name="username"
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* Input Contraseña */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* Checkbox Recordar */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#0284c7] focus:ring-[#00b4d8]"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-white lg:text-gray-700">
                  Recordar
                </label>
              </div>

              {/* Botón Ingresar */}
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                Ingresar <ArrowRight size={18} />
              </button>
            </form>
          </div>
          
          {/* Enlaces inferiores (Móvil) */}
          <div className="absolute bottom-8 w-full text-center z-20 lg:hidden">
             <div className="text-white text-sm space-x-4">
                <a href="#" className="hover:underline">Planes</a>
                <a href="#" className="hover:underline">Soporte</a>
                <a href="#" className="hover:underline">Acerca de</a>
             </div>
          </div>

          {/* Mensaje de fallo en el inicio de sesión */}
          {
            failedLogin && (
              <div className="absolute top-5  w-[90%] text-center z-20  lg:top-0 self-center lg:relative bg-blue-500 p-3 rounded-xl lg: mt-2" >
                <span className="text-white text-sm">El usuario o la contraseña son incorrectos.</span>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}