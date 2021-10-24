# スキーマ
- スカラー型
- オブジェクト型
- Enum
  - あらかじめ定められた特定の文字列のひとつを返却する

# 一対一の接続

```
type User {
    githubLogin: ID!
    name: String
    avatar: String
}

type Photo {
    id: ID!
    name: String
    url: String
    description: String
    created: DateTime!
    category: PhotoCategory!
    postedBy: User!
}
```

## 一対多の接続

```
# Photoがリストで返ってくる意味
type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
}


# Queryルート型に一対多のフィールドを追加しておく必要がある
type Query {
    totalPhotos: int!
    allPhotos: [Photo!]!
    totalUsers: int!
    allUsers: [User!]!
}

schema {
    Query
}

```

## 多対多の接続
```
type User {
    ...
    inPhotos: [Photo!]!
    ...
}

type Photo {
    ...
    taggedUsers: [User!]!
    ...
}

```
- スルー型
- ユニオン型
- インタフェース

# 引数

```
type User {
    ...
    User(githubLogin: ID!): User!
    Photo(id: ID!): Photo!
    ...
}
```

# データのフィルタリング
- データページング
- ソート

# ミューテーション

```
type Mutation {
    postPhoto (
        name: String!
        description: String
        category: PhotoCategory=PORTRAIT
    ): Photo!
}
```

## 入力型
```
input PostPhotoInput {
    name: String!
    description: String
    category: PhotoCategory=PORTRAIT
}

type Mutation {
    postPhoto:(input: PostPhotoInput!): Photo!
}
```

## 返却型

# サブスクリプション
type Subscription {
    newPhoto(category: PhotoCategory): Photo!
    newUser: User!
}