import { Role } from './roles/roles';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// ExecutionContext 是 ArgumentHost 的子类，扩展了 getClass、getHandler 方法。

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const data = this.reflector.get<Role[]>(
      'ddd',
      context.getClass(),
    );
    console.log(data);

    // if (!requiredRoles) return true;

    // const request = context.switchToHttp().getRequest();
    // const { user } = request.query;
    return true;
    // return requiredRoles.some((role) => user && user.roles?.includes(role));
  }
}
