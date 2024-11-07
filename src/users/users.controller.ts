import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JIDSBadRequest, JIDSMethodNotAllowed } from 'src/common/exceptions';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('users')
export class UsersController {
    // ユーザーアカウント周りのAPI操作
    constructor(private usersService: UsersService) {}

    // POST系のエンドポイントにGETでアクセスしてきた場合は拒否
    @Get("create")
    @ApiExcludeEndpoint()
    dummyCreateUser() {
        throw JIDSMethodNotAllowed();
    }

    @Get("update")
    @ApiExcludeEndpoint()
    dummyUpdateUser() {
        throw JIDSMethodNotAllowed();
    }

    // 新規ユーザーを作成（レートリミットあり）
    @Post("create")
    @UseGuards(ThrottlerGuard)
    @Throttle({default: Throttles.user_post})
    @ApiTags("ユーザー")
    @ApiOperation({summary: "JIDSに新しくユーザーを登録"})
    @ApiResponse({status: 200, description: "新規ユーザーの情報を返却"})
    async createUser(@Body("id") id?, @Body("name") name?, @Body("address") address?, @Body("password") password?) {
        if (id == null || name == null || address == null || password == null) {
            // 必須項目が足りない
            console.log(id, name, address, password);
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
    @ApiOperation({summary: "自分自身のユーザー情報を取得"})
    @ApiTags("ユーザー")
    @ApiResponse({status: 200, description: "自分自身のユーザー情報を返却"})
    async getMe(@Req() request) {
        // AuthGuardによって自動的にuserオブジェクトは存在する
        const {password, ...result} = request.user;
        return result;
    }

    // 自分自身が送ったキュー一覧を取得
    @Get("me/queues")
    @UseGuards(AuthGuard)
    @Throttle({default: Throttles.user_get})
    @ApiTags("ユーザー")
    @ApiOperation({summary: "自分自身が送ったキュー一覧を取得"})
    @ApiResponse({status: 200, description: "自分自身が送ったキュー一覧を返却"})
    async getMeQueues(@Req() request) {
        // AuthGuardによって自動的にuserオブジェクトは存在する
        return this.usersService.findQueues(request.user);
    }

    // 自分自身のユーザー情報を変更（※idの変更はできません！）
    @Post("update")
    @UseGuards(AuthGuard)
    @Throttle({default: Throttles.user_post})
    @ApiTags("ユーザー")
    @ApiOperation({summary: "自分自身のユーザー情報を変更", description: "ユーザー情報を変更します。ただし、ユーザーIDは変更できません。"})
    @ApiResponse({status: 200, description: "変更した自分自身のユーザー情報を返却"})
    async updateMe(@Req() request, @Body("name") name?, @Body("address") address?, @Body("password") password?) {
        // ユーザー情報を更新する
        const user = await this.usersService.updateUser(request.user, name, address, password);
        // ユーザー情報を返す
        const {password: _, ...result} = user;
        return result;
    }
}
