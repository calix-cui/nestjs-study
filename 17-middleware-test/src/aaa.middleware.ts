import { AppService } from './app.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators'
import { Request, Response } from 'express'

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  @Inject(AppService)
  private readonly appService: AppService;

  use(req: Request, res: Response, next: () => void) {
    console.log('before');
    console.log('-------' + this.appService.getHello());
    // next 就是调用下一个 middleware 的
    next();
    console.log('after');
  }
}
