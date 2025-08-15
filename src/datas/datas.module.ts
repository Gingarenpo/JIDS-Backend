import { Module } from '@nestjs/common';
import { DatasService } from 'src/datas/datas.service';
import { DatasController } from 'src/datas/datas.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule, UsersModule],
  providers: [DatasService],
  controllers: [DatasController],
  exports: [DatasService],
})
export class DatasModule {}
