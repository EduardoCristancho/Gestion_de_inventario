"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  productId: number;
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function ProductOptionsMenu({ productId, onView, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto md:self-start md:-mt-1 md:-mr-1 size-8 rounded-xl cursor-pointer text-globalone hover:md:bg-quaternary grid place-items-center leading-none"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        ⋯
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-1 w-36 rounded-lg bg-tertiary border border-neutral-700 shadow-md overflow-hidden z-10"
        >
          <button
            type="button"
            className="w-full text-left px-3 py-2 text-sm hover:bg-quaternary text-secondary"
            onClick={() => {
              setOpen(false);
              onView?.(productId);
            }}
          >
            Ver más
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 text-sm hover:bg-quaternary text-secondary"
            onClick={() => {
              setOpen(false);
              onEdit?.(productId);
            }}
          >
            Editar
          </button>
          <button
            type="button"
            className="w-full text-left px-3 py-2 text-sm hover:bg-quaternary text-red-400"
            onClick={() => {
              setOpen(false);
              onDelete?.(productId);
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
