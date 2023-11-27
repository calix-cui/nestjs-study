import { BbbModule } from './../bbb/bbb.module';
import {
  Global,
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  NestModule,
  forwardRef,
  // MiddlewareConsumer,
  // Logger,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

@Global() // 全局模块；谨慎使用。
@Module({
  imports: [forwardRef(() => BbbModule)],
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService],
})
export class AaaModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(Logger).forRoutes('cats');
  // }

  onModuleInit() {
    console.log('AaaModule onModuleInit!');
  }

  onApplicationBootstrap() {
    console.log('AaaModule onApplicationBootstrap!');
  }

  onModuleDestroy() {
    console.log('AaaModule OnModuleDestroy!');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('AaaModule BeforeApplicationShutdown at signal: ' + signal);
  }

  onApplicationShutdown() {
    console.log('AaaModule OnApplicationShutdown!');
  }
}
