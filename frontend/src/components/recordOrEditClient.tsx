"use client";

import { useState, useEffect } from "react";
import { client } from "../app/(app)/clients/page";

function RecordOrEditClient({
  title,
  client,
  action,
}: {
  title: string;
  client?: client;
  action: (clientState: client) => void | boolean;
}) {
  const [clientState, setClientState] = useState<client>({
    id: 0,
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (client) {
      setClientState(client);
    }
  }, [client]);

  return (
    <div className="flex flex-col items-center h-[85dvh] lg:h-[80dvh] min-w-[370px]">
      <div className="grid grid-cols-6 bg-secondary w-9/10 h-8/10 pt-3.5 pb-10 rounded-xl pl-9 text-white place-items-center mt-8 gap-3.5 lg:w-5/10">
        <img src="customers.png" alt="" className="h-10 w-10 col-span-1" />
        <span className="text-white text-4xl font-bold col-span-5 place-self-start self-center ml-[10%] ">
          {title}
        </span>
        <span className="col-span-1">Cédula:</span>
        <input
          type="number"
          placeholder="Ingrese la cedula"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-0.5 text-center text-black placeholder:text-black ml-1 col-span-5 w-8/10 self-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden"
          onClick={(e) => ((e.target as HTMLInputElement).placeholder = "")}
          onBlur={(e) =>
            ((e.target as HTMLInputElement).placeholder = "Ingrese la cedula")
          }
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/\D/g, "").replace(/^0+/, "");
          }}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "").replace(/^0+/, "");
            setClientState((prev) => ({
              ...prev,
              id: value ? Number(value) : 0,
            }));
          }}
          value={clientState.id === 0 ? "" : clientState.id}
        />
        <span className="col-span-1">Nombre:</span>
        <input
          type="text"
          placeholder="Ingrese el nombre"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-0.5 text-center text-black placeholder:text-black ml-1 col-span-5 w-8/10 self-center"
          onClick={(e) => ((e.target as HTMLInputElement).placeholder = "")}
          onBlur={(e) =>
            ((e.target as HTMLInputElement).placeholder = "Ingrese el nombre")
          }
          onChange={(e) =>
            setClientState((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
          }}
          value={clientState.firstName}
        />
        <span className="col-span-1">Apellido:</span>
        <input
          type="text"
          placeholder="Ingrese el apellido"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-0.5 text-center text-black placeholder:text-black ml-1 col-span-5 w-8/10 self-center"
          onClick={(e) => ((e.target as HTMLInputElement).placeholder = "")}
          onBlur={(e) =>
            ((e.target as HTMLInputElement).placeholder = "Ingrese el apellido")
          }
          onChange={(e) =>
            setClientState((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
          }}
          value={clientState.lastName}
        />
        <span className="col-span-1">Dirección:</span>
        <input
          type="text"
          placeholder="Ingrese la dirección"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-0.5 text-center text-black placeholder:text-black ml-1 col-span-5 w-8/10 self-center"
          onClick={(e) => ((e.target as HTMLInputElement).placeholder = "")}
          onBlur={(e) =>
            ((e.target as HTMLInputElement).placeholder =
              "Ingrese la dirección")
          }
          onChange={(e) =>
            setClientState((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          value={clientState.address}
        />
        <span className="col-span-1 text-center">Correo Electrónico:</span>
        <input
          type="email"
          placeholder="Ingrese el correo"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-0.5 text-center text-black placeholder:text-black ml-1 col-span-5 w-8/10 self-center"
          onClick={(e) => ((e.target as HTMLInputElement).placeholder = "")}
          onBlur={(e) =>
            ((e.target as HTMLInputElement).placeholder = "Ingrese el correo")
          }
          onChange={(e) =>
            setClientState((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          value={clientState.email}
        />
        <span className="col-span-1">Teléfono:</span>
        <input
          type="text"
          placeholder="Ingrese el teléfono"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-0.5 text-center text-black placeholder:text-black ml-1 col-span-5 w-8/10 self-center"
          onClick={(e) => ((e.target as HTMLInputElement).placeholder = "")}
          onBlur={(e) =>
            ((e.target as HTMLInputElement).placeholder = "Ingrese el teléfono")
          }
          onChange={(e) =>
            setClientState((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/\D/g, "").replace(/^0+/, "");
          }}
          value={clientState.phone}
        />
      </div>
      <button
        className="py-3 px-5 bg-success rounded-xl text-white text-xl font-bold shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-success/90 duration-500 self-center ml-5 mt-5"
        onClick={async () => {
          if (
            !clientState.id ||
            !clientState.firstName.trim() ||
            !clientState.lastName.trim() ||
            !clientState.address.trim() ||
            !clientState.email.trim() ||
            !clientState.phone.trim()
          ) {
            alert(
              "Todos los campos son obligatorios y no pueden ser cero ni vacíos."
            );
            return;
          }
          const result = await action(clientState);
          if (result === false) {
            window.history.back();
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }
        }}
      >
        {title.split(" ")[0]}
      </button>
    </div>
  );
}

export default RecordOrEditClient;
