export default function TestStyles() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Test de Tailwind</h1>
      
      <div className="space-y-4">
        <div className="bg-red-500 text-white p-4 rounded">
          Tailwind estándar: bg-red-500
        </div>
        
        <div className="bg-primary text-globalone p-4 rounded">
          Colores personalizados: bg-primary text-globalone
        </div>
        
        <div className="bg-secondary text-white p-4 rounded">
          Color secundario: bg-secondary
        </div>
        
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-blue-500"></div>
          <div className="w-20 h-20 bg-green-500"></div>
          <div className="w-20 h-20 bg-yellow-500"></div>
        </div>
      </div>
    </div>
  );
}
