import { AaaInterceptor } from './aaa.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new AaaInterceptor())
  await app.listen(3000);
}
bootstrap();
