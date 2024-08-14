# メモ
いずれドキュメントは整備するとして、忘れないようにメモとして開発環境の構築手順を残しとく

わかんなかったら聞いて

## PostgreSQL
`sudo apt install postgresql`で入る。16でテスト中

## nodejsのセットアップ関連
メモらないと使い慣れていないから忘れる・・・

```shell
# プロジェクト読み込み
git clone https://github.com/Gingarenpo/JIDS-Backend

# ディレクトリ移動
cd JIDS-Backend

# 必要ライブラリのインストール
npm install

# prismaで使う.envファイル作成
vim .env # ※DATABASE_URL作ればOK

# マイグレしといて
npx prisma migrate dev --name init

```

## あると便利なVSCode拡張機能

Codeiumいれよう。あれ便利だ。