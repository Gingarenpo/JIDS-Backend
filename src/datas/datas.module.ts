import { Module } from '@nestjs/common';
import { DatasService } from './datas.service';
import { DatasController } from './datas.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule, UsersModule],
  providers: [DatasService],
  controllers: [DatasController]
})
export class DatasModule {}
