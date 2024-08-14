import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private usersService: UsersService, private authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Request() req) {
        // ログインに成功した場合、JWTトークンを返す
        return this.authService.login(req.user);
    }

    @Get("test")
    async test(@Request() req) {
        return this.usersService.hashPassword("test");
    }
}
