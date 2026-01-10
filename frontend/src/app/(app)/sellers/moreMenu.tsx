"use client";

import { useRouter } from "next/navigation";

async function handleDeleteSeller(sellerId: number) {
  try {
    const response = await fetch(`/sellers/delete/${sellerId}`);
    if (response.ok) {
      alert("Vendedor eliminado correctamente");
      window.location.reload();
    } else {
      throw new Error("Failed to delete seller");
    }
  } catch (error) {
    alert("Error al eliminar el vendedor");
    console.error("Error deleting seller:", error);
  }
}

function MoreMenu({ sellerId }: { sellerId: number }) {
  const router = useRouter();

  function handleEditSeller(sellerId: number) {
    router.push(`/editSeller?sellerId=${sellerId}`);
  }

  return (
    <div
      className={`absolute flex flex-col bg-primary text-globalone py-2 w-35 text-xl rounded-xl gap-1 overflow-hidden right-12 transtion-all duration-300 cursor-pointer`}
    >
      <div onClick={() => handleEditSeller(sellerId)}>Editar</div>
      <hr />
      <div onClick={() => handleDeleteSeller(sellerId)}>Eliminar</div>
    </div>
  );
}

export default MoreMenu;
