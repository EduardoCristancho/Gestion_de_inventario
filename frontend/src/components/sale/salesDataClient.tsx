export interface clientDetails{
    id: number;
    identifier: string;
    name: string;
    phone: string;
}
export function SaleDataClient(clientData: clientDetails) {
    const {name, id, phone,identifier} = clientData
    return (
        <div className="flex flex-col md:w-1/3 gap-1">
            <h2 className="font-bold text-secondary text-center">DATOS DEL CLIENTE</h2>
            <div className="flex-1 border-2 p-2 rounded-lg flex flex-col  md:justify-between items-center md:items-start text-md gap-2">
                <div className="flex gap-1 overflow-hidden"><h3 className="font-bold text-secondary">Cliente :</h3><p className="truncate">{name}</p></div>
                <div className="flex gap-1 overflow-hidden"><h3 className="font-bold text-secondary">Cedula :</h3><p className="truncate">{identifier}</p></div>
                <div className="flex gap-1 overflow-hidden"><h3 className="font-bold text-secondary">Telefono :</h3><p className="truncate">{phone}</p></div>
            </div>
        </div>
    )
}