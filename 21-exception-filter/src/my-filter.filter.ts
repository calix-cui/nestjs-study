import { BadRequestException } from '@nestjs/common/exceptions';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

// Catch 指定要捕获的异常
@Catch(BadRequestException)
export class MyFilterFilter<T> implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    debugger;
    // const http = host.switchToHttp()
  }
}
