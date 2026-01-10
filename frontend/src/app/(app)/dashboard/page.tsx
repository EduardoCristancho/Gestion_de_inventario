"use client"
import {useContext} from "react";
import LowStock from "@/components/reports/lowStock";
import LastSales from "@/components/dashboard/lastSales";
import MostSelledByCatg from "@/components/dashboard/mostSelledByCatg";
import EarnsOfDay from "@/components/dashboard/earnsOfDay";
import { AuthContext } from "@/hooks/authContext";

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  return (
    <div className="p-4 sm:p-6  bg-primary ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fila 1 - métricas principales */}
        <div className="col-span-1 flex">
          <MostSelledByCatg />
        </div>
        <div className="col-span-1 flex">
          <EarnsOfDay />
        </div>

        {/* Fila 2 - detalles */}
        <div className="col-span-1 lg:max-h-[300px] flex">
          <LastSales />
        </div>
        <div className="col-span-1 lg:max-h-[300px] flex">
          
        </div>
      </div>
    </div>
  );
}

