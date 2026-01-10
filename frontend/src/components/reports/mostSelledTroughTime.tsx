'use client'

import { useEffect, useRef, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function MostSelledTroughTime(props: {
    showUnitsSold: boolean
    starDate: Date | null
    endDate: Date | null
    whareHouseId: number
    limit: number
    supplierId: number
    categoryId: number
}){
    const COLORS = [
      "#8884d8", // azul violeta
      "#82ca9d", // verde
      "#ffc658", // amarillo
      "#ff7300", // naranja
      "#413ea0", // azul oscuro
      "#ff0000", // rojo
      "#00c49f", // verde aqua
      "#0088fe", // celeste
      "#a4de6c", // lima
      "#d0ed57", // amarillo lima
    ];
    const [mostSelledItems, setMostSelledItems] = useState<any[]>([]);
    const [products, setProducts] = useState<string[]>([]);
    const [reRender, setReRender] = useState(false);
    const linesToDisplay = useRef<string[]>([]);
    
    const {showUnitsSold, starDate, endDate, whareHouseId, limit, supplierId, categoryId} = props
    useEffect(()=>{
        const fetchMostSelledTroughTime = async () => {
            let params = `period=DAY`;
            if (limit !== 0) params += `&limit=${limit}`;
            if (whareHouseId !== 0) params += `&wareHouseId=${whareHouseId}`;
            if (starDate !== null) {params += `&startDate=${starDate.toISOString().slice(0,10)}`};
            if (endDate !== null) {params += `&endDate=${endDate.toISOString().slice(0,10)}`};
            if (supplierId !== 0) params += `&supplierId=${supplierId}`;
            if (categoryId !== 0) params += `&categoryId=${categoryId}`;
            const response = await fetch(`/api/reports/products/time?${params}`,{credentials: 'include'});
            if (!response.ok) {
                console.error('Error fetching sales report:', response.statusText);
                return;
            }
            const result = await response.json();
            setProducts(result.name);
            setMostSelledItems(result.data);
           
        }
        fetchMostSelledTroughTime();

    },[starDate, endDate, whareHouseId, supplierId, categoryId, limit])

    const customToolTip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            if(showUnitsSold){
                return (
                    <div className="bg-gray-800 text-white p-2 rounded-md border border-gray-600">
                        <p>{`Unidades Vendidas: ${payload[0].value}`}</p>
                    </div>
                );
            }else{
                if (payload[0].value < 0) {
                    return (
                        <div className="bg-gray-800 text-white p-2 rounded-md border border-gray-600">
                            <p>{`Pérdida: ${payload[0].value}`}</p>
                        </div>
                    );
                }
                return (
                    <div className="bg-gray-800 text-white p-2 rounded-md border border-gray-600">
                        <p>{`Ganancias: ${payload[0].value}`}</p>
                    </div>
                );
            }           
        }
        return null;
    }
function getColorForProduct( index: number) {
  return COLORS[index % COLORS.length];
}

    return (
        // Contenedor principal: Flex en columna para móviles, flex en fila para pantallas grandes (lg)
        <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-6 p-4">
            {/* Contenedor del Gráfico */}
            <div className="w-full lg:w-4/5">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart className='bg-tertiary rounded-lg p-3' data={mostSelledItems}>
                        <CartesianGrid strokeDasharray="3 3"  />
                        <XAxis dataKey={"date"} tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip content={customToolTip}/>
                        
                        
                        {
                            showUnitsSold ? 
                                linesToDisplay.current.map((item: any, index: number) => (
                                    <Line
                                    key={item}
                                    type="monotone"
                                    dataKey={`${item}->unitsSold`}
                                    connectNulls
                                    stroke={getColorForProduct(index)}
                                    />
                                ))
                                : linesToDisplay.current.map((item: any, index: number) => (
                                    <Line
                                    key={item}
                                    type="monotone"
                                    dataKey={`${item}->profit`}
                                    connectNulls
                                    stroke={getColorForProduct(index)}
                                    />
                                ))
                        }
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* Contenedor de la Lista de Productos */}
            <div className="w-full lg:w-1/5 bg-tertiary flex flex-col items-center gap-3 p-4 rounded-2xl">
                <h3 className="font-bold text-secondary text-lg">Top Productos</h3>
                {
                    products.map((product, index)=>(
                        <div key={index} className="flex justify-between gap-2 items-center w-full" >
                            <div className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: getColorForProduct(index) }}></div>
                            <span className="text-sm text-white truncate flex-grow">{product}</span>
                            <label key={index} className="relative inline-flex items-center border-1 w-8 h-4 rounded-full cursor-pointer flex-shrink-0">
                                <input type="checkbox" 
                                className="sr-only peer"    
                                value={product} onChange={(e)=>{
                                    const isShown = linesToDisplay.current.includes(e.target.value);
                                    if(isShown){
                                        linesToDisplay.current = linesToDisplay.current.filter(prevItem => prevItem !== e.target.value);
                                        setReRender(!reRender);
                                    }else{
                                        linesToDisplay.current.push(e.target.value);
                                        setReRender(!reRender);
                                    }
                                }}  />
                                <span  className="w-3 h-3 bg-gray-300 absolute rounded-full peer-checked:translate-x-4 peer-checked:bg-success transition-all duration-100 "></span>
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}