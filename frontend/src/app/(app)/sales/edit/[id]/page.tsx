'use client';

import { useState, useEffect, useRef, createContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, Minus, X } from 'lucide-react';
import LoadingComponent from '@/components/LoadingComponent';
import TextExpandable from '@/components/TextExpandable';
import { handleError, NotFoundError, unhandledError } from '@/utils/errorClasess';
import { saleDto } from '@/components/sale/SaleModalWithData';
import { productDetails } from '@/components/sale/SaleProduct';
import ConfirmationContainer from '@/components/confirmationContainer';


export const saleContext = createContext<saleDto | null>(null);
export default function EditSale() {
  const params = useParams();
  const router = useRouter();
  const saleId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saleData, setSaleData] = useState<saleDto | null>(null);
  const [originalSaleData, setOriginalSaleData] = useState<saleDto | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [messageOfFailure, setMessageOfFailure] = useState('');
  const productsQuantitys : { [key: number]: number } = useRef({}).current;

  // Fetch sale data
  useEffect(() => {
    const fetchSaleData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/sales/${saleId}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status !== 200 && response.status !== 404) {
          throw new unhandledError("Error al cargar los datos de la venta, intente mas tarde");
        }
        if (response.status === 404) {
          throw new NotFoundError("No se encontraron datos de la venta");
        }
        const saleData = await response.json();
        saleData.date = new Date(saleData.date).toLocaleDateString();
        setSaleData(saleData);
        setOriginalSaleData(saleData);
        for (const product of saleData.products) {
          productsQuantitys[product.id] = product.quantity;
        }
      } catch (error : any) {
        handleError(error, (error) => setMessageOfFailure(error));
      } finally {
        setLoading(false);
      }
    };

    fetchSaleData();
  }, [saleId]);

  // Calculate total
  const calculateTotal = (products: productDetails[] ) => {
    return products.reduce((sum, product) => Math.round((sum + product.subtotal) * 100) / 100, 0);
  };

  // Update quantity - allow both increase and decrease within original limits
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (!saleData || newQuantity < 1) return;
    const updatedProducts = saleData.products.map(product => {
      if (product.id === productId) {
        // Ensure quantity doesn't exceed original quantity and is at least 1
        const finalQuantity = Math.min(Math.max(newQuantity, 1), productsQuantitys[product.id]);
        const subtotal = Math.round(((product.subtotal / product.quantity) * finalQuantity)*100) / 100;
        return { ...product, quantity: finalQuantity, subtotal };
      }
      return product;
    });

    const newTotal = calculateTotal(updatedProducts);
    setSaleData({ ...saleData, products: updatedProducts, total: newTotal });
  };

  // Remove product
  const removeProduct = (productId: number) => {
    if (!saleData) return;

    const updatedProducts = saleData.products.filter(product => product.id !== productId);
    const newTotal = calculateTotal(updatedProducts);
    setSaleData({ ...saleData, products: updatedProducts, total: newTotal });
  };
    
    if (!saleData ) return;
  // Cancel changes
  const handleCancel = () => {
    if (originalSaleData) {
      setSaleData(JSON.parse(JSON.stringify(originalSaleData)));
    }
  };

  // Handle client selection (placeholder)
  const handleClientSelection = () => {
    setShowClientModal(true);
  };

  // Handle payment adjustment (placeholder)
  const handlePaymentAdjustment = () => {
    setShowPaymentModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-tertiary">
        <LoadingComponent />
      </div>
    );
  }

  if (!saleData) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-tertiary">
        <div className="text-center text-globalone">
          <p>{messageOfFailure}</p>
        </div>
      </div>
    );
  }

  return (
    <saleContext.Provider value={saleData}>
    <div className="w-full bg-tertiary min-h-[100dvh]  p-4 md:p-4 md:flex md:flex-col md:items-center md:justify-center  overflow-auto">

      {/* Main Content */}
      <div className=" flex flex-col items-center w-full md:w-[80%] md:p-2">
        
        {/* Mobile Header - Only visible on mobile */}
        <div className=" flex text-center items-center mb-4 gap-2">
          <h1 className="text-globalone text-2xl font-bold">Editar Venta</h1>
           <div>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-12 h-12 m-auto' viewBox="0 0 64 64">
              <title data-name="Layer 1"/>
              <g id="cashier">
                <path className="fill-[#414042]" d="M57.81,40.35,56,25.94a.53.53,0,0,1,0-.13V16a4.93,4.93,0,0,0-1-3c.19-.25-1.33,1-2.67,1H33.69a3.7,3.7,0,0,1-3.63-3H13a5,5,0,0,0-5,5v9.82a.53.53,0,0,1,0,.13L6.19,40.35A5,5,0,0,0,3,45V55a5,5,0,0,0,5,5H56a5,5,0,0,0,5-5V45A5,5,0,0,0,57.81,40.35ZM57,55a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V45a1,1,0,0,1,1-1H56a1,1,0,0,1,1,1Z"/>
                <path className="fill-[#231f20]" d="M57.81,40.35,56,25.94a.53.53,0,0,1,0-.13V16a4.93,4.93,0,0,0-1-3c.19-.25-1.33,1-2.67,1H33.69a3.7,3.7,0,0,1-3.63-3h0a5.47,5.47,0,0,1-.1-1V60H56a5,5,0,0,0,5-5V45A5,5,0,0,0,57.81,40.35Z"/>
                <rect className="fill-[#fff200]" height="21" rx="3.69" width="58" x="3" y="40"/>
                <path className="fill-[#ffbe00]" d="M56,6.69V10a4.84,4.84,0,0,1-.53,2.21A3.68,3.68,0,0,1,52.31,14H33.69a3.7,3.7,0,0,1-3.63-3h0a5.47,5.47,0,0,1-.1-1V6.69A3.69,3.69,0,0,1,33.69,3H52.31A3.69,3.69,0,0,1,56,6.69Z"/>
                <path className="fill-[#ffbe00]" d="M30,10a5.47,5.47,0,0,0,.1,1h0a3.85,3.85,0,0,1-.06-.69Z"/>
                <path className="fill-[#ffbe00]" d="M56,10v.31a3.59,3.59,0,0,1-.53,1.9A4.84,4.84,0,0,0,56,10Z"/>
                <path className="fill-[#ffbe00]" d="M61,43.69V57.31A3.69,3.69,0,0,1,57.31,61H30V40H57.31A3.69,3.69,0,0,1,61,43.69Z"/>
                <rect className="fill-[#ffbe00]" height="11" rx="2" width="26" x="30" y="3"/>
                <path className="fill-[#414042]" d="M36,51a2,2,0,0,1-2,2H26a2,2,0,0,1,0-4h8A2,2,0,0,1,36,51Z"/>
                <path className="fill-[#231f20]" d="M36,51a2,2,0,0,1-2,2H30V49h4A2,2,0,0,1,36,51Z"/>
                <path className="fill-[#ffbe00]" d="M46,27a2,2,0,1,1-2,2A2,2,0,0,1,46,27Zm0,6a2,2,0,1,1-2,2A2,2,0,0,1,46,33Zm-7-6a2,2,0,1,1-2,2A2,2,0,0,1,39,27Zm0,6a2,2,0,1,1-2,2A2,2,0,0,1,39,33Zm-7-2a2,2,0,1,1,2-2A2,2,0,0,1,32,31Zm2,4a2,2,0,1,1-2-2A2,2,0,0,1,34,35Z"/>
                <path className="fill-[#fff200]" d="M18,19H32a2,2,0,0,1,0,4H18a2,2,0,0,1,0-4Z"/>
              </g>
            </svg>
        </div>
        </div>

        <div className='flex flex-col gap-4 bg-quaternary  rounded-2xl px-6 py-4 w-full'>
          
          {/* General Data - Read Only */}
          <div className='bg-tertiary border border-gray-300 rounded-lg p-2 text-sm'>
            <div className="flex justify-center">
              <div className='bg-secondary w-1/2 md:w-1/3 text-white text-center py-0.5 rounded-2xl rounded-br-sm'>
                <h2 className="font-semibold">Datos Generales</h2>
              </div>
            </div>
            <div className="py-2 px-4">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4 text-sm text-globalone">
                <div>
                  <label className="block text-center mb-1">ID</label>
                  <input
                    type="text"
                    value={saleData.id}
                    readOnly
                    className="w-full p-1 border rounded-xl bg-gray-100 text-gray-600 text-center"
                  />
                </div>
                <div>
                  <label className="block text-center mb-1">Fecha</label>
                  <input
                    type="text"
                    value={saleData.date}
                    readOnly
                    className="w-full p-1 border rounded-xl bg-gray-100 text-gray-600 text-center"
                  />
                </div>
                <div>
                  <label className="block text-center mb-1">Vendedor</label>
                  <input
                    type="text"
                    value={saleData.seller.User}
                    readOnly
                    className="w-full p-1 border rounded-xl bg-gray-100 text-gray-600 text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Client Data - Read Only with Selection Button */}
          <div className='bg-tertiary relative flex flex-col border border-gray-300 rounded-lg p-2 text-sm'>
            <div className="flex justify-center items-center gap-4 mb-2">
              <div className="bg-secondary w-1/3 text-white text-center py-0.5 rounded-2xl rounded-br-sm">
                <h2 className="font-semibold">Cliente</h2>
              </div>
          
            </div>
            <div className="p-2">
              <div className="flex items-center">
                <div className="absolute top-2 left-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-globalone">
                    <div>
                      <label className="block text-center mb-1">Cedula</label>
                      <input
                        type="text"
                        value={saleData.client.identifier}
                        readOnly
                        className="w-full p-1 border rounded-xl bg-gray-100 text-gray-600 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-center mb-1">Nombre</label>
                      <input
                        type="text"
                        value={saleData.client.name}
                        readOnly
                        className="w-full p-1 border rounded-xl bg-gray-100 text-gray-600 text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-center mb-1">Telefono</label>
                      <input
                        type="text"
                        value={saleData.client.phone}
                        readOnly
                        className="w-full p-1 border rounded-xl bg-gray-100 text-gray-600 text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className='flex flex-col py-1 px-4 gap-2 text-sm'>
            <div className="bg-secondary w-1/3 self-center text-white text-center py-0.5 rounded-2xl rounded-br-sm">
              <h2 className="font-semibold">Productos</h2>
            </div>
            
            {/* Product Search Component will be integrated here */}
            
            {/* Product List */}
            <div className="rounded-lg bg-primary p-2 max-h-[25vh] overflow-auto">
              {saleData.products.map((product) => (
                <div key={product.id} className="relative flex flex-col md:flex-row justify-between bg-tertiary rounded-sm p-3 text-sm mb-2 last:mb-0">
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeProduct(product.id)} 
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition-colors z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  {/* Product Image */}
                  <div className="w-full md:w-[20%] flex items-center justify-center md:p-2">
                    <img src="/laptop1.jpg" className="w-[80%] md:w-full h-auto object-contain rounded-xl " alt="Producto" />
                  </div>

                  {/* Product Info */}
                  <div className="w-full md:w-[55%] flex flex-col justify-center gap-1 p-2 text-globalone">
                    <p className="font-bold"><span className="text-secondary">SKU:</span> {product.sku}</p>
                    <p><span className="underline font-bold">{product.name}</span></p>
                    <TextExpandable texto={product.name} lineas={2}/>
                    <p className="font-bold"><span className="text-secondary">Unidades:</span> {product.quantity}</p>

                    {/* Quantity Controls - Both buttons with proper logic */}
                    <div className="flex items-center space-x-2 mt-2">
                      {/* Decrease Button */}
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.quantity <= 1}
                      >
                        <Minus className="w-3 h-3 text-black" />
                      </button>
                      
                      {/* Current Quantity */}
                      <span className="w-8 text-center font-medium">{product.quantity}</span>
                      
                      {/* Increase Button - Disabled when at original quantity */}
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.quantity >= productsQuantitys[product.id]}
                      >
                        <Plus className="w-3 h-3 text-black" />
                      </button>
                    </div>
                    
                    {/* Show max quantity indicator */}
                    <div className="text-xs text-gray-500 mt-1">
                      Máximo: {productsQuantitys[product.id]}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="w-full md:w-[25%] flex flex-col justify-center items-center p-1">
                    <p className="text-secondary font-extrabold text-center">SubTotal</p>
                    <div className="text-lg font-bold text-cyan-600">
                      ${product.subtotal}
                    </div>
                  </div>
                </div>
              ))}

              {saleData.products.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No hay productos en esta venta
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="bg-white w-[95%] self-center py-2 px-4 rounded-lg">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-cyan-600">${saleData.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex  gap-4">
            <button
              onClick={handleCancel}
              className="flex-1 bg-neutral hover:bg-neutral/80 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handlePaymentAdjustment}
              className="flex-1 bg-success hover:bg-success/80 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              Ajustar Pago
            </button>
          </div>
        </div>
      </div>

      {/* Client Selection Modal Placeholder */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Seleccionar Cliente</h3>
            <p className="text-gray-600 mb-6">Modal de selección de cliente (por implementar)</p>
            <button
              onClick={() => setShowClientModal(false)}
              className="w-full bg-secondary hover:bg-secondary/80 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Payment Adjustment Modal Placeholder */}
      {showPaymentModal && (<>
          <ConfirmationContainer showConfirmationContainer={showPaymentModal} setShowConfirmationContainer={setShowPaymentModal} />
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-success hover:bg-success/80 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Cerrar
            </button>
        </>
      )}
    </div>
  </saleContext.Provider>
  );
}