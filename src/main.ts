import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Worker } from 'bullmq'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 3335);
}

bootstrap();
