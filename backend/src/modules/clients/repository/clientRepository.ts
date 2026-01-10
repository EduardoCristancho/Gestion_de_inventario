import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetClientDto } from "../dto/client.dto";
import { CreateClientDto } from "../dto/create-client.dto";
import  IClientRepository  from "../interfaces/IClientsRepository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { UpdateClientDto } from "../dto/update-client.dto";
import { Client } from "../entities/client.entity";
import { isNumber } from "class-validator";
@Injectable()
export class ClientRepository implements IClientRepository {
    constructor(private readonly prisma: PrismaService){}

    async create(createClientDto: CreateClientDto, companyId: number): Promise<GetClientDto>{
        const client = await this.prisma.customer.create({
            data: {
                id_card: createClientDto.identifier,
                first_name: createClientDto.firstName,
                last_name: createClientDto.lastName,
                phone: createClientDto.phone,
                address: createClientDto.address,
                email: createClientDto.email,
                company_id: companyId
            }
        })
        if (!client) throw new NotFoundException('couldnt create client');

        const newClient = new GetClientDto();
        newClient.parseToGetClientDto(client);
        return newClient;
    }
    async findOne(id: string | number, company_id: number): Promise<Client | null>{
        let result : Client | null = null;
        //busca por el id de bd o la cedula de identidad
        result = await this.prisma.customer.findFirst({
            where: {
                company_id: company_id,
                OR: [
                    {customer_id: parseInt(id as string)},
                    {id_card: id as string}
                ]
            }
        })
        return result;
        
    };
    async findAll(company_id: number ,paginationQuery? : {skip: number, take: number}): Promise<{clients: GetClientDto[], length: number}>{
        try{
            const transaction = await this.prisma.$transaction(async (prisma)=>{
                const result = await this.prisma.customer.findMany({
                    where: {
                        company_id: company_id,
                        visibility: true
                    },
                    skip: paginationQuery?.skip,
                    take: paginationQuery?.take,
                });
                const totalClients = await this.prisma.customer.count({
                    where: {
                        company_id: company_id,
                        visibility: true
                    }
                })
                return {clients: result, length: totalClients};
            })
            if (transaction.clients.length === 0) throw new NotFoundException('No clients found');
            const clients = transaction.clients.map(client => new GetClientDto().parseToGetClientDto(client));
            return {clients, length: transaction.length};
        }catch(error){
            console.log(error);
            throw new InternalServerErrorException('couldnt get clients');
        }
    }

    async update(id: number, updateClientDto: UpdateClientDto, company_id: number): Promise<GetClientDto>{
       
        const fieldMap: Record<string, string> = {
        identifier: 'id_card',
        firstName: 'first_name',
        lastName: 'last_name',
        phone: 'phone',
        address: 'address',
        email: 'email'
        };

        // Reducción que recorre fieldMap y construye solo las claves con valores definidos
        const data = Object.entries(fieldMap).reduce((acc, [dtoKey, prismaKey]) => {
        const value = (updateClientDto as any)[dtoKey];  // accedemos dinámicamente
        if (value !== undefined) {
            acc[prismaKey] = value;  // construimos el objeto con la clave Prisma
        }
        return acc;
        }, {} as Record<string, any>);  // acumulador de resultados

        // Si no hay datos válidos, lanza un error
        if (Object.keys(data).length === 0) {
            throw new Error('No hay datos para actualizar');
        }   
        try{
            const client = await this.prisma.customer.update({
                where:{
                    customer_id: id, 
                    company_id: company_id,
                    visibility: true
                },
                data
            }) 
            const newClient = new GetClientDto();
            
            newClient.parseToGetClientDto(client);
            
            return newClient
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException('couldnt update client information');
        }
    }

    async remove(id: number, company_id: number): Promise<void> {
        try{
            const clientDeleted = await this.prisma.customer.update({
                where:{
                    customer_id: id,
                    company_id: company_id 
                },
                data: {
                    visibility: false
                }
            });
        }catch(e){
            console.log("Error en eliminando cliente ", e);
            throw new InternalServerErrorException('couldnt delete client');
        }
    }

    async restoreClient(id: number,createClientDto: CreateClientDto, company_id: number): Promise<GetClientDto> {
        try{
            const client = await this.prisma.customer.update({
                where: {
                    customer_id: id,
                    company_id: company_id
                },
                data: {
                    first_name: createClientDto.firstName,
                    last_name: createClientDto.lastName,
                    phone: createClientDto.phone,
                    address: createClientDto.address,
                    email: createClientDto.email,
                    visibility: true
                }   
            })
            const newClient = new GetClientDto();
            newClient.parseToGetClientDto(client);
            return newClient
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException('couldnt restore client');
        }
    }
}