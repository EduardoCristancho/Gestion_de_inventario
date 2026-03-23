"use client";
import { InputGroup } from "@/components/inputGroup";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProductOptionsMenu from "@/components/ProductOptionsMenu";
import ProductDetailModal from "@/components/inventory/ProductDetailModal";
import OverflowText from "@/components/OverflowText";

type StockFilter = "general" | "available" | "pending";

type Product = {
  id: number;
  sku: string;
  name: string;
  qty: number;
  desc: string;
  status: StockFilter;
};

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, sku: "SKU 123913", name: "Laptop Dell anasdnasndasndasd  ansdansdnasdns", qty: 30, desc: "ryzen7 4800g", status: "general" },
  { id: 2, sku: "SKU 123914", name: "Laptop Dell", qty: 18, desc: "ryzen7 4800g", status: "available" },
  { id: 3, sku: "SKU 123915", name: "Laptop Dell", qty: 12, desc: "ryzen7 4800g", status: "pending" },
  { id: 4, sku: "SKU 123916", name: "Laptop Dell", qty: 9, desc: "ryzen7 4800g", status: "general" },
  { id: 5, sku: "SKU 123917", name: "Laptop Dell", qty: 44, desc: "ryzen7 4800g", status: "available" },
  { id: 6, sku: "SKU 123918", name: "Laptop Dell", qty: 3, desc: "ryzen7 4800g", status: "pending" },
];

export default function InventoryPage() {
  const [active, setActive] = useState<StockFilter>("general");
  const [inputSearch, setInputSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const products = useMemo(() => {
    if (active === "general") return SAMPLE_PRODUCTS;
    return SAMPLE_PRODUCTS.filter((p) => p.status === active);
  }, [active]);

  const handleView = (id: number) => {
    setSelectedId(id);
    setDetailOpen(true);
  };
  const handleEdit = (id: number) => {
    router.push(`/inventory/${id}/edit`);
  };
  const handleDelete = (id: number) => {
    alert(`Eliminar producto ${id}`);
  };

  const FilterTab = ({ id, label }: { id: StockFilter; label: string }) => (
    <button
      onClick={() => setActive(id)}
      className={[
        "px-3 py-1.5 text-xs md:text-sm font-medium rounded-full ",
        active === id
          ? "bg-cyan-500 text-white border-cyan-500 shadow"
          : "bg-transparent text-cyan-400  hover:bg-cyan-500/10",
      ].join(" ")}
    >
      {label}
    </button>
  );

  const PageDot = ({ n }: { n: number }) => (
    <button
      onClick={() => setPage(n)}
      className={[
        "w-7 h-7 rounded grid place-items-center text-xs font-semibold",
        page === n ? "bg-sky-600 text-white" : "bg-sky-300 text-sky-900 hover:bg-sky-400",
      ].join(" ")}
    >
      {n}
    </button>
  );

  return (
    <>
    <div className="w-full bg-primary text-white text-globalone">
      {/* Puedes agregar otros componentes aquí si lo necesitas */}
      <div className="mx-auto max-w-md md:max-w-6xl md:px-6 px-3 py-3 md:py-2">
        <div className="md:rounded-xl bg-primary md:shadow-sm md:px-6 md:py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className=" col-span-2 w-full md:w-auto md:col-span-1 flex gap-2 items-center px-2 py-2">
              <InputGroup value={inputSearch} setValue={setInputSearch} placeholder="Nombre del producto" />
              <button className="cursor-pointer" onClick={() => router.push('/inventory/create')}>
                <img src="/addIcon.png" className="w-10 h-10 object-contain self-center" alt="" />
              </button>
            </div>

            <div className="mt-3 col-span-2 w-full px-2 md:w-auto md:col-span-1 md:mt-2 flex justify-between items-center gap-2 bg-tertiary rounded-4xl py-2 md:py-2">
              <FilterTab id="general" label="Todos" />
              <FilterTab id="available" label="Disponibles" />
              <FilterTab id="pending" label="Agotados" />
            </div>
          </div>
          <div className="mt-3 md:mt-6 rounded-lg md:bg-quaternary p-2 md:p-4">
            <div className="max-h-[50vh] md:max-h-[50vh] overflow-y-auto pr-1 md:pr-2 space-y-2 md:grid md:grid-cols-4 md:gap-3 md:space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className=" relative rounded-lg bg-tertiary border border-neutral-700 p-1 md:py-6 md:px-3   md:shadow-sm hover:md:shadow-md transition flex md:flex-col items-center gap-3 md:rounded-2xl"
                >
                 
                  <div className="shrink-0 md:mt-3 size-20 rounded-xl overflow-hidden ring-1 ring-black/5 md:w-full md:h-36 md:size-auto">
                    <img className="object-cover h-full w-full" src="/tv.jpeg" alt="" />
                  </div>
                  <div className="flex-8 grid grid-cols-3 gap-2 text-xs md:text-sm md:grid-cols-12 md:w-full">
                    <div className="col-span-3 md:col-span-12 min-w-0">
                      <OverflowText text={p.name} lines={1} className="font-semibold  md:text-lg text-secondary/80" />
                    </div>
                    <div className="col-span-2 md:col-span-8 min-w-0">
                      <div className="font-medium md:text-s text-gray-400">Descripción</div>
                      <OverflowText text={p.desc} lines={2} className="text-globalone" />
                    </div>
                    <div className="col-span-2 md:col-span-4 min-w-0">
                      <div className="font-medium md:text-s text-gray-400 text-center">Modelos</div>
                      <div className="text-secondary bg-quaternary/40 rounded-full font-semibold text-center text-md">{p.qty}</div>
                    </div>
                  </div>
                  <div className="flex-1 md:absolute md:top-2 md:right-2 px-2">
                    <ProductOptionsMenu
                      productId={p.id}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                  
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 md:mt-2">
            <div className="text-center text-globalone text-xl font-semibold md:text-lg">Operaciones de Inventario</div>
            <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3 bg-tertiary p-2 rounded-xl text-md">
              <Link href="/inventory/carga" className="rounded-xl bg-secondary hover:bg-cyan-700 text-white px-3 py-3 md:text-sm text-center">Carga</Link>
              <Link href="/inventory/descarga" className="rounded-xl bg-secondary hover:bg-sky-700 text-white px-3 py-3 md:text-sm text-center">Descarga</Link>
              <Link href="/inventory/transferencia" className="rounded-xl bg-secondary hover:bg-sky-700 text-white px-3 py-3 md:text-sm text-center">Traslado</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      <ProductDetailModal
        open={detailOpen}
        productId={selectedId ?? undefined}
        onClose={() => setDetailOpen(false)}
        onRedirect={(id) => router.push(`/inventory/${id}`)}
      />
    </>
  );
}