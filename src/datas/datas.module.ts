import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';

@Module({
  providers: [DatasService],
  controllers: [DatasController]
})
export class DatasModule {}
