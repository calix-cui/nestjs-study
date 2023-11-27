import { TimeoutInterceptor } from './timeout.interceptor';
import { CatchErrorTestInterceptor } from './catch-error-test.interceptor';
import { MapTestInterceptor } from './map-test.interceptor';
import { AaaInterceptor } from './aaa.interceptor';
import { Controller, Get } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators'
import { AppService } from './app.service';
import { TapTestInterceptor } from './tap-test.interceptor'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 路由级别的可以注入依赖，全局不行
  @UseInterceptors(AaaInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseInterceptors(MapTestInterceptor)
  aaa(): string {
    return 'aaa';
  }

  @Get('bbb')
  @UseInterceptors(TapTestInterceptor)
  bbb(): string {
    return 'bbb';
  }

  @Get('ccc')
  @UseInterceptors(CatchErrorTestInterceptor)
  ccc(): string {
    throw new Error('xxx');
    return 'ccc';
  }

  @Get('ddd')
  @UseInterceptors(TimeoutInterceptor)
  async ddd() {
    await new Promise(resolve => setTimeout(resolve, 4000))
    return 'ddd';
  }

  @Get('eee')
  eee() {
    return 'eee';
  }
}
