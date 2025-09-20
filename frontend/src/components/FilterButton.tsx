'use client'

import React from 'react'

interface FilterButtonProps {
  onClick: () => void
  filterCount?: number // Optional: to show how many filters are active
}

export default function FilterButton({ onClick, filterCount }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative border border-secondary rounded-xl w-[7/10] p-1 px-2 mx-2 text-globalone text-sm flex items-center justify-center gap-1 bg-tertiary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 "
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-6.586L4.293 6.707A1 1 0 014 6V3z"
          clipRule="evenodd"
        />
      </svg>
      <span className='m-0 hidden md:inline'>Filtros</span>
      
      {filterCount && filterCount > 0 && (
        <span className=" inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {filterCount}
        </span>
      )}
    </button>
  )
}