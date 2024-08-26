import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatasController } from './datas/datas.controller';
import { DatasModule } from './datas/datas.module';
import { MetasModule } from './metas/metas.module';

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
    DatasModule,
    MetasModule,
  ],
  controllers: [AppController, DatasController],
  providers: [AppService,
  ],
})
export class AppModule {}
