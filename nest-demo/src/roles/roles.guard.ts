import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
  // @Inject(Reflector)
  // private readonly reflector: Reflector;
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest()
    // console.log(context.getClass());
    // console.log(context.getHandler());
    // console.log(this.reflector);
    const classMetadata = this.reflector.get('roles', context.getClass())
    const methodMetadata = this.reflector.get('roles', context.getHandler())
    console.log(classMetadata, methodMetadata);
    return true
    // return validateRequest(request)  // 做具体的验证逻辑
  }
}