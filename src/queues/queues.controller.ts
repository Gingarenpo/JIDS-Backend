import { Controller, Get, UseGuards } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Throttles } from 'src/common/throttle';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/auth.guard';
import { RankGuard, Ranks } from 'src/rank/rank.guard';
import { Req, Param } from '@nestjs/common';
import { JIDSForbidden } from 'src/common/exceptions';

@Controller('queues')
export class QueuesController {

    constructor(private queuesService: QueuesService) {}

    @Get("")
    @ApiTags("キュー")
    @ApiOperation({ summary: "全キューを取得する" })
    @ApiResponse({ status: 200, type: [Object] })
    @UseGuards(ThrottlerGuard)
    @UseGuards(RankGuard)
    @UseGuards(AuthGuard)
    @Ranks(["最高管理者"])
    @Throttle({default: Throttles.info_get})
    async getAllQueues(): Promise<any> {
        return this.queuesService.findAllQueues();
    }


    @Get(":queueId")
    @ApiTags("キュー")
    @ApiOperation({ summary: "キューの中身を取得する", description: "キューの中にある画像・情報を取得します。そのキューをアップロードしたアカウントと最高管理者以外はチェックすることができません。"})
    @ApiResponse({ status: 200, type: [Object], description: "キューの中身"})
    @ApiForbiddenResponse({ description: "キューの中身を見る権限がありません。"})
    @UseGuards(ThrottlerGuard)
    @UseGuards(AuthGuard)
    @Throttle({default: Throttles.info_get})
    async getQueue(@Req() request, @Param("queueId") queueId: string): Promise<any> {
        // サービスはあくまで中身を返すだけなので、ユーザーチェックはここで行う
        const queue = await this.queuesService.getQueue(queueId);
        if (queue.userId !== request.user.id && request.user.rank.name !== "最高管理者") {
            throw JIDSForbidden("キューを閲覧できるのは、キューを送信したアカウントか最高管理者のみです。");
        }
        return queue;
    }
}
