export default function DisplayClientData(props: any) {
    const {clientData} = props;
    return (
        <div className='bg-white/5 rounded-xl p-4 space-y-3'>
            <div className="flex items-start justify-between">
                <div className='space-y-2 flex-1'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                        <span className="text-white/60 text-sm font-medium">Cédula:</span>
                        <span className="text-white font-semibold">{clientData.identifier}</span>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                        <span className="text-white/60 text-sm font-medium">Nombre:</span>
                        <span className="text-white font-semibold">{clientData.name}</span>
                    </div>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
            </div>
            
            <div className='space-y-2 pt-2 border-t border-white/10'>
                <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                    <span className="text-white/60 text-sm font-medium">Email:</span>
                    <span className="text-white text-sm">{clientData.email}</span>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-center gap-1'>
                    <span className="text-white/60 text-sm font-medium">Teléfono:</span>
                    <span className="text-white text-sm">{clientData.phone}</span>
                </div>
                <div className='flex flex-col sm:flex-row sm:items-start gap-1'>
                    <span className="text-white/60 text-sm font-medium">Dirección:</span>
                    <span className="text-white text-sm">{clientData.address}</span>
                </div>
            </div>
        </div>
    )
}