# sample-opendataloader-pdf

`@opendataloader/pdf` を Node.js + TypeScript で試すための最小セットアップです。

`uv` を使った Python 環境も追加してあり、`opendataloader-pdf` の hybrid/OCR モードも試せます。

## 前提

- Node.js 20.19 以上
- `pnpm`
- Java 11 以上
- `uv`

ローカル環境では Node.js `v24.9.0` と Java `11.0.30` を確認済みです。

## セットアップ

```bash
pnpm install
uv sync
```

## 使い方

```bash
pnpm convert ./path/to/file.pdf
```

出力先や形式を変える場合:

```bash
pnpm convert ./path/to/file.pdf --output-dir ./output --format markdown,json
```

hybrid モードを使う場合:

```bash
pnpm hybrid:start
pnpm convert ./path/to/file.pdf --hybrid docling-fast
```

OCR 付き hybrid モードを使う場合:

```bash
pnpm hybrid:start:ocr
pnpm convert ./path/to/file.pdf --hybrid docling-fast --hybrid-mode full --hybrid-url http://127.0.0.1:5002
```

日本語OCRを使う場合:

```bash
uv --cache-dir ./.uv-cache run opendataloader-pdf-hybrid --port 5002 --force-ocr --ocr-lang ja,en --device cpu
pnpm convert './sample/戸籍謄本サンプル.pdf' --output-dir ./output/koseki-hybrid-ocr-ja --format markdown,json --hybrid docling-fast --hybrid-mode full --hybrid-url http://127.0.0.1:5002
```

既定値:

- `outputDir`: `output`
- `format`: `markdown,json`

Python 関連:

- `.python-version`: `3.11`
- 依存管理: [pyproject.toml](/Users/yuta.okada/local/dev/sample-opendataloader-pdf/pyproject.toml)
- 仮想環境: `.venv`

## 学び

- テキストPDFは通常の `pnpm convert` で処理できる
- 画像PDFは Java-only では本文抽出できず、`hybrid + OCR` を使う前提で考えたほうがよい
- 画像PDFで OCR を確実に使うには `--hybrid docling-fast --hybrid-mode full` が必要
- 日本語文書は `opendataloader-pdf-hybrid --force-ocr --ocr-lang ja,en` のほうが精度がよかった
- `hybrid` を付けるだけでは triage により Java 側へ寄ることがあり、その場合は OCR されない
- 初回の hybrid/OCR 実行ではモデルダウンロードが入るため時間がかかる

今回の戸籍サンプルで使った実コマンド:

```bash
uv --cache-dir ./.uv-cache run opendataloader-pdf-hybrid --port 5002 --force-ocr --ocr-lang ja,en --device cpu
pnpm convert './sample/戸籍謄本サンプル.pdf' --output-dir ./output/koseki-hybrid-ocr-ja --format markdown,json --hybrid docling-fast --hybrid-mode full --hybrid-url http://127.0.0.1:5002
```

出力結果:

- Markdown: [output/koseki-hybrid-ocr-ja/戸籍謄本サンプル.md](/Users/yuta.okada/local/dev/sample-opendataloader-pdf/output/koseki-hybrid-ocr-ja/戸籍謄本サンプル.md)
- JSON: [output/koseki-hybrid-ocr-ja/戸籍謄本サンプル.json](/Users/yuta.okada/local/dev/sample-opendataloader-pdf/output/koseki-hybrid-ocr-ja/戸籍謄本サンプル.json)

## 検証

```bash
pnpm check
pnpm test
uv --cache-dir ./.uv-cache run opendataloader-pdf-hybrid --help
```

Java が未導入の状態で `pnpm convert` を実行すると、案内メッセージで停止します。
