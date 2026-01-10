'use client'
import DataGridComponent from "@/components/DataGrid";
import { InputGroup } from "@/components/inputGroup";
import LoadingComponent from "@/components/LoadingComponent";
import { ProviderModal } from "@/components/provider/providerModal";
import { DeleteModal } from "@/components/deleteModal";
import { handleError, NotFoundError, unhandledError } from "@/utils/errorClasess";
import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState, useRef } from "react";
import { set } from "zod";

export const  providerContext = createContext<number | null>(null);
export default function providers(){
    const [inputSearch, setInputSearch] = useState("");
    const [paginationModel, setPaginationModel] = useState({paginationDetails : { page: 0, pageSize: 50 }, totalRows: 0});
    const [mounted, setMounted] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [messageOfFailure, setMessageOfFailure] = useState("");
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<any[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [supplierId, setSupplierId] = useState(0);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
        id: false,
    });
    const lastSearch = useRef('');
    const router = useRouter();

    function handlePaginationChange({page, pageSize}: {page: number, pageSize: number}){
        setPaginationModel((prev) => ({...prev, paginationDetails: {page, pageSize}}))
    }

    function handleMore(event: React.MouseEvent, id: number){
        setSupplierId(id);
        setShowMore(true);
    }

    function handleEdit(event: React.MouseEvent, id: number){
        return router.push(`/management/providers/edit/${id}`);
    }

    function handleRemove(event: React.MouseEvent, id: number){
        setShowDeleteModal(true);
        setSupplierId(id);
    }
    
    async function handleInputSearch(){
        lastSearch.current = inputSearch;
            if (inputSearch !== lastSearch.current) return;
            try {
              //si esta vacio mostramos todos los datos
              if (inputSearch === '') {
                callFetchData();
                return;
              }
        
              setRows([]);
              setLoading(true);
              const response = await fetch(`/api/supplier/${inputSearch}`,
                {
                  method: 'GET',
                  credentials: 'include',
                }
              );
              if (response.status !== 200 && response.status !== 404) {
                throw new unhandledError("Error al cargar los datos de los proveedores,  intente mas tarde");
              }
              if (response.status === 404) {
                throw new NotFoundError("No se encontraron datos del proveedor");
              }
              const providerData = await response.json();
              providerData.date = new Date(providerData.date).toLocaleDateString();
              setRows([providerData]);
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
    }, [inputSearch]);

    async function fetchData(){
        try {
            const response = await fetch(`/api/supplier?page=${paginationModel.paginationDetails.page }&limit=${paginationModel.paginationDetails.pageSize}`,
                {
                    method: 'GET',
                    credentials: 'include',
                }
            ); 
            if (response.status !== 200 && response.status !== 404) {
                throw new unhandledError("Error al cargar los datos de los proveedores, intente mas tarde");
            }
            if (response.status === 404) {
                throw new NotFoundError("No se encontraron datos de los proveedores");
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
            setRows(result.data.map((supplier: any) => supplier));
            setPaginationModel({...paginationModel, totalRows: result.total});
            setMounted(true);
          }
          
          setRows(result.data.map((supplier: any) => supplier));
          setPaginationModel({...paginationModel, totalRows: result.total});
        }catch (error : any) {
          setMounted(true);
          handleError(error, (error) => setMessageOfFailure(error));
        }
      }
    useEffect(() => {
        callFetchData();
    }, [paginationModel.paginationDetails.page, paginationModel.paginationDetails.pageSize])

    async function handleSaleDelete(): Promise<boolean> {
        try {
            const response = await fetch(`/api/supplier/${supplierId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!response.ok) return false;
            setRows(rows.filter((item) => item.id !== supplierId));
            return true;
        } catch {
            return false;
        }
  }
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', flex: 1, minWidth: 100, disableColumnMenu: true, },
        {field: 'rif', headerName: 'Rif', flex: 1, minWidth: 100, disableColumnMenu: true},
        { field: 'name',headerName: 'Nombre',flex: 1,minWidth: 150,disableColumnMenu: true},
        { field: 'phone', headerName: 'Telefono', flex: 1, minWidth: 100, disableColumnMenu: true },
        { field: 'address', headerName: 'Direccion', flex: 1, minWidth: 70, disableColumnMenu: true },
    ];

    
    if(!mounted) return null;

    return (
        <providerContext.Provider value={supplierId}>
            <div className=" text-globalone flex flex-col gap-4 relative w-[100%] ">
                <h1 className="text-center text-2xl mt-2">Proveedores</h1>
                <div className="w-[80%] md:w-[50%] self-center flex gap-2 items-center">
                    <InputGroup value={inputSearch} setValue={setInputSearch} placeholder="Rif del proveedor" />
                    <button className="cursor-pointer" onClick={() =>router.push('/management/providers/create')}>
                        <img src="/addIcon.png" className="w-10 h-10 object-contain self-center" alt="" />
                    </button>
                </div>
                <div className="w-[90%]  h-[65dvh] md:h-[60dvh] self-center flex gap-2 relative">

                    {rows.length > 0 && (
                        <DataGridComponent gridColumnVisibilityModel={columnVisibilityModel} setColumnVisibilityModel={setColumnVisibilityModel} rows={rows} columns={columns} more={handleMore} edit={handleEdit} remove={handleRemove} paginationModel={paginationModel} setPaginationModel={handlePaginationChange}/>
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
                            <DeleteModal setDeleteModal={setShowDeleteModal} 
                                onDelete={handleSaleDelete}
                                successMessage="¡Proveedor eliminado correctamente!"
                                errorMessage="Hubo un error al eliminar el proveedor"
                                confirmMessage="¿Deseas eliminar el proveedor?"
                                />
                        )
                    }
                </div>

                {/* Modal de mas informacion */}
                    {showMore && <ProviderModal setShowMore={setShowMore} />}

            </div>
        </providerContext.Provider>
    )
}