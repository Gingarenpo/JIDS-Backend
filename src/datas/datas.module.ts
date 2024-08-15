import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';

@Module({
  providers: [DatasService]
})
export class DatasModule {}
