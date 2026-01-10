import React from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:pb-0 md:pl-50 pb-16 pt-14 bg-primary">
      <Header />
       {children}
      <BottomNavBar />
    </div>
  );
}
