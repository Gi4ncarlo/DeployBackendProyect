/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggsGlobal } from './middlewares/loggs.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use( loggsGlobal )
  await app.listen(3000);
}
bootstrap();
