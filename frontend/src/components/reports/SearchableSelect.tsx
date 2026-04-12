
import React, { useEffect, useState } from "react";

interface selectable {
  id: number;
  name: string;
}

export default function SearchableSelect({
  setId,
  url,
  multipleSelection = true,
  Setname
}: {
  setId: (id: number) => void;
  url: string
  multipleSelection?: boolean
  Setname?: (name: string) => void;
}) {
  const [values, setValues] = useState<selectable[]>([]);
  const [filteredValues, setFilteredValues] = useState<selectable[]>([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetch(url,{credentials: 'include'})
      .then((res) => res.json())
      .then((data) => {
        setValues(data.data);
        setFilteredValues(data.data);
      })
      .catch((err) => console.error("Error al cargar categorías", err));
      
  }, []);

  useEffect(() => {
    // Asegúrate de que values sea un array antes de filtrar
  const currentValues = Array.isArray(values) ? values : [];

  if (search.trim() === "") {
    setFilteredValues(currentValues);
  } else {
    const term = search.toLowerCase();
    setFilteredValues(
      currentValues.filter((cat) =>
        cat.name?.toLowerCase().includes(term)
      )
    );
  }
}, [search, values]);

  const handleSelect = (id: number, name: string) => {
    setId(id);
    setIsOpen(false);
    setSearch(name); 
    if(Setname && typeof(Setname) == "function") Setname(name)
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Clic fuera -> cerrar
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="relative w-[100%]">
      {/* Input de búsqueda */}
      <input
        type="text"
        className="w-full bg-tertiary rounded-md p-2 border border-white/20 "
        placeholder={"Buscar..."}
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Dropdown de opciones */}
      {isOpen && (
        <div className="absolute z-10 bg-tertiary rounded-xl shadow-lg w-full max-h-48 overflow-y-auto mt-1">
          {multipleSelection == true ? (
              <div
              className="p-2 hover:bg-quaternary hover:border border-white/20 cursor-pointer rounded-sm"
              onClick={() => handleSelect(0, "")}
            >
              Todos
            </div>):(
              <div
              className="p-2 hover:bg-quaternary hover:border border-white/20 cursor-pointer rounded-sm"
              onClick={() => handleSelect(0, "")}
            >
              Ninguno
            </div>
            )
          }
          {filteredValues.length > 0 ? (
            filteredValues.map((value) => (
              <div
                key={value.id}
                className="p-2 hover:bg-quaternary hover:border border-white/20 cursor-pointer rounded-sm"
                onClick={() => handleSelect(value.id, value.name)}
              >
                {value.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No hay coincidencias</div>
          )}
        </div>
      )}
    </div>
  );
}