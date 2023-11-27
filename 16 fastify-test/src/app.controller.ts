import { Controller, Get, Request, Response } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 一旦用 @Response 注入了响应对象，就不能通过 return 的方式来返回响应内容了，需要手动调用 res.send。
  getHello(@Request() request: FastifyRequest, @Response() reply: FastifyReply) {
    // return this.appService.getHello();
    reply.header('url', request.url)
    reply.send('hello')
  }

  @Get('get2')
  // passthrough 代表不会在方法里发送响应，此时返回值生效
  getHello2(@Request() request: FastifyRequest, @Response({passthrough: true}) reply: FastifyReply) {
    reply.header('url', request.url)
    // reply.send('hello')
    return 'hello2'
  }
}
