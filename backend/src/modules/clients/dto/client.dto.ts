import { Client } from '../entities/client.entity';
export class GetClientDto {
    id: number;
    identifier: string;
    name: string;
    address: string;
    email: string;
    phone: string;

    parseToGetClientDto(client: Client): GetClientDto {
        this.id = client.customer_id;
        this.identifier = client.id_card;
        this.name = client.first_name + " " + client.last_name;
        this.address = client.address?? "sin direccion";
        this.email = client.email?? "sin email";
        this.phone = client.phone?? "sin telefono";

        return this;
    }
}