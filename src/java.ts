import { spawn } from "node:child_process";

export async function ensureJavaAvailable(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const childProcess = spawn("java", ["-version"]);

    childProcess.on("error", () => {
      reject(
        new Error(
          "Java が見つかりません。OpenDataLoader PDF の実行には JDK 11 以上が必要です。",
        ),
      );
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          "Java の起動に失敗しました。OpenDataLoader PDF の実行には JDK 11 以上が必要です。",
        ),
      );
    });
  });
}
