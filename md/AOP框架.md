<style>
code {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 15px;
  white-space: pre-wrap;
  background: #f0f2f3 !important;
  color: #2876d2 !important;
}
</style>

# AOP

AOP(Aspect Oriented Programming) 面向切面编程

![AOP 架构](./assets/AOP%20架构.png)

**AOP 的好处是可以把一些通用逻辑分离到切面中，保持业务逻辑的纯粹性，这样切面逻辑可以复用，还可以动态的增删。**

Nest 实现 AOP 的方式有五种，包括 Middleware、Guard、Pipe、Interceptor、ExceptionFilter。

## Middleware 中间件

Nest 的底层是 Express，自然也可以使用中间件，分为**全局中间件**和**路由中间件**。

1. 全局中间件

在请求之前和之后加入一些处理逻辑，每个请求都会走到这。

```js
const app = (await NestFactory.create) < NestExpressApplication > AppModule; // 给 create 方法传入 NestExpressApplication 的泛型参数才有 useStaticAssets 这些方法
app.use(Logger); // middleware
await app.listen(3000);
```

2. 路由中间件

针对某个路由，范围更小：

```js
export class AaaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes('cats');
  }
}
```

## Guard

路由守卫，可以用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行。

Guard 是用 `@Injectable()` 装饰器注释的类，实现 `CanActivate` 接口。

```js
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    return true
    // return validateRequest(request)  // 做具体的验证逻辑
  }
}
```

具体使用：

```js
import { AuthGuard } from './auth.guard'

@Controller()
@UseGuards(AuthGuard)
```

全局使用：

```js
const app = (await NestFactory.create) < NestExpressApplication > AppModule;
app.useGlobalGuards(new AuthGuard()); // 全局使用
```

## Interceptor 拦截器

可以对请求、响应做修改，在目标 Controller 方法前后加入一些逻辑。

创建 Interceptor：

```js
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`After...${Date.now() - now}ms`)));
  }
}
```

在 Controller 使用：

```js
@UseInterceptors(new LoggingInterceptor())
export class AppController {}
```

全局使用：

```js
const app = (await NestFactory.create) < NestExpressApplication > AppModule; // 给 create 方法传入 NestExpressApplication 的泛型参数才有 useStaticAssets 这些方法
app.useGlobalInterceptors(new LoggingInterceptor());
```

## Pipe 管道

Pipe 用于对参数的处理，如检验和转换。

创建 Pipe：

```js
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value  // 对传入的参数 value 做参数验证，比如格式、类型是否正确。也可以对参数做转换。
  }
}
```

内置有 9 个 Pipe，从名字就能看出各自作用：

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- parseUUIDPipe
- DefaultValuePipe
- ParseEnumPipe
- ParseFloatPipe
- ParseFilePipe

对某参数使用：

```js
@Controller()
export class AppController {
  @Get('/hello')
  getHello(@Query('name', ValidationPipe) name: string): string {
    console.log(name);
    return this.appService.getHello(name);
  }
}
```

对某路由使用：

```js
@Controller()
export class AppController {
  @Get('/hello')
  @UsePipes(ValidationPipe)
  getHello(@Query('name') name: string): string {
    console.log(name);
    return this.appService.getHello(name);
  }
}
```

全局使用

```js
const app = (await NestFactory.create) < NestExpressApplication > AppModule;
app.useGlobalPipes(new ValidationPipe());
```

## ExceptionFilter

ExceptionFilter 可以对抛出的异常做处理，返回对应的响应：

```js
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

```

首先要实现 ExceptionFilter 接口，实现 catch 方法，就可以拦截异常了。用 @Catch 装饰器声明要拦截什么异常。

Nest 内置了很多 http 相关的异常，都是 HttpException 的子类：

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableException
- InternalServerErrorException
- NotImplementedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException

也可以自己扩展：

```js
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN); // super：执行父类的 constructor
  }
}
```

ExceptionFilter 也可以选择全局生效或者某个路由生效。

# 几种 AOP 机制的顺序

Middleware、Guard、Pipe、Interceptor、ExceptionFilter 都可以透明地添加某种处理逻辑到某个路由或者全部路由，这就是 AOP 的好处。

调用关系可以通过源码分析：