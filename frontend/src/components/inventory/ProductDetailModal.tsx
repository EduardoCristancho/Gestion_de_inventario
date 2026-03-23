"use client";

import { useEffect, useState } from "react";
import OverflowText from "@/components/OverflowText";

export type ProductDetail = {
  id: number;
  sku: string;
  name: string;
  image: string;
  cost: number;
  price: number;
  description: string;
  stats: {
    stock: number;
    available: number;
    reserved: number;
  };
  models: Array<{
    id: number;
    sku: string;
    name: string;
    image: string;
    available: number;
  }>;
};

const MOCK_DETAIL: ProductDetail = {
  id: 0,
  sku: "SKU : 123913",
  name: "Laptop Dell",
  image: "/tv.jpeg",
  cost: 100,
  price: 100,
  description:
    "Laptop de alto rendimiento, procesador ryzen 7 4800g, 8GB de ram, 1 TB SSD, Batería de 5600 mAh",
  stats: {
    stock: 10,
    available: 5,
    reserved: 5,
  },
  models: [
    { id: 1, sku: "SKU 1239131", name: "Modelo spirion Azul", image: "/tv.jpeg", available: 8 },
    { id: 2, sku: "SKU 1239131", name: "Modelo spirion Rojo", image: "/tv.jpeg", available: 3 },
    { id: 3, sku: "SKU 1239131", name: "Modelo spirion Azul", image: "/tv.jpeg", available: 8 },
    { id: 4, sku: "SKU 1239131", name: "Modelo spirion Azul", image: "/tv.jpeg", available: 8 },
  
  ],
};

type Props = {
  open: boolean;
  productId?: number;
  onClose: () => void;
  onRedirect?: (id: number) => void;
};

export default function ProductDetailModal({ open, productId, onClose, onRedirect }: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const formatCurrencyCompact = (n: number) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 }).format(n);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    // Simula un fetch a una ruta para obtener información del producto.
    // Por petición, se usa el mismo dataset para todos los productos.
    const t = setTimeout(() => {
      setDetail({ ...MOCK_DETAIL, id: productId ?? 0 });
      setLoading(false);
    }, 350);
    return () => clearTimeout(t);
  }, [open, productId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-6   md:p-6">
        <div
          className="relative  w-full max-w-sm md:max-w-4xl bg-quaternary text-globalone py-2 md:py-0 rounded-2xl shadow-xl border border-neutral-700 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-end gap-2 px-3 py-2 md:px-5 md:py-2 ">
            <button
              className="size-8 grid place-items-center rounded-lg hover:bg-quaternary/60 cursor-pointer"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>

          {/* Body */}
          <div className="px-3 pb-3 md:px-6 md:pb-6 md:grid md:gap-2 md:grid-cols-2">
            {/* Cover image */}
            <div className="h-56 md:h-66 md:col-span-1 w-full rounded-xl overflow-hidden ring-1 ring-black/10">
              <img src={detail?.image ?? "/tv.jpeg"} alt="cover" className="w-full h-full object-cover" />
            </div>

            {/* Main info */}
            <div className="mt-3  md:col-span-1 grid grid-cols-12 gap-2 md:gap-2 items-start">
              <div className="col-span-12">
                <div className="text-xs text-cyan-300 font-semibold">{detail?.sku}</div>
                <OverflowText text={detail?.name ?? ""} lines={1} className="text-lg md:text-2xl font-extrabold text-secondary" />
              </div>
              <div className="col-span-12 flex gap-6 md:gap-10 text-right md:text-left">
                <div>
                  <div className="text-cyan-300 text-xs text-start">Costo</div>
                  <div className="text-emerald-400 text-2xl md:text-3xl font-extrabold">{detail ? formatCurrencyCompact(detail.cost) : ""}</div>
                </div>
                <div>
                  <div className="text-cyan-300 text-xs text-start">Precio</div>
                  <div className="text-emerald-400 text-2xl md:text-3xl font-extrabold">{detail ? formatCurrencyCompact(detail.price) : ""}</div>
                </div>
              </div>
              <div className="col-span-12">
                <div className="text-cyan-300 text-xs font-semibold">Descripción:</div>
                <OverflowText text={detail?.description ?? ""} lines={3} className="text-sm md:text-base text-globalone/90" />
              </div>

              <div className="col-span-12 flex gap-4 md:gap-6 text-center">
                <Stat label="Existencia" value={detail?.stats.stock ?? 0} color="text-cyan-300" />
                <Stat label="Disponible" value={detail?.stats.available ?? 0} color="text-emerald-400" />
                <Stat label="Reservado" value={detail?.stats.reserved ?? 0} color="text-sky-400" />
              </div>
            </div>

            {/* Models list */}
            <div className="mt-3 md:mt-2 md:col-span-2">
              <div className="text-lg md:text-xl font-extrabold text-secondary">Modelos</div>
              <div className="mt-2 max-h-44 md:max-h-56 overflow-y-auto pr-1 space-y-2">
                {(detail?.models ?? []).map((m) => (
                  <div key={m.id} className="bg-tertiary rounded-xl border border-neutral-700 p-2 flex items-center gap-3">
                    <div className="size-12 rounded-md overflow-hidden ring-1 ring-black/10 shrink-0">
                      <img src={m.image} alt="model" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-cyan-300">{m.sku}</div>
                      <div className="text-sm md:text-base font-semibold text-secondary truncate">{m.name}</div>
                      <div className="text-xs text-globalone">Disponible {m.available}</div>
                    </div>
                    <button className="px-3 py-1 rounded-lg bg-secondary text-white text-xs md:text-sm cursor-pointer hover:opacity-90">
                      Editar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {loading && (
            <div className="absolute inset-0 grid place-items-center bg-primary/60">
              <div className="animate-pulse text-sm text-globalone">Cargando…</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex-1">
      <div className={`text-xs ${color}`}>{label}</div>
      <div className={`text-base md:text-lg font-extrabold ${color}`}>{value}</div>
    </div>
  );
}
