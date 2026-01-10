import { GetClientDto } from "../dto/client.dto";   
import { CreateClientDto } from "../dto/create-client.dto";
import { UpdateClientDto } from "../dto/update-client.dto";
import { Client } from "../entities/client.entity";
UpdateClientDto
export default interface IClientsRepository {
    create(createClientDto: CreateClientDto, companyId: number): Promise<GetClientDto>;
    findOne(id: string | number, company_id: number): Promise<Client | null>;
    findAll(company_id: number,paginationQuery? : {skip: number, take: number}): Promise<{clients: GetClientDto[], length: number}>;
    update(id: number, updateClientDto: UpdateClientDto, company_id: number): Promise<GetClientDto>;
    remove(id: number, company_id: number): Promise<void>;
    restoreClient(identifier: number,createClientDto: CreateClientDto, company_id: number): Promise<GetClientDto>;
}