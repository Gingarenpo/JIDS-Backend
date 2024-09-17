import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { env } from 'process';
import { Request } from 'express';
import { JIDSUnauthorized } from 'src/common/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // localhostのアクセスの場合は容認
    const request = context.switchToHttp().getRequest();
    /*if (request.ip == "127.0.0.1") {
      request.user = await this.usersService.findUser("Gingarenpo"); // TODO: ここどうにかする（開発者用アカウント作る？）
      return true;
    }*/

    // リクエストからトークンを取得

    const token = this.extractTokenFromHeader(request);
    
    // トークンを検証
    if (!token) {
      throw JIDSUnauthorized();
    }

    try {
      // JWTトークンからペイロードを取得
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET,
      });
      // ペイロードのユーザーIDを使用してユーザーを取得
      // なおこの時点で絶対に取得できるはず
      const user = await this.usersService.findUser(payload.user_id);
      request.user = user;
    }
    catch {
      throw JIDSUnauthorized();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
