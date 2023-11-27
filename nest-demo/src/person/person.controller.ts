import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';  // dto: data transfer object，用于封装传输的数据的对象
import { UpdatePersonDto } from './dto/update-person.dto';
import { Query } from '@nestjs/common/decorators'
import { UseInterceptors } from '@nestjs/common/decorators/core'
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer'
import { UploadedFiles } from '@nestjs/common/decorators/http'

// Nest 从上往下匹配路由的
@Controller('api/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post('file')
  @UseInterceptors(AnyFilesInterceptor({
    dest: 'uploads/'
  }))
  body2(@Body() createPersonDto: CreatePersonDto, @UploadedFiles() files: Array<Express.Multer.File>) { // npm i -D @types/multer
    return `received: ${JSON.stringify(createPersonDto)}`
  }

  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received: ${JSON.stringify(createPersonDto)}`
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    return `received: name=${name}, age=${age}`
  }

  @Get(':id')
  urlParam(@Param('id') id: string) {
    return `received: id=${id}`
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}