import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser  from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', `http://${process.env.IP_ADDRESS}:3000`],
    credentials: true
  });
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/', // Esto define el inicio de la URL
  });
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
