'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from '@/lib/useMediaQuery' // Adjust path if necessary

interface FilterValues {
  dateFrom: string
  dateTo: string
  clientName: string
}

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterValues) => void
  initialFilters?: Partial<FilterValues>
  triggerButtonRef?: React.RefObject<HTMLButtonElement>  // For desktop dropdown positioning
}

export default function FilterPanel({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {},
  triggerButtonRef,
}: FilterPanelProps) {
  const [dateFrom, setDateFrom] = useState(initialFilters.dateFrom || '')
  const [dateTo, setDateTo] = useState(initialFilters.dateTo || '')
  const [clientName, setClientName] = useState(initialFilters.clientName || '')

  const isMobile = useMediaQuery('(max-width: 639px)') // Tailwind's sm breakpoint is 640px
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset internal state if initialFilters change (e.g., external clear)
    setDateFrom(initialFilters.dateFrom || '')
    setDateTo(initialFilters.dateTo || '')
    setClientName(initialFilters.clientName || '')
  }, [initialFilters])

  // Close on outside click for desktop dropdown
  useEffect(() => {
    if (!isOpen || isMobile || !panelRef.current) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerButtonRef?.current &&
        !triggerButtonRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, isMobile, triggerButtonRef])

  const handleApply = () => {
    onApplyFilters({ dateFrom, dateTo, clientName })
    onClose() // Close panel after applying
  }

  const handleClear = () => {
    setDateFrom('')
    setDateTo('')
    setClientName('')
    onApplyFilters({ dateFrom: '', dateTo: '', clientName: '' }) // Apply empty filters
    onClose();
  }

  const commonClasses = "bg-quaternary rounded-lg shadow-xl p-6"
  const mobileClasses = `fixed inset-y-0 right-0 w-4/5 max-w-xs z-50 transform transition-transform duration-300 ease-in-out ${isOpen && isMobile ? 'translate-x-0' : 'translate-x-full'}`
  const desktopClasses = `absolute top-full right-0 mt-2 w-80 rounded-lg z-30 transition-opacity duration-150 ease-out ${isOpen && !isMobile ? 'opacity-100 visible' : 'opacity-0 invisible'}`

  if (!isOpen && !isMobile) { // For desktop, don't render if not open to simplify transitions
      return null;
  }
  if (!isOpen && isMobile) { // For mobile, allow CSS transition to work even if not "visible" in DOM
      // Render with translate-x-full
  }


  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        />
      )}

      <div
        ref={panelRef}
        className={`${commonClasses} ${isMobile ? mobileClasses : desktopClasses}`}
        aria-modal={isMobile ? "true" : undefined}
        role={isMobile ? "dialog" : undefined}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-globalone">
            Filtros
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 sm:hidden" // Only show close button in panel header on mobile
            aria-label="Cerrar panel de filtros"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 ">
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-secondary ">
              Desde
            </label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  bg-tertiary text-globalone"
            />
          </div>
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-secondary">
              Hasta
            </label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-tertiary text-globalone"
            />
          </div>
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-secondary">
              Nombre del Cliente
            </label>
            <input
              type="text"
              id="clientName"
              placeholder="Ej: John Doe"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  bg-tertiary text-globalone"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </>
  )
}