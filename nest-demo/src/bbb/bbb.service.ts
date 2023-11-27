import { AaaService } from './../aaa/aaa.service';
import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

@Injectable()
export class BbbService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private aaaService: AaaService) {}

  onModuleInit() {
    console.log('BbbService onModuleInit!');
  }

  onApplicationBootstrap() {
    console.log('BbbService onApplicationBootstrap!');
  }

  onModuleDestroy() {
    console.log('BbbService OnModuleDestroy!');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('BbbService BeforeApplicationShutdown at signal: ' + signal);
  }

  onApplicationShutdown() {
    console.log('BbbService OnApplicationShutdown!');
  }

  create(createBbbDto: CreateBbbDto) {
    return 'This action adds a new bbb';
  }

  findAll() {
    return `This action returns all bbb` + this.aaaService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb`;
  }

  update(id: number, updateBbbDto: UpdateBbbDto) {
    return `This action updates a #${id} bbb`;
  }

  remove(id: number) {
    return `This action removes a #${id} bbb`;
  }
}
