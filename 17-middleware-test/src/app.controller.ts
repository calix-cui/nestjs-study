import { Controller, Get } from '@nestjs/common';
import { Next } from '@nestjs/common/decorators'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  // Next 装饰器是调用下一个 handler 的，不会处理本次 handler 的返回值
  getHello(@Next() next): string {
    next()
    console.log('hello');
    return this.appService.getHello();
  }

  @Get('hello')
  getHello22() {
    return 'getHello22'
  }


  @Get('hello2')
  getHello2(): string {
    console.log('hello2');
    return this.appService.getHello();
  }

  @Get('hello3')
  getHello3(): string {
    console.log('hello3');
    return this.appService.getHello();
  }

  @Get('hello4')
    getHello4(): string {
    console.log('hello4');
    return this.appService.getHello();
  }
}
