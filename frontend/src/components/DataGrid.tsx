import { DataGrid, GridColDef, GridPaginationModel, GridRowParams, GridRowSelectionModel, GridValueGetter  } from '@mui/x-data-grid';
import React, { useState, useEffect, useRef, use, startTransition } from 'react';
import { Box } from '@mui/material';
import ActionsButton from './actionsButtons';

interface DataGridComponentProps {
  columns: GridColDef[];
  rows: any[];
  paginationModel: {paginationDetails: GridPaginationModel, totalRows: number};
  setPaginationModel: (paginationModel: {page: number, pageSize: number}) => void;
  more?: (event: React.MouseEvent, rowId: number)=>void | undefined;
  edit?: (event: React.MouseEvent, rowId: number)=>void | undefined;
  remove?: (event: React.MouseEvent, rowId: number)=>void | undefined;
}

export default function DataGridComponent (props: DataGridComponentProps) {  
    const {columns, rows, paginationModel, setPaginationModel, more, edit, remove} = props;
    const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
    const [openModal, setOpenModal] = useState(false);
    const [selectionModel, setSelectionModel] = useState<Set<number>>(new Set());
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [popupVisible, setPopupVisible] = useState(false);
    
    const handleRowSelection = (
        newSelectionModel: GridRowSelectionModel,
        event: any
    ) => {
    
      const selectedIds = newSelectionModel.ids as Set<number>;
      const firstId = [...selectedIds][0] ?? null;

      // Si se hace clic sobre la fila ya seleccionada
      if (firstId === null && selectedRowId !== null) {
          closeActionsButtons();
          return;
      }

      // Si es la misma fila, no hay necesidad de hacer nada
      if (firstId === selectedRowId) return;
      
      startTransition(() => {
          setSelectionModel(selectedIds);
          setOpenModal(false);
          setPopupVisible(false);
          setSelectedRowId(firstId);
          const rowElement = document.querySelector(`[data-id="${firstId}"]`) as HTMLElement;
          const rect = rowElement.getBoundingClientRect();
          const scroller = document.querySelector('.MuiDataGrid-virtualScroller') as HTMLElement;
          const scrollerRect = scroller?.getBoundingClientRect();

          // Posicionamiento relativo al contenedor (si usas position: absolute sobre el contenedor)
          const top = rect.top - scrollerRect.top - rect.height  ;
          const right = 10;

          setModalPosition({
            top,
            right
          });
        });
        return;
    };
  
useEffect(() => {
  if (selectedRowId !== null) {
    const timer1 = setTimeout(() => {
      setOpenModal(true);
      const timer2 = setTimeout(() => {
        setPopupVisible(true);
      }, 60);
      return () => clearTimeout(timer2);
    }, 50);
    return () => clearTimeout(timer1);
  }
}, [selectedRowId]);

  const closeActionsButtons = () => {
    startTransition(() => {
      setPopupVisible(false);
      setSelectionModel(new Set());
      setSelectedRowId(null);
      setTimeout(() => {
        setOpenModal(false);
      }, 100);
    });
  }
 useEffect(() => {
  const scroller = document.querySelector('.MuiDataGrid-virtualScroller');


  if (scroller && openModal) {
    scroller.addEventListener('scroll', closeActionsButtons);
  }

  return () => {
    scroller?.removeEventListener('scroll', closeActionsButtons);
  };
}, [openModal]);

return (
    <>
      <Box sx={{ width: '100%', minHeight: '100%' }}>
        <DataGrid

          columns={columns}
          rows={rows}
          disableColumnResize={true}
          getRowId={(row) => row.id}
          rowSelectionModel={{
          ids: selectionModel,
          type: 'include', // Puedes cambiar a 'exclude' si lo necesitas
          }}
          paginationMode='server'
          rowCount={paginationModel.totalRows}
          paginationModel={paginationModel.paginationDetails}
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={handleRowSelection}
          pageSizeOptions={[50, 100]} 
   
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: 'var(--color-tertiary)',
              color: 'var(--color-globalone)',
            },
            '& .MuiDataGrid-virtualScroller': {
              overflowY: 'auto',
              maxHeight: '100%',
            },
            '& .MuiDataGrid-footerContainer': {
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'var(--color-quaternary)',
            },
            '& .MuiTablePagination-root': {
              color: 'var(--color-globalone)',
            },
            '& .MuiTablePagination-actions button:not(:disabled) svg': {
              color: 'var(--color-globalone)', // Color cuando el botón está activo
            },
            '& .MuiTablePagination-actions button:disabled svg': {
              color: 'var(--color-tertiary)', // Color cuando está desactivado
            },
            '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            },
            '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: 'var(--color-secondary)',
            },
            '& .MuiDataGrid-row:hover':{
              backgroundColor: 'var(--color-tertiary)',
              color: 'var(--color-globalone)',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            '& .MuiDataGrid-cell.Mui-selected': {
            border: 'none', // Elimina el borde de las celdas seleccionadas
            },
            '& .MuiDataGrid-cell: focus' : {
              outline: 'none', /* Eliminar el borde de enfoque */
            },

            backgroundColor: 'var(--color-quaternary)',
            color: 'var(--color-globalone)',
            border: 'none',
          }}
        />
      </Box>
      {openModal && (<ActionsButton 
        top={modalPosition.top} 
        right={modalPosition.right} 
        state={popupVisible} 
        ref={popupRef} 
        handleMore={more? more : null} 
        handleEdit={edit? edit : null} 
        handleRemove={remove? remove : null} 
        currentSelection={selectedRowId} 
        handleClose = {closeActionsButtons}
        />
      )}
    </>
    );
}