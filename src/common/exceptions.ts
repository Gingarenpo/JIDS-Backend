/**
 * NestJSのデフォルトの例外では味気ないので
 * こちらでカスタマイズした例外として投げることでレスポンスを起こす
 * 
 * TODO: i18n対応
 */

import { BadRequestException, ForbiddenException, MethodNotAllowedException, NotFoundException, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";

export function JIDSBadRequest(message?: string|string[]) {
    return new BadRequestException(message ?? "引数が不正です。");
}

export function JIDSUnauthorized(message?: string|string[]) {
    return new UnauthorizedException(message ?? "認証に失敗しました。");
}

export function JIDSForbidden(message?: string|string[]) {
    return new ForbiddenException(message ?? "このAPIへのアクセスは禁止されています。");
}

export function JIDSNotFound(message?: string|string[]) {
    return new NotFoundException(message ?? "このエンドポイントは存在しません。");
}

export function JIDSMethodNotAllowed(message?: string|string[]) {
    return new MethodNotAllowedException(message ?? "このエンドポイントでそのメソッドは使用できません。");
}

export function JIDSInternalServerError(message?: string|string[]) {
    return new Error((typeof message === "string" && message != null) ? message: "システムエラーが発生しました。");
}

export function JIDSRequestTimeOut(message?: string|string[]) {
    return new RequestTimeoutException((typeof message === "string" && message != null) ? message: "リクエストがタイムアウトしました。");
}