import { ArgumentMetadata, Injectable, PipeTransform, Optional, Inject } from '@nestjs/common';
import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { BadRequestException } from '@nestjs/common/exceptions'

@Injectable()
export class BbbPipe implements PipeTransform {

  @Optional()
  @Inject('validation_options')
  private options

  async transform(value: any, { metatype }: ArgumentMetadata) {
    // metatype 就是 test(@Body(new ValidationPipe()) obj: Test) 里的 Test
    // 如果不声明，就没法转换和验证，直接返回 `value`

    if (!metatype) {
      return value
    }
    const object = plainToInstance(metatype, value)
    const errors = await validate(object)
    if(errors.length > 0) {
      throw new BadRequestException('参数验证失败')
    }
    return value;
  }
}
