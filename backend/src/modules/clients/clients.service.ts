import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import IClientsRepository from './interfaces/IClientsRepository';
import { paginationQueryDto, PaginationResponse } from './dto/pagination.dto';
import { GetClientDto } from './dto/client.dto';
@Injectable()
export class ClientsService {
  // Inyectamos el repositorio de clientes
  constructor(@Inject('IClientsRepository') private readonly clientsRepository: IClientsRepository){}
    

  async create(createClientDto: CreateClientDto, companyId: number) {
    const clientExists = await this.clientsRepository.findOne(createClientDto.identifier, companyId);
    if (clientExists) {
      if (clientExists.visibility === false){
        const client : GetClientDto = await this.clientsRepository.restoreClient(clientExists.customer_id ,createClientDto, companyId);
        return client;
      }else{
        throw new ConflictException('Client already exists');
      }
    }
    const client : GetClientDto = await this.clientsRepository.create(createClientDto, companyId);

    return client;
  }

  async findAll(paginationQuery: paginationQueryDto, company_id: number) {
    let paginationOptions : {skip: number, take: number} | undefined = undefined;
    if (paginationQuery.page && paginationQuery.limit) {
       //si existe la paginacion, llamamos al repositorio para obtener los clientes paginados
        paginationOptions = {
          skip: (paginationQuery.page -1) * paginationQuery.limit,
          take: paginationQuery.page * paginationQuery.limit,
        }
    }
    //llamamos al repositorio para obtener todos los clientes
    const result = await this.clientsRepository.findAll(company_id ,paginationOptions);
    const paginationResponse : PaginationResponse<GetClientDto> = new PaginationResponse(result.clients,result.length, paginationQuery.page, paginationQuery.limit); 

    return paginationResponse;

  }

  async findOne(identifier: string | number, companyId: number) {
    //llamamos al repositorio para obtener el cliente por id
    const client = await this.clientsRepository.findOne(identifier,companyId);
    if (!client || client.visibility === false) throw new NotFoundException('Client not found');
    let clientDto = new GetClientDto();
    clientDto.parseToGetClientDto(client);
    return clientDto;
  }

  async update(id: number, updateClientDto: UpdateClientDto, company_id: number) {
    const clientExists = await this.clientsRepository.findOne(id, company_id);
    if (!clientExists) throw new NotFoundException('Client not found');
    const client = await this.clientsRepository.update(id, updateClientDto, company_id);
    return client ;
  }

  async remove(id: number, company_id: number) {
    return await this.clientsRepository.remove(id, company_id);
  }
}
