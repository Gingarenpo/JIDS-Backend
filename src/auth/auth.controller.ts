import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';

@Controller('auth')
export class AuthController {

    constructor(private usersService: UsersService, private authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Throttle({default: Throttles.login})
    @Post("login")
    async login(@Request() req) {
        // ログインユーザーのログイン日時を更新
        const user = await this.usersService.loginUser(req.user);
        // ログインに成功した場合、JWTトークンを返す
        return this.authService.login(user);
    }

    @Get("test")
    async test(@Request() req) {
        return this.usersService.hashPassword("From2016toGingarenpo");
    }
}
