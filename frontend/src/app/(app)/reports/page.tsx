'use client'

import React, { useState, useRef, useMemo } from 'react'
import FilterButton from '@/components/FilterButton' // Adjust path
import FilterPanel from '@/components/FilterPanel'   // Adjust path
import SaleReport from '@/components/reports/SaleReport'
import MostSoldReport from '@/components/reports/mostSoldReport'
import LowStock from '@/components/reports/lowStock'



// export default function PageWithFilters() {
//   const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  

//   // Dummy data and filtering logic for demonstration
//   const allItems = [
//     { id: 1, name: 'Item A', date: '2023-01-15', client: 'Client X' },
//     { id: 2, name: 'Item B', date: '2023-02-20', client: 'Client Y' },
//     { id: 3, name: 'Item C', date: '2023-01-10', client: 'Client X' },
//     { id: 4, name: 'Item D', date: '2023-03-05', client: 'Client Z' },
//   ];

//   const filteredItems = useMemo(() => {
//     return allItems.filter(item => {
//       const date = new Date(item.date);
//       const dateFromMatch = !appliedFilters.dateFrom || date >= new Date(appliedFilters.dateFrom);
//       const dateToMatch = !appliedFilters.dateTo || date <= new Date(appliedFilters.dateTo);
//       const clientMatch = !appliedFilters.clientName || item.client.toLowerCase().includes(appliedFilters.clientName.toLowerCase());
//       return dateFromMatch && dateToMatch && clientMatch;
//     });
//   }, [appliedFilters, allItems]);


//   return (
//     <div className="p-4 md:p-8 min-h-screen bg-gray-100 dark:bg-gray-900">
//       <div className="mb-6 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Registros
//         </h1>
        
//       </div>

//       {/* Display filtered data */}
//       <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
//         {filteredItems.length > 0 ? (
//           <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//             {filteredItems.map(item => (
//               <li key={item.id} className="py-3">
//                 <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Cliente: {item.client} - Fecha: {item.date}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-center text-gray-500 dark:text-gray-400 py-4">
//             No hay registros que coincidan con los filtros aplicados.
//           </p>
//         )}
//       </div>
//        <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded">
//           <h3 className="font-semibold">Filtros Aplicados (Debug):</h3>
//           <pre className="text-sm">{JSON.stringify(appliedFilters, null, 2)}</pre>
//         </div>
//     </div>
//   )
// }

export default function reports(){
  return(
    <div className=''>
      <SaleReport />
      <MostSoldReport />
      <LowStock displayComplete={true}/>
    </div>
  )
}