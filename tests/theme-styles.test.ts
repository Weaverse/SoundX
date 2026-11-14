import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

for (let scenario of [
  "defaults",
  "empty",
  "invalid",
  "independent",
  "bounds",
]) {
  test(`Theme appearance CSS: ${scenario}`, () => {
    execFileSync(
      process.execPath,
      [
        fileURLToPath(new URL("./fixtures/theme-styles.mjs", import.meta.url)),
        scenario,
      ],
      { stdio: "pipe" },
    );
  });
}
