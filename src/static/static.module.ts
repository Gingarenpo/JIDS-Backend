import { Module } from '@nestjs/common';
import { StaticService } from './static.service';
import { StaticController } from './static.controller';
import { DatasModule } from 'src/datas/datas.module';

@Module({
  imports: [DatasModule],
  providers: [StaticService],
  controllers: [StaticController]
})
export class StaticModule {}
