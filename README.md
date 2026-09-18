# BT-A1000 PWA Compatibility Test

BT-A1000端末におけるPWA（Progressive Web App）関連機能の対応状況を確認するための、ブラウザ互換性テストツールです。

## 概要

本ツールは、ブラウザ上で以下のPWA関連APIが正常に動作するかを自動チェックし、結果を画面上に一覧表示します。各項目は OK（緑）/ NG（赤）/ 警告（オレンジ）で色分けされます。

## チェック項目

| 項目 | 内容 |
|---|---|
| Secure Context | `window.isSecureContext` によるセキュアコンテキスト判定（HTTPS必須） |
| Service Worker API | `navigator.serviceWorker` の存在確認 |
| Cache API | Cache Storageへの書き込み・読み込みテスト |
| IndexedDB | データベースの作成、書き込み、読み込みテスト |
| LocalStorage | `localStorage` への書き込み・読み込みテスト |
| Fetch API | `fetch` の存在確認 |
| Promise | `Promise` の存在確認 |
| WebSocket | `WebSocket` の存在確認 |
| Service Worker Registration | `sw.js` の実際の登録・準備完了確認 |

また、画面上部には `navigator.userAgent` と現在のURLを表示し、実行環境の特定に利用できます。

## ファイル構成

```
.
├── index.html   # テスト画面本体（UI・各種チェックロジック）
└── sw.js        # テスト用Service Worker（キャッシュ優先戦略）
```

## sw.js の動作

- **install時**：`bt-a1000-pwa-test-v1` という名前でキャッシュを作成し、`./` と `./index.html` をプリキャッシュ
- **activate時**：`clients.claim()` によって即座に制御下のページを掌握
- **fetch時**：キャッシュ優先（Cache First）戦略。キャッシュにヒットすればそれを返し、なければネットワークから取得

## 使い方

1. `index.html` と `sw.js` を同一ディレクトリに配置し、HTTPS環境（またはlocalhost）でホスティングする
2. `index.html` にブラウザでアクセスする
3. 各チェック項目の結果を確認する

> Service Workerの登録には Secure Context（HTTPS または localhost）が必須です。

## 動作要件

- モダンブラウザ（Service Worker / Cache API / IndexedDB 対応）
- HTTPS環境（またはlocalhost）