import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ClientRepository } from './repository/clientRepository';
@Module({
  imports: [PrismaModule],
  controllers: [ClientsController],
  providers: [ClientsService, {provide: 'IClientsRepository', useClass: ClientRepository}],

})
export class ClientsModule {}
