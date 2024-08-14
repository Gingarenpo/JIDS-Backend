import { JwtPayload } from "src/users/users.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as BaseJwtStrategy } from "passport-jwt";
import { User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            // トークンを読み込む関数
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 有効期限を無視する？
            ignoreExpiration: false,
            // 環境変数から秘密鍵を取得
            secretOrKey: process.env.JWT_SECRET
        });
    }

    // ペイロードを使用したバリデーションチェック
    async validate(payload: JwtPayload): Promise<JwtPayload> {
        return { user_id: payload.user_id, user_name: payload.user_name };
    }
}