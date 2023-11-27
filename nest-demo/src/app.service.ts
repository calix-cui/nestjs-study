import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(name: string): string {
    // throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
    return `Hello ${name}!`;
  }
}
