GrapQL APIツール
- GraphiQL
- GraphQL Playground


http://snowtooth.moonhighway.com/

# クエリ
- APIからデータを取得する
- 取得したいデータはフィールドで指定する

```
query lifts {
  allLifts {
    name
    status
  }
}

query trails {
  allTrails {
    name
    difficulty
  }
}
```

１つにまとめることもできる

```
query liftsAndTrails {
  liftCount(status: OPEN)
  allLifts {
    name
    status
  }
  allTrails {
    name
    difficulty
  }
}
```




## フラグメント
- フィールをまとめることができる。これによってクエリをスッキリさせることができる
## インターフェース
## フィールドの型
- プリミティブ型
- オブジェクト型
  - ユニオン型

# ミューテーション
- データの書き込み操作を行う

# サブスクリプション
- サーバーが更新されるたびに、リアルタイムでその情報を受け取ることができる

# イントロスペクション
- APIスキーマをの詳細を取得できる機能