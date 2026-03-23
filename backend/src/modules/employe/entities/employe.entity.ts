export class getEmploye {
    user_id: number;
    company_id: number;
    visibility: boolean;
    Role: {
        role_id: number; 
        name: string };
    Warehouse: { 
        warehouse_id: 
        number; name: string };
    username: string;
    password: string;
    user_photo: string | null;
}

export class Employe {
    user_id: number;
    company_id: number;
    visibility: boolean;
    role_id: number;
    warehouse_id: number;
    username: string;
    password: string;
    user_photo: string | null;
}
