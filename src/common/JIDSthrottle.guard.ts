import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class JIDSthrottleGuard extends ThrottlerGuard {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 現在のリクエストを取得
        const request = context.switchToHttp().getRequest();

        // ローカルの場合レート制限を無視
        if (request.ip == "127.0.0.1") {
            return true;
        }

        return super.canActivate(context);
    }
}