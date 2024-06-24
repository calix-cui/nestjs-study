import { ValidationPipe } from '@nestjs/common';
import { MyFilterFilter } from './my-filter.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new MyFilterFilter())

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000);
}
bootstrap();
