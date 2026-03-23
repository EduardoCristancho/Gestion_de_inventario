"use client";

import ActionsButton from "./actionsButtons";
import DataGridComponent from "./DataGrid";
import { useState, useEffect, useMemo } from "react";
import SearchClients from "./searchClients";
import ViewMoreWarehouse from "./viewMoreWarehose";
import type { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

export interface warehouse {
  id: number;
  name: string;
  mail: string;
  address: string;
  phone: string;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "id",
    minWidth: 90,
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    type: "number",
  },
  {
    field: "name",
    headerName: "Nombre",
    minWidth: 150,
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    type: "string",
  },
  {
    field: "phone",
    headerName: "Teléfono",
    minWidth: 150,
    flex: 0.1,
    headerAlign: "center",
    align: "center",
    type: "string",
  },
  {
    field: "address",
    headerName: "Dirección",
    minWidth: 200,
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    type: "string",
  },
  {
    field: "mail",
    headerName: "Correo Electrónico",
    minWidth: 200,
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    type: "string",
  },
];

function Warehouses() {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState<warehouse[]>([
    {
      id: 0,
      name: "Loading...",
      address: "",
      mail: "",
      phone: "",
    },
  ]);

  const [isMounted, setIsMounted] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    paginationDetails: { page: 0, pageSize: 30 },
    totalRows: 0,
  });
  const [showViewMoreWarehouse, setShowViewMoreWarehouse] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<warehouse | null>(
    null
  );
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const warehousesData = [
    {
      id: 1,
      name: "Almacén Central 1",
      address: "C. Mayor 1, Ciudad",
      mail: "almacen1@example.com",
      phone: "5551000001",
    },
    {
      id: 2,
      name: "Almacén Norte 2",
      address: "Av. Norte 20, Ciudad",
      mail: "almacen2@example.com",
      phone: "5551000002",
    },
    {
      id: 3,
      name: "Almacén Sur 3",
      address: "C. Sur 3, Ciudad",
      mail: "almacen3@example.com",
      phone: "5551000003",
    },
    {
      id: 4,
      name: "Almacén Este 4",
      address: "Pza. Este 4, Ciudad",
      mail: "almacen4@example.com",
      phone: "5551000004",
    },
    {
      id: 5,
      name: "Almacén Oeste 5",
      address: "C. Oeste 5, Ciudad",
      mail: "almacen5@example.com",
      phone: "5551000005",
    },
    {
      id: 6,
      name: "Almacén Central 6",
      address: "C. Mayor 6, Ciudad",
      mail: "almacen6@example.com",
      phone: "5551000006",
    },
    {
      id: 7,
      name: "Almacén Norte 7",
      address: "Av. Norte 7, Ciudad",
      mail: "almacen7@example.com",
      phone: "5551000007",
    },
    {
      id: 8,
      name: "Almacén Sur 8",
      address: "C. Sur 8, Ciudad",
      mail: "almacen8@example.com",
      phone: "5551000008",
    },
    {
      id: 9,
      name: "Almacén Este 9",
      address: "Pza. Este 9, Ciudad",
      mail: "almacen9@example.com",
      phone: "5551000009",
    },
    {
      id: 10,
      name: "Almacén Oeste 10",
      address: "C. Oeste 10, Ciudad",
      mail: "almacen10@example.com",
      phone: "5551000010",
    },
    {
      id: 11,
      name: "Almacén 11",
      address: "C. Ficticia 11",
      mail: "almacen11@example.com",
      phone: "5551000011",
    },
    {
      id: 12,
      name: "Almacén 12",
      address: "C. Ficticia 12",
      mail: "almacen12@example.com",
      phone: "5551000012",
    },
    {
      id: 13,
      name: "Almacén 13",
      address: "C. Ficticia 13",
      mail: "almacen13@example.com",
      phone: "5551000013",
    },
    {
      id: 14,
      name: "Almacén 14",
      address: "C. Ficticia 14",
      mail: "almacen14@example.com",
      phone: "5551000014",
    },
    {
      id: 15,
      name: "Almacén 15",
      address: "C. Ficticia 15",
      mail: "almacen15@example.com",
      phone: "5551000015",
    },
    {
      id: 16,
      name: "Almacén 16",
      address: "C. Ficticia 16",
      mail: "almacen16@example.com",
      phone: "5551000016",
    },
    {
      id: 17,
      name: "Almacén 17",
      address: "C. Ficticia 17",
      mail: "almacen17@example.com",
      phone: "5551000017",
    },
    {
      id: 18,
      name: "Almacén 18",
      address: "C. Ficticia 18",
      mail: "almacen18@example.com",
      phone: "5551000018",
    },
    {
      id: 19,
      name: "Almacén 19",
      address: "C. Ficticia 19",
      mail: "almacen19@example.com",
      phone: "5551000019",
    },
    {
      id: 20,
      name: "Almacén 20",
      address: "C. Ficticia 20",
      mail: "almacen20@example.com",
      phone: "5551000020",
    },
    {
      id: 21,
      name: "Almacén 21",
      address: "C. Ficticia 21",
      mail: "almacen21@example.com",
      phone: "5551000021",
    },
    {
      id: 22,
      name: "Almacén 22",
      address: "C. Ficticia 22",
      mail: "almacen22@example.com",
      phone: "5551000022",
    },
    {
      id: 23,
      name: "Almacén 23",
      address: "C. Ficticia 23",
      mail: "almacen23@example.com",
      phone: "5551000023",
    },
    {
      id: 24,
      name: "Almacén 24",
      address: "C. Ficticia 24",
      mail: "almacen24@example.com",
      phone: "5551000024",
    },
    {
      id: 25,
      name: "Almacén 25",
      address: "C. Ficticia 25",
      mail: "almacen25@example.com",
      phone: "5551000025",
    },
    {
      id: 26,
      name: "Almacén 26",
      address: "C. Ficticia 26",
      mail: "almacen26@example.com",
      phone: "5551000026",
    },
    {
      id: 27,
      name: "Almacén 27",
      address: "C. Ficticia 27",
      mail: "almacen27@example.com",
      phone: "5551000027",
    },
    {
      id: 28,
      name: "Almacén 28",
      address: "C. Ficticia 28",
      mail: "almacen28@example.com",
      phone: "5551000028",
    },
    {
      id: 29,
      name: "Almacén 29",
      address: "C. Ficticia 29",
      mail: "almacen29@example.com",
      phone: "5551000029",
    },
    {
      id: 30,
      name: "Almacén 30",
      address: "C. Ficticia 30",
      mail: "almacen30@example.com",
      phone: "5551000030",
    },
    {
      id: 31,
      name: "Almacén 31",
      address: "C. Ficticia 31",
      mail: "almacen31@example.com",
      phone: "5551000031",
    },
    {
      id: 32,
      name: "Almacén 32",
      address: "C. Ficticia 32",
      mail: "almacen32@example.com",
      phone: "5551000032",
    },
    {
      id: 33,
      name: "Almacén 33",
      address: "C. Ficticia 33",
      mail: "almacen33@example.com",
      phone: "5551000033",
    },
    {
      id: 34,
      name: "Almacén 34",
      address: "C. Ficticia 34",
      mail: "almacen34@example.com",
      phone: "5551000034",
    },
    {
      id: 35,
      name: "Almacén 35",
      address: "C. Ficticia 35",
      mail: "almacen35@example.com",
      phone: "5551000035",
    },
    {
      id: 36,
      name: "Almacén 36",
      address: "C. Ficticia 36",
      mail: "almacen36@example.com",
      phone: "5551000036",
    },
    {
      id: 37,
      name: "Almacén 37",
      address: "C. Ficticia 37",
      mail: "almacen37@example.com",
      phone: "5551000037",
    },
    {
      id: 38,
      name: "Almacén 38",
      address: "C. Ficticia 38",
      mail: "almacen38@example.com",
      phone: "5551000038",
    },
    {
      id: 39,
      name: "Almacén 39",
      address: "C. Ficticia 39",
      mail: "almacen39@example.com",
      phone: "5551000039",
    },
    {
      id: 40,
      name: "Almacén 40",
      address: "C. Ficticia 40",
      mail: "almacen40@example.com",
      phone: "5551000040",
    },
    {
      id: 41,
      name: "Almacén 41",
      address: "C. Ficticia 41",
      mail: "almacen41@example.com",
      phone: "5551000041",
    },
    {
      id: 42,
      name: "Almacén 42",
      address: "C. Ficticia 42",
      mail: "almacen42@example.com",
      phone: "5551000042",
    },
    {
      id: 43,
      name: "Almacén 43",
      address: "C. Ficticia 43",
      mail: "almacen43@example.com",
      phone: "5551000043",
    },
    {
      id: 44,
      name: "Almacén 44",
      address: "C. Ficticia 44",
      mail: "almacen44@example.com",
      phone: "5551000044",
    },
    {
      id: 45,
      name: "Almacén 45",
      address: "C. Ficticia 45",
      mail: "almacen45@example.com",
      phone: "5551000045",
    },
    {
      id: 46,
      name: "Almacén 46",
      address: "C. Ficticia 46",
      mail: "almacen46@example.com",
      phone: "5551000046",
    },
    {
      id: 47,
      name: "Almacén 47",
      address: "C. Ficticia 47",
      mail: "almacen47@example.com",
      phone: "5551000047",
    },
    {
      id: 48,
      name: "Almacén 48",
      address: "C. Ficticia 48",
      mail: "almacen48@example.com",
      phone: "5551000048",
    },
    {
      id: 49,
      name: "Almacén 49",
      address: "C. Ficticia 49",
      mail: "almacen49@example.com",
      phone: "5551000049",
    },
    {
      id: 50,
      name: "Almacén 50",
      address: "C. Ficticia 50",
      mail: "almacen50@example.com",
      phone: "5551000050",
    },
    {
      id: 51,
      name: "Almacén 51",
      address: "C. Ficticia 51",
      mail: "almacen51@example.com",
      phone: "5551000051",
    },
    {
      id: 52,
      name: "Almacén 52",
      address: "C. Ficticia 52",
      mail: "almacen52@example.com",
      phone: "5551000052",
    },
    {
      id: 53,
      name: "Almacén 53",
      address: "C. Ficticia 53",
      mail: "almacen53@example.com",
      phone: "5551000053",
    },
    {
      id: 54,
      name: "Almacén 54",
      address: "C. Ficticia 54",
      mail: "almacen54@example.com",
      phone: "5551000054",
    },
    {
      id: 55,
      name: "Almacén 55",
      address: "C. Ficticia 55",
      mail: "almacen55@example.com",
      phone: "5551000055",
    },
    {
      id: 56,
      name: "Almacén 56",
      address: "C. Ficticia 56",
      mail: "almacen56@example.com",
      phone: "5551000056",
    },
    {
      id: 57,
      name: "Almacén 57",
      address: "C. Ficticia 57",
      mail: "almacen57@example.com",
      phone: "5551000057",
    },
    {
      id: 58,
      name: "Almacén 58",
      address: "C. Ficticia 58",
      mail: "almacen58@example.com",
      phone: "5551000058",
    },
    {
      id: 59,
      name: "Almacén 59",
      address: "C. Ficticia 59",
      mail: "almacen59@example.com",
      phone: "5551000059",
    },
    {
      id: 60,
      name: "Almacén 60",
      address: "C. Ficticia 60",
      mail: "almacen60@example.com",
      phone: "5551000060",
    },
    {
      id: 61,
      name: "Almacén 61",
      address: "C. Ficticia 61",
      mail: "almacen61@example.com",
      phone: "5551000061",
    },
    {
      id: 62,
      name: "Almacén 62",
      address: "C. Ficticia 62",
      mail: "almacen62@example.com",
      phone: "5551000062",
    },
    {
      id: 63,
      name: "Almacén 63",
      address: "C. Ficticia 63",
      mail: "almacen63@example.com",
      phone: "5551000063",
    },
    {
      id: 64,
      name: "Almacén 64",
      address: "C. Ficticia 64",
      mail: "almacen64@example.com",
      phone: "5551000064",
    },
    {
      id: 65,
      name: "Almacén 65",
      address: "C. Ficticia 65",
      mail: "almacen65@example.com",
      phone: "5551000065",
    },
    {
      id: 66,
      name: "Almacén 66",
      address: "C. Ficticia 66",
      mail: "almacen66@example.com",
      phone: "5551000066",
    },
    {
      id: 67,
      name: "Almacén 67",
      address: "C. Ficticia 67",
      mail: "almacen67@example.com",
      phone: "5551000067",
    },
    {
      id: 68,
      name: "Almacén 68",
      address: "C. Ficticia 68",
      mail: "almacen68@example.com",
      phone: "5551000068",
    },
    {
      id: 69,
      name: "Almacén 69",
      address: "C. Ficticia 69",
      mail: "almacen69@example.com",
      phone: "5551000069",
    },
    {
      id: 70,
      name: "Almacén 70",
      address: "C. Ficticia 70",
      mail: "almacen70@example.com",
      phone: "5551000070",
    },
    {
      id: 71,
      name: "Almacén 71",
      address: "C. Ficticia 71",
      mail: "almacen71@example.com",
      phone: "5551000071",
    },
    {
      id: 72,
      name: "Almacén 72",
      address: "C. Ficticia 72",
      mail: "almacen72@example.com",
      phone: "5551000072",
    },
    {
      id: 73,
      name: "Almacén 73",
      address: "C. Ficticia 73",
      mail: "almacen73@example.com",
      phone: "5551000073",
    },
    {
      id: 74,
      name: "Almacén 74",
      address: "C. Ficticia 74",
      mail: "almacen74@example.com",
      phone: "5551000074",
    },
    {
      id: 75,
      name: "Almacén 75",
      address: "C. Ficticia 75",
      mail: "almacen75@example.com",
      phone: "5551000075",
    },
    {
      id: 76,
      name: "Almacén 76",
      address: "C. Ficticia 76",
      mail: "almacen76@example.com",
      phone: "5551000076",
    },
    {
      id: 77,
      name: "Almacén 77",
      address: "C. Ficticia 77",
      mail: "almacen77@example.com",
      phone: "5551000077",
    },
    {
      id: 78,
      name: "Almacén 78",
      address: "C. Ficticia 78",
      mail: "almacen78@example.com",
      phone: "5551000078",
    },
    {
      id: 79,
      name: "Almacén 79",
      address: "C. Ficticia 79",
      mail: "almacen79@example.com",
      phone: "5551000079",
    },
    {
      id: 80,
      name: "Almacén 80",
      address: "C. Ficticia 80",
      mail: "almacen80@example.com",
      phone: "5551000080",
    },
    {
      id: 81,
      name: "Almacén 81",
      address: "C. Ficticia 81",
      mail: "almacen81@example.com",
      phone: "5551000081",
    },
    {
      id: 82,
      name: "Almacén 82",
      address: "C. Ficticia 82",
      mail: "almacen82@example.com",
      phone: "5551000082",
    },
    {
      id: 83,
      name: "Almacén 83",
      address: "C. Ficticia 83",
      mail: "almacen83@example.com",
      phone: "5551000083",
    },
    {
      id: 84,
      name: "Almacén 84",
      address: "C. Ficticia 84",
      mail: "almacen84@example.com",
      phone: "5551000084",
    },
    {
      id: 85,
      name: "Almacén 85",
      address: "C. Ficticia 85",
      mail: "almacen85@example.com",
      phone: "5551000085",
    },
    {
      id: 86,
      name: "Almacén 86",
      address: "C. Ficticia 86",
      mail: "almacen86@example.com",
      phone: "5551000086",
    },
    {
      id: 87,
      name: "Almacén 87",
      address: "C. Ficticia 87",
      mail: "almacen87@example.com",
      phone: "5551000087",
    },
    {
      id: 88,
      name: "Almacén 88",
      address: "C. Ficticia 88",
      mail: "almacen88@example.com",
      phone: "5551000088",
    },
    {
      id: 89,
      name: "Almacén 89",
      address: "C. Ficticia 89",
      mail: "almacen89@example.com",
      phone: "5551000089",
    },
    {
      id: 90,
      name: "Almacén 90",
      address: "C. Ficticia 90",
      mail: "almacen90@example.com",
      phone: "5551000090",
    },
    {
      id: 91,
      name: "Almacén 91",
      address: "C. Ficticia 91",
      mail: "almacen91@example.com",
      phone: "5551000091",
    },
    {
      id: 92,
      name: "Almacén 92",
      address: "C. Ficticia 92",
      mail: "almacen92@example.com",
      phone: "5551000092",
    },
    {
      id: 93,
      name: "Almacén 93",
      address: "C. Ficticia 93",
      mail: "almacen93@example.com",
      phone: "5551000093",
    },
    {
      id: 94,
      name: "Almacén 94",
      address: "C. Ficticia 94",
      mail: "almacen94@example.com",
      phone: "5551000094",
    },
    {
      id: 95,
      name: "Almacén 95",
      address: "C. Ficticia 95",
      mail: "almacen95@example.com",
      phone: "5551000095",
    },
    {
      id: 96,
      name: "Almacén 96",
      address: "C. Ficticia 96",
      mail: "almacen96@example.com",
      phone: "5551000096",
    },
    {
      id: 97,
      name: "Almacén 97",
      address: "C. Ficticia 97",
      mail: "almacen97@example.com",
      phone: "5551000097",
    },
    {
      id: 98,
      name: "Almacén 98",
      address: "C. Ficticia 98",
      mail: "almacen98@example.com",
      phone: "5551000098",
    },
    {
      id: 99,
      name: "Almacén 99",
      address: "C. Ficticia 99",
      mail: "almacen99@example.com",
      phone: "5551000099",
    },
    {
      id: 100,
      name: "Almacén 100",
      address: "C. Ficticia 100",
      mail: "almacen100@example.com",
      phone: "5551000100",
    },
  ];

  const fetchSimuledWarehouses = (page: number, pageSize: number) => {
    const pagedWarehouses = warehousesData.slice(
      page * pageSize,
      (page + 1) * pageSize
    );
    return { pagedWarehouses, totalRows: warehousesData.length };
  };

  const handelChangePagination = (paginationDetails: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel((prev) => ({
      ...prev,
      paginationDetails,
    }));
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const width = window.innerWidth;
        setWindowWidth((prev) => (prev !== width ? width : prev));
      }, 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchWarehouses() {
      try {
        /* const response = await fetch(`/api/getwarehouses?page=${paginationModel.paginationDetails.page}&pageSize=${paginationModel.paginationDetails.pageSize}`);
        const warehouses: warehouses = await response.json();
        setwarehouses(warehouses); */
        const warehouses = fetchSimuledWarehouses(
          paginationModel.paginationDetails.page,
          paginationModel.paginationDetails.pageSize
        );
        setWarehouses(warehouses.pagedWarehouses);
        setPaginationModel((prev) => ({
          ...prev,
          totalRows: warehouses.totalRows,
        }));
        setIsMounted(true);
      } catch (error) {
        console.error("Error al obtener los almacenes:", error);
        alert(
          "Error al obtener los almacenes. Por favor, inténtelo de nuevo más tarde."
        );
        /* alert("Error al obtener los almacenes. Por favor, inténtelo de nuevo más tarde."); */
      }
    }
    fetchWarehouses();
  }, [
    paginationModel.paginationDetails.pageSize,
    paginationModel.paginationDetails.page,
  ]);

  if (!isMounted) {
    return null;
  }

  function handelMoreWarehouse(warehouseId: number) {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    if (warehouse) {
      console.log("Warehouse found:", warehouse);
      setSelectedWarehouse(warehouse);
      setShowViewMoreWarehouse(true);
    } else {
      alert("Warehouse not found");
    }
  }

  function handleEditWarehouse(warehouseId: number) {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    if (warehouse) {
      const params = new URLSearchParams({

        warehouseId: warehouse.id.toString(),
        name: warehouse.name,
        address: warehouse.address,
        phone: warehouse.phone,
        mail: warehouse.mail,
      });
      router.push(`warehouses/edit?${params.toString()}`);
    } else {
      alert("Warehouse not found");
    }
  }
  function handleRemoveWarehouse(warehouseId: number) {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    if (warehouse) {
      const confirmDelete = window.confirm(
        `¿Estás seguro de que deseas eliminar al almacén ${warehouse.name}?`
      );
      if (!confirmDelete) return;
      const updatedWarehouses = warehouses.filter((w) => w.id !== warehouseId);
      fetch(`/api/removewarehouse?id=${warehouseId}`)
        .then((response) => response.json())
        .then(() => {
          setWarehouses(updatedWarehouses);
          alert(`Almacén ${warehouse.name} eliminado.`);
        })
        .catch((error) => {
          console.error("Error al eliminar el almacén:", error);
          alert("Error al eliminar el almacén. Por favor, inténtelo de nuevo.");
        });
    } else {
      alert("Warehouse not found");
    }
  }

  let filteredColumns = columns;
  if (windowWidth < 420) {
    filteredColumns = columns.filter(
      (col) =>
        col.field !== "email" &&
        col.field !== "address" &&
        col.field !== "phone"
    );
  } else if (windowWidth < 600) {
    filteredColumns = columns.filter(
      (col) =>
        col.field !== "email" &&
        col.field !== "address" &&
        col.field !== "phone"
    );
  } else if (windowWidth < 800) {
    filteredColumns = columns.filter(
      (col) => col.field !== "email" && col.field !== "address"
    );
  } else if (windowWidth < 1000) {
    filteredColumns = columns.filter((col) => col.field !== "email");
  }

  return (
    <>
      <div
        id="main"
        className={`flex flex-col items-center pt-5 sm:pt-2 gap-5 min-w-[330px] h-[78dvh] border ${
          showViewMoreWarehouse
            ? "pointer-events-none blur-sm"
            : "pointer-events-auto"
        }`}
      >
        <SearchClients clients={warehousesData} setClients={setWarehouses} />
        <div className="relative w-full h-[60.5dvh]">
          <DataGridComponent
            paginationModel={paginationModel}
            setPaginationModel={handelChangePagination}
            columns={filteredColumns}
            rows={warehouses}
            more={(_, currentSelection: number) => {
              handelMoreWarehouse(currentSelection);
            }}
            edit={(_, currentSelection: number) => {
              handleEditWarehouse(currentSelection);
            }}
            remove={(_, currentSelection: number) => {
              handleRemoveWarehouse(currentSelection);
            }}
          />
          <ActionsButton />
        </div>
      </div>
      <ViewMoreWarehouse
        showViewMoreWarehouse={showViewMoreWarehouse}
        setShowViewMoreWarehouse={setShowViewMoreWarehouse}
        selectedWarehouse={selectedWarehouse}
      />
    </>
  );
}

export default Warehouses;
