"use client";
import { useState, useRef, useEffect, RefObject } from "react";
import { Building, Lock, User, Mail, Phone, MapPin, FileText, Camera, ArrowRight, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function Signup() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados del formulario
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [rif, setRif] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Manejar selección de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCompanyLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!companyName || !username || !password) {
      showToast.warning("Por favor completa los campos obligatorios", {
        position: "top-center",
        duration: 5000
      });
      return;
    }

    if (password !== confirmPassword) {
      showToast.error("Las contraseñas no coinciden", {
        position: "top-center",
        duration: 5000
      });
      return;
    }

    if (password.length < 6) {
      showToast.warning("La contraseña debe tener al menos 6 caracteres", {
        position: "top-center",
        duration: 5000
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('Name', companyName);
      formData.append('UserName', username);
      formData.append('Password', password);
      
      if (companyLogo) formData.append('Photo', companyLogo);
      if (email) formData.append('Email', email);
      if (rif) formData.append('Rif', rif);
      if (address) formData.append('Address', address);
      if (phone) formData.append('phone', phone);

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showToast.success("Registro exitoso. Redirigiendo al login...", {
          position: "top-center",
          duration: 3000
        });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        showToast.error(data.message || "Error al registrar la empresa", {
          position: "top-center",
          duration: 5000
        });
      }
    } catch (error) {
      console.error("Error:", error);
      showToast.error("Error de conexión. Por favor intenta nuevamente.", {
        position: "top-center",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="bg-[#586C8C] min-h-screen flex items-center justify-center font-sans py-8 px-4">
      <div className="w-full max-w-6xl lg:grid lg:grid-cols-2 lg:gap-10 lg:bg-white/10 lg:p-6 lg:rounded-2xl lg:shadow-xl">
        
        {/* Columna Izquierda - Información */}
        <div className="hidden lg:flex flex-col justify-between p-8 bg-[#0284c7] text-white rounded-xl shadow-lg relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-4xl font-bold mb-4">Bienvenido a Excesoft</h2>
            <p className="text-lg text-white/90 mb-6">
              La solución completa para gestionar tu inventario de manera eficiente.
            </p>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Control total de tu stock
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Gestión de ventas en tiempo real
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Reportes detallados y análisis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Múltiples almacenes y usuarios
              </li>
            </ul>
          </div>
          <div className="z-10 text-center flex justify-center mt-8">
            <img src="/Company.svg" alt="Company" className="w-48 h-48" />
          </div>
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-white/10 rounded-full"></div>
          <div className="absolute -top-10 -left-20 w-48 h-48 bg-white/10 rounded-full"></div>
        </div>

        {/* Columna Derecha - Formulario */}
        <div className="w-full mx-auto lg:max-w-none relative flex flex-col justify-center">
          
          {/* Olas decorativas móvil */}
          <div className="absolute top-0 left-0 transform scale-x-[-1] w-full max-h-[15vh] z-20 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none" viewBox="0 0 362 134.222" fill="none">
              <path d="M0 0L362 0L362 102C362 102 341.944 123.75 312.864 131C283.784 138.25 269.244 131 269.244 131C219.925 122.131 206.821 102 116.321 102C25.8212 102 1.00269 40.5845 1.00269 40.5845L0 0Z" fill="#1FCAE8" fillRule="evenodd"/>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full max-h-[15vh] z-10 lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none" viewBox="0 0 362 134.22" fill="none">
              <path d="M0 0L362 0L362 102C362 102 341.944 123.75 312.864 131C283.784 138.25 269.244 131 269.244 131C219.925 122.131 206.821 102 116.321 102C25.8212 102 1.00265 40.5845 1.00265 40.5845L0 0Z" fill="#1A80E5" fillRule="evenodd"/>
            </svg>
          </div>

          <div className="relative z-30 w-full px-6 py-8">
            {/* Logo móvil */}
            <div className="lg:hidden flex flex-col text-center items-center mb-6">
              <img src="/Company.svg" alt="Company" className="w-20 h-20" />
              <h1 className="text-3xl font-bold text-white mt-2">Registro</h1>
              <p className="text-white/80 text-sm mt-1">Crea tu cuenta empresarial</p>
            </div>

            {/* Título escritorio */}
            <div className="hidden lg:block text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Crear Cuenta</h1>
              <p className="text-gray-600 text-sm mt-1">Completa el formulario para comenzar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Logo de la empresa */}
              <div className="flex flex-col items-center">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-full bg-white/20 border-2 border-dashed border-white/40 lg:border-gray-300 flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors overflow-hidden"
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-white lg:text-gray-400" />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-xs text-white/70 lg:text-gray-500 mt-2">Logo de la empresa (opcional)</p>
              </div>

              {/* Nombre de la empresa */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Nombre de la empresa *"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  placeholder="Ej: Myempresa@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* RIF */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="EJ: V12345678"
                  value={rif}
                  onChange={(e) => setRif(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* Dirección */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* Teléfono */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* Separador */}
              <div className="border-t border-white/20 lg:border-gray-300 my-4"></div>
              <p className="text-center text-white lg:text-gray-700 text-sm font-medium">Datos del Administrador</p>

              {/* Usuario */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  placeholder="Nombre de usuario *"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
              </div>

              {/* Contraseña */}
              <div className="relative flex gap-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="EJ: Miclave123%"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
                <div className="flex justify-center items-center text-gray-700 hover:cursor-pointer" onClick={()=> setShowPassword(!showPassword)}>
                  {
                    showPassword?(
                      <IoMdEye className="h-5 w-5"/>
                    ):(
                      <IoMdEyeOff className="h-5 w-5"/>
                    )
                  }
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div className="relative flex gap-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmar contraseña *"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                />
                <div className="flex justify-center items-center  hover:cursor-pointer"  onClick={()=> setShowConfirmPassword(!showConfirmPassword)}>
                  {
                    showConfirmPassword ? (
                      <IoMdEye className="h-5 w-5"/>
                    ):(
                      <IoMdEyeOff className="h-5 w-5"/>
                    )
                  }

                </div>
              </div>

              {/* Botón Registrar */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registrando..." : "Crear Cuenta"} 
                {!isLoading && <ArrowRight size={18} />}
              </button>

              {/* Link a Login */}
              <div className="text-center mt-4">
                <p className="text-sm text-white lg:text-gray-600">
                  ¿Ya tienes cuenta?{" "}
                  <a href="/login" className="text-[#1FCAE8] lg:text-[#0284c7] font-semibold hover:underline">
                    Inicia sesión
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
