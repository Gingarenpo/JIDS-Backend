import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import { JIDSBadRequest, JIDSInternalServerError } from 'src/common/exceptions';
import internal from 'stream';

// インターフェースとして、JWTトークンのペイロードを定義する
export interface JwtPayload {
    user_id: String,
    user_name: String,
    user_rank: number,
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
            },
            include: {
                rank: true}
        });
    }

    // ログインデータ更新
    async loginUser(user: User): Promise<User> {
        return await this.dbClient.user.update({
            where: {
                id: user.id
            },
            data: {
                loginDate: new Date(),
            }
        });
    }

    // ユーザーを作成
    async createUser(id: string, name: string, address: string, password: string): Promise<User> {
        // 各種バリデーションチェックを行う
        const errors = [];
        if (await this.checkId(id) === false) {
            errors.push("このIDは使用できません。");
        }
        if (this.checkName(name) === false) {
            errors.push("この名前は使用できません。");
        }
        if (this.checkAddress(address) === false) {
            errors.push("不正な連絡先です。");
        }
        if (this.checkPassword(password) === false) {
            errors.push("パスワードは8文字以上の半角英数字記号で、英字と数字を1文字以上含む必要があります。");
        }
        if (errors.length > 0) {
            throw JIDSBadRequest(errors);
        }

        // ユーザーを作成する
        return await this.dbClient.user.create({
            data: {
                id: id,
                name: name,
                address: address,
                password: this.hashPassword(password),
                rank: {
                    connect: {
                        name: "利用者"
                    }
                }
            }
        });
    }

    async updateUser(user, name?: string, address?: string, password?: string): Promise<User> {
        if (user == null) {
            throw JIDSInternalServerError();
        }
        if (name != null && this.checkName(name) === false) {
            throw JIDSBadRequest("名前の形式に誤りがあります。");
        }
        if (address != null && this.checkAddress(address) === false) {
            throw JIDSBadRequest("連絡先の形式に誤りがあります。");
        }
        if (password != null && this.checkPassword(password) === false) {
            throw JIDSBadRequest("パスワードの形式に誤りがあります。");
        }

        const newUser = this.dbClient.user.update({
            where: {
                id: user.id
            },
            data: {
                name: name ?? user.name,
                address: address ?? user.address,
                password: password != null ? this.hashPassword(password) : password
            }
        });

        return await newUser;
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

    
    // バリデーションチェック：ID
    async checkId(id: string): Promise<Boolean> {
        // 要件1: 64文字以内
        if (id.length > 64) {
            return false;
        }
        
        // 要件2: 半角英数字とアンダーバー
        if (/^[a-zA-Z0-9_]+$/.test(id) === false) {
            return false;
        }

        // 要件3: すでに登録されていない
        if (await this.findUser(id) !== null) {
            return false;
        }
        return true;
    }

    // バリデーションチェック：名前
    checkName(name: string): boolean {
        // 要件1: 64文字以内
        if (name.length > 64) {
            return false;
        }
        
        return true;
    }

    // バリデーションチェック：連絡先
    checkAddress(address: string): boolean {
        // 要件1: 256文字以内
        if (address.length > 256) {
            return false;
        }
        
        // 要件2: 有効な形式になっているか
        if (/^@[a-zA-Z0-9_]+$/.test(address) === false && /^@?[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/.test(address) === false) {
            return false;
        }

        return true;
    }

    // バリデーションチェック：パスワード
    checkPassword(password: string): boolean {
        // 要件1: 8文字以上の半角英数字記号、かつ英字と数字を1文字以上
        if (password.length < 8 || ( /^(?=[0-9])[0-9a-zA-Z!#$%&'*+\-/=?^_`{|]+$/.test(password) === false && /^(?=[a-zA-Z])[0-9a-zA-Z!#$%&'*+\-/=?^_`{|]+$/.test(password) === false )) {
            return false;
        }
        
        return true;
    }

}
