import { BadRequestException } from '@nestjs/common/exceptions';
import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new BadRequestException("xxxx");
    
    return this.appService.getHello();
  }
}
