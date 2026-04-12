"use client";

import { LogOut, Settings, Package } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { AuthContext } from "@/hooks/authContext";
import { useContext } from "react";

export default function Header() {
  const auth = useContext(AuthContext);
  
  return (
    <header className="fixed top-0 left-0 z-50 w-full h-14 bg-tertiary/95 backdrop-blur-md border-b border-white/10 shadow-lg flex items-center px-4 md:px-6">
      
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-info)] flex items-center justify-center shadow-md">
            <Package className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Cube<span className="text-[var(--color-secondary)]">Organized</span>
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <ThemeSwitcher />
          
          {/* Settings */}
          <Link href="/configuraciones">
            <button 
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              title="Configuración"
            >
              <Settings className="h-5 w-5" />
            </button>
          </Link>

          {/* User Info & Logout */}
          <div className="hidden md:flex items-center gap-3 ml-2 pl-3 border-l border-white/10">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-white">
                {auth?.user?.username || "Usuario"}
              </span>
              <span className="text-xs text-white/50">
                {auth?.user?.rol || "Administrador"}
              </span>
            </div>
            <button
              onClick={() => auth?.logout()}
              className="p-2 rounded-lg text-white/70 hover:text-red-400 hover:bg-white/10 transition-all duration-200"
              title="Cerrar sesión"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Logout */}
          <button
            onClick={() => auth?.logout()}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-red-400 hover:bg-white/10 transition-all duration-200"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
