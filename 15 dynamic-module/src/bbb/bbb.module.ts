import { Module, DynamicModule } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

// @Module({
//   controllers: [BbbController],
//   providers: [BbbService],
// })
// 动态模块 controller、provider 动态创建
@Module({})

// 在 import 该模块的时候，传入参数，然后动态生成模块的内容。
export class BbbModule {
  // 此处 register 方法叫什么都可行，但一般根据 nest 约定的 3 种方法名：
  // register：用一次模块传一次配置，这次是 BbbModule.register({aaa:1})，下一次就是 BbbModule.register({aaa:2}) 了。
  // forRoot：配置一次模块用多次，
  // forFeature：用了 forRoot 固定了整体模块，用于局部的时候，可能需要再传一些配置，比如用 forRoot 指定了数据库链接信息，再用 forFeature 指定某个模块访问哪个数据库和表。
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: BbbModule, // 比装饰器里定义的时候多了个 module 属性。
      controllers: [BbbController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        BbbService,
      ],
      exports: [],
    };
  }
}
