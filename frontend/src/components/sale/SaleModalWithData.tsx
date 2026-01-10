import { productDetails, SaleProduct } from "./SaleProduct";
import { clientDetails, SaleDataClient } from "./salesDataClient";
import { PaymentMethod, SalePaymentMethod } from "./salesPaymenthMethod";
interface SaleModalProps {
    saleData: saleDto;
}


export interface saleDto{
    id: number;
    date: string;
    total: number;
    seller: sellerDetails;
    client: clientDetails;
    paymentMethods: PaymentMethod[];
    products: productDetails[];
}

interface sellerDetails{
    id: number;
    User: string;
}
    
export function SaleModalWithData(SaleModalProps: SaleModalProps) {
    const {saleData} = SaleModalProps;
    return (
        <>
            {/* Header */}
            <div className="flex flex-col items-center justify-center gap-2  relative h-16">
              <h1 ><span className="font-bold text-secondary">ID : </span>{saleData.id}</h1>
              <div className="absolute top-0 left-0 w-14 h-14 md:w-16 md:h-16 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="transform translate-3d w-full h-full  visible" viewBox="0 0 430 430">
                                    <defs>
                                        <clipPath id="g"><path d="M0 0h430v430H0z"/></clipPath>
                                        <clipPath id="k"><path d="M0 0h430v430H0z"/></clipPath>
                                        <clipPath id="h"><path d="M0 0h430v430H0z"/></clipPath>
                                        <filter id="a" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
                                            <feComponentTransfer in="SourceGraphic"><feFuncA tableValues="1.0 0.0" type="table"/></feComponentTransfer>
                                        </filter>
                                        <filter id="c" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
                                            <feComponentTransfer in="SourceGraphic"><feFuncA tableValues="1.0 0.0" type="table"/></feComponentTransfer></filter>
                                        <filter id="e" width="100%" height="100%" x="0%" y="0%" filterUnits="objectBoundingBox">
                                            <feComponentTransfer in="SourceGraphic"><feFuncA tableValues="1.0 0.0" type="table"/></feComponentTransfer>
                                        </filter>
                                        <path id="b" className="none"/>
                                        <path id="d" fill="red" d="M0-70c38.633 0 70 31.367 70 70S38.633 70 0 70-70 38.633-70 0s31.367-70 70-70" className="block" transform="translate(305 320)"/>
                                        <path id="f" fill="red" d="M0-70c38.633 0 70 31.367 70 70S38.633 70 0 70-70 38.633-70 0s31.367-70 70-70" className="block" transform="translate(305 320)"/>
                                        <mask id="l" mask-type="alpha">
                                            <g filter="url(#a)"><path fill="#fff" d="M0 0h430v430H0z" opacity="0"/>
                                                <use xmlns="http://www.w3.org/1999/xlink" href="#b"/>
                                            </g>
                                        </mask>
                                        <mask id="j" mask-type="alpha">
                                            <g filter="url(#c)"><path fill="#fff" d="M0 0h430v430H0z" opacity="0"/>
                                                <use xmlns="http://www.w3.org/1999/xlink" href="#d"/>
                                            </g>
                                        </mask>
                                        <mask id="i" mask-type="alpha">
                                            <g filter="url(#e)"><path fill="#fff" d="M0 0h430v430H0z" opacity="0"/>
                                                <use xmlns="http://www.w3.org/1999/xlink" href="#f"/>
                                            </g>
                                        </mask>
                                    </defs>
                                    <g clipPath="url(#g)">
                                        <g clipPath="url(#h)" className="block">
                                            <path fill="none" stroke="var(--color-salesIcon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M63 0h-203"  className="block" transform="translate(195 375)"/>
                                            <path fill="none" stroke="var(--color-salesIcon)" strokeLinejoin="round" strokeWidth="12" d="M-35 50V-50h70V50"  className="block" transform="translate(115 325)"/>
                                            <g mask="url(#i)" className="block">
                                                <path fill="none" stroke="var(--color-salesIcon)" strokeLinejoin="round" strokeWidth="12" d="M180 375V185h70v190" />
                                            </g>
                                            <g mask="url(#j)" className="block">
                                                <path fill="none" stroke="var(--color-salesIcon)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M280 355V95h70v250" />
                                            </g>
                                            <path fill="none" stroke="var(--color-success)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M85-20v-60H25m60 0L-85 80"  className="block" transform="translate(165 135)"/>
                                            <path fill="none" stroke="var(--color-success)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="M0-40v11.56m0 57.189V40m16.751-68.4H-5.461a14.34 14.34 0 0 0-14.34 14.329A14.32 14.32 0 0 0-15.6-3.934 14.33 14.33 0 0 0-5.461.259H5.501a14.3 14.3 0 0 1 10.122 4.199 14.3 14.3 0 0 1 4.178 10.131A14.25 14.25 0 0 1 5.66 28.809l-25.042-.219" className="block" transform="translate(304.801 320)"/>
                                            <path fill="none" stroke="var(--color-success)" strokeWidth="12" d="M0-70c38.633 0 70 31.367 70 70S38.633 70 0 70-70 38.633-70 0s31.367-70 70-70z"  className="block" transform="translate(305 320)"/>
                                        </g>
                                      
                                    </g>
                                </svg>
                            
              </div>
            </div>
            
            {/* Body */}
            <div className="flex flex-col gap-4 h-full overflow-y-auto">

              <div className="flex flex-col gap-2 md:flex-row md:gap-4">                
                <div className="flex-1 flex flex-col gap-1">
                  <h2 className="font-bold text-secondary text-center">DATOS DE LA VENTA</h2>
                  <div className="flex-1 border-2 p-2 rounded-lg flex justify-evenly md:flex-col  md:justify-evenly items-center md:items-center text-md gap-2">
                    <div className="flex gap-1 overflow-hidden"><h3 className="font-bold text-secondary">Fecha: </h3><p className="truncate">{new Date(saleData.date).toLocaleDateString()}</p></div>
                    <div className="flex gap-1 overflow-hidden"><h3 className="font-bold text-secondary">Vendedor: </h3><p className="truncate">{saleData.seller.User}</p></div>
                  </div>
                </div>
              
              {/*Datos del cliente*/}
                <SaleDataClient {...saleData.client}/>

              {/*Metodos de pago y Total*/}
                <div className="flex-1 flex flex-col gap-1">
                  
                  <h2 className="font-bold text-secondary text-center">FORMA DE PAGO</h2>
                  <div className="text-sm max-h-30 border-2 px-2 rounded-md">
                    <div className="flex py-1  gap-1 z-50 justify-between">
                      <h3 className="font-bold text-secondary flex-[1.5]">Metodo</h3>
                      <h3 className="font-bold text-secondary flex-[1]">Dolares</h3>
                      <h3 className="font-bold text-secondary flex-[1]">Bolivares</h3>
                    </div>
                    <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-2 overflow-auto max-h-15">
                      {saleData.paymentMethods.map((method: any, index : number) => {return (<SalePaymentMethod key={index} {...method}/>)})}
                    </div>
                  </div>
                  <div className="flex justify-between p-1">
                    <p className="font-extrabold text-secondary">Total</p>
                    <div className="flex flex-col">
                      <div className="h-1 rounded-full bg-secondary"></div>
                      <p className="font-bold text-md">{saleData?.total+ " $" }</p>
                    </div>
                  </div>

                </div>
              </div>
              {/*Productos Vendidos*/}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-secondary text-center">PRODUCTOS</h3>
                <div className="bg-quaternary rounded-lg overflow-auto max-h-72">
                    {saleData.products.map((product: any, index : number) => { return (
                        <SaleProduct {...product} key={index} />
                      )}
                    )}
                </div>
              </div>
            </div>
        </>
    )
}