import { convert } from "@opendataloader/pdf";
import {
  buildUsageMessage,
  ensureInputPathsExist,
  parseCliArguments,
} from "./cli.js";
import { ensureJavaAvailable } from "./java.js";

async function main(): Promise<void> {
  try {
    const cliOptions = parseCliArguments(process.argv.slice(2));

    await ensureJavaAvailable();
    await ensureInputPathsExist(cliOptions.inputPaths);

    const result = await convert(cliOptions.inputPaths, {
      outputDir: cliOptions.outputDir,
      format: cliOptions.format,
      hybrid: cliOptions.hybrid,
      hybridMode: cliOptions.hybridMode,
      hybridUrl: cliOptions.hybridUrl,
    });

    process.stdout.write(`${result}\n`);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "不明なエラーが発生しました。";

    process.stderr.write(`${message}\n`);

    if (!message.includes("使い方:")) {
      process.stderr.write(`${buildUsageMessage()}\n`);
    }

    process.exitCode = 1;
  }
}

void main();
