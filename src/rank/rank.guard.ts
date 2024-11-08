import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { JIDSUnauthorized } from 'src/common/exceptions';
import { logger } from 'src/logger';

// ランクをデコレータでもらい、それをもとに判断するのでそれを指定する
export const Ranks = Reflector.createDecorator<String[]>();

// 現在のランクに応じた権限の制限を行う
// Ranksデコレータで指定されたランクに一致する場合に認可
@Injectable()
export class RankGuard implements CanActivate {

  constructor(private reflector: Reflector) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // 認可されているランクを取得
    const rank = this.reflector.get<String[]>(Ranks, context.getHandler());

    // 現在のリクエストを取得
    const request = context.switchToHttp().getRequest();
    
    // AuthGuardによってリクエストにuser情報があるはずなのでそれを取得してチェック
    const user = request.user;
    if (!user) {
      // そもそも判断不可能なのでダメ
      logger.debug("ユーザーが与えられていません");
      throw JIDSUnauthorized();
    }

    // ランクが一致しているかどうかを見る
    if (rank.includes(user.rank.name)) {
      return true;
    }

    logger.debug("ユーザーランクが不一致です");
    return false;
  }
}
