# バッチファイル群について
Pythonスクリプトを用いていくつかバッチファイルを仕込んでいます。
NodeJSでやる方法がよくわからなかったので、もし稼働させたい場合はLinuxのコマンドを駆使したりしてどうにかする必要があります。

また、基本的に動けばいいのスタンスなので、コードはめちゃくちゃです。
最適化するのがめんどくさいので、もししてくれる方がいたらコミットしていただけるとありがたいです。

## 中身
### bcr.py
バーチャートレース作成用のスクリプトです。
YouTubeとかでよく使われている競い合う棒グラフのアニメーションを作ってくれます。

デフォルトでは、detail.gifとthumbnail.gifが生成され、それぞれ現地調査数とサムネイル数を都道府県別に直したものになっています。なおこのデータはAPIから直接参照できるように細工しています。

### fonts.py
上記、bcr.pyで使用するMatplotlibのフォント確認用スクリプトです。これをいじることはまずないでしょう。

### 以下、作成次第追記予定

## 導入方法
### Ubuntuの場合（推奨）
Windowsやその他Linuxの場合は個別に相談受付ます、あるいは調べてください。
```bash
sudo apt update
sudo apt install -y font-notocjk
```
Noto Sans CJK JPフォントをインストールします。（任意）
スクリプトをそのまま使用したい場合はこの操作をしてください。別のフォントを使いたい方は適当に落としてきてください。

```bash
sudo apt install -y python3 python3-venv python3-pip
```
Pythonをインストールします。動作確認環境は3.12です。なおUbuntuで3.12をインストールする場合は
```bash
sudo apt install -y python3.12 python3.12-venv python3.12-pip
```
とすればOKです。多分。

```bash
cd batch
python3 -m venv .venv
```
仮想環境を作成します。仮想環境の名前は`.venv`にしておくことをお勧めします。.gitignoreにそれを書いているので。

```bash
source .venv/bin/activate
```
仮想環境に入ります。

```bash
pip install -r requirements.txt
```
必要なライブラリをインストールします。

```bash
python3 bcr.py
```
試しに実行してみます。detail.gifとthumbnail.gifが作成されれば成功です。なおやや時間かかります。

## トラブルシューティング
### pipインストールできない
Python3.12を使用してください。
もしくは依存関係が壊れている可能性が高いので手動でインストールしてください。

### distutilsないよって言われる
Python3.12では廃止されたようです。代わりにsetuptoolsを入れたので動くはずですが動かない場合は手動でインストールしてください。

### `なんちゃら instead Pillow`みたいなエラー出る
無視でOK。imagemagickが入っていないためPillow使うよってことです。

気になる場合はインストールしておいてください。
```bash
sudo apt install -y imagemagick
```

### 自動実行のさせ方は？
cronを使います。

```bash
crontab -e
```
これでcronの設定を開けるので、以下のコマンドを実行するように設定の上好きな時間に設定してください。

```bash
python3 /path/to/absolute/bcr.py
```
※パスは絶対パスを記してください

### 何が何だかわからない！
使うのをやめましょう