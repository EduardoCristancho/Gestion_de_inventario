
import React, { useEffect, useState } from "react";

interface selectable {
  id: number;
  name: string;
}

export default function SearchableSelect({
  setId,
  url
}: {
  setId: (id: number) => void;
  url: string
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
        setValues(data);
        setFilteredValues(data);
      })
      .catch((err) => console.error("Error al cargar categorías", err));
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredValues(values);
    } else {
      setFilteredValues(
        values.filter((cat) =>
          cat.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, values]);

  const handleSelect = (id: number, name: string) => {
    setId(id);
    setIsOpen(false);
    setSearch(name); // opcional, limpia la búsqueda al seleccionar
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
    <div ref={ref} className="relative w-[80%]">
      {/* Input de búsqueda */}
      <input
        type="text"
        className="w-full bg-tertiary rounded-xl p-1 outline-none"
        placeholder={"Buscar..."}
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Dropdown de opciones */}
      {isOpen && (
        <div className="absolute z-10 bg-tertiary rounded-xl shadow-lg w-full max-h-48 overflow-y-auto mt-1">
          <div
            className="p-2 hover:bg-quaternary cursor-pointer rounded-lg"
            onClick={() => handleSelect(0, "Todos")}
          >
            Todos
          </div>
          {filteredValues.length > 0 ? (
            filteredValues.map((value) => (
              <div
                key={value.id}
                className="p-2 hover:bg-quaternary cursor-pointer rounded-lg"
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