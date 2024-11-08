import { Module } from '@nestjs/common';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [JwtModule],
  controllers: [QueuesController],
  providers: [QueuesService, UsersService]
})
export class QueuesModule {}
