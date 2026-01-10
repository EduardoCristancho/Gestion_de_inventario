"use client"

import { client } from "../clients/page";
import RecordOrEditClient from "../../../components/recordOrEditClient";
import { useSearchParams } from "next/navigation";

function editClient(client: client) {
  fetch("/api/editclient", {
    method: "PUT",
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
        "Ocurrió un error al editar el cliente " +
          client.firstName +
          " " +
          client.lastName
      );
      console.error(error);
    });
  }

export default function EditClientPage() {
  const searchParams = useSearchParams();

  const client = {
    id: Number(searchParams.get("clientId") ?? 0),
    firstName: searchParams.get("firstName") ?? "",
    lastName: searchParams.get("lastName") ?? "",
    address: searchParams.get("address") ?? "",
    phone: searchParams.get("phone") ?? "",
    email: searchParams.get("email") ?? "",
  };

  return (
    <RecordOrEditClient
      title="Editar Cliente"
      client={client}
      action={editClient}
    />
  );
}
