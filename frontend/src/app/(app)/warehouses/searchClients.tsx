import { LuSearch } from "react-icons/lu";
import { warehouse } from "./page";
import { useState } from "react";

function SearchClients({
  clients,
  setClients,
}: {
  clients: warehouse[];
  setClients: (clients: warehouse[]) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [clientsCopy, setClientsCopy] = useState<warehouse[]>(clients);
  const [isSearching, setIsSearching] = useState(false);

  async function handleSearch() {
    if (isSearching) return;
    setIsSearching(true);
    if (searchTerm === "") {
      alert("Por favor, ingrese un número de cliente válido.");
      setIsSearching(false);
      return;
    }
    let coincidences = clientsCopy.filter((client) =>
      client.id.toString().includes(searchTerm)
    );
    console.log("Coincidences found:", coincidences);
    if (coincidences.length > 0) {
      setClients(coincidences);
      setIsSearching(false);
    }
    if (coincidences.length === 0) {
      await fetchClients();
      setIsSearching(false);
    }
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    await handleSearch();
  }
};

  async function fetchClients() {
    try {
      const response = await fetch(`/api/getclients?search=${searchTerm}`);
      const clients = await response.json();
      setClients(clients);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      alert(
        "Error al obtener los clientes. Por favor, inténtelo de nuevo más tarde."
      );
    }
  }

  return (
    <div className="relative flex justify-center items-center gap-2 w-full">
      <input
        className="bg-white text-2xl font-bold w-95/100 md:w-9/10 xl:w-7/10 h-[50px] p-5 rounded-lg justify-center items-center shadow-xl hover:shadow-2xl hover:placeholder:text-black duration-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:hidden"
        type="number"
        id="searchInput"
        placeholder="Buscar cliente"
        disabled={isSearching}
        onChange={(e) => {
          let value = (e.target as HTMLInputElement).value;
          if (value !== "" && isNaN(Number(value))) {
            setSearchTerm("");
            setClients(clientsCopy);
            return;
          }
          setSearchTerm(value);
          if (value === "") {
            setClients(clientsCopy);
            return;
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-info p-4 rounded-full hover:cursor-pointer"
        onClick={handleSearch}
      >
        <LuSearch className="text-white" />
      </button>
    </div>
  );
}

export default SearchClients;
