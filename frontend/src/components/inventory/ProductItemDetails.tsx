import Product from "@/types/interface/product";

export default function ProductItemDetails({ item }: { item: Product }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <span className="text-sm sm:text-xs font-semibold text-secondary">
          SKU: {item.sku}
        </span>
        <span className="text-sm sm:text-xs">
          Cantidad:{" "}
          <span
            className={`font-semibold ${
              item.quantity === 0 ? "text-red-500" : ""
            }`}
          >
            {item.quantity}
          </span>
        </span>
      </div>
      <div className="flex flex-col justify-center items-center mt-2 ">
        <span className="text-sm text-globalsecond">{item.name}</span>
        <div className="flex flex-col items-center max-w-[80%] text-center">
          <span className="text-sm sm:text-xs">
            Descripción:{" "}
            <span className="text-sm sm:text-xs">{item.description}</span>
          </span>
          {item.status === "agotado" && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">
              Agotado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
