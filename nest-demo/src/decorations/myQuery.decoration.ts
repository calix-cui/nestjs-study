import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from "@nestjs/common"

// 内置的 @Param、@Query、@Ip、@Headers 都可以自己实现
export const myQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()
    return request.query[key]
  }
)