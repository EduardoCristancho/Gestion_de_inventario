import { useEffect, useState } from "react";
import { BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function EarnsOfDay(){
    const [data,setData] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch('/api/reports/sales?period=hour&startDate=2025-08-20T00:00:00.000Z&endDate=2025-08-20T23:59:59.999Z',
                    {
                        credentials: 'include'
                    }
                )
                const result = await response.json();
                setData(result);
            }catch(error){
                console.error("No se pudo conectar al servidor:", error);
            }
        }
        fetchData();
        console.log(data);
    },[])
    const customToolTip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 text-white p-2 rounded-md border border-gray-600">
                    <p>{`Ganancias: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
        
    }
    return(
        <div className="w-full flex justify-center items-center mt-4 text-globalone">
            <div className="w-[100%] lg:w-[100%] bg-quaternary rounded-lg p-6.5  flex flex-col gap-6 ">
            <h3 className="text-xl sm:text-2xl font-bold text-center">Ganancias del dia</h3>
            <ResponsiveContainer width={"100%"} height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={"date"} tickFormatter={(value) =>  new Date(value).getHours().toString()+":00"}/>
                    <YAxis dataKey={"profit"}/>
                    <Tooltip content={customToolTip} />
                    <Line type="monotone" dataKey={"profit"}/>
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
}