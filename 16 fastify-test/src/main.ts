import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces'

async function bootstrap() {
  // 切换到 fastify 平台
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  await app.listen(3000);
}
bootstrap();
