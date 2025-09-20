export class getEmploye {
    user_id: number;
    company_id: number;
    visibility: boolean;
    role: {
        role_id: number; 
        name: string };
    warehouse: { 
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
