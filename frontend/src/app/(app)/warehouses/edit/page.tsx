"use client";

import { useEffect, useState } from "react";
import RecordOrEditWarehouse from "@/components/recordOrEditWarehouse";
import { useSearchParams } from "next/navigation";
import { warehouse } from "@/components/recordOrEditWarehouse";

function editWarehouse(warehouse: warehouse) {
  console.log(
    warehouse.id,
  );
  fetch("/api/editWarehouse", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: warehouse.id,
      username: warehouse.name,
      password: warehouse.mail,
      rolId: warehouse.address,
      WarehouseId: warehouse.phone,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al editar el almacén");
      alert("almacén editado correctamente");
    })
    .catch((error) => {
      alert("Ocurrió un error al editar el almacén " + warehouse.name);
      console.error(error);
    });
}

function EditWarehousePage() {
  const searchParams = useSearchParams();

  const warehouse = {
    id: Number(searchParams.get("warehouseId") ?? 0),
    name: searchParams.get("name") ?? "",
    mail: searchParams.get("mail") ?? "",
    address: searchParams.get("address") ?? "",
    phone: searchParams.get("phone") ?? "",
    email: searchParams.get("email") ?? "",
  };

  return (
    <RecordOrEditWarehouse
      title="Editar Almacén"
      warehouse={warehouse}
      action={editWarehouse}
    />
  );
}

export default EditWarehousePage;
