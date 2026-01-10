"use client";

import RecordOrEditClient from "@/components/recordOrEditClient";
import { client } from "../clients/page";

function recordClient(client: client) {
  fetch("/api/recordClient", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error al editar el cliente");
      alert("Cliente editado correctamente");
    })
    .catch((error) => {
      alert(
        "Ocurrió un error al editar el Cliente" +
          client.firstName + " " + client.lastName
      );
      console.error(error);
    });
  }

function recordClientsPage() {
  return <RecordOrEditClient title="Registrar Cliente" action={recordClient} />;
}
export default recordClientsPage;