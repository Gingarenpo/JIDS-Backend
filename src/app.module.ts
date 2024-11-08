import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MetasModule } from './metas/metas.module';
import { DatasModule } from './datas/datas.module';
import { StaticModule } from './static/static.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UploadModule } from './upload/upload.module';
import { JIDSthrottleGuard } from './common/JIDSthrottle.guard';
import { QueuesModule } from './queues/queues.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.local", ".env"],
    }),
    AuthModule,
    UsersModule,
    StaticModule,
    UploadModule,
    ThrottlerModule.forRoot([{
      ttl: 60 * 60 * 24,
      limit: 10,
    }]),
    MetasModule,
    DatasModule,
    ScheduleModule.forRoot(),
    QueuesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JIDSthrottleGuard
    }
  ],
})
export class AppModule {}
