import { AaaPipe } from './aaa.pipe';
import { Controller, Get, HttpStatus, ParseIntPipe, Query, HttpException, ParseFloatPipe, ParseBoolPipe, ParseArrayPipe, Param, ParseEnumPipe, ParseUUIDPipe, DefaultValuePipe, Post, Body, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Test } from './dto/test.dto'
import { BbbPipe } from './bbb.pipe'

// ValidationPipe
// ParseIntPipe
// ParseBoolPipe
// ParseArrayPipe
// ParseUUIDPipe
// DefaultValuePipe
// ParseEnumPipe
// ParseFloatPipe
// ParseFilePipe

enum Ggg {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 通过 Pipe 把它转为整数
  // 还可以指定 Pipe 报错时的信息
  getHello(@Query('aa', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) aa: string): string {
    return aa + 1;
  }

  // 还可以自己抛一个异常出来，让 exception filter 处理
  // 还可以加个 @UseFilters，使用自己的 exception filter
  @Get('bb')
  bb(@Query('bb', new ParseIntPipe({
    exceptionFactory: (msg) => {
      console.log(msg);
      throw new HttpException('xxx ' + msg, HttpStatus.NOT_IMPLEMENTED)
    }
  })) bb: string): string {
    return bb + 1;
  }

  // ParseFloatPipe
  @Get('cc')
  cc(@Query('cc', ParseFloatPipe) cc: number) {
    return cc + 1
  }

  // ParseBoolPipe
  @Get('dd')
  dd(@Query('dd', ParseBoolPipe) dd: number) {
    return typeof dd
  }

  // ParseArrayPipe
  @Get('ee')
  ee(@Query('ee', new ParseArrayPipe({
    // items: Number, // 指定每一项的类型
    separator: '..', // 指定分隔符
    optional: true  // 参数可选，为 false 时参数不能为空
  })) ee: Array<number>) {
    return ee.reduce((total, item) => total + item, 0)
  }

  // ParseEnumPipe: 限制参数的取值范围；帮助转换类型
  @Get('ff/:enum')
  ff(@Param('enum', new ParseEnumPipe(Ggg)) ff: Ggg) {
    return ff
  }

  // ParseUUIDPipe: 校验是否是UUID
  @Get('gg/:uuid')
  gg(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return uuid
  }

  // DefaultValuePipe: 设置默认值，没传参时，会使用默认值
  @Get('hh')
  hh(@Query('hh', new DefaultValuePipe('aaa')) hhh: string) {
    return hhh
  }

  // DefaultValuePipe: 设置默认值，没传参时，会使用默认值
  @Get('kk/:kk')
  kk(@Query('aa', AaaPipe) aa: string, @Param('kk', AaaPipe) bb: number) {
    return aa + bb
  }

  // 
  @Post('test')
  // test(@Body(new ValidationPipe()) obj: Test) {
  // pipe 中使用 providers 中的属性时（注入属性），不能在用 new 的方式了，直接指定 class，让 Nest 去创建对象放到 ioc 容器里
  test(@Body() obj: Test) {
    // 对 obj 中某参数进行验证
    console.log(obj);
  }


}
