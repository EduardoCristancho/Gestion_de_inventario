import Link from "next/link";
import { FaWarehouse, FaTruck, FaUsers, FaUserTie } from "react-icons/fa";

const sections = [
  {
    label: "Almacenes",
    href: "/warehouses",
    icon: FaWarehouse,
    description: "Gestiona tus almacenes y ubicaciones",
  },
  {
    label: "Clientes",
    href: "/clients",
    icon: FaUsers,
    description: "Administra tu cartera de clientes",
  },
  {
    label: "Proveedores",
    href: "/management/providers",
    icon: FaTruck,
    description: "Controla tus proveedores y suministros",
  },
  {
    label: "Vendedores",
    href: "/sellers",
    icon: FaUserTie,
    description: "Administra tu equipo de vendedores",
  },
];

export default function Management() {
  return (
    <div className="h-[90dvh] py-4 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">

        {/* Grid: lista horizontal en móvil, 2x2 en desktop */}
        <div className="flex flex-col flex-1 gap-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:flex-none sm:max-h-[75dvh] md:max-h-none md:flex-1 md:gap-6">
          {sections.map(({ label, href, icon: Icon, description }) => (
            <Link key={label} href={href} className="flex">
              <div className="bg-primary rounded-2xl shadow-lg w-full flex flex-row sm:flex-col items-center sm:justify-center text-left sm:text-center gap-5 p-3 md:p-8 md:gap-6 cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all duration-200 group">
                <div className="bg-gradient-to-br from-[#29D3F1]/20 to-[#29D3F1]/10 rounded-2xl p-4 md:p-5 group-hover:from-[#29D3F1]/30 transition-all shrink-0">
                  <Icon className="text-[#29D3F1] text-4xl md:text-5xl" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-semibold text-globalone">{label}</h2>
                  <p className="text-globalone text-sm md:text-base mt-0.5 opacity-60">{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
