import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { reportsRepository } from './reportsRepository';


@Module({
  imports: [PrismaModule],
  controllers: [ReportsController],
  providers: [ReportsService, {provide: 'IReports', useClass: reportsRepository}],
})
export class ReportsModule {}
