import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
