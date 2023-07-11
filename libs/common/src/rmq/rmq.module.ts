import { DynamicModule, Module } from '@nestjs/common';
import { RmqService } from './rmq.service';

interface RmqModuleOptions {
  name: string;
}

/*
getOptions в классе RmqService используется для получения настроек
подключения внутри сервиса, а метод register в классе RmqModule используется
для настройки подключения при создании динамического модуля.
*/

@Module({
  exports: [RmqService],
  providers: [RmqService],
})
export class RmqModule {
  // static register({ name }: RmqModuleOptions): DynamicModule {
  //   return
  // }
}
