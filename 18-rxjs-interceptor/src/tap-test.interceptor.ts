// 使用 tap operator 添加一些日志、缓存等逻辑
import { AppService } from './app.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TapTestInterceptor implements NestInterceptor {
  // 注入依赖
  constructor(private appService: AppService) {}

  private readonly logger = new Logger(TapTestInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(tap(data => {

      // 模拟缓存
      this.appService.getHello()

      this.logger.log(`log something`, data)
    }))
  }
}
