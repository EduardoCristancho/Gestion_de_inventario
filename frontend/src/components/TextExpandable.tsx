import { useState, useEffect, useRef } from "react";

export default function TextExpandable({
  texto,
  lineas,
}: {
  texto: string;
  lineas?: number;
}) {
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
    <div className="relative">
      <p
        ref={textoRef}
        className={`transition-all duration-300 text-ellipsis ${
          expandido ? "" : `line-clamp-${lineas}`
        }`}
      >
        {texto}
      </p>
      {esTruncado && (
        <button
          onClick={() => setExpandido((prev) => !prev)}
          className="text-[var(--color-info)] hover:text-[var(--color-info)]/80 text-xs font-medium mt-1 transition-colors"
        >
          {expandido ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}
