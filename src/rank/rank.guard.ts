import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

// 現在のランクに応じた権限の制限を行う
// ランクはメタデータでもらう
@Injectable()
export class RankGuard implements CanActivate {

  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ユーザーそのものを取得
    const rank = this.reflector.get<String>('rank', context.getHandler());

    // TODO: ログインしているユーザーを取得する

    // ユーザーのランクがメタデータ内のランクより低い場合
    if (!rank || rank === "0") {
      return false;
    }

    return true;
  }
}
