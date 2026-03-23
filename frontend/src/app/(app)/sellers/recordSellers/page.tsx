"use client";

import RecordOrEditSeller, { newPwSeller } from "@/components/recordOrEditSeller";
import { useState } from "react";

function recordSeller(seller: newPwSeller) {
  fetch("/api/recordClient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(seller),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al registrar el vendedor");
      alert("Vendedor registrado correctamente");
    })
    .catch((error) => {
      alert(
        "Ocurrió un error al registrar el vendedor " +
          seller.username
      );
      console.error(error);
    });
  }

function RecordSellers() {

    const [seller, setSeller] = useState({
        id: 0,
        username: "",
        password: "",
        rol: "",
        warehouse: "",
    })


  return <RecordOrEditSeller seller={seller} title={"Registrar Cliente"} action={recordSeller}/>;
}

export default RecordSellers;