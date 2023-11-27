import { Ddd } from './decorations/ddd.decoration';
import { myQuery } from './decorations/myQuery.decoration';
import { Aaa } from './decorations/aaa.decoration';
import { AaaGuard } from './aaa.guard';
import { AaaException } from './AaaException';
import { AaaFilter } from './filters/aaa.filter';
import {
  Headers,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
// import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from './validation.pipe';
// import { UseInterceptors } from '@nestjs/common/decorators/core';
import {
  Controller,
  Get,
  Inject,
  Query,
  SetMetadata,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/roles.decoration';
import { Role } from './roles/roles';
import { Bbb } from './decorations/bbb.decoration'
import { CustomParam } from './decorations/customParam.decoration'
// import { LoggingInterceptor } from './logging.interceptor';

// @Controller()
@Ddd('eee', 'xxx')
@UseGuards(AaaGuard)
// @UseInterceptors(new LoggingInterceptor())
// @UseFilters(new HttpExceptionFilter())
// @SetMetadata('roles', ['user'])
export class AppController {
  // 声明了对 AppService 的依赖，就可以调用它的方法了。
  constructor(
    @Inject('app_service') private readonly appService: AppService,
    // @Inject('person') private readonly person: { name: string; age: number }, // useValue 注入值
    // @Inject('person2')
    // private readonly person2: { name: string; desc: string }, // useValue 注入值
    // @Inject('person3')
    // private readonly person3: { name: string; desc: string }, // useValue 注入值
    @Inject('person4')
    private readonly person4: { name: string; desc: string }, // useValue 注入值
  ) {} // 构造器注入

  @Get()
  @UseFilters(AaaFilter)
  @Roles(Role.Admin)
  get(@Query('user') user: string): string {
    // throw new AaaException('aaa', 'bbb')
    return 'hello ' + user;
  }
  // @Inject(AppService)
  // private readonly appService: AppService; // 属性注入。通过 Inject 指定注入的 provider 的 token 即可。
  @Get('hello')
  // @UsePipes(ValidationPipe)
  @SetMetadata('roles', ['admin'])
  // getHello(): string {
  //   throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
  // }
  getHello(): string {
    return this.appService.getHello('aaa');
  }

  // 以下三个 handler 的装饰器都是一样的效果
  // @Get('ddd')
  // @SetMetadata('ddd', 'admin')
  // @UseGuards(AaaGuard)
  // decorations(): string {
  //   return '';
  // }

  // @Get('ddd')
  // @Aaa('admin')
  // @UseGuards(AaaGuard)
  // decorations(): string {
  //   return '';
  // }

  @Bbb('hello', 'admin')
  decorations(): string {
    return '';
  }

  // 实现 Headers
  @Get('hello4')
  hello4(@CustomParam('Accept') headers1, @Headers('Accept') headers2) {
    console.log(headers1);
    console.log(headers2);
    return  '1'
  }

  // 实现 Query
  @Get('myQuery')
  myQuery(@myQuery('aaa', new ValidationPipe()) q1, @Query('aaa', new ValidationPipe()) q2) {
    console.log(q1);
    console.log(q2);
    return  q1 + ' ' + q2
  }
}
