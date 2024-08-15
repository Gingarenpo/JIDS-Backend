import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

// インターフェースとして、JWTトークンのペイロードを定義する
export interface JwtPayload {
    user_id: String,
    user_name: String,
}

@Injectable()
export class UsersService {


    // DBクライアント
    private dbClient: PrismaClient;

    constructor() {
        this.dbClient = new PrismaClient();
    }

    // 指定したユーザーを取得
    async findUser(id: string): Promise<User | null> {
        return await this.dbClient.user.findUnique({
            where: {
                id: id
            }
        });
    }

    // パスワードをハッシュを用いて作成
    hashPassword(password: string): string {
        // ハッシュパスワードのアルゴリズム
        // (sha256 x 256 + JIDS) x 128
        // ちょっと遅いけど解読は著しく時間かかる
        for (let i = 0; i < 256; i++) {
            password = createHash("sha256").update(password).digest("hex");
        }
        password += "JIDS";
        for (let i = 0; i < 128; i++) {
            password = createHash("sha256").update(password).digest("hex");
        }
        return password;
    }

    

}
