import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

for (let scenario of [
  "success",
  "missing",
  "invalid",
  "transport-error",
  "graphql-error",
]) {
  test(`Navigation endpoint and server fallback: ${scenario}`, () => {
    execFileSync(
      process.execPath,
      [
        fileURLToPath(
          new URL("./fixtures/shopify-navigation.mjs", import.meta.url),
        ),
        scenario,
      ],
      { stdio: "pipe" },
    );
  });
}
