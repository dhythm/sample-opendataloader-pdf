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
      ]),
    ).toEqual({
      inputPaths: ["./samples/first.pdf", "./samples/second.pdf"],
      outputDir: "./artifacts",
      format: ["markdown", "json"],
    });
  });

  it("引数がない場合は使い方を返す", () => {
    expect(() => parseCliArguments([])).toThrow(buildUsageMessage());
  });
});
