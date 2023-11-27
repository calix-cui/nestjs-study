import { AaaInterceptor } from './aaa.interceptor';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, 
    // 用这个 token 在 AppModule 里声明的 interceptor，Nest 会把它作为全局 interceptor：
    {
      provide: APP_INTERCEPTOR,
      useClass: AaaInterceptor
    }
  ],
})
export class AppModule {}
