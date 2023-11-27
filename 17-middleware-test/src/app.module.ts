import { AaaMiddleware } from './aaa.middleware';
import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestMethod } from '@nestjs/common/enums'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 实现 NestModule 接口的 configure 方法，在里面应用 AaaMiddleware 到所有路由。
  configure(consumer: MiddlewareConsumer) {
    // 指定中间件路由
    consumer.apply(AaaMiddleware).forRoutes({ path: 'hello2', method: RequestMethod.GET })
    consumer.apply(AaaMiddleware).forRoutes({ path: 'hello3', method: RequestMethod.GET })
    // class 形式的 middleware 可以用 Nest  的依赖注入特性
    // 也可以写函数形式的 middleware，这时候和 Express 的 middleware 区别不大了
    // consumer.apply(AaaMiddleware).forRoutes({ path: 'hello3', method: RequestMethod.GET })
  }
} 
