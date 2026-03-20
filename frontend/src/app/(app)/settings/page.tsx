"use client";
import { useState, useEffect } from "react";
import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaImage,
} from "react-icons/fa";

interface EnterpriseInfo {
  name: string;
  rif: string;
  address: string;
  email: string;
  phone: string;
  logo?: File | null;
}

async function fetchEnterpriseInfo() {
  const response = await fetch("/api/enterprise");
  if (!response.ok) {
    throw new Error("Failed to fetch enterprise info");
  }
  const data = await response.json();
  return data;
}

async function saveEnterpriseInfo(info: EnterpriseInfo) {

  if (!info.name || !info.rif || !info.address || !info.email || !info.phone) {
    alert("Por favor, completa todos los campos antes de guardar.");
    return false;
  }

  const formData = new FormData();
  formData.append("name", info.name);
  formData.append("rif", info.rif);
  formData.append("address", info.address);
  formData.append("email", info.email);
  formData.append("phone", info.phone);
  if (info.logo) formData.append("logo", info.logo);

  const response = await fetch("/api/enterprisem", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to save enterprise info");
  }
  return response.json();
}


export default function Settings() {
  const [enterpriseInfo, setEnterpriseInfo] = useState<EnterpriseInfo>(
   {
      name: "Mi Empresa S.A.",
      rif: "1234567890",
      address: "Calle Falsa 123, Ciudad, País",
      email: "info@miempresa.com",
      phone: "04247089654",
      logo: null,
    }
  );
  const [logoPreview, setLogoPreview] = useState<string>(
    "https://png.pngtree.com/png-clipart/20200727/original/pngtree-professional-logo-design-templates-png-image_5391639.jpg"
  );

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEnterpriseInfo({ ...enterpriseInfo, logo: file });
    setLogoPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    /*
    const loadEnterpriseInfo = async () => {
      try {
        const info = await fetchEnterpriseInfo();
        setEnterpriseInfo(info);
      } catch (error) {
        console.error("Error fetching enterprise info:", error);
      }
    };
    loadEnterpriseInfo();
    
    const loadLogo = async () => {
      try {
        const response = await fetch("/api/enterprise/logo");
        if (!response.ok) throw new Error("Failed to fetch logo");
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setLogoPreview(objectUrl);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    loadLogo();
    */
  }, []);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-globalone flex items-center gap-3">
            <FaBuilding className="text-[#29D3F1]" />
            Configuración de Empresa
          </h1>
          <p className="text-globalone mt-2 opacity-70">
            Administra la información de tu empresa
          </p>
        </div>

        <div className="bg-primary rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#29D3F1]/20 to-[#29D3F1]/10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <img
                  src={logoPreview}
                  alt="Logo de la empresa"
                  className="rounded-full h-24 w-24 sm:h-32 sm:w-32 object-cover border-4 border-white shadow-lg"
                />
                <label className="absolute bottom-0 right-0 bg-[#29D3F1] hover:opacity-90 text-white rounded-full p-3 shadow-lg transition-all duration-200 transform hover:scale-110 cursor-pointer">
                  <FaImage className="text-sm" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold text-globalone">
                  Logo de la Empresa
                </h2>
                <p className="text-globalone text-sm mt-1 opacity-60">
                  Haz clic en el ícono para cambiar el logo
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-globalone font-medium">
                <FaBuilding className="text-[#29D3F1]" />
                Nombre de la Empresa
              </label>
              <input
                type="text"
                placeholder="Ingrese el nombre de la empresa"
                className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-globalone placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#29D3F1] focus:border-transparent transition-all"
                value={enterpriseInfo?.name}
                onChange={(e) => setEnterpriseInfo({...enterpriseInfo, name: e.target.value})}
             />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-globalone font-medium">
                <FaIdCard className="text-[#29D3F1]" />
                RIF
              </label>
              <input
                type="text"
                placeholder="12345678"
                maxLength={12}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    "",
                  );
                }}
                className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-globalone placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#29D3F1] focus:border-transparent transition-all"
                value={enterpriseInfo?.rif}
                onChange={(e) => setEnterpriseInfo({...enterpriseInfo, rif: e.target.value})}
             />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-globalone font-medium">
                <FaMapMarkerAlt className="text-[#29D3F1]" />
                Dirección
              </label>
              <textarea
                placeholder="Ingrese la dirección completa"
                rows={3}
                className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-globalone placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#29D3F1] focus:border-transparent transition-all resize-none"
                value={enterpriseInfo?.address}
                onChange={(e) => setEnterpriseInfo({...enterpriseInfo, address: e.target.value})}
             />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-globalone font-medium">
                  <FaEnvelope className="text-[#29D3F1]" />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="empresa@ejemplo.com"
                  className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-globalone placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#29D3F1] focus:border-transparent transition-all"
                  value={enterpriseInfo?.email}
                  onChange={(e) => setEnterpriseInfo({...enterpriseInfo, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-globalone font-medium">
                  <FaPhone className="text-[#29D3F1]" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="04121234567"
                  maxLength={11}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      "",
                    );
                  }}
                  className="w-full px-4 py-3 bg-tertiary border border-tertiary rounded-lg text-globalone placeholder:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#29D3F1] focus:border-transparent transition-all"
                  value={enterpriseInfo?.phone}
                  onChange={(e) => setEnterpriseInfo({...enterpriseInfo, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button className="flex-1 bg-[#48bb78] hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => {
                saveEnterpriseInfo(enterpriseInfo)
                  .then((result) => {
                    if (result) alert("Información de la empresa guardada exitosamente");
                  })
                  .catch((error) => {
                    console.error("Error saving enterprise info:", error);
                    alert("Error al guardar la información de la empresa");
                  });
              }}
              >
                Guardar Cambios
              </button>
              <button className="flex-1 sm:flex-none bg-tertiary text-globalone hover:opacity-80 font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-primary rounded-lg p-4 border border-[#29D3F1]/20">
          <p className="text-sm text-globalone text-center opacity-70">
            💡 Los cambios se aplicarán en toda la aplicación una vez guardados
          </p>
        </div>
      </div>
    </div>
  );
}
