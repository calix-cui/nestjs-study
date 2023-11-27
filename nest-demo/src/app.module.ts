import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';

@Module({
  imports: [PersonModule, AaaModule, BbbModule],
  controllers: [AppController], // controllers 是控制器，只能被注入
  // providers: [AppService],    // providers 可以被注入，也可以注入别的对象。provider 一般用 injectable 修饰 class
  providers: [
    AppService,
    {
      // provide: AppService,   // 通过 provide 指定注入的 token，通过 useClass 指定注入的对象的类，Nest 会自动对它做实例化再注入
      provide: 'app_service', // 如果 token 是字符串，注入时就要用 @Inject 手动指定注入对象的 token。
      useClass: AppService,
    },
    {
      // 除了注入 class，还可以注入值。
      provide: 'person',
      useValue: {
        name: 'cuix',
        age: 24,
      },
    },
    {
      // useFactory 允许动态创建 provider
      provide: 'person2',
      useFactory() {
        return {
          name: 'cuixiang',
          desc: 'person',
        };
      },
    },
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello('person3'),
        };
      },
      inject: ['person', AppService], // 这里注入的必须是 providers 中已经声明的 provider
    },
    // {
    //   provide: 'person4',
    //   async useFactory() {
    //     await new Promise((resolve) => {
    //       setTimeout(resolve, 3000);
    //     });
    //     return {
    //       name: 'aaa',
    //       desc: 'bbb',
    //     };
    //   },
    // },
    {
      provide: 'person4',
      useExisting: 'person2'  // useExisting 指定别名。给 token 为 person2 provider 指定新的 token 为 person4
    }
  ], // 完整写法
})
export class AppModule {}
