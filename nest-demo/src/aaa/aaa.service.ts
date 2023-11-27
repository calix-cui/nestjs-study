import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';

@Injectable()
export class AaaService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('AaaService onModuleInit!');
  }

  onApplicationBootstrap() {
    console.log('AaaService onApplicationBootstrap!');
  }

  onModuleDestroy() {
    console.log('AaaService OnModuleDestroy!');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('AaaService BeforeApplicationShutdown at signal: ' + signal);
  }

  onApplicationShutdown() {
    console.log('AaaService OnApplicationShutdown!');
  }

  create(createAaaDto: CreateAaaDto) {
    return 'This action adds a new aaa';
  }

  findAll() {
    return `This action returns all aaa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aaa`;
  }

  update(id: number, updateAaaDto: UpdateAaaDto) {
    return `This action updates a #${id} aaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} aaa`;
  }
}
