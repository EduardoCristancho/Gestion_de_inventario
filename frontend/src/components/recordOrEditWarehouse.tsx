"use client";

import { useState, useEffect } from "react";

export interface warehouse {
  id: number;
  name: string;
  mail: string;
  address: string;
  phone: string;
}

function RecordOrEditWarehouse({
  title,
  warehouse,
  action,
}: {
  title: string;
  warehouse?: warehouse;
  action: (warehouseState: warehouse) => void | boolean;
}) {
  const [warehouseState, setWarehouseState] = useState<warehouse>(
    {
      id: 0,
      name: "",
      mail: "",
      address: "",
      phone: "",
    }
  );

  useEffect(() => {
    if (warehouse) {
      setWarehouseState(warehouse);
    }
  }, [warehouse]);

  return (
    <div className="flex flex-col items-center h-[85dvh] lg:h-[80dvh] min-w-[370px]">
      <div className="grid grid-cols-6 bg-secondary w-9/10 h-8/10 pt-3.5 pb-10 rounded-xl pl-9 text-white place-items-center mt-8 gap-3.5 lg:w-5/10">
        <img src="customers.png" alt="" className="h-10 w-10 col-span-1" />
        <span className="text-white text-4xl font-bold col-span-5 place-self-start self-center ml-[10%] ">
          {title}
        </span>
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
            setWarehouseState((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ1234567890\s]/g, "");
          }}
          value={warehouseState.name}
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
            setWarehouseState((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
          value={warehouseState.address}
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
            setWarehouseState((prev) => ({
              ...prev,
              mail: e.target.value,
            }))
          }
          value={warehouseState.mail}
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
            setWarehouseState((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/\D/g, "").replace(/^0+/, "");
          }}
          value={warehouseState.phone}
        />
      </div>
      <button
        className="py-3 px-5 bg-success rounded-xl text-white text-xl font-bold shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-success/90 duration-500 self-center ml-5 mt-5"
        onClick={async () => {
          if (
            !warehouseState.id ||
            !warehouseState.name.trim() ||
            !warehouseState.address.trim() ||
            !warehouseState.mail.trim() ||
            !warehouseState.phone.trim()
          ) {
            alert(
              "Todos los campos son obligatorios y no pueden ser cero ni vacíos."
            );
            return;
          }
          const result = await action(warehouseState);
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

export default RecordOrEditWarehouse;
