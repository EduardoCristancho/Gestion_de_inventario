"use client";

import InventoryOperationLink from "./InventoryOperationLink";
import ImageCarga from "@/assets/images/carga.png";
import ImageDescarga from "@/assets/images/descarga.png";
import ImageTraslado from "@/assets/images/traslado.png";

export const InventoryOperations = () => (
  <div className="mb-4  bg-primary border-t">
    <div className="text-center mt-4 text-lg font-bold uppercase text-globalone mb-4">
      Operaciones de Inventario
    </div>
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6  rounded-lg text-globalone  ">
      <InventoryOperationLink
        href="/inventory/burden"
        image={ImageCarga}
        text="Carga"
      />
      <InventoryOperationLink
        href="/inventory/discharge"
        image={ImageDescarga}
        text="Descarga"
      />
      <InventoryOperationLink
        href="/inventory/transfer"
        image={ImageTraslado}
        text="Traslado"
      />
    </div>
  </div>
);
