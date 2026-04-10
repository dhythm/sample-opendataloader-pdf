import { access } from "node:fs/promises";
import { constants } from "node:fs";

export type CliOptions = {
  inputPaths: string[];
  outputDir: string;
  format: string[];
  hybrid?: string;
  hybridMode?: string;
  hybridUrl?: string;
};

const DEFAULT_OUTPUT_DIR = "output";
const DEFAULT_FORMAT = ["markdown", "json"];

export function parseCliArguments(argv: string[]): CliOptions {
  const inputPaths: string[] = [];
  let outputDir = DEFAULT_OUTPUT_DIR;
  let format = DEFAULT_FORMAT;
  let hybrid: string | undefined;
  let hybridMode: string | undefined;
  let hybridUrl: string | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === "--output-dir") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        throw new Error("--output-dir には値が必要です。");
      }
      outputDir = nextValue;
      index += 1;
      continue;
    }

    if (value === "--format") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        throw new Error("--format には値が必要です。");
      }
      format = nextValue.split(",").map((item) => item.trim()).filter(Boolean);
      index += 1;
      continue;
    }

    if (value === "--hybrid") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        throw new Error("--hybrid には値が必要です。");
      }
      hybrid = nextValue;
      index += 1;
      continue;
    }

    if (value === "--hybrid-mode") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        throw new Error("--hybrid-mode には値が必要です。");
      }
      hybridMode = nextValue;
      index += 1;
      continue;
    }

    if (value === "--hybrid-url") {
      const nextValue = argv[index + 1];
      if (!nextValue) {
        throw new Error("--hybrid-url には値が必要です。");
      }
      hybridUrl = nextValue;
      index += 1;
      continue;
    }

    if (value.startsWith("--")) {
      throw new Error(`未対応のオプションです: ${value}`);
    }

    inputPaths.push(value);
  }

  if (inputPaths.length === 0) {
    throw new Error(buildUsageMessage());
  }

  return {
    inputPaths,
    outputDir,
    format,
    hybrid,
    hybridMode,
    hybridUrl,
  };
}

export async function ensureInputPathsExist(inputPaths: string[]): Promise<void> {
  await Promise.all(
    inputPaths.map(async (inputPath) => {
      await access(inputPath, constants.F_OK);
    }),
  );
}

export function buildUsageMessage(): string {
  return [
    "使い方: pnpm convert <pdf-path...> [--output-dir output] [--format markdown,json] [--hybrid docling-fast] [--hybrid-mode full] [--hybrid-url http://127.0.0.1:5002]",
    "例: pnpm convert ./samples/sample.pdf --output-dir ./output",
  ].join("\n");
}
