export default function fetchData(url: string) {
    try {
        const response = fetch(url);
        return response;
    }catch (error) {
        alert("Error al obtener los datos");
    }   
}