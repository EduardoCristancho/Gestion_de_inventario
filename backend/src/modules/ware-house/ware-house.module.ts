import { Module } from '@nestjs/common';
import { WareHouseService } from './ware-house.service';
import { WareHouseController } from './ware-house.controller';
import { WareHouseRepository } from './wareHouseRepository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WareHouseController],
  providers: [
    WareHouseService,
    {provide: 'IWareHouseRepository', useClass: WareHouseRepository},
  ],
  exports: [
    {provide: 'IWareHouseRepository', useClass: WareHouseRepository},
  ],
})
export class WareHouseModule {}
