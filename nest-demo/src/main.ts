import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './validation.pipe';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { RolesGuard } from './roles.guard'
// import { Logger } from '@nestjs/common'

async function bootstrap() {
  // nest 会从 AppModule 开始解析 class 上通过装饰器声明的依赖信息，自动创建和组装对象。
  const app = await NestFactory.create<NestExpressApplication>(AppModule);   // 给 create 方法传入 NestExpressApplication 的泛型参数才有 useStaticAssets 这些方法
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalPipes(new ValidationPipe())
  // app.useGlobalInterceptors(new LoggingInterceptor())
  // app.useGlobalGuards(new RolesGuard(this))  // 全局使用
  // 指定 public 目录
  // app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '' });
  // 给返回的响应内容指定渲染引擎
  // app.setBaseViewsDir(join(__dirname, '..', 'views'))
  // app.setViewEngine('hbs')
  // app.use(Logger) // middleware
  await app.listen(3000);
}
bootstrap();
