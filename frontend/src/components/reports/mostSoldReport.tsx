'use client'

import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaFilter } from 'react-icons/fa';
import {Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import SearchableSelect from './SearchableSelect';
import { MostSelledTroughTime } from './mostSelledTroughTime';
import { FilterSidebar } from './FilterSidebar';
import { Filter } from 'lucide-react';

export default function MostSoldReport() {
    const [mostSoldItems, setMostSoldItems] = useState([]);
    const [showUnitsSold, setShowUnitsSold] = useState(true);
    const [width, setWidth] = useState(0);
    const [showGraphicTroughTime, setShowGraphicTroughTime] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseId, setWarehouseId] = useState(0);
    const [StartDate, setStartDate] = useState<Date | null>(null);
    const [EndDate, setEndDate] = useState<Date | null >(null);
    const [supplierId, setSupplierId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [limit, setLimit] = useState(5);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchWarehouses = async () => {
            const response = await fetch('/api/ware-house');
            if (!response.ok) {
                console.error('Error fetching sales report:', response.statusText);
                return;
            }
            const data = await response.json();
            setWarehouses(data);
        }
        fetchWarehouses();  

        const fetchMostSoldItems = async () => {
            let params = '?limit=' + limit + '&';
            if (warehouseId !== 0) params += 'wareHouseId=' + warehouseId + '&';
            if (StartDate !== null) params += 'startDate=' + StartDate.toISOString().slice(0, 10) + '&';
            if (EndDate !== null) params += 'endDate=' + EndDate.toISOString().slice(0, 10) + '&';
            if (supplierId !== 0) params += 'supplierId=' + supplierId + '&';
            if (categoryId !== 0) params += 'categoryId=' + categoryId + '&';
            const response = await fetch('/api/reports/products'+params,{ credentials: 'include' });
            if (!response.ok) {
                console.error('Error fetching sales report:', response.statusText);
                return;
            }
            const data = await response.json();
            setMostSoldItems(data);
        }
        fetchMostSoldItems();
        setWidth(window.innerWidth);
    }, [warehouseId, StartDate, EndDate, supplierId, categoryId, limit]);

 
    function setDate (callback : (date: Date | null) => void, date : string) {
        if (date !== '') {
            callback(new Date(date));
        }else {
            callback(null);
        }
    }

    const CustomTooltip = ({ active, payload, label } : any ) => {
        if (active && payload && payload.length) {
            let Isprofit = payload[0].value > 0 ? 'Ganancias' : 'Pérdida';
            return (
                <div className="bg-gray-800 text-white p-2 rounded-md border border-gray-600">
                    <p>{`Producto: ${label}`}</p>
                    <p>{`${showUnitsSold ? 'Unidades Vendidas' : Isprofit} : ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    }

    function handleShowGraphicTroughTime(state:boolean){
        if(state){
            if(StartDate === null && EndDate === null){
                setStartDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
                setEndDate(new Date());
            }
            setShowGraphicTroughTime(state);
        }else{
            setStartDate(null);
            setEndDate(null);
            setShowGraphicTroughTime(state);
        }
    }
    const filterContent = (
        <>
        <div className='w-full text-xs '>
            <div className='flex  w-full items-center justify-center gap-2 p-2 rounded-lg bg-quaternary' >  
                <span className='text-center' >Mostrar Ganancias</span>
                <label  className="relative inline-flex items-center border-1 w-8 h-4 rounded-full cursor-pointer">
                    <input className='sr-only peer' type="checkbox" checked={!showUnitsSold} onChange={(e) => setShowUnitsSold(!e.target.checked)}/>
                    <span  className="w-3 h-3 bg-gray-300 absolute rounded-full peer-checked:translate-x-4 peer-checked:bg-success transition-all duration-100 "></span>
                </label>
            </div>
            <div className='flex  w-full items-center justify-center gap-2 p-2 rounded-lg bg-quaternary'>  
                <span className='text-center'>Gráfico de Tiempo</span>
                <label className="relative inline-flex items-center border-1 w-8 h-4 rounded-full cursor-pointer">
                    <input className='sr-only peer' type="checkbox" checked={showGraphicTroughTime} onChange={(e) => handleShowGraphicTroughTime(e.target.checked)}/>
                    <span className="w-3 h-3 bg-gray-300 absolute rounded-full peer-checked:translate-x-4 peer-checked:bg-success transition-all duration-100 "></span>
                </label>
            </div>
        </div>
            <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
                <div className='flex gap-2 justify-center items-center w-full'>
                    <div className='relative inline-block'><FaCalendarAlt /><input className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' type="date" onChange={(e) => setDate(setStartDate, e.target.value)}/></div>
                    <label>Desde:</label>
                    <label className='bg-tertiary rounded-xl p-1 text-xs'>{StartDate? StartDate.toISOString().slice(0, 10) : 'N/A'}</label>
                </div>
                <div className='flex gap-2 justify-center items-center w-full mt-2'>
                    <div className='relative inline-block'><FaCalendarAlt /><input className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' type="date" onChange={(e) => setDate(setEndDate, e.target.value)}/></div>
                    <label>Hasta:</label>
                    <label className='bg-tertiary rounded-xl p-1 mt-1 text-xs'>{EndDate? EndDate.toISOString().slice(0, 10) : 'N/A'}</label>
                </div>
            </div>

            <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
                <label>Proveedor:</label>
                <SearchableSelect setId={setSupplierId} url="/api/supplier" />
            </div>
            <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
                <label>Almacenes:</label>
                <select className='bg-tertiary rounded-xl p-1 w-[80%]' onChange={(e) => setWarehouseId(parseInt(e.target.value))}><option value={0}>Todos</option>{warehouses.map((warehouse : any) => (<option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>))}</select>
            </div>
            <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
                <label>Categorias:</label>
                <SearchableSelect setId={setCategoryId} url="/api/inventory"/>
            </div>
            <div className='flex w-full flex-col items-center justify-center p-2 rounded-lg bg-quaternary'>
                <label>Límite:</label>
                <select className='bg-tertiary rounded-xl p-1 w-[40%]' onChange={(e) => setLimit(parseInt(e.target.value))}><option value="5">5</option><option value="10">10</option></select>
            </div>
            
        </>
    );

    return (
        <div className="w-full flex flex-col items-center mt-4 mb-4 gap-2 text-globalone">
            <div className='flex items-center justify-center gap-4'>
                <h1 className='text-2xl'>Productos Más Vendidos</h1>
                
                <div className="lg:hidden">
                    <button onClick={() => setIsFilterOpen(true)} className="bg-secondary text-white p-3 rounded-full shadow-lg"><Filter size={24} /></button>
                </div>
            </div>

            {/* Filtros para Escritorio */}
            <div className='hidden lg:flex w-[90%] max-w-[90%] bg-quaternary p-2 rounded-2xl text-sm items-center justify-center gap-2'>
                {filterContent}
            </div>

            {/* Sidebar para Móvil */}
            <div className="lg:hidden">
                <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
                    {filterContent}
                </FilterSidebar>
            </div>
            
            { !showGraphicTroughTime ? (
                <ResponsiveContainer width="90%" height={350}>
                    <BarChart
                        className="bg-tertiary rounded-lg mt-2 p-3"
                        data={mostSoldItems}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        {/* Eje Y dinámico */}
                        {showUnitsSold ? (
                        <>
                            <YAxis
                            dataKey="unitsSold"
                            name="Unidades Vendidas"
                            tick={{
                                fontSize: width < 400 ? 8 : width < 768 ? 10 : 12,
                            }}
                            />
                            <Bar dataKey="unitsSold" fill="#8884d8" name="Unidades Vendidas" />
                        </>
                        ) : (
                        <>
                            <YAxis
                            dataKey="totalProfit"
                            name="Ganancias"
                            tick={{
                                fontSize: width < 400 ? 8 : width < 768 ? 10 : 12,
                            }}
                            />
                            <Bar dataKey="totalProfit" fill="#22c982" name="Ganancias">
                            {mostSoldItems.map((entry: any, index: number) => (
                                <Cell
                                key={`cell-${index}`}
                                fill={entry.totalProfit < 0 ? "#F7340C" : "#22c982"}
                                />
                            ))}
                            </Bar>
                        </>
                        )}

                        {/* Tooltip responsivo */}
                        <Tooltip
                        content={<CustomTooltip />}
                        wrapperStyle={{
                            fontSize: width < 400 ? 8 : width < 768 ? 10 : 12,
                        }}
                        />

                        {/* Eje X dinámico */}
                        <XAxis
                        dataKey="productName"
                        name="Productos"
                        tick={{
                            fontSize: width < 400 ? 8 : width < 768 ? 10 : 12,
                        }}
                        />

                        {/* Leyenda responsiva */}
                        <Legend
                        iconType="circle"
                        wrapperStyle={{
                            fontSize: width < 400 ? 8 : width < 768 ? 10 : 12,
                        }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <MostSelledTroughTime whareHouseId={warehouseId} starDate={StartDate} endDate={EndDate} supplierId={supplierId} categoryId={categoryId} limit={limit} showUnitsSold={showUnitsSold}/>
            )}
        </div>
    );
}