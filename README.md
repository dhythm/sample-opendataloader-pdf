# sample-opendataloader-pdf

`@opendataloader/pdf` を Node.js + TypeScript で試すための最小セットアップです。

## 前提

- Node.js 20.19 以上
- `pnpm`
- Java 11 以上

ローカル環境では Node.js `v24.9.0` は確認済みですが、Java は未導入でした。

## セットアップ

```bash
pnpm install
```

## 使い方

```bash
pnpm convert ./path/to/file.pdf
```

出力先や形式を変える場合:

```bash
pnpm convert ./path/to/file.pdf --output-dir ./output --format markdown,json
```

既定値:

- `outputDir`: `output`
- `format`: `markdown,json`

## 検証

```bash
pnpm check
pnpm test
```

Java が未導入の状態で `pnpm convert` を実行すると、案内メッセージで停止します。
