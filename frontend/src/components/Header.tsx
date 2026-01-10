"use client";

import { Coffee, Settings } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full h-14 bg-primary border-b border-gray-200 shadow-sm flex items-center px-4">
      <div className="flex items-center justify-between w-full max-w-lg mx-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Coffee className="h-5 w-5 text-amber-800" />
          </div>
        </div>

        <h1 className="text-lg font-semibold text-globalone">AppComercio</h1>

        <div className="flex items-center justify-center">
          <ThemeSwitcher />
          <Link
            href="/configuraciones"
            className="text-globalone hover:text-gray-700"
          >
            <button className="text-globalone transition-all duration-150 p-[7px] rounded-lg hover:bg-tertiary/100">
              <Settings className="h-5 w-5 " />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
