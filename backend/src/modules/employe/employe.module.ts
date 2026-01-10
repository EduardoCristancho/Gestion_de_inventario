import { Module } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { employeRepository } from './employeRepository';
import { WareHouseModule } from '../ware-house/ware-house.module';

@Module({
  imports: [
    PrismaModule,
    WareHouseModule
  ],
  controllers: [EmployeController],
  providers: [
    EmployeService, 
    {provide: 'IEmployeRepository', useClass: employeRepository}, 
  ],
  exports: ['IEmployeRepository']
})
export class EmployeModule {}
