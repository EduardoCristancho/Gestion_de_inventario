'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';
import { FaCalendarAlt, FaFilter } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { FilterSidebar } from './FilterSidebar';
import { Filter } from 'lucide-react';
import { AuthContext } from '@/hooks/authContext';
export default function SaleReport() {
    const [StartDate, setStartDate] = useState<Date>(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    const [EndDate, setEndDate] = useState<Date>(new Date(new Date().setHours(new Date().getHours() + 24)));
    const [UserId, setUserId] = useState<number>(0);
    const [users, setUsers] = useState<any>([]);
    const [warehouses, setWarehouses] = useState<any>([]);
    const [WarehouseId, setWarehouseId] = useState<number>(0);
    const [showProfit, setShowProfit] = useState<boolean>(false);
    const [showCost, setShowCost] = useState<boolean>(false);
    const [Period, setPeriod] = useState<string>('DAY');
    const [Sales, setSales] = useState<any>([]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const maxRange = useRef(0);
    const rol = useRef('admin');
    const [width, setWidth] = useState(0);
    const auth = useContext(AuthContext);
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/employe', { credentials: 'include' });
            if (!response.ok) { console.error('Error fetching user:', response.statusText); return; }
            const data = await response.json();
            setUsers(data);
        }
        const fetchWarehouse = async () => {
            const response = await fetch('/api/ware-house', { credentials: 'include' });
            if (!response.ok) { console.error('Error fetching warehouse:', response.statusText); return; }
            const data = await response.json();
            setWarehouses(data);
        }
        const fetchSalesReport = async () => {
            if (rol.current === 'admin') { fetchUser(); fetchWarehouse(); }
            let params = 'startDate='+ StartDate.toISOString().slice(0, 10) + '&endDate=' + EndDate.toISOString().slice(0, 10) + '&period=' + Period;
            if (UserId !== 0) params += '&userId=' + UserId;
            if (WarehouseId !== 0) params += '&wareHouseId=' + WarehouseId;
            const response = await fetch('/api/reports/sales?' + params,{ credentials: 'include' });
            if (!response.ok) { console.error('Error fetching sales report:', response.statusText); return; }
            const data = await response.json();
            setMin(Math.min(...data.map((sale: any) => sale.profit)));
            maxRange.current = Math.max(...data.map((sale: any) => sale.totalSales));
            setMax(maxRange.current);
            setSales(data);
        }
        fetchSalesReport();
        setWidth(window.innerWidth);
    },[StartDate, EndDate, UserId, WarehouseId, Period]);

    const CustomTooltip = ({ active, payload, label } : any ) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 text-white p-2 rounded-md border border-gray-600">
                    <p>{new Date(label).toLocaleDateString()}</p>
                    {payload.map((entry : any ) => {
                        let color = entry.color;
                        let name = entry.name;
                        if (entry.dataKey === 'profit') {
                            name = entry.value < 0 ? 'Pérdida' : 'Ganancia';
                            color = entry.value < 0 ? 'red' : 'green';
                        }
                        return (<p key={entry.dataKey} style={{ color: color, margin: 0 }}>{name}: {entry.value}</p>);
                    })}
                </div>
            );
        }
        return null;
    };

    const filterContent = (
      <>
        <div className='flex flex-col w-full items-center p-2 rounded-lg bg-quaternary'>
            <div className='flex items-center gap-2'>   
                <span>Ganancias</span>
                <label className="relative inline-flex items-center border-1 w-8 h-4 rounded-full cursor-pointer">
                    <input className='sr-only peer' type="checkbox" checked={showProfit} onChange={(e) => setShowProfit(e.target.checked)}/>
                    <span className="w-3 h-3 bg-gray-300 absolute rounded-full peer-checked:translate-x-4 peer-checked:bg-success transition-all duration-100 "></span>
                </label>
            </div>
            <div className='flex items-center gap-2'>
                <span>Costos</span>
                <label className="relative inline-flex items-center border-1 w-8 h-4 rounded-full cursor-pointer">
                    <input className='sr-only peer' type="checkbox" checked={showCost} onChange={(e) => setShowCost(e.target.checked)}/>
                    <span className="w-3 h-3 bg-gray-300 absolute rounded-full peer-checked:translate-x-4 peer-checked:bg-success transition-all duration-100 "></span>
                </label>
            </div>
        </div>
        <div className='flex flex-col w-full items-center p-2 rounded-lg bg-quaternary'>
            <label>Rango del Monto: {max}$</label>
            <input className='w-full h-2 rounded-lg appearance-none cursor-pointer bg-tertiary' type="range" min={min} max={maxRange.current} step={1} value={max} onChange={(e) => setMax(parseInt(e.target.value))}/>
        </div>
        <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
            <div className='flex gap-2 justify-center items-center w-full'>
                <div className='relative inline-block'><FaCalendarAlt /><input className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' type="date" value={StartDate.toISOString().slice(0, 10)} onChange={(e) => setStartDate(new Date(e.target.value))}/></div>
                <label>Desde:</label>
                <label className='bg-tertiary rounded-xl p-1 text-xs'>{StartDate.toISOString().slice(0, 10)}</label>
            </div>
            <div className='flex gap-2 justify-center items-center w-full mt-2'>
                <div className='relative inline-block'><FaCalendarAlt /><input className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' type="date" value={EndDate.toISOString().slice(0, 10)} onChange={(e) => setEndDate(new Date(e.target.value))}/></div>
                <label>Hasta:</label>
                <label className='bg-tertiary rounded-xl p-1 mt-1 text-xs'>{EndDate.toISOString().slice(0, 10)}</label>
            </div>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-1 p-2 rounded-lg bg-quaternary'>
            <label>Periodo:</label>
            <select className='w-full bg-tertiary rounded-xl p-1' onChange={(e) => setPeriod(e.target.value)}>
                <option value="DAY">Día</option><option value="WEEK">Semana</option><option value="MONTH">Mes</option><option value="YEAR">Año</option>  
            </select>
        </div>
        {parseInt(auth?.user?.rol as string) === 1  && (
            <>
            <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
                <label>Usuario:</label>
                <select className='w-full bg-tertiary rounded-xl p-1' onChange={(e) => setUserId(parseInt(e.target.value))}>
                    <option value="0">Todos</option>
                    {users.map((user: any) => (<option key={user.id} value={user.id}>{user.userName}</option>))}
                </select>
            </div>
            <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
                <label>Almacén:</label>
                <select className='w-full bg-tertiary rounded-xl p-1' onChange={(e) => setWarehouseId(parseInt(e.target.value))}>
                    <option value="0">Todos</option>
                    {warehouses.map((warehouse: any) => (<option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>))}
                </select>
            </div>
            </>
        )}
      </>
    );

    return (
        <div className='flex items-center flex-col w-full gap-2 text-globalone relative mt-2'>
            <div className='flex items-center justify-center gap-4'>
                <h1 className='text-2xl '>Reporte de Ventas</h1>
                
                <div className="lg:hidden ">
                    <button onClick={() => setIsFilterOpen(true)} className="bg-secondary text-white p-3 rounded-full shadow-lg"><Filter size={24} /></button>
                </div>
            </div>
            {/* Filtros para Escritorio */}
            <div className='hidden lg:flex bg-quaternary items-center rounded-2xl justify-between p-2 text-sm w-[90%]'>
                {filterContent}
            </div>

            {/* Sidebar para Móvil */}
            <div className="lg:hidden">
                <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
                    {filterContent}
                </FilterSidebar>
            </div>
      
            <ResponsiveContainer width="90%" height={350}>
                <LineChart
                    className="bg-tertiary rounded-lg mt-2 p-3"
                    data={Sales}
                    margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* Eje X con texto dinámico */}
                    <XAxis 
                    dataKey="date" 
                    tick={{ 
                        fontSize: width < 400 ? 8 : width < 768 ? 10 : 12 
                    }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()} 
                    />

                    {/* Eje Y con texto dinámico */}
                    <YAxis 
                    dataKey="totalSales" 
                    domain={[min, max]} 
                    allowDataOverflow={true}
                    tick={{ 
                        fontSize: width < 400 ? 8 : width < 768 ? 10 : 12 
                    }}
                    />

                    {/* Tooltip y leyenda escalables */}
                    <Tooltip 
                    content={<CustomTooltip />} 
                    wrapperStyle={{ 
                        fontSize: width < 400 ? 8 : width < 768 ? 10 : 12 
                    }} 
                    />
                    <Legend 
                    wrapperStyle={{ 
                        fontSize: width < 400 ? 8 : width < 768 ? 10 : 12 
                    }} 
                    />

                    {/* Línea principal */}
                    <Line
                    legendType="circle"
                    type="monotone"
                    dataKey="totalSales"
                    name="Total Vendido"
                    strokeWidth={2}
                    stroke="#8884d8"
                    />

                    {/* Línea de ganancias */}
                    {showProfit && (
                    <Line
                        legendType="circle"
                        type="monotone"
                        dataKey="profit"
                        name="Ganancia"
                        strokeWidth={2}
                        stroke="#82ca9d"
                        dot={(props) => {
                        const { value } = props;
                        return (
                            <Dot
                            {...props}
                            fill={value < 0 ? "red" : "#82ca9d"}
                            r={value < 0 ? 5 : 3}
                            />
                        );
                        }}
                    />
                    )}

                    {/* Línea de costos */}
                    {showCost && (
                    <Line
                        legendType="circle"
                        type="monotone"
                        dataKey="cost"
                        name="Costo"
                        strokeWidth={2}
                        stroke="#ff0060"
                    />
                    )}
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}