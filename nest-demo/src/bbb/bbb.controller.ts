import { NextFunction, Request, Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
  Req,
  Res,
  Next,
  HttpCode,
  Header,
  Redirect,
  Render,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

// @Controller('bbb')
@Controller({ host: ':host.0.0.2', path: 'bbb' })
export class BbbController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly bbbService: BbbService) {}

  onModuleInit() {
    console.log('BbbController onModuleInit!');
  }

  onApplicationBootstrap() {
    console.log('BbbController onApplicationBootstrap!');
  }

  onModuleDestroy() {
    console.log('BbbController OnModuleDestroy!');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('BbbController BeforeApplicationShutdown at signal: ' + signal);
  }

  onApplicationShutdown() {
    console.log('BbbController OnApplicationShutdown!');
  }

  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  findAll() {
    return this.bbbService.findAll();
  }

  @Get('aaa')
  findA() {
    return this.bbbService.findAll() + 'aaa';
  }

  @Get('ccc')
  findC(@Res() res: Response) {
    // 注入 response 之后，服务器会无响应，因为 Nest 不会再把 handler 返回值作为响应内容了。我们可以自己返回响应
    // Nest 这么设计是为了避免你自己返回的响应和 Nest 返回的响应的冲突。
    // console.log(res);
    // return this.bbbService.findAll() + 'ccc';
    res.end(this.bbbService.findAll() + 'ccc'); // 自己返回响应
  }

  // 当你有两个 handler 来处理同一个路由的时候，可以在第一个 handler 里注入 next，调用它来把请求转发到第二个 handler：
  // Nest 不会处理注入 @Next 的 handler 的返回值。
  @Get('next')
  next(@Next() next: NextFunction) {
    console.log('next handler1');
    next()
    return '111'
  }

  @Get('next')
  // @HttpCode(222)
  // @Header('aaa', 'bbb')
  next2() {
    console.log('next handler2');
    return 'next'
  }

  @Get('ddd')
  // handler 默认返回的是 200 的状态码，你可以通过 @HttpCode 修改它：
  @HttpCode(222)
  // Header 装饰器修改 response header
  @Header('aaa', 'bbb')
  // Redirect 装饰器指定路由重定向 url
  // @Redirect('http://juejin.cn')
  ddd() {
    return 'ddd'
  }

  // 我们在 main.ts 里设置了渲染引擎
  @Get('user')
  // Render 中的 key 必须与 views 文件夹下的文件统一
  @Render('user')
  user() {
    return {name:'cuixiang', age: 24}
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
