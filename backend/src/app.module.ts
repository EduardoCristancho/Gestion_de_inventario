import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SettingsModule } from './modules/settings/settings.module';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { SalesModule } from './modules/sales/sales.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ManagementModule } from './modules/management/management.module';
import { ClientsModule } from './modules/clients/clients.module';
import { EmployeModule } from './modules/employe/employe.module';
import { WareHouseModule } from './modules/ware-house/ware-house.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { authenticationMiddleware } from './modules/auth/authenticationMiddleware';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthorizationGuard } from './modules/auth/authorizationUtils/authorizationGuard';


@Module({
  imports: [
    
    AuthModule,
    InventoryModule,
    SalesModule,
    DashboardModule,
    SettingsModule,
    ManagementModule,
    ClientsModule,
    EmployeModule,
    WareHouseModule,
    ReportsModule,
    SupplierModule,
    PrismaModule
  ],
  controllers: [],
  providers: [{provide: 'APP_GUARD', useClass: AuthorizationGuard}],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authenticationMiddleware)
      .exclude('/auth/*splat')
      .forRoutes('*');
  }
}
