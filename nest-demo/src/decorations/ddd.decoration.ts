import { SetMetadata } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
// 自定义类装饰器
import { Controller } from '@nestjs/common';

export const Ddd = (path, metadata) => {
  return applyDecorators(Controller(path), SetMetadata('ddd', metadata));
};
