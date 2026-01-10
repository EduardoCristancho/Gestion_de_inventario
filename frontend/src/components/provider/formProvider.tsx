export default function FormProvider(props: any){
    
    const {provider , setProvider, handleSubmit, handleClear} = props;
    return (
  <div className="w-full h-full flex flex-col gap-4">
  {[
    { label: "Nombre", value: provider.name, key: "name" },
    { label: "Rif", value: provider.rif, key: "rif" },
    { label: "Correo", value: provider.email, key: "email" },
    { label: "Dirección", value: provider.address, key: "address" },
    { label: "Teléfono", value: provider.phone, key: "phone" },
  ].map(({ label, value, key }) => (
    <div
      key={key}
      className="
        text-globalone 
        flex 
        flex-col 
        sm:flex-row 
        sm:items-center 
        gap-2 sm:gap-4 
        mb-2
      "
    >
      <label
        htmlFor={key}
        className="
          sm:w-1/4 
          text-sm sm:text-base 
          font-semibold
        "
      >
        {label}
      </label>
      <input
        id={key}
        type="text"
        className="
          bg-white 
          rounded-xl 
          p-3 
          w-full  
          h-9 sm:h-10 
          text-black 
          text-sm 
          border 
          border-gray-500 
          font-semibold  
          focus:outline-none
        "
        value={value}
        onChange={(e) =>
          setProvider({
            ...provider,
            [key]: e.target.value,
          })
        }
      />
    </div>
  ))}

  {/* Botones */}
  <div
    className="
      w-full 
      sm:w-[70%] 
      md:w-[60%] 
      lg:w-[50%] 
      self-center 
      flex 
      flex-col 
      sm:flex-row 
      justify-between 
      gap-3 
      mt-4
    "
  >
    <button
      className="
        bg-gray-700 
        cursor-pointer 
        text-white 
        px-6 py-2 
        rounded-full 
        hover:bg-globalone/30 
        transition
      "
      onClick={handleClear}
    >
      Cancelar
    </button>

    <button
      className="
        bg-success 
        cursor-pointer 
        text-white 
        px-6 py-2 
        rounded-full 
        hover:bg-globalone/30 
        transition
      "
      onClick={handleSubmit}
    >
      Guardar
    </button>
  </div>
</div>

    )
}