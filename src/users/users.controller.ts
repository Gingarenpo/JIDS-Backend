import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JIDSBadRequest, JIDSMethodNotAllowed } from 'src/common/exceptions';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('users')
export class UsersController {
    // ユーザーアカウント周りのAPI操作
    constructor(private usersService: UsersService) {}

    // POST系のエンドポイントにGETでアクセスしてきた場合は拒否
    @Get("create")
    dummyCreateUser() {
        throw JIDSMethodNotAllowed();
    }

    @Get("update")
    dummyUpdateUser() {
        throw JIDSMethodNotAllowed();
    }

    // 新規ユーザーを作成（レートリミットあり）
    @Post("create")
    @UseGuards(ThrottlerGuard)
    @Throttle({default: Throttles.user_post})
    async createUser(@Body("id") id?, @Body("name") name?, @Body("address") address?, @Body("password") password?) {
        if (id == null || name == null || address == null || password == null) {
            // 必須項目が足りない
            throw JIDSBadRequest();
        }

        // バリデーションチェックとかはサービスに投げます
        const user = await this.usersService.createUser(id, name, address, password);

        // ユーザーの中身からパスワードを抜き取って返します
        const { password: _, ...result } = user;

        return result;

    }

    // 自分自身のユーザー情報を取得（ほかの人のデータを見ることは不可能）
    @Get("me")
    @UseGuards(AuthGuard)
    @Throttle({default: Throttles.user_get})
    async getMe(@Req() request) {
        // AuthGuardによって自動的にuserオブジェクトは存在する
        const {password, ...result} = request.user;
        return result;
    }

    // 自分自身のユーザー情報を変更（※idの変更はできません！）
    @Post("update")
    @UseGuards(AuthGuard)
    @Throttle({default: Throttles.user_post})
    async updateMe(@Req() request, @Body("name") name?, @Body("address") address?, @Body("password") password?) {
        // ユーザー情報を更新する
        const user = await this.usersService.updateUser(request.user, name, address, password);
        // ユーザー情報を返す
        const {password: _, ...result} = user;
        return result;
    }
}
