import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { PrismaModule } from '../prisma/prisma.module';
import {SupplierRepository} from './supplierRepository';


@Module({
  imports: [PrismaModule],
  controllers: [SupplierController],
  providers: [SupplierService , {provide: 'ISupplierRepository', useClass: SupplierRepository} ],
})
export class SupplierModule {}
