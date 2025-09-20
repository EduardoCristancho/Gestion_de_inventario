'use client'
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
    
export default function MostSelledByCatg(){
    const [category, setCategory] = useState([]);
    useEffect(()=>{
        const fetchCategory = async () => {
            try{
                const response = await fetch('/api/inventory/mostSoldCategory',
                    {
                        credentials: 'include'
                    }
                );
                const data = await response.json();
                setCategory(data);
            }catch(err){
                console.log(err);
            }
        }
        fetchCategory();
    },[])
    const customToolTip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 text-white p-2 rounded-md border border-gray-600">
                    <p className="font-bold">{payload[0].name}</p>
                    <p>{`Vendidos: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
        
    }
    return (
        <div className="w-full text-center text-globalone mt-4 flex items-center justify-center ">
            <div className="lg:w-[100%] w-[100%] h-full  bg-quaternary rounded-lg flex flex-col justify-center pt-4 px-2 items-center ">
                
                <div className="w-full flex sm:flex-row items-center justify-center gap-4 pb-4 ">   
                    <div className="w-[50%]">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4">Mas vendido del Dia</h2>
                        <div>
                        <ResponsiveContainer width={"100%"} height={200} >
                            <PieChart data={category}>
                                <Pie  dataKey={"quantity"}  isAnimationActive={false} outerRadius='100%' innerRadius='40%' fill="#8884d8">
                                    {
                                        category.map((entry: any, index : number) =>(
                                            <Cell key={`cell-${index}`} strokeWidth={1} fill={COLORS[index % COLORS.length]}/> 
                                        ))
                                    }
                                    
                                </Pie>
                                <Tooltip content={customToolTip} />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="w-[40%]  rounded-lg p-4 bg-tertiary text-sm">
                        <h2 className="text-xl sm:text-xl font-bold mb-4">Categorias</h2>
                        {category.map((item: any, index : number) => (
                        <div key={index} className="flex items-center gap-2 ">
                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>

                            {/* Texto truncado */}
                            <span className="truncate" title={item.name} style={{ maxWidth: "100%" }}>
                            {item.name}
                            </span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}