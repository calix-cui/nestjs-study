import { AaaPipe } from './aaa.pipe';
import { Test } from './dto/test.dto';
import { BadGatewayException, BadRequestException } from '@nestjs/common/exceptions';
import { Controller, Get, HttpStatus, HttpException, Post, Body, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new BadRequestException("xxxx");
    throw new BadGatewayException("aaa");
    
    return this.appService.getHello();
  }
  
  @Post('aaa')
  aaa(@Body() aaa: Test): string {
    return 'success';
  }
}
