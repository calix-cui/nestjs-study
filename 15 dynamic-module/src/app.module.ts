import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';

@Module({
  imports: [BbbModule.register({
    aaa: 1,
    bbb: 2
  }), 
  // CccModule.register({
  //   aaa: 123,
  //   bbb: '456'
  // }), CccModule.registerAsync({
  //   useFactory: async () => {
  //     await 111;
  //     return {
  //       aaa: 222,
  //       bbb: "123"
  //     }
  //   },
  //   inject: []
  // })
  CccModule.register({
    aaa: 1,
    bbb: 'bbb',
    isGlobal: true
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
