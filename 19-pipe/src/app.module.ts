import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'validation_options',
    useFactory() {
      return {
        a: 1,
        b: 2
      }
    }
  }, 
  // filter、guard 等都可以通过这种方式声明为全局生效的。没注入依赖时，也可以用 app.useGlobal...
  {
    provide: APP_PIPE,
    useClass: ValidationPipe
  }],
})
export class AppModule {}
