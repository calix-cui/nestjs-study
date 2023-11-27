import { AaaModule } from './../aaa/aaa.module';
import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  forwardRef,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { ModuleRef } from '@nestjs/core'

@Module({
  imports: [forwardRef(() => AaaModule)],
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    console.log('BbbModule onModuleInit!');
  }

  onApplicationBootstrap() {
    console.log('BbbModule onApplicationBootstrap!');
  }

  onModuleDestroy() {
    console.log('BbbModule OnModuleDestroy!');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('BbbModule BeforeApplicationShutdown at signal: ' + signal);
  }

  onApplicationShutdown() {
    const bbbService = this.moduleRef.get<BbbService>(BbbService) // 获取 token 对应的 provider 实例
    console.log('------------', bbbService.findAll());
    console.log('BbbModule OnApplicationShutdown!');
  }
}
