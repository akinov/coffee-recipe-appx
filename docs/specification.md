# コーヒーのドリップレシピ管理Webアプリ 要件定義

---

## 1. 機能要件

### 1.1 ユーザー管理
- **未ログインユーザーの利用**
  - レシピの閲覧・作成が可能。
  - 一時的なセッションに保存されるが、永続的な保存は不可。
- **Googleログインによるユーザー認証**
  - Firebase Authenticationを使用したGoogleアカウントでのログイン機能。
  - ログイン後、ユーザー専用のレシピを永続的に保存・管理可能。
  - ユーザー情報のセキュアな管理。

### 1.2 レシピ管理
- **レシピの作成**
  - **タイトルの入力**: レシピにわかりやすいタイトルを設定。
  - **説明文の入力**: レシピの詳細な説明やメモを追加。
  - コーヒーの粉の重量（g）と使用するお湯の量（mL）を入力。
  - ドリップ時間の設定：
    - 最初に注ぐお湯の量（mL）と蒸らし時間（秒）の入力。
    - 続けて注ぐお湯の量（mL）と注ぐタイミング（秒）のステップを複数追加可能。
    - ステップの自由な編集（追加、削除、並び替え）。
- **レシピの編集**
  - 既存のレシピを編集・更新する機能。
- **レシピの削除**
  - 不要なレシピを削除する機能。
- **レシピの保存**
  - 未ログイン時：一時的にセッションに保存。
  - ログイン時：Firebase Firestoreにユーザーアカウントに紐付けて永続的に保存。

### 1.3 レシピの再生機能
- **レシピの実行**
  - 選択したレシピを再生開始。
  - タイマーが動作し、現在の秒数を表示。
  - 現在行うべきアクション（お湯を注ぐ量とタイミング）をリアルタイムで表示。
- **再生の管理**
  - 再生の一時停止、再開、リセット機能。
  - 再生中の進行状況を視覚的に表示（例：タイムラインやステップリスト）。

### 1.4 レシピの表示・検索
- **レシピ一覧表示**
  - 作成したレシピの一覧を表示。
  - 各レシピの基本情報（タイトル、説明文、粉量、お湯の量など）をサムネイル形式で表示。
- **検索・フィルター機能**
  - タイトル、粉量、お湯の量、ステップ数などでレシピを検索・フィルタリング。

### 1.5 その他の機能
- **お気に入り機能**
  - 気に入ったレシピをお気に入りに追加する機能。

### 1.6 多言語対応
- **言語選択**
  - ユーザーがアプリケーションの言語を選択できる機能（例: 日本語、英語など）。
- **ローカライズ**
  - UIテキスト、メッセージ、エラーメッセージなどの多言語対応。
- **コンテンツの翻訳**
  - レシピのタイトルや説明文はユーザーが入力するため、多言語翻訳機能は不要とする（必要に応じて検討）。

---

## 2. 非機能要件

### 2.1 ユーザーインターフェース（UI）
- **使いやすさ**
  - シンプルで直感的なデザイン。
  - レスポンシブデザインで、PC、タブレット、スマートフォンなど様々なデバイスに対応。
- **視覚的なフィードバック**
  - レシピ再生中の進行状況を視覚的に表示。
  - アクションの通知や確認ダイアログの実装。

### 2.2 パフォーマンス
- **高速なレスポンス**
  - レシピの読み込みや保存が迅速に行える。
- **スケーラビリティ**
  - ユーザー数の増加に対応できるアーキテクチャ設計。

### 2.3 セキュリティ
- **データ保護**
  - Firebaseのセキュリティルールを活用して、ユーザーデータの保護。
- **認証・認可**
  - Firebase Authenticationを用いた安全なログイン機能。
- **入力バリデーション**
  - フォーム入力の検証による不正アクセス防止。

### 2.4 データベース
- **データの整合性**
  - Firebase Firestoreを使用してレシピやユーザー情報の一貫性を保つ。
- **バックアップとリカバリ**
  - Firebaseの自動バックアップ機能を活用。

### 2.5 保守性・拡張性
- **コードの品質**
  - TypeScriptによる型安全なコードベース。
  - モジュール化されたコードベースで、将来的な機能追加が容易。
- **ドキュメント**
  - 開発者向けの詳細なドキュメントの整備。

---

## 3. ユーザーストーリー

### 3.1 レシピ作成者として
- 自分のコーヒードリップレシピにタイトルと説明文を付けて、わかりやすく管理したい。
- 自分のコーヒードリップレシピを簡単に作成・編集・保存したい。
- Firebase Authenticationを使用して安全にログインし、レシピを管理したい。

### 3.2 一般ユーザーとして
- 他のユーザーが作成したレシピを検索・閲覧し、自分のドリップに活用したい。
- レシピ再生機能を使って、正確なタイミングでお湯を注ぎたい。

### 3.3 多言語対応ユーザーとして
- 自分の母国語でアプリを利用したい。
- 言語設定を簡単に変更できるようにしたい。

---

## 4. データモデルの提案

Firebase Firestoreを使用するため、NoSQLデータベースの構造を提案します。

### 4.1 ユーザーモデル
**コレクション名**: `users`

- `userId` (string): ユーザーの一意識別子（Firebase AuthenticationのUID）
- `displayName` (string): ユーザー表示名
- `email` (string): ユーザーのメールアドレス
- `createdAt` (timestamp): アカウント作成日時
- `recipes` (array of references): ユーザーが所有するレシピの参照

### 4.2 レシピモデル
**コレクション名**: `recipes`

- `recipeId` (string): レシピの一意識別子（Firestoreの自動生成ID）
- `userId` (string): 所有者のユーザーID
- `title` (string): レシピのタイトル
- `description` (string): レシピの説明文
- `coffeeWeight` (number): コーヒーの粉量（g）
- `waterTotal` (number): お湯の総量（mL）
- `steps` (array of objects):
  - 各ステップのオブジェクト:
    - `stepNumber` (number): ステップ番号
    - `waterAmount` (number): 注ぐお湯の量（mL）
    - `waitTime` (number): 注ぐタイミング（秒）
- `createdAt` (timestamp): レシピ作成日時
- `updatedAt` (timestamp): レシピ更新日時
- `isPublic` (boolean): 公開設定（公開/非公開）

### 4.3 お気に入りモデル
**コレクション名**: `favorites`

- `favoriteId` (string): お気に入りの一意識別子（Firestoreの自動生成ID）
- `userId` (string): ユーザーID
- `recipeId` (string): レシピID
- `addedAt` (timestamp): お気に入りに追加した日時

---

## 5. 技術スタックの詳細

ご希望の技術スタックに基づき、各コンポーネントの具体的な選定と役割を以下に示します。

### 5.1 フロントエンド
- **フレームワーク**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
  - 型安全性と開発効率の向上。
- **UIライブラリ**: [Material-UI (MUI)](https://mui.com/)
  - 一貫性のあるデザインとコンポーネントの豊富さ。
- **状態管理**: ReactのコンテキストAPIまたは[Redux Toolkit](https://redux-toolkit.js.org/)
  - 複雑な状態管理が必要な場合にReduxを検討。
- **ルーティング**: [React Router](https://reactrouter.com/)
  - クライアントサイドのルーティング管理。
- **タイマー機能**: JavaScriptの`setInterval`や`setTimeout`、必要に応じて専用ライブラリ（例: [react-timer-hook](https://github.com/amrlabib/react-timer-hook)）
- **多言語対応ライブラリ**: [react-i18next](https://react.i18next.com/)
  - アプリケーションの多言語対応を容易に。

### 5.2 バックエンド
- **フレームワーク**: [Hono](https://hono.dev/)（軽量なTypeScript向けのWebフレームワーク）
  - 高パフォーマンスで低レイテンシのAPIサーバー構築。
- **API設計**: RESTful API
  - フロントエンドとの明確な分離とスケーラビリティ。
- **認証・DB**: [Firebase](https://firebase.google.com/)
  - **Authentication**: Firebase Authentication（Googleログインを含む）
  - **Database**: Firebase Firestore（NoSQLデータベース）
  - **Hosting**: Cloudflare Workersを使用してHonoアプリをホスト。

### 5.3 インフラ
- **ホスティング**: [Cloudflare](https://www.cloudflare.com/)
  - HonoをホストするためにCloudflare Workersを利用。
  - 高速なコンテンツ配信とDDoS保護。
- **CDN**: CloudflareのグローバルCDNを活用。
- **ドメイン管理**: Cloudflareを通じてドメインを管理し、SSL/TLS証明書を自動取得・更新。

### 5.4 テスト
- **ユニットテスト**: [Jest](https://jestjs.io/)
  - フロントエンドおよびバックエンドのユニットテスト。
- **統合テスト**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - コンポーネントの統合テスト。
- **エンドツーエンド（E2E）テスト**（必要に応じて）: [Cypress](https://www.cypress.io/) など。

### 5.5 その他のツール
- **バージョン管理**: [Git](https://git-scm.com/)（GitHub, GitLab, Bitbucketなどのリポジトリサービス）
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) などのCI/CDツールを使用して自動テストとデプロイを設定。
- **コードフォーマッター**: [Prettier](https://prettier.io/) でコードの一貫性を維持。
- **リンター**: [ESLint](https://eslint.org/) でコード品質を確保。

---

## 6. 実装のステップ

### 6.1 プロジェクトのセットアップ
1. **フロントエンド**
   - React + TypeScriptプロジェクトの初期化（例: [Vite](https://vitejs.dev/) を使用）。
   - MUIのインストールと基本的なテーマ設定。
   - React Routerの設定。
   - react-i18nextの設定と基本的な多言語対応の実装。

2. **バックエンド**
   - Honoプロジェクトの初期化。
   - Firebaseプロジェクトの作成と設定。
   - Cloudflare Workersへのデプロイ設定。

3. **統合**
   - フロントエンドとバックエンドのAPIエンドポイントの接続。
   - Firebase Authenticationの設定とフロントエンドへの実装。

### 6.2 基本機能の実装
1. **ユーザー認証**
   - Firebase Authenticationを用いたGoogleログインの実装。
   - ログイン状態の管理とUIの更新。

2. **レシピ管理**
   - レシピのCRUD（作成、読み取り、更新、削除）機能の実装。
   - Firestoreとのデータ連携。
   - レシピ作成時にタイトルと説明文を入力するフォームの実装。

3. **レシピ再生機能**
   - タイマーとアクションの管理ロジックの実装。
   - UI上でのリアルタイムなアクション表示。

4. **検索・フィルター機能**
   - レシピ一覧の表示とフィルタリング機能の実装。

5. **多言語対応**
   - react-i18nextを用いた多言語対応の実装。
   - 各UIコンポーネントのテキストをローカライズ。

### 6.3 高度な機能の実装
1. **お気に入り機能**
   - ユーザーがお気に入りのレシピを保存できる機能。

### 6.4 テストとデプロイ
1. **テスト**
   - ユニットテストと統合テストの作成。
   - CI/CDパイプラインでの自動テスト実行設定。

2. **デプロイ**
   - Cloudflare Workersへのバックエンドデプロイ。
   - フロントエンドのCloudflare Pagesまたは他のホスティングサービスへのデプロイ。
   - ドメイン設定とSSL/TLSの確認。

---

## 7. 技術的な考慮事項

### 7.1 HonoとCloudflare Workersの統合
- HonoはCloudflare Workers上で高いパフォーマンスを発揮しますが、デプロイ時にはCloudflareのKVストアやDurable Objectsなどの特定のサービスとの連携も検討してください。
- ローカル開発環境でCloudflare Workersを模擬するために、[Wrangler](https://developers.cloudflare.com/workers/tooling/wrangler/)を使用すると便利です。

### 7.2 Firebaseのセキュリティルール
- Firestoreのセキュリティルールを慎重に設定し、ユーザーが自分のデータのみアクセス・操作できるようにします。
- 例: ユーザーは自分の`recipes`コレクションにのみ読み書きが可能。

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recipes/{recipeId} {
      allow read: if request.auth != null && (resource.data.isPublic == true || request.auth.uid == resource.data.userId);
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}

