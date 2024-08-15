import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatasController } from './datas/datas.controller';
import { DatasModule } from './datas/datas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,

    // APIスロットリング（ユーザーの役位に応じた）
    ThrottlerModule.forRoot([
      {
        name: "use",
        ttl: 1000 * 60 * 60 * 24, // 24時間
        limit: 100,
      },
      {
        name: "info",
        ttl: 1000 * 60 * 60 * 24, // 24時間
        limit: 200,
      },
      {
        name: "admin",
        ttl: 1000 * 60 * 60 * 24, // 24時間
        limit: 1000,
      },
      {
        name: "superadmin",
        ttl: 1, // 事実上無制限
        limit: 2147483647,
      }
    ]),

    DatasModule,
  ],
  controllers: [AppController, DatasController],
  providers: [AppService],
})
export class AppModule {}
