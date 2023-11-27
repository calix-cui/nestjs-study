import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AaaPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    // { metatype: [Function: Number], type: 'param', data: 'kk' }
    
    // pipe 的返回值就是传给 handler 的参数值
    return '123';
  }
}
