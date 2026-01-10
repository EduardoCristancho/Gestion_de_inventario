export default function DisplayClientData(props: any) {
    const {clientData} = props;
    return (
        <div className='w-full overflow-y-auto'>
            <div className='flex flex-col items-evenly gap-4'>
                <div className="flex justify-between gap-10">
                    <div className='flex flex-col gap-1'>
                    <p className='text-3sm md:text-lg font-semibold'><span className="font-bold block md:inline"># Cédula:</span> {clientData.identifier}</p>
                    <p className='text-3sm md:text-lg font-semibold' ><span className="font-bold block md:inline">Nombre:</span> {clientData.name}</p>
                    </div>
                    <img src="/client.png" className='w-20 h-20 object-contain self-center' alt="Cliente" />
                </div>
                <p className='text-3sm md:text-lg font-semibold'><span className="font-bold block md:inline">Correo:</span> {clientData.email}</p>
                <p className='text-3sm md:text-lg font-semibold'><span className="font-bold block md:inline">Dirección:</span> {clientData.address}</p>
                <p className='text-3sm md:text-lg font-semibold'><span className="font-bold block md:inline">Teléfono:</span> {clientData.phone}</p>
            </div>
        </div>
    )
}