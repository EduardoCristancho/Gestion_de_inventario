import { useState, useEffect, useRef } from "react";

export default function TextExpandable({
  texto,
  lineas,
}: {
  texto: string;
  lineas?: number;
}) {
  const clasesLineClamp = [
  "line-clamp-1",
  "line-clamp-2",
  "line-clamp-3",
  "line-clamp-4",
  "line-clamp-5",
];
  const [expandido, setExpandido] = useState(false);
  const [esTruncado, setEsTruncado] = useState(false);
  const textoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textoRef.current;
    if (el && !expandido) {
      // Medimos si el texto está truncado
      const truncado = el.scrollHeight > el.clientHeight;
      setEsTruncado(truncado);
    }
  }, [texto, expandido]);

  return (
    <div className="relative ">
      <p
        ref={textoRef}
        className={`transition-all duration-300 text-ellipsis ${
          expandido ? "" : `line-clamp-${lineas }`
        }`}
      >
        {texto}
      </p>
      {esTruncado && (
        <button
          onClick={() => setExpandido((prev) => !prev)}
          className="text-blue-500 hover:underline m-0 text-sm"
        >
          {expandido ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}
