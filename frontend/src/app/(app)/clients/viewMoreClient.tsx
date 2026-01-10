import { client } from "./page";
import { IoCloseCircle } from "react-icons/io5";

function ViewMoreClient({
  showViewMoreClient,
  setShowViewMoreClient,
  selectedClient,
}: {
  showViewMoreClient: boolean;
  setShowViewMoreClient: (value: boolean) => void;
  selectedClient: client | null;
}) {
  if (selectedClient === null) {
    return null;
  }

  return (
    <div
      className={`fixed min-w-[370px] self-center mx-auto w-full sm:w-8/10 md:w-7/10 lg:w-6/10 xl:w-5/10 sm:left-[10%] md:left-[14.5%] lg:left-[19.5%] xl:left-[24.5%] bg-primary flex flex-col justify-start rounded-xl px-9 py-8 pb-30 sm:pb-9 shadow-[0_-4px_6px_rgba(0,0,0,0.7)] sm:shadow-[4px_4px_6px_rgba(0,0,0,0.7)] sm:rounded-xl text-xl text-globalone top-auto bottom-0 sm:top-[50%] sm:bottom-[50%] duration-300 ease-in-out ${
        showViewMoreClient ? "translate-y-0" : "translate-y-full sm:hidden"
      }`}
      key={selectedClient.id}
    >
      <div className="flex justify-between items-center mb-8 duration-0">
        <img src="customers.png" alt="" className="h-17" />
        <div className="flex flex-col items-center ml-[-27px] w-full text-ellipsis whitespace-nowrap overflow-hidden">
          <span>{selectedClient.id}</span>
          <span className="text-2xl font-bold">
            {selectedClient.firstName} {selectedClient.lastName}
          </span>
        </div>
        <button
          className="absolute top-[20px] right-[20px] h-[35px] w-[35px] flex items-center justify-center rounded-md text-globalone text-3xl  hover:cursor-pointer"
          onClick={() => setShowViewMoreClient(false)}
        >
          <IoCloseCircle className="text-4xl text-danger" />
        </button>
      </div>
      <div className="flex flex-col gap-4 duration-0">
        <span>
          <strong>Correo Electrónico:</strong> <br /> {selectedClient.email}
        </span>
        <span>
          <strong>Teléfono:</strong> <br /> {selectedClient.phone}
        </span>
        <span>
          <strong>Dirección:</strong> <br /> {selectedClient.address}
        </span>
      </div>
    </div>
  );
}

export default ViewMoreClient;
