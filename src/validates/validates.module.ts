import { Module } from '@nestjs/common';
import { ValidatesController } from './validates.controller';
import { ValidatesService } from './validates.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule, UsersModule,],
  controllers: [ValidatesController],
  providers: [ValidatesService]
})
export class ValidatesModule {}

/**
 * 予備調査の検証を行う際に使用するJSONの型定義（おおもと）
 */
export class ValidateSearchRequestDto {
  diffs: SearchDiff[];
}

/**
 * 予備調査の差分を型定義したもの（クライアントから送られることを想定）
 * 最悪交差点を特定できればデータベースから引っ張り出せる
 */
export class SearchDiff {
  diff: Record<string, {key: string, before : any, after : any}>;
  edited: {prefId: number, areaId: number, id: string};
  original: {prefId: number, areaId: number, id: string};
}

/**
 * 検証用関数（バリデータ）の戻り値の定義
 */
export type ValidateResult = string[];

/**
 * 検証用関数（バリデータ）の引数の定義
 */
export type ValidatorContext = {
  diff: SearchDiff,
  current?: any, // DBに格納されている情報が必要なら渡す
}

/**
 * 検証用関数が取りえる関数形式の型定義
 */
export type Validator<T = any> = (
  value: T,
  ctx?: ValidatorContext
) => Promise<ValidateResult> | ValidateResult