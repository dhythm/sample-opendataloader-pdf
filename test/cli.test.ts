import { describe, expect, it } from "vitest";

import { buildUsageMessage, parseCliArguments } from "../src/cli.js";

describe("parseCliArguments", () => {
  it("入力ファイルとオプションを解釈できる", () => {
    expect(
      parseCliArguments([
        "./samples/first.pdf",
        "./samples/second.pdf",
        "--output-dir",
        "./artifacts",
        "--format",
        "markdown,json",
        "--hybrid",
        "docling-fast",
        "--hybrid-mode",
        "full",
        "--hybrid-url",
        "http://127.0.0.1:5002",
      ]),
    ).toEqual({
      inputPaths: ["./samples/first.pdf", "./samples/second.pdf"],
      outputDir: "./artifacts",
      format: ["markdown", "json"],
      hybrid: "docling-fast",
      hybridMode: "full",
      hybridUrl: "http://127.0.0.1:5002",
    });
  });

  it("引数がない場合は使い方を返す", () => {
    expect(() => parseCliArguments([])).toThrow(buildUsageMessage());
  });
});
