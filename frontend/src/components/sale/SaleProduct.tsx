import TextExpandable from "../TextExpandable"
export interface productDetails {
    productId: number;
    id: number;
    sku: string;
    name: string;
    description: string;
    quantity: number;
    subtotal: number;
}
export function SaleProduct(props: productDetails){
    const {sku, name, description, quantity, subtotal} = props
    return (
        <div className="flex flex-col  md:flex-row justify-between bg-tertiary rounded-sm m-2 p-3 text-sm ">
            <div className="w-full md:w-[20%] flex items-center justify-center md:p-2">
                <img src="/laptop1.jpg" className="w-[80%] md:w-full h-auto object-contain rounded-xl" alt="Producto" />
            </div>
            <div className="w-full md:w-[55%] flex flex-col justify-center gap-1 p-2">
                <p className="font-bold"><span className="text-secondary">SKU:</span> {sku}</p>
                <p><span className="underline font-bold">{name}</span></p>
                <TextExpandable texto={description} lineas={2}/>
                <p className="font-bold"><span className="text-secondary">Unidades:</span> {quantity}</p>
            </div>
            <div className="w-full md:w-[25%] flex flex-col justify-center items-center p-2">
                <p className="text-secondary font-extrabold text-center">SubTotal</p>
                <p className="text-globalone font-bold text-center break-words">{subtotal}</p>
            </div>
        </div>
    )
}