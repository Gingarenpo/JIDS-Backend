from sqlalchemy import create_engine
from dotenv import load_dotenv
import bar_chart_race as bcr
import pandas as pd
import numpy as np
import japanize_matplotlib
import warnings
import os

warnings.simplefilter("ignore")

# 環境変数からDB接続情報を取得
load_dotenv("../.env.local")


e = create_engine(os.environ["DATABASE_URL"])

PERIOD_LENGTH = 100 # 1期間あたりのミリ秒
PERIOD_FRAME = 2 # 1期間あたりのフレーム数

prefs = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県"
]

def make(df, title, filename):
    bcr.bar_chart_race(
        df=df,
        filename=filename,
        steps_per_period=PERIOD_FRAME, # 次の期間に移るまでのフレーム数
        period_length=PERIOD_LENGTH, # 次の期間に移るまでのミリ秒（つまりFPSは↑÷(これ/1000)）
        interpolate_period=True, # 期間の補間をしないとかくつく
        figsize=(16, 9), # サイズ
        dpi=50,
        title=title,
        period_fmt="%Y/%m/%d",
        period_summary_func=summary, # トータルとか出すときの
        bar_label_size=32,
        tick_label_size=24,
        title_size=48,
        shared_fontdict={
            "family": "Noto Sans CJK JP",
        },
        period_label={
            "x": 0.99,
            "y": 0.2,
            "ha": "right",
            "size": 32,
        },
    )

# 合計値
def summary(value, rank):
    print(value.name, end="\r")
    # 今の期間の値、ランク（？）からラベルを取得
    total = int(round(value.sum()))
    return {
        "x": 0.99,
        "y": 0.05,
        "s": f"{total:,d}",
        "ha": "right",
        "size": 72,
        "weight": "bold",
    }

# データ取得
df_thumbnail = pd.read_sql('SELECT date ::DATE, "prefId", COUNT(*) AS count FROM (SELECT MIN("takeDate") AS date, "prefId", "areaId", "intersectionId" FROM info.thumbnail GROUP BY "prefId", "areaId", "intersectionId") t GROUP BY date, "prefId" ORDER BY date, "prefId"', e)
df_detail = pd.read_sql('SELECT date ::DATE, "prefId", COUNT(*) AS count FROM (SELECT MIN("takeDate") AS date, "prefId", "areaId", "intersectionId" FROM info.detail GROUP BY "prefId", "areaId", "intersectionId") d GROUP BY date, "prefId" ORDER BY date, "prefId"', e)

# ピポットテーブル化と累積和化
df_thumbnail = pd.pivot_table(df_thumbnail, index=["date"], columns=["prefId"]).fillna(0).cumsum()
df_thumbnail = df_thumbnail.reset_index()
df_thumbnail["date"] = pd.to_datetime(df_thumbnail["date"])
df_thumbnail = df_thumbnail.set_index("date")
df_thumbnail.columns = [prefs[int(a[1])-1] for a in df_thumbnail.columns]
df_detail = pd.pivot_table(df_detail, index=["date"], columns=["prefId"]).fillna(0).cumsum()
df_detail = df_detail.reset_index()
df_detail["date"] = pd.to_datetime(df_detail["date"])
df_detail = df_detail.set_index("date")

# バーチャートレース作成
make(df_thumbnail, "JIDS Thumbnails", "thumbnail.gif")
make(df_detail, "JIDS Details", "detail.gif")