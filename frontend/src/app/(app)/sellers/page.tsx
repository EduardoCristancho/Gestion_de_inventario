"use client";

import { useEffect, useState } from "react";
import SearchSellers from "./searchSellers";
import { IoIosMore } from "react-icons/io";
import MoreMenu from "./moreMenu";

export interface seller {
  id: number;
  username: string;
  rol: string;
  warehouse: string;
}

async function getSellers(setSellers: (sellers: seller[]) => void) {
  /* try {
    const response = await fetch("api/sellers");
    const sellers = await response.json();
    if (response.ok) {
      setSellers(sellers);
    } else {
      throw new Error("Failed to fetch sellers");
    }
  } catch (error) {
    alert("Error al obtener los vendedores");
    console.error("Error fetching sellers:", error);
  } */
  setSellers([
    { id: 1, username: "Vendedor 1", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 2, username: "Vendedor 2", rol: "Ocupación 2", warehouse: "jk" },
    { id: 3, username: "Vendedor 3", rol: "Ocupación 3", warehouse: "jbk" },
    { id: 4, username: "Vendedor 4", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 5, username: "Vendedor 5", rol: "Ocupación 2", warehouse: "jk" },
    { id: 6, username: "Vendedor 6", rol: "Ocupación 3", warehouse: "jbk" },
    { id: 7, username: "Vendedor 7", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 8, username: "Vendedor 8", rol: "Ocupación 2", warehouse: "jk" },
    { id: 9, username: "Vendedor 9", rol: "Ocupación 3", warehouse: "jbk" },
    { id: 10, username: "Vendedor 10", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 11, username: "Vendedor 11", rol: "Ocupación 2", warehouse: "jk" },
    { id: 12, username: "Vendedor 12", rol: "Ocupación 3", warehouse: "jbk" },
    { id: 13, username: "Vendedor 1", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 14, username: "Vendedor 2", rol: "Ocupación 2", warehouse: "jk" },
    { id: 15, username: "Vendedor 3", rol: "Ocupación 3", warehouse: "jbk" },
    { id: 16, username: "Vendedor 4", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 17, username: "Vendedor 5", rol: "Ocupación 2", warehouse: "jk" },
    { id: 18, username: "Vendedor 6", rol: "Ocupación 3", warehouse: "jbk" },
    { id: 19, username: "Vendedor 7", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 20, username: "Vendedor 8", rol: "Ocupación 2", warehouse: "jk" },
    { id: 21, username: "Vendedor 9", rol: "Ocupación 3", warehouse: "jbk" },
    { id: 22, username: "Vendedor 10", rol: "Ocupación 1", warehouse: "xnñ" },
    { id: 23, username: "Vendedor 11", rol: "Ocupación 2", warehouse: "jk" },
    { id: 24, username: "Vendedor 12", rol: "Ocupación 3", warehouse: "jbk" },
  ]);
}

function Sellers() {
  const [sellers, setSellers] = useState<seller[]>([]);
  const [filteredSellers, setFilteredSellers] = useState<seller[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    getSellers(setSellers);
    getSellers(setFilteredSellers);
  }, []);

  return (
    <div
      className="flex flex-col items-center w-[100dvw]"
      onClick={(e) => {
        const menus = document.querySelectorAll(".more-menu");
        const buttons = document.querySelectorAll(".more-button");
        const target = e.target as Node;

        // Verifica si el target está dentro de algún menú o botón
        for (const menu of menus) {
          if (menu.contains(target)) return;
        }
        for (const button of buttons) {
          if (button.contains(target)) return;
        }
        setOpenMenuId(null);
      }}
    >
      <SearchSellers
        sellers={sellers}
        setFilteredSellers={setFilteredSellers}
      />
      <div
        className={`h-[71dvh] w-full sm:w-full pt-7 px-5 overflow-y-scroll gap-5 md:gap-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${
          filteredSellers.length < 5 ? "justify-center items-center" : ""
        }`}
      >
        {filteredSellers.map((seller) => (
          <div
            className="relative w-full flex flex-col text-center shadow-[10px_10px_4px_rgba(0,0,0,0.4)] bg-secondary rounded-xl py-2.5 md:gap-2.5 md:py-5 text-white gap-0.5"
            key={seller.id}
          >
            <IoIosMore
              className="absolute text-3xl top-2 right-4 cursor-pointer more-button"
              onClick={() =>
                setOpenMenuId(openMenuId === seller.id ? null : seller.id)
              }
            />
            {openMenuId === seller.id && (
              <div className="more-menu z-50">
                <MoreMenu sellerId={seller.id}/>
              </div>
            )}
            <img
              src="./PC.png"
              className="rounded-full h-20 w-20 self-center"
              alt=""
            />
            <span className="text-xl font-bold">{seller.username}</span>
            <span className="bg-white w-9/10 self-center rounded-2xl py-1.5 text-info">
              {seller.rol}
            </span>
            <span>{seller.warehouse}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sellers;
