"use client";

import { useEffect, useState } from "react";
import RecordOrEditSeller, {
  newPwSeller,
} from "@/components/recordOrEditSeller";
import { useSearchParams } from "next/navigation";

export interface pwSeller {
  id: number;
  username: string;
  password: string;
  rol: string;
  warehouse: string;
}

function editSeller(seller: newPwSeller) {
  console.log(
    seller.id,
    seller.username,
    seller.password,
    seller.rol.id,
    seller.warehouse.id
  );
  fetch("/api/editSeller", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: seller.id,
      username: seller.username,
      password: seller.password,
      rolId: seller.rol.id,
      WarehouseId: seller.warehouse.id,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al editar el vendedor");
      alert("vendedor editado correctamente");
    })
    .catch((error) => {
      alert("Ocurrió un error al editar el vendedor " + seller.username);
      console.error(error);
    });
}

function EditSeller() {
  const [seller, setSeller] = useState<pwSeller>({
    id: 0,
    username: "kuhkj",
    password: "nñp",
    rol: "castellana",
    warehouse: "castellana",
  });

  useEffect(() => {
    getSellerById(sellerId);
  }, []);

  const sellerId = useSearchParams().get("sellerId");

  async function getSellerById(sellerId: string | null) {
    if (!sellerId) {
      return null;
    }

    try {
      const response = await fetch(`/sellers/${sellerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch seller");
      }
      const data = await response.json();
      setSeller(data);
    } catch (error) {
      console.error("Error fetching seller:", error);
      return null;
    }
  }

  return (
    <RecordOrEditSeller
      seller={seller}
      title={"Editar Vendedor"}
      action={editSeller}
    />
  );
}

export default EditSeller;
