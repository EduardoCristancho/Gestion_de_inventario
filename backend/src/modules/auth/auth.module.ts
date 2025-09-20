import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authRepository } from './auth.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { EmployeModule } from '../employe/employe.module';
import { JwtModule } from '@nestjs/jwt';
import { authenticationMiddleware } from './authenticationMiddleware';

@Module({
  imports: [PrismaModule, EmployeModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '24h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, {provide: 'IAuth', useClass: authRepository}],
  exports: [AuthService]
})
export class AuthModule {}
