import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

test("Unconfigured shared layout defers time-dependent output under Suspense", () => {
  execFileSync(
    process.execPath,
    [fileURLToPath(new URL("./fixtures/theme-layout.mjs", import.meta.url))],
    { stdio: "pipe" },
  );
});
