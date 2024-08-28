import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MetasModule } from './metas/metas.module';
import { DatasModule } from './datas/datas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local", ".env"],
    }),
    AuthModule,
    UsersModule,
    ThrottlerModule.forRoot([{
      ttl: 60 * 60 * 24,
      limit: 10,
    }]),
    MetasModule,
    DatasModule,
  ],
  controllers: [],
  providers: [
  ],
})
export class AppModule {}
