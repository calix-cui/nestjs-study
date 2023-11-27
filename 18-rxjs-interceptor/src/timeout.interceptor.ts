import { catchError, throwError, TimeoutError } from 'rxjs';
// 接口长时间没返回，要给用户一个接口超时的响应
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, timeout } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 3s 没消息时抛出一个 TimeoutError
    return next.handle().pipe(
      timeout(3000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          console.log(err);
          // return throwError(() => new HttpException('xxx', HttpStatus.FOUND))
          return throwError(() => new RequestTimeoutException())
        }
        return throwError(() => err)
      })
    );
  }
}
