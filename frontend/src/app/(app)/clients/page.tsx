"use client";

import ActionsButton from "./actionsButtons";
import DataGridComponent from "./DataGrid";
import { useState, useEffect, useMemo } from "react";
import SearchClients from "./searchClients";
import ViewMoreClient from "./viewMoreClient";
import type { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

export interface client {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Cédula",
    minWidth: 90,
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    type: "number",
  },
  {
    field: "firstName",
    headerName: "Nombre",
    minWidth: 150,
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    type: "string",
  },
  {
    field: "lastName",
    headerName: "Apellido",
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
    field: "email",
    headerName: "Correo Electrónico",
    minWidth: 200,
    flex: 0.2,
    headerAlign: "center",
    align: "center",
    type: "string",
  },
];

function Clients() {

  const router = useRouter();
  const [clients, setClients] = useState<client[]>([
    {
      id: 0,
      firstName: "Loading...",
      lastName: "",
      address: "",
      email: "",
      phone: "",
    },
  ]);

  const [isMounted, setIsMounted] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    paginationDetails: { page: 0, pageSize: 30 },
    totalRows: 0,
  });
  const [showViewMoreClient, setShowViewMoreClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<client | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const clientsData = [
    {
      id: 1,
      firstName: "Jose Luis",
      lastName: "Tello",
      address: "Alameda Maricruz Ramos 35 Puerta 0 ",
      email: "joseluis.tello1@example.com",
      phone: "5551230001",
    },
    {
      id: 2,
      firstName: "Marino",
      lastName: "Egea",
      address: "C. de Leandra Robledo 20",
      email: "marino.egea2@example.com",
      phone: "5551230002",
    },
    {
      id: 3,
      firstName: "Bernabé",
      lastName: "Matas",
      address: "Pasaje de Merche Perelló 993",
      email: "bernabé.matas3@example.com",
      phone: "5551230003",
    },
    {
      id: 4,
      firstName: "Marcelo",
      lastName: "Martín",
      address: "Pasaje Luisa Nogués 73 Piso 7 ",
      email: "marcelo.martín4@example.com",
      phone: "5551230004",
    },
    {
      id: 5,
      firstName: "Maricruz",
      lastName: "Muñoz",
      address: "Acceso de Vito Jover 921 Puerta 2 ",
      email: "maricruz.muñoz5@example.com",
      phone: "5551230005",
    },
    {
      id: 6,
      firstName: "Sebastián",
      lastName: "Ribera",
      address: "Paseo de Yéssica Gonzalez 1",
      email: "sebastián.ribera6@example.com",
      phone: "5551230006",
    },
    {
      id: 7,
      firstName: "Hilda",
      lastName: "Baró",
      address: "Camino Juliana Diez 51",
      email: "hilda.baró7@example.com",
      phone: "5551230007",
    },
    {
      id: 8,
      firstName: "Angélica",
      lastName: "Hervás",
      address: "Avenida Faustino Ponce 73 Piso 3 ",
      email: "angélica.hervás8@example.com",
      phone: "5551230008",
    },
    {
      id: 9,
      firstName: "Gaspar",
      lastName: "Rosado",
      address: "Via Rosa Vallejo 39 Piso 7 ",
      email: "gaspar.rosado9@example.com",
      phone: "5551230009",
    },
    {
      id: 10,
      firstName: "Arsenio",
      lastName: "Maestre",
      address: "Ronda de Gervasio Velasco 29",
      email: "arsenio.maestre10@example.com",
      phone: "5551230010",
    },
    {
      id: 11,
      firstName: "Alex",
      lastName: "Ferrer",
      address: "C. de Erasmo Antúnez 88",
      email: "alex.ferrer11@example.com",
      phone: "5551230011",
    },
    {
      id: 12,
      firstName: "María Pilar",
      lastName: "Álamo",
      address: "Avenida Susana Cueto 89",
      email: "maríapilar.álamo12@example.com",
      phone: "5551230012",
    },
    {
      id: 13,
      firstName: "Baudelio",
      lastName: "Varela",
      address: "Pasaje Melania Carnero 62",
      email: "baudelio.varela13@example.com",
      phone: "5551230013",
    },
    {
      id: 14,
      firstName: "Gil",
      lastName: "Villena",
      address: "Callejón de Laura Tudela 48 Piso 7 ",
      email: "gil.villena14@example.com",
      phone: "5551230014",
    },
    {
      id: 15,
      firstName: "Macario",
      lastName: "Chacón",
      address: "Cuesta Hector Dalmau 9 Piso 8 ",
      email: "macario.chacón15@example.com",
      phone: "5551230015",
    },
    {
      id: 16,
      firstName: "María Carmen",
      lastName: "Alcolea",
      address: "Calle Irma Corral 16",
      email: "maríacarmen.alcolea16@example.com",
      phone: "5551230016",
    },
    {
      id: 17,
      firstName: "Margarita",
      lastName: "Vilaplana",
      address: "Vial de Elisa Pont 64",
      email: "margarita.vilaplana17@example.com",
      phone: "5551230017",
    },
    {
      id: 18,
      firstName: "Ibán",
      lastName: "Larrea",
      address: "Cañada de Abraham Castellanos 512 Apt. 64 ",
      email: "ibán.larrea18@example.com",
      phone: "5551230018",
    },
    {
      id: 19,
      firstName: "Carmelo",
      lastName: "Benet",
      address: "Paseo Dorotea Arranz 90 Apt. 07 ",
      email: "carmelo.benet19@example.com",
      phone: "5551230019",
    },
    {
      id: 20,
      firstName: "Reyes",
      lastName: "Sanabria",
      address: "Calle de Glauco Rosado 35 Apt. 71 ",
      email: "reyes.sanabria20@example.com",
      phone: "5551230020",
    },
    {
      id: 21,
      firstName: "Dorita",
      lastName: "Sacristán",
      address: "Glorieta Emilio Losada 15",
      email: "dorita.sacristán21@example.com",
      phone: "5551230021",
    },
    {
      id: 22,
      firstName: "Haydée",
      lastName: "Pinilla",
      address: "Alameda Armando Mascaró 737",
      email: "haydée.pinilla22@example.com",
      phone: "5551230022",
    },
    {
      id: 23,
      firstName: "Yaiza",
      lastName: "Carmona",
      address: "Callejón Manuela Mayo 87",
      email: "yaiza.carmona23@example.com",
      phone: "5551230023",
    },
    {
      id: 24,
      firstName: "Graciano",
      lastName: "Piquer",
      address: "Paseo de Cornelio Elorza 339",
      email: "graciano.piquer24@example.com",
      phone: "5551230024",
    },
    {
      id: 25,
      firstName: "Nilda",
      lastName: "Reyes",
      address: "Callejón Santos Sola 17",
      email: "nilda.reyes25@example.com",
      phone: "5551230025",
    },
    {
      id: 26,
      firstName: "Ricarda",
      lastName: "Casares",
      address: "Glorieta Emiliano Baños 90",
      email: "ricarda.casares26@example.com",
      phone: "5551230026",
    },
    {
      id: 27,
      firstName: "Gloria",
      lastName: "Sola",
      address: "Rambla Octavio Sánchez 748 Apt. 57 ",
      email: "gloria.sola27@example.com",
      phone: "5551230027",
    },
    {
      id: 28,
      firstName: "Severo",
      lastName: "Lorenzo",
      address: "Paseo de Amador Arroyo 52",
      email: "severo.lorenzo28@example.com",
      phone: "5551230028",
    },
    {
      id: 29,
      firstName: "Amelia",
      lastName: "Galán",
      address: "C. Agapito Crespo 50",
      email: "amelia.galán29@example.com",
      phone: "5551230029",
    },
    {
      id: 30,
      firstName: "Juan Antonio",
      lastName: "Cervantes",
      address: "Rambla María Gárate 24",
      email: "juanantonio.cervantes30@example.com",
      phone: "5551230030",
    },
    {
      id: 31,
      firstName: "Josefina",
      lastName: "Zurita",
      address: "Rambla de Héctor Salgado 63",
      email: "josefina.zurita31@example.com",
      phone: "5551230031",
    },
    {
      id: 32,
      firstName: "Encarna",
      lastName: "Planas",
      address: "Pasadizo de Eliana Carreño 25",
      email: "encarna.planas32@example.com",
      phone: "5551230032",
    },
    {
      id: 33,
      firstName: "Lucila",
      lastName: "Barriga",
      address: "Pasadizo Esteban Casals 30",
      email: "lucila.barriga33@example.com",
      phone: "5551230033",
    },
    {
      id: 34,
      firstName: "Anacleto",
      lastName: "Villaverde",
      address: "Acceso Abraham Gil 953 Apt. 72 ",
      email: "anacleto.villaverde34@example.com",
      phone: "5551230034",
    },
    {
      id: 35,
      firstName: "Jaime",
      lastName: "Mateos",
      address: "Cañada Artemio Barbero 10 Piso 1 ",
      email: "jaime.mateos35@example.com",
      phone: "5551230035",
    },
    {
      id: 36,
      firstName: "Cayetano",
      lastName: "Roca",
      address: "Vial Cipriano Mena 11 Puerta 9 ",
      email: "cayetano.roca36@example.com",
      phone: "5551230036",
    },
    {
      id: 37,
      firstName: "Eulalia",
      lastName: "Elías",
      address: "Ronda Albano Viña 35",
      email: "eulalia.elías37@example.com",
      phone: "5551230037",
    },
    {
      id: 38,
      firstName: "Asdrubal",
      lastName: "Puente",
      address: "Pasaje de Paz Ribera 3 Apt. 12 ",
      email: "asdrubal.puente38@example.com",
      phone: "5551230038",
    },
    {
      id: 39,
      firstName: "Ramiro",
      lastName: "Carro",
      address: "Camino de Rosaura Gascón 17",
      email: "ramiro.carro39@example.com",
      phone: "5551230039",
    },
    {
      id: 40,
      firstName: "Abril",
      lastName: "Cobos",
      address: "Camino Tamara Saavedra 22",
      email: "abril.cobos40@example.com",
      phone: "5551230040",
    },
    {
      id: 41,
      firstName: "Lucho",
      lastName: "Vilaplana",
      address: "Vial de Néstor Bertrán 1 Apt. 03 ",
      email: "lucho.vilaplana41@example.com",
      phone: "5551230041",
    },
    {
      id: 42,
      firstName: "Pastora",
      lastName: "Catalá",
      address: "Pasadizo Graciela Ojeda 56",
      email: "pastora.catalá42@example.com",
      phone: "5551230042",
    },
    {
      id: 43,
      firstName: "Adelaida",
      lastName: "Canet",
      address: "C. Camilo Murcia 93 Puerta 2 ",
      email: "adelaida.canet43@example.com",
      phone: "5551230043",
    },
    {
      id: 44,
      firstName: "Adelina",
      lastName: "Gámez",
      address: "C. Seve Cánovas 83",
      email: "adelina.gámez44@example.com",
      phone: "5551230044",
    },
    {
      id: 45,
      firstName: "Herminia",
      lastName: "León",
      address: "Alameda Amílcar Gutierrez 29 Piso 7 ",
      email: "herminia.león45@example.com",
      phone: "5551230045",
    },
    {
      id: 46,
      firstName: "Cristóbal",
      lastName: "Pinedo",
      address: "Glorieta de Sarita Benitez 40",
      email: "cristóbal.pinedo46@example.com",
      phone: "5551230046",
    },
    {
      id: 47,
      firstName: "Joaquina",
      lastName: "Ferrán",
      address: "Cuesta de José María Mate 24",
      email: "joaquina.ferrán47@example.com",
      phone: "5551230047",
    },
    {
      id: 48,
      firstName: "Felipe",
      lastName: "Pou",
      address: "Ronda de Charo Mosquera 18",
      email: "felipe.pou48@example.com",
      phone: "5551230048",
    },
    {
      id: 49,
      firstName: "Maxi",
      lastName: "Castrillo",
      address: "Paseo Celestina Aramburu 64",
      email: "maxi.castrillo49@example.com",
      phone: "5551230049",
    },
    {
      id: 50,
      firstName: "Rosa María",
      lastName: "Mendizábal",
      address: "Rambla de María Dolores Serra 74 Piso 2 ",
      email: "rosamaría.mendizábal50@example.com",
      phone: "5551230050",
    },
    {
      id: 51,
      firstName: "Luciana",
      lastName: "Vilaplana",
      address: "Via Dionisio Vila 78 Apt. 68 ",
      email: "luciana.vilaplana51@example.com",
      phone: "5551230051",
    },
    {
      id: 52,
      firstName: "Calixta",
      lastName: "Alegre",
      address: "Avenida de Sofía Jover 77",
      email: "calixta.alegre52@example.com",
      phone: "5551230052",
    },
    {
      id: 53,
      firstName: "Godofredo",
      lastName: "Delgado",
      address: "Pasadizo de Alonso Moraleda 632 Puerta 1 ",
      email: "godofredo.delgado53@example.com",
      phone: "5551230053",
    },
    {
      id: 54,
      firstName: "Goyo",
      lastName: "Pedrero",
      address: "Via de Leocadio Ibañez 78 Puerta 9 ",
      email: "goyo.pedrero54@example.com",
      phone: "5551230054",
    },
    {
      id: 55,
      firstName: "Eugenio",
      lastName: "Abascal",
      address: "Ronda de Nicolasa Saura 11",
      email: "eugenio.abascal55@example.com",
      phone: "5551230055",
    },
    {
      id: 56,
      firstName: "Anita",
      lastName: "Dávila",
      address: "Rambla Basilio Rosell 6",
      email: "anita.dávila56@example.com",
      phone: "5551230056",
    },
    {
      id: 57,
      firstName: "Ricarda",
      lastName: "Guillén",
      address: "Acceso de Áurea Méndez 38",
      email: "ricarda.guillén57@example.com",
      phone: "5551230057",
    },
    {
      id: 58,
      firstName: "José",
      lastName: "Haro",
      address: "Camino de Timoteo Linares 762",
      email: "josé.haro58@example.com",
      phone: "5551230058",
    },
    {
      id: 59,
      firstName: "Román",
      lastName: "Márquez",
      address: "Glorieta de Ruben Nevado 510",
      email: "román.márquez59@example.com",
      phone: "5551230059",
    },
    {
      id: 60,
      firstName: "Edmundo",
      lastName: "Infante",
      address: "Pasaje Bernabé Peral 48",
      email: "edmundo.infante60@example.com",
      phone: "5551230060",
    },
    {
      id: 61,
      firstName: "Adelardo",
      lastName: "Águila",
      address: "Paseo de Dafne Rico 25",
      email: "adelardo.águila61@example.com",
      phone: "5551230061",
    },
    {
      id: 62,
      firstName: "Calixto",
      lastName: "Escrivá",
      address: "Plaza Quique Olivé 80",
      email: "calixto.escrivá62@example.com",
      phone: "5551230062",
    },
    {
      id: 63,
      firstName: "María Carmen",
      lastName: "Simó",
      address: "Ronda Mayte Valencia 33 Puerta 1 ",
      email: "maríacarmen.simó63@example.com",
      phone: "5551230063",
    },
    {
      id: 64,
      firstName: "Felicidad",
      lastName: "Franch",
      address: "Glorieta de Luis Miguel Ballesteros 297 Piso 3 ",
      email: "felicidad.franch64@example.com",
      phone: "5551230064",
    },
    {
      id: 65,
      firstName: "Vicente",
      lastName: "Badía",
      address: "Callejón de Olga Peláez 6",
      email: "vicente.badía65@example.com",
      phone: "5551230065",
    },
    {
      id: 66,
      firstName: "Rosalina",
      lastName: "Tudela",
      address: "Glorieta Lupe Galán 88",
      email: "rosalina.tudela66@example.com",
      phone: "5551230066",
    },
    {
      id: 67,
      firstName: "Florinda",
      lastName: "Girona",
      address: "Plaza de Verónica Blanes 932 Piso 2 ",
      email: "florinda.girona67@example.com",
      phone: "5551230067",
    },
    {
      id: 68,
      firstName: "Juanita",
      lastName: "Pi",
      address: "Pasaje de Rodolfo Valle 685 Piso 1 ",
      email: "juanita.pi68@example.com",
      phone: "5551230068",
    },
    {
      id: 69,
      firstName: "Rosendo",
      lastName: "Criado",
      address: "Camino Basilio Vera 62 Apt. 55 ",
      email: "rosendo.criado69@example.com",
      phone: "5551230069",
    },
    {
      id: 70,
      firstName: "Amparo",
      lastName: "Vicente",
      address: "C. Magdalena Melero 763",
      email: "amparo.vicente70@example.com",
      phone: "5551230070",
    },
    {
      id: 71,
      firstName: "Roxana",
      lastName: "Alarcón",
      address: "Urbanización de Cloe Vilaplana 63",
      email: "roxana.alarcón71@example.com",
      phone: "5551230071",
    },
    {
      id: 72,
      firstName: "Paz",
      lastName: "Guillén",
      address: "Pasadizo de Rolando Campo 42",
      email: "paz.guillén72@example.com",
      phone: "5551230072",
    },
    {
      id: 73,
      firstName: "Salud",
      lastName: "Cárdenas",
      address: "C. de Blanca Andres 46 Puerta 9 ",
      email: "salud.cárdenas73@example.com",
      phone: "5551230073",
    },
    {
      id: 74,
      firstName: "Buenaventura",
      lastName: "Pereira",
      address: "Camino de Natividad Parra 248",
      email: "buenaventura.pereira74@example.com",
      phone: "5551230074",
    },
    {
      id: 75,
      firstName: "Adrián",
      lastName: "Bermejo",
      address: "Alameda Ascensión Delgado 29 Piso 0 ",
      email: "adrián.bermejo75@example.com",
      phone: "5551230075",
    },
    {
      id: 76,
      firstName: "Julieta",
      lastName: "Martorell",
      address: "Plaza Edelmiro Codina 543 Puerta 5 ",
      email: "julieta.martorell76@example.com",
      phone: "5551230076",
    },
    {
      id: 77,
      firstName: "Victor Manuel",
      lastName: "Alonso",
      address: "Paseo de Alejo Maestre 2 Apt. 34 ",
      email: "victormanuel.alonso77@example.com",
      phone: "5551230077",
    },
    {
      id: 78,
      firstName: "Jacobo",
      lastName: "Cuervo",
      address: "Callejón de Manuel Pomares 4",
      email: "jacobo.cuervo78@example.com",
      phone: "5551230078",
    },
    {
      id: 79,
      firstName: "Natividad",
      lastName: "Pedraza",
      address: "Ronda Marc Julián 47 Piso 1 ",
      email: "natividad.pedraza79@example.com",
      phone: "5551230079",
    },
    {
      id: 80,
      firstName: "Marciano",
      lastName: "Segarra",
      address: "Glorieta Lupita Prat 89",
      email: "marciano.segarra80@example.com",
      phone: "5551230080",
    },
    {
      id: 81,
      firstName: "Azahar",
      lastName: "Iglesias",
      address: "Callejón Ruy Cózar 624",
      email: "azahar.iglesias81@example.com",
      phone: "5551230081",
    },
    {
      id: 82,
      firstName: "Pascuala",
      lastName: "Rocamora",
      address: "Camino de César Valverde 183 Piso 4 ",
      email: "pascuala.rocamora82@example.com",
      phone: "5551230082",
    },
    {
      id: 83,
      firstName: "Abel",
      lastName: "Vigil",
      address: "Glorieta de Paulino Escolano 679",
      email: "abel.vigil83@example.com",
      phone: "5551230083",
    },
    {
      id: 84,
      firstName: "Mayte",
      lastName: "Lloret",
      address: "Acceso de Evelia Terrón 57 Apt. 83 ",
      email: "mayte.lloret84@example.com",
      phone: "5551230084",
    },
    {
      id: 85,
      firstName: "Cristian",
      lastName: "Antón",
      address: "Camino de Salomón Domínguez 67",
      email: "cristian.antón85@example.com",
      phone: "5551230085",
    },
    {
      id: 86,
      firstName: "Estrella",
      lastName: "Leiva",
      address: "Cuesta de Catalina Alemán 897",
      email: "estrella.leiva86@example.com",
      phone: "5551230086",
    },
    {
      id: 87,
      firstName: "Marcial",
      lastName: "Ribera",
      address: "Pasaje de Ovidio Fabregat 42",
      email: "marcial.ribera87@example.com",
      phone: "5551230087",
    },
    {
      id: 88,
      firstName: "Tito",
      lastName: "Soriano",
      address: "Via Silvio Vera 69 Puerta 4 ",
      email: "tito.soriano88@example.com",
      phone: "5551230088",
    },
    {
      id: 89,
      firstName: "Amando",
      lastName: "Conesa",
      address: "Vial Loreto Roldan 650 Puerta 8 ",
      email: "amando.conesa89@example.com",
      phone: "5551230089",
    },
    {
      id: 90,
      firstName: "Nydia",
      lastName: "Andrés",
      address: "Vial Leoncio Sarabia 8 Piso 6 ",
      email: "nydia.andrés90@example.com",
      phone: "5551230090",
    },
    {
      id: 91,
      firstName: "Luna",
      lastName: "Palomar",
      address: "Via Ciro Ángel 51 Piso 7 ",
      email: "luna.palomar91@example.com",
      phone: "5551230091",
    },
    {
      id: 92,
      firstName: "Berto",
      lastName: "Vall",
      address: "Urbanización Ovidio Galindo 218 Apt. 76 ",
      email: "berto.vall92@example.com",
      phone: "5551230092",
    },
    {
      id: 93,
      firstName: "Reinaldo",
      lastName: "Salvador",
      address: "C. Pablo Borrell 988",
      email: "reinaldo.salvador93@example.com",
      phone: "5551230093",
    },
    {
      id: 94,
      firstName: "Rosenda",
      lastName: "Torrent",
      address: "C. de Priscila Castrillo 26",
      email: "rosenda.torrent94@example.com",
      phone: "5551230094",
    },
    {
      id: 95,
      firstName: "Edelmira",
      lastName: "Bonilla",
      address: "Calle Guadalupe Goicoechea 868 Piso 6 ",
      email: "edelmira.bonilla95@example.com",
      phone: "5551230095",
    },
    {
      id: 96,
      firstName: "Haydée",
      lastName: "Casals",
      address: "Rambla de Nicolás Cadenas 5 Puerta 9 ",
      email: "haydée.casals96@example.com",
      phone: "5551230096",
    },
    {
      id: 97,
      firstName: "Ana Sofía",
      lastName: "Puerta",
      address: "Via de Ovidio Iñiguez 12 Piso 6 ",
      email: "anasofía.puerta97@example.com",
      phone: "5551230097",
    },
    {
      id: 98,
      firstName: "Rubén",
      lastName: "Barragán",
      address: "Acceso de Eva Páez 4 Apt. 77 ",
      email: "rubén.barragán98@example.com",
      phone: "5551230098",
    },
    {
      id: 99,
      firstName: "Federico",
      lastName: "Raya",
      address: "Callejón de Zaida Valencia 336 Puerta 1 ",
      email: "federico.raya99@example.com",
      phone: "5551230099",
    },
    {
      id: 100,
      firstName: "Ascensión",
      lastName: "Salinas",
      address: "Acceso Paulino Quirós 594",
      email: "ascensión.salinas100@example.com",
      phone: "5551230100",
    },
  ];

  const fetchSimuledClients = (page: number, pageSize: number) => {
    const pagedClients = clientsData.slice(
      page * pageSize,
      (page + 1) * pageSize
    );
    return { pagedClients, totalRows: clientsData.length };
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
    async function fetchClients() {
      try {
        /* const response = await fetch(`/api/getclients?page=${paginationModel.paginationDetails.page}&pageSize=${paginationModel.paginationDetails.pageSize}`);
        const clients: clients = await response.json();
        setClients(clients); */
        const clients = fetchSimuledClients(
          paginationModel.paginationDetails.page,
          paginationModel.paginationDetails.pageSize
        );
        setClients(clients.pagedClients);
        setPaginationModel((prev) => ({
          ...prev,
          totalRows: clients.totalRows,
        }));
        setIsMounted(true);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
        alert(
          "Error al obtener los clientes. Por favor, inténtelo de nuevo más tarde."
        );
        /* alert("Error al obtener los clientes. Por favor, inténtelo de nuevo más tarde."); */
      }
    }
    fetchClients();
  }, [
    paginationModel.paginationDetails.pageSize,
    paginationModel.paginationDetails.page,
  ]);

  if (!isMounted) {
    return null;
  }

  function handelMoreClient(clientId: number) {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      console.log("Client found:", client);
      setSelectedClient(client);
      setShowViewMoreClient(true);
    } else {
      alert("Client not found");
    }
  }

  function handleEditClient(clientId: number) {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      const params = new URLSearchParams({
        clientId: client.id.toString(),
        firstName: client.firstName,
        lastName: client.lastName,
        address: client.address,
        phone: client.phone,
        email: client.email,
      });
      router.push(`clients/edit?${params.toString()}`);
    } else {
      alert("Client not found");
    }
  }
  function handleRemoveClient(clientId: number) {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      const confirmDelete = window.confirm(
        `¿Estás seguro de que deseas eliminar al cliente ${client.firstName} ${client.lastName}?`
      );
      if (!confirmDelete) return;
      const updatedClients = clients.filter((c) => c.id !== clientId);
      fetch(`/api/removeclient?id=${clientId}`)
        .then((response) => response.json())
        .then(() => {
          setClients(updatedClients);
          alert(`Cliente ${client.firstName} ${client.lastName} eliminado.`);
        })
        .catch((error) => {
          console.error("Error al eliminar el cliente:", error);
          alert("Error al eliminar el cliente. Por favor, inténtelo de nuevo.");
        });
    } else {
      alert("Client not found");
    }
  }

  let filteredColumns = columns;
  if (windowWidth < 420) {
    filteredColumns = columns.filter(
      (col) =>
        col.field !== "email" &&
        col.field !== "address" &&
        col.field !== "phone" &&
        col.field !== "lastName"
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
          showViewMoreClient
            ? "pointer-events-none blur-sm"
            : "pointer-events-auto"
        }`}
      >
        <SearchClients clients={clientsData} setClients={setClients} />
        <div className="relative w-full h-[60.5dvh]">
          <DataGridComponent
            paginationModel={paginationModel}
            setPaginationModel={handelChangePagination}
            columns={filteredColumns}
            rows={clients}
            more={(_, currentSelection: number) => {
              handelMoreClient(currentSelection);
            }}
            edit={(_, currentSelection: number) => {
              handleEditClient(currentSelection);
            }}
            remove={(_, currentSelection: number) => {
              handleRemoveClient(currentSelection);
            }}
          />
          <ActionsButton />
        </div>
      </div>
      <ViewMoreClient
        showViewMoreClient={showViewMoreClient}
        setShowViewMoreClient={setShowViewMoreClient}
        selectedClient={selectedClient}
      />
    </>
  );
}

export default Clients;
