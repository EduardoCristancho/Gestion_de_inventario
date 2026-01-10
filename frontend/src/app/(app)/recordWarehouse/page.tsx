"use client";

import RecordOrEditWarehouse, { warehouse as newWarehouse } from "@/components/recordOrEditWarehouse";
import { useState } from "react";

function recordWarehouse(warehouse: newWarehouse) {
  fetch("/api/recordWarehouse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(warehouse),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al registrar el almacén");
      alert("Almacén registrado correctamente");
    })
    .catch((error) => {
      alert(
        "Ocurrió un error al registrar el almacén " +
          warehouse.name
      );
      console.error(error);
    });
  }

function RecordWarehousePage() {

    const [warehouse, setWarehouse] = useState({
        id: 0,
        name: "",
        mail: "",
        address: "",
        phone: "",
    })


  return <RecordOrEditWarehouse warehouse={warehouse} title={"Registrar Almacén"} action={recordWarehouse}/>;
}

export default RecordWarehousePage;