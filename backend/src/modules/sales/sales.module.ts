import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import salesRepository from './repository/salesRepository';
import { PrismaModule } from '../prisma/prisma.module';
import { InventoryRepository } from '../inventory/inventory.repository';
import { ClientRepository } from '../clients/repository/clientRepository';

@Module({
  imports: [PrismaModule],
  controllers: [SalesController],
  providers: [
    SalesService,
    {provide: 'ISalesRepository', useClass: salesRepository}, 
    {provide: 'IClientsRepository', useClass: ClientRepository},
    InventoryRepository
  ],

})
export class SalesModule {}
