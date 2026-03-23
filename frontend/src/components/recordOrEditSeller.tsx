"use client";

import { pwSeller } from "@/app/(app)/sellers/edit/page";
import { useEffect, useState } from "react";

interface warehouse {
  id: number;
  name: string;
}

interface rol {
  id: number;
  name: string;
}

export interface newPwSeller {
  id: number;
  username: string;
  password: string;
  rol: {
    id: number;
    name: string;
  };
  warehouse: {
    id: number;
    name: string;
  };
}

function RecordOrEditSeller({
  seller,
  title,
  action,
}: {
  seller: pwSeller;
  title: string;
  action: (seller: newPwSeller) => void | boolean;
}) {
  const [newSeller, setNewSeller] = useState<newPwSeller>(
    {
      id: seller.id,
      username: seller.username,
      password: seller.password,
      rol: {
        id: 0,
        name: "", 
      },
      warehouse: {
        id: 0,
        name: "", 
      },
    }
  );
  const [warehouses, setWarehouses] = useState<warehouse[]>([
    { id: 1, name: "luzmar" },
    { id: 2, name: "mirena" },
    { id: 3, name: "corina" },
    { id: 4, name: "carlota" },
  ]);
  const [rol, setRol] = useState<rol[]>([
    { id: 1, name: "castellana" },
    { id: 2, name: "tobogan" },
    { id: 3, name: "clavelinas" },
    { id: 4, name: "ávila" },
  ]);

  useEffect(() => {
    async function fetchWarehouses() {
      try {
        const response = await fetch("warehouses");
        if (!response.ok) {
          throw new Error("Failed to fetch warehouses");
        }
        const data = await response.json();
        setWarehouses(data);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
        alert("Error al obtener los almacenes");
      }
    }
    async function fetchRolls() {
      try {
        const response = await fetch("roles");
        if (!response.ok) {
          throw new Error("Failed to fetch roles");
        }
        const data = await response.json();
        setRol(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        alert("Error al obtener los roles");
      }
    }
    /* fetchWarehouses();
    fetchRolls(); */
  }, []);

  return (
    <div className="flex flex-col items-center h-[90dvh] min-w-[370px]">
      <div className="grid grid-cols-12 bg-secondary w-9/10 h-full pt-3.5 pb-10 rounded-xl pl-9 text-white place-items-center mt-8 lg:w-5/10">
        <span className="h-10 w-10 col-span-2"></span>
        <span className="text-white text-4xl font-bold col-span-10 place-self-start self-center ml-[10%] ">
          {title}
        </span>
        <span className="col-span-3">Nombre de Usuario:</span>
        <input
          type="text"
          placeholder="Ingrese el nombre de usuario"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-1 text-center text-black placeholder:text-black ml-1 col-span-9 w-8/10 self-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden"
          value={newSeller.username}
          onChange={(e) =>
            setNewSeller((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <span className="col-span-3">Contraseña:</span>
        <input
          type="text"
          placeholder="Ingrese la contraseña"
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-1 text-center text-black placeholder:text-black ml-1 col-span-9 w-8/10 self-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden"
          value={newSeller.password}
          onChange={(e) =>
            setNewSeller((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <span className="col-span-3">Rol:</span>
        <select
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-1 text-center text-black placeholder:text-black ml-1 col-span-9 w-8/10 self-center"
          onChange={(e) => {
            const selectedRol = rol.find(
              (r) => r.id === Number(e.target.value)
            );
            setNewSeller((prev) => ({
              ...prev,
              rol: selectedRol ?? { id: 0, name: "" },
            }));
          }}
        >
          <option value={0}>Seleccione un rol</option>
          {rol.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.name}
            </option>
          ))}
        </select>
        <span className="col-span-3">Almacén:</span>
        <select
          className="text-ellipsis whitespace-nowrap bg-white rounded-lg p-1 text-center text-black placeholder:text-black ml-1 col-span-9 w-8/10 self-center"
          onChange={(e) => {
            const selectedWarehouse = warehouses.find(
              (w) => w.id === Number(e.target.value)
            );
            setNewSeller((prev) => ({
              ...prev,
              warehouse: selectedWarehouse ?? { id: 0, name: "" },
            }));
          }}
        >
          <option value={0}>Seleccione un almacén</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="py-3 px-5 bg-success rounded-xl text-white text-xl font-bold shadow-lg hover:shadow-2xl hover:cursor-pointer hover:bg-success/90 duration-500 self-center ml-5 mt-5"
        onClick={async () => {
          if (
            !newSeller.username ||
            !newSeller.password ||
            newSeller.rol.id === 0 ||
            newSeller.warehouse.id === 0
          ) {
            alert(
              "Todos los campos son obligatorios y no pueden ser cero ni vacíos."
            );
            return;
          }
          action(newSeller);
        }}
      >
        {title.split(" ")[0]}
      </button>
    </div>
  );
}

export default RecordOrEditSeller;
