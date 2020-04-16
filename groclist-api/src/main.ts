import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

const port = Number(config.get('server.port')) || 8090;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);
}
bootstrap();
