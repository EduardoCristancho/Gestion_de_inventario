"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navItem";

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed md:max-w-50 md:flex md:flex-col md:justify-center md:max-h-[calc(100vh-55px)] md:h-[100dvh] bottom-0 left-0 z-50 w-full h-16 bg-quaternary border-t border-gray-200 shadow-lg">
      <div className="grid md:max-h-[70%]  h-full max-w-lg grid-cols-5 md:grid-cols-1 mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex md:flex-row md:gap-4 flex-col items-center justify-center px-1 ${
                isActive
                  ? "text-secondary"
                  : "text-globalone hover:text-secondary"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
