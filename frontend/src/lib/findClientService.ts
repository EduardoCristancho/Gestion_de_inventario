

const findClientService = async (clientIdentifier: string) => {
    try{
        const response = await fetch(`/api/clients/${clientIdentifier}`, {credentials: 'include'});
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data
    }catch(error: any){
        return null;
    }
}

export default findClientService;