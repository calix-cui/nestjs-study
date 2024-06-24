import { AppService } from './app.service';
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common/exceptions';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators'

// Catch 指定要捕获的异常
// Catch 指定什么类型，就只能捕获该类型的错误
// @Catch(BadRequestException)
@Catch(HttpException) // HttpException 捕捉了所有类型。同时也覆盖了 ValidationPipe 的报错。
export class MyFilterFilter<T> implements ExceptionFilter {
  @Inject(AppService)
  private service: AppService;

  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp()
    const response = http.getResponse<Response>()

    const statusCode = exception.getStatus()

    const res = exception.getResponse() as { message: string[] }

    response.status(statusCode).json({
      code: statusCode,
      message: res?.message?.join ? res?.message?.join(',') : exception.message,
      error: 'Bad Request',
      xxx: 11,
      service: this.service.getHello()
    })
    // debugger;
    // const http = host.switchToHttp()
  }
}
