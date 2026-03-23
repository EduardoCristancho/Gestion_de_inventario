"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Scan, Plus, Trash2, Save, X, Image as ImageIcon } from "lucide-react";
import { checkCameraAvailability } from "@/hooks/checkCamara";
import CodeScanner from "@/components/codeScanner";
import SelectImageModal from "./SelectImageModal";
import { AiFillPicture } from "react-icons/ai";
import { AiTwotonePicture } from "react-icons/ai";
import { showToast } from "nextjs-toast-notify";

interface ProductModel {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  image: string | null;
}

export default function CreateProduct() {
  // Estados para el producto general
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // Estados para el modelo actual
  const [modelName, setModelName] = useState("");
  const [modelSku, setModelSku] = useState("");
  const [modelQuantity, setModelQuantity] = useState("");
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  // Lista de modelos agregados
  const [models, setModels] = useState<ProductModel[]>([]);
  
  // Estados y funciones para  scanner y camara
  const [hasCamara, setHasCamara] = useState<boolean>(false)
  const [renderScan, setRenderScan] = useState<boolean>(false)
  const [showSelectImage, setShowSelectImage] = useState<boolean>(false)
  const cameraRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const handleCloseSelectImage = ()=>{
    setShowSelectImage(false)
  }

  const handleImageSelection = () => {
    fileRef.current?.click()
  }

  const handleTakePhoto = () => {  
    cameraRef.current?.click()
  }

  // funcion para capturar la imagen de la seleccion o la camara y renderizar en pantalla
  const handleFileChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    try{
        const file = event.target.files?.[0];
        if (file){
            //creacion de url
            const urlTemp = URL.createObjectURL(file);
            setImagePreview(urlTemp);
            setModelImage(urlTemp);
            setShowSelectImage(false);
        }
    }catch(error: any ){
        console.log("hello");
    }
  }
  const handleCamaraAvailability = async ()=> {
    const hasCamara = await checkCameraAvailability();
    if(hasCamara){
        setHasCamara(true)
    }else{
        setHasCamara(false)
    }
  }

  

  //useEffect en carga inicial

  useEffect(()=>{
    //validacion de camara en el dispositivo para habilitar opciones dependiente de la camara
    handleCamaraAvailability()

  },[])

  // Agregar modelo a la lista
  const handleAddModel = () => {
    if (!modelName || !modelSku || !modelQuantity) {
      alert("Por favor completa todos los campos del modelo");
      return;
    }

    const newModel: ProductModel = {
      id: Date.now().toString(),
      name: modelName,
      sku: modelSku,
      quantity: parseInt(modelQuantity),
      image: modelImage,
    };

    setModels([...models, newModel]);
    handleClearModel();
  };

  // Limpiar formulario de modelo
  const handleClearModel = () => {
    setModelName("");
    setModelSku("");
    setModelQuantity("");
    setModelImage(null);
    setImagePreview(null);
  };

  // Eliminar modelo de la lista
  const handleDeleteModel = (id: string) => {
    setModels(models.filter((model) => model.id !== id));
  };

  // Limpiar todo el formulario
  const handleClearAll = () => {
    setProductName("");
    setProductDescription("");
    setModels([]);
    handleClearModel();
  };

  // Guardar producto
  const handleSave = () => {
    if (!productName || models.length === 0) {
      alert("Debes agregar al menos un modelo al producto");
      return;
    }
    console.log("Guardando producto:", { productName, productDescription, models });
    // Aquí iría la lógica para guardar
  };

  return (
    <div className="h-full overflow-y-auto px-3 md:px-6 py-4 pb-5">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Título */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Nuevo Producto</h1>
          <p className="text-white/60 text-sm mt-1">Completa la información del producto y sus modelos</p>
        </div>

        {/* Layout: Mobile vertical, Desktop horizontal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Columna Izquierda: Información General + Formulario de Modelo */}
          <div className="space-y-6">
            
            {/* Sección 1: Datos Generales del Producto */}
            <div className="bg-tertiary/95 backdrop-blur-md rounded-xl border border-white/10 p-4 md:p-6 shadow-xl">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-[var(--color-info)]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[var(--color-info)] font-bold">1</span>
                </div>
                Información General
              </h2>

              <div className="space-y-4">
                {/* Nombre del Producto */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Ej: Laptop Dell"
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Describe las características generales del producto..."
                    rows={4}
                    className="w-full bg-white/10 text-white px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-info)] focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Formulario de Modelo */}
            <div className="bg-tertiary/95 backdrop-blur-md rounded-xl border border-white/10 p-4 md:p-6 shadow-xl">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-[var(--color-success)]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[var(--color-success)] font-bold">2</span>
                    </div>
                    Agregar Modelo
                </h2>
                {/*Icono de seleccionar imagen */}
                {
                    !imagePreview&&(
                        <div className="flex flex-col items-center top-0 right-5 hover:bg-primary/10 hover:cursor-pointer rounded-lg" onClick={()=>{setShowSelectImage(true)}}>
                            <AiTwotonePicture className="w-15 h-15"  />
                            <span className="text-globalone text-sm bg-primary/20 p-1 rounded-lg">Agregar Imagen</span>
                        </div>
                    )
                }
              </div>
              
              
              
              <div className="space-y-4">
                {/* Preview de Imagen */}
                {imagePreview && (
                  <div className="relative w-full h-40 bg-white/5 rounded-xl overflow-hidden border border-white/10 group">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setModelImage(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full transition-colors opacity-0 hover:cursor-pointer opacity-100"
                      title="Eliminar imagen"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <p className="text-white text-xs font-medium">Imagen seleccionada</p>
                    </div>
                  </div>
                )}

                {/* Nombre del Modelo */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Nombre del Modelo *
                  </label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="Ej: Toalla Azul"
                    className="w-full bg-white/10 text-white px-4 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-success)] text-sm"
                  />
                </div>

                {/* SKU y Cantidad */}
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Código SKU *
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={modelSku}
                        onChange={(e) => setModelSku(e.target.value)}
                        placeholder="SKU-001"
                        className="w-full bg-white/10 text-white px-4 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-success)] text-sm"
                      />
                      {/* Botón para escanear codigo qr o BarCode */}
                      {hasCamara && (
                        <button
                          type="button"
                          className="flex justify-center gap-1 bg-[var(--color-info)]/20 hover:bg-[var(--color-info)]/30 text-[var(--color-info)] px-4 py-2.5 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
                          title="Escanear código"
                          onClick={() => { setRenderScan(true) }}
                        >
                          <Scan className="w-4 h-4" />
                          <span className="sm:inline">Escanear</span>
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Cantidad *
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={modelQuantity}
                        onChange={(e) => setModelQuantity(e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-full bg-white/10 text-white px-4 py-2.5 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-success)] text-sm"
                      />
                    </div>
                  </div>

                  {/* inputs de selección de imagen y captura de imagen */}
                  {/* input para captura por cámara */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    ref={cameraRef} 
                    className="hidden" 
                    onChange={(e) => { handleFileChanges(e) }}
                  />
                  {/* input para captura desde sistema de archivos */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileRef} 
                    className="hidden" 
                    onChange={(e) => { handleFileChanges(e) }} 
                  />
                </div>

                {/* Botones de Acción del Modelo */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClearModel}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Limpiar</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddModel}
                    className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Lista de Modelos */}
          <div className="space-y-6">
            <div className="bg-tertiary/95 backdrop-blur-md rounded-xl border border-white/10 p-4 md:p-6 shadow-xl lg:h-full">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[var(--color-warning)]/20 rounded-lg flex items-center justify-center">
                    <span className="text-[var(--color-warning)] font-bold">3</span>
                  </div>
                  Modelos Agregados
                </span>
                <span className="text-sm text-white/60">
                  {models.length} {models.length === 1 ? 'modelo' : 'modelos'}
                </span>
              </h2>

              {/* DataTable de Modelos */}
              <div className="space-y-2 max-h-[calc(100vh-300px)] lg:max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {models.length === 0 ? (
                  <div className="text-center py-12 text-white/40">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium">No hay modelos agregados</p>
                    <p className="text-xs mt-1">Completa el formulario y haz clic en "Agregar"</p>
                  </div>
                ) : (
                  models.map((model) => (
                    <div
                      key={model.id}
                      className="bg-white/5 rounded-lg p-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                    >
                      {/* Imagen */}
                      <div className="w-14 h-14 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {model.image ? (
                          <img src={model.image} alt={model.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <ImageIcon className="w-6 h-6 text-white/40" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm truncate">{model.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-white/60 text-xs">SKU: {model.sku}</span>
                          <span className="text-[var(--color-success)] text-xs font-medium bg-[var(--color-success)]/10 px-2 py-0.5 rounded">
                            Stock: {model.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Botón Eliminar */}
                      <button
                        onClick={() => handleDeleteModel(model.id)}
                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex-shrink-0"
                        title="Eliminar modelo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botones Finales */}
        <div className="flex flex-col sm:flex-row gap-3 pb-4">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-danger)] hover:bg-[var(--color-danger)]/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            <span>Limpiar Todo</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Guardar Producto</span>
          </button>
        </div>
      </div>

      {/* Renderizado condicional del escaner */}

      {
        hasCamara&&renderScan&&(
            <CodeScanner setValue={setModelSku} setClosed={setRenderScan} />
        )
      }

      {/* Renderizado condicional del desplegable para seleccionar la imagen */}

      {showSelectImage && (
        <SelectImageModal isOpen={showSelectImage} onClose={handleCloseSelectImage} onSelectFromGallery={handleImageSelection} onTakePhoto={handleTakePhoto}/>
      )}
    </div>
  );
}