import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { QueuesModule } from 'src/queues/queues.module';
import { QueuesService } from 'src/queues/queues.service';

@Module({
  imports: [JwtModule, QueuesModule],
  providers: [UsersService, QueuesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
