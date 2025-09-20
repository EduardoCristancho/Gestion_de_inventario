'use client'
import { GridColDef, GridPaginationModel, GridRowSelectionModel} from '@mui/x-data-grid';
import React, { useState, useEffect, useRef, use, startTransition, useMemo } from 'react';
import { InputGroup } from '@/components/inputGroup';

import DataGridComponent from '@/components/DataGrid';
import LoadingComponent from '@/components/LoadingComponent';
import FilterButton from '@/components/FilterButton';
import FilterPanel from '@/components/FilterPanel';
import { SalesModal } from '@/components/sale/SalesModal';
import { redirect } from 'next/navigation';
import { NotFoundError, unhandledError, handleError } from '@/utils/errorClasess';
import { DeleteModal } from '@/components/sale/deleteModal';

interface Sale {
  id: number;
  client: {
    id: number;
    name: string;
  };
  date: string;
  total: number;
}

interface AppliedFilters {
  dateFrom: string
  dateTo: string
  clientName: string
}
export const saleIdContext = React.createContext<number | null>(null);
export default function SalesRecords() {
  const [inputSearh, setInputSearch] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isSaleDisplayed, setIsSaleDisplayed] = useState(false);
  const [saleId, setSaleId] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState({ paginationDetails : {page: 0, pageSize: 50}, totalRows: 0});
  const [messageOfFailure, setMessageOfFailure] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
      dateFrom: '',
      dateTo: '',
      clientName: '',
    })
    const [rows, setRows] = useState<Sale[]>([]);
    const [mounted, setMounted] = useState(false);
    const filterButtonRef = useRef<HTMLButtonElement>(null)
    const lastSearch = useRef('');


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID',flex: 1, minWidth: 60, disableColumnMenu: true },
    {
      field: 'clientName',
      headerName: 'Cliente',
      flex: 1,
      minWidth: 100,
      disableColumnMenu: true,
      valueGetter: (value, params) => {
        if (!params.client) {
          return 'Generico';  
        }
        return params.client.name;},  // Corregido el acceso al campo
      },
      { field: 'date', headerName: 'Fecha', flex: 1, minWidth: 100, disableColumnMenu: true },
      { field: 'total', headerName: 'Total', flex: 1, minWidth: 70, disableColumnMenu: true },
      
    ];
    

    //Carga inicial de los datos.
    useEffect(() => {
      
      callFetchData();
  
    }, [paginationModel.paginationDetails.page, paginationModel.paginationDetails.pageSize]);
  
  const fetchData = async () => {
        try {
          const response = await fetch(`/api/sales?page=${paginationModel.paginationDetails.page }&limit=${paginationModel.paginationDetails.pageSize}&startDate=${appliedFilters.dateFrom}&endDate=${appliedFilters.dateTo}&clientName=${appliedFilters.clientName}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );
          
          if (response.status !== 200 && response.status !== 404) {
            throw new unhandledError("Error al cargar los datos de las ventas, intente mas tarde");
          }
          if (response.status === 404) {
            throw new NotFoundError("No se encontraron datos de la venta");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          throw error;
        }
    }

  const callFetchData = async () => {
    try {
      const result = await fetchData();
      if(!mounted){
        setRows(result.data.map((sale : Sale) => {sale.date = new Date(sale.date).toDateString(); return sale;}));
        setPaginationModel({...paginationModel, totalRows: result.total});
        setMounted(true);
      }
      
      setRows(result.data.map((sale : Sale) =>{sale.date = new Date(sale.date).toLocaleDateString(); return sale;}));
      setPaginationModel({...paginationModel, totalRows: result.total});
    }catch (error : any) {
      setMounted(true);
      handleError(error, (error) => setMessageOfFailure(error));
    }
  }
  async function handleInputSearch (){
    lastSearch.current = inputSearh;
    if (inputSearh !== lastSearch.current) return;
    try {
      //si esta vacio mostramos todos los datos
      if (inputSearh === '') {
        callFetchData();
        return;
      }

      setRows([]);
      setLoading(true);
      const response = await fetch(`/api/sales/${inputSearh}`);
      if (response.status !== 200 && response.status !== 404) {
        throw new unhandledError("Error al cargar los datos de las ventas, intente mas tarde");
      }
      if (response.status === 404) {
        throw new NotFoundError("No se encontraron datos de la venta");
      }
      const saleData = await response.json();
      saleData.date = new Date(saleData.date).toLocaleDateString();
      setRows([saleData]);
    } catch (error : any) {
      handleError(error, (error) => setMessageOfFailure(error));
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      handleInputSearch();
    }, 600); // espera 400ms antes de llamar
    
    return () => clearTimeout(timer); // limpia si el usuario sigue escribiendo
  }, [inputSearh]);


    const handleApplyFilters = async (filters: AppliedFilters) => {
      try{
        setAppliedFilters(filters);
        setPaginationModel({paginationDetails : {page: 0, pageSize: 50}, totalRows: 0});
        const result = await fetch(`/api/sales?page=${paginationModel.paginationDetails.page  }&limit=${paginationModel.paginationDetails.pageSize}&startDate=${filters.dateFrom}&endDate=${filters.dateTo}&clientName=${filters.clientName}`);
        if (result.status !== 200 && result.status !== 404) {
          throw new unhandledError("Error al cargar los datos de las ventas, intente mas tarde");
        }
        if (result.status === 404) {
          throw new NotFoundError("No se encontraron datos de la venta");
        }
        const data = await result.json();
        setRows(data.data.map((sale : Sale) =>{sale.date = new Date(sale.date).toLocaleDateString(); return sale;}));
        setPaginationModel({...paginationModel, totalRows: data.total});

      }catch (error: any) {
        setRows([]);
        setMounted(true);
        handleError(error, (error) => setMessageOfFailure(error));
      }
    }
    
    const activeFilterCount = useMemo(() => {
      return Object.values(appliedFilters).filter(value => value !== '').length;
    }, [appliedFilters]);
 
    

    const handleMore = (event: React.MouseEvent, currentSelection: number) => {
      event.stopPropagation();
      setIsSaleDisplayed(true);
      setSaleId(currentSelection);
    }
    const handleEdit = (event: React.MouseEvent, currentSelection: number) => {
      event.stopPropagation();
      redirect(`/sales/edit/${currentSelection}`);
    }
    const handleRemove = (event: React.MouseEvent, currentSelection: number) => {
     event.stopPropagation();
     setShowDeleteModal(true);
     setSaleId(currentSelection);
    }

    const handlePaginationChange = async(pagination: GridPaginationModel) => {
      setPaginationModel({paginationDetails : pagination, totalRows: paginationModel.totalRows});
    }

  if (!mounted) return null;

  return (
    <saleIdContext.Provider value={saleId}>
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-4 w-[80%] md:w-[50%] px-4">
        <h1 className="text-2xl font-semibold text-globalone">Sales records</h1>
        <div className="w-full flex justify-center sm:justify-between items-center gap-2">
          <InputGroup
            value={inputSearh}
            setValue={setInputSearch}
          />
        <div className="shrink-0 relative">
          <FilterButton
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              filterCount={activeFilterCount}
            />
          <FilterPanel
            isOpen={isFilterPanelOpen}
            onClose={() => setIsFilterPanelOpen(false)}
            onApplyFilters={handleApplyFilters}
            initialFilters={appliedFilters} // Pass current filters to prefill
            triggerButtonRef={filterButtonRef as React.RefObject<HTMLButtonElement>} // Pass ref for desktop positioning
          />
        </div>
      </div>
    </div>

    <div className='relative w-[90%] flex justify-center h-[65dvh] md:h-[60dvh]'>
      {rows.length > 0 && (
      
          <DataGridComponent rows={rows} columns={columns} more={handleMore} edit={handleEdit} remove={handleRemove} paginationModel={paginationModel} setPaginationModel={handlePaginationChange}/>
        
         ) || (
          <div className="absolute inset-0 z-0  opacity-70 self-center w-full h-full flex items-center justify-center ">
            <p className="text-xl text-center text-gray-500">{messageOfFailure}</p>
          </div>
        )
      }
      {loading && (
        <div className="absolute inset-0 z-100  opacity-70 self-center w-full h-full flex items-center justify-center ">
          <LoadingComponent />
        </div>
      )}
      {
        showDeleteModal && (
          <DeleteModal setDeleteModal={setShowDeleteModal} elementId={saleId} data={rows} setData= {setRows}/>
        )
      }
    </div>
    {isSaleDisplayed && (<SalesModal setIsSaleDisplayed={setIsSaleDisplayed}  />)}
    
  </div>
  </saleIdContext.Provider>
  );
}
