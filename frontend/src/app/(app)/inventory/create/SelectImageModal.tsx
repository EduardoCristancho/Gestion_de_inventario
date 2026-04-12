"use client";

import { Camera, Image, X } from "lucide-react";

interface SelectImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFromGallery: () => void;
  onTakePhoto: () => void;
  hasCamara: boolean;
}

export default function SelectImageModal({
  isOpen,
  onClose,
  onSelectFromGallery,
  onTakePhoto,
  hasCamara,
}: SelectImageModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-20 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-tertiary/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl w-full max-w-sm md:max-w-lg mx-auto transform transition-all">
          
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 hover:cursor-pointer rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white/70" />
            </button>
            <h2 className="text-xl font-semibold text-white">Seleccionar Imagen</h2>
            <p className="text-white/60 text-sm mt-1">Elige una opción para agregar la imagen</p>
          </div>

          {/* Options */}
          <div className="p-6 space-y-3">
            {/* Galería */}
            <button
              onClick={onSelectFromGallery}
              className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group hover:cursor-pointer"
            >
              <div className="w-12 h-12 bg-[var(--color-info)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-info)]/30 transition-colors">
                <Image className="w-6 h-6 text-[var(--color-info)]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-medium">Galería</h3>
                <p className="text-white/60 text-sm">Seleccionar desde el almacenamiento</p>
              </div>
            </button>
          {/* Cámara */}
          { hasCamara && (
            <button
              onClick={onTakePhoto}
              className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all group hover:cursor-pointer"
            >
              <div className="w-12 h-12 bg-[var(--color-success)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-success)]/30 transition-colors">
                <Camera className="w-6 h-6 text-[var(--color-success)]" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-white font-medium">Cámara</h3>
                <p className="text-white/60 text-sm">Tomar una foto ahora</p>
              </div>
            </button>
            )
          }
          </div>
        </div>
      </div>
    </>
  );
}
