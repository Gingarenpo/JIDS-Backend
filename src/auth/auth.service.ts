import { Injectable } from '@nestjs/common';
import { UsersService, JwtPayload } from '../users/users.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    // ユーザー認証、失敗したらnullを返す
    async validateUser(id: string, password: string): Promise<any> {
        const user = await this.usersService.findUser(id);
        if (user === null) {
            return null;
        }
        // 入力されたパスワードをハッシュ化
        const hashedPassword = await this.usersService.hashPassword(password);
        return user.password === hashedPassword ? user : null;
    }

    // JWTトークンを返す
    async login(user: User) {
        // ペイロードを取得
        const payload: JwtPayload = {
            user_id: user.id,
            user_name: user.name
        };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
