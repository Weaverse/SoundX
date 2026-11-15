import { mock } from "bun:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

let scenario = process.argv[2];
let settings = {};
mock.module("@weaverse/hydrogen/next", () => ({
  useThemeSettings: () => settings,
}));
let { default: ThemeStyles } = await import(
  "../../src/lib/weaverse/theme-styles.tsx"
);
let render = () => renderToStaticMarkup(createElement(ThemeStyles));
if (scenario === "defaults") {
  let { colorSettings } = await import(
    "../../src/lib/weaverse/settings/colors.ts"
  );
  let { layoutSettings } = await import(
    "../../src/lib/weaverse/settings/layout.ts"
  );
  let { buttonSettings } = await import(
    "../../src/lib/weaverse/settings/button.ts"
  );
  let { typographySettings } = await import(
    "../../src/lib/weaverse/settings/typography.ts"
  );
  for (let group of [
    colorSettings,
    layoutSettings,
    buttonSettings,
    typographySettings,
  ]) {
    for (let input of group.inputs)
      if (input.name) settings[input.name] = input.defaultValue;
  }
  let html = render();
  assert.match(html, /--soundx-page-width: 1400px/);
  assert.match(html, /--soundx-button-radius: 16px/);
  assert.match(html, /--soundx-font-heading: var\(--font-inter\)/);
  assert.match(html, /--soundx-font-body: var\(--font-open-sans\)/);
  assert.match(html, /--soundx-font-ui: var\(--font-inter\)/);
  assert.equal(
    (html.match(/--soundx-(?!font-|page-width|button-radius)[a-z-]+:/g) ?? [])
      .length,
    32,
  );
} else if (scenario === "empty") {
  assert.equal(render(), "");
} else if (scenario === "invalid") {
  settings = {
    pageWidth: NaN,
    buttonRadius: Infinity,
    colorTextMain: "red;}body{display:none}",
    uiFont: "evil;font-family:bad",
  };
  assert.equal(render(), "");
} else if (scenario === "independent") {
  settings = {
    pageWidth: NaN,
    colorTextMain: "#123456",
    buttonRadius: 0,
    headingFont: "open-sans",
  };
  let html = render();
  assert.doesNotMatch(html, /--soundx-page-width/);
  assert.match(html, /--soundx-text-main: #123456/);
  assert.match(html, /--soundx-button-radius: 0px/);
  assert.match(html, /--soundx-font-heading: var\(--font-open-sans\)/);
} else if (scenario === "bounds") {
  settings = { pageWidth: 5000, buttonRadius: -5 };
  assert.match(render(), /--soundx-page-width: 2000px/);
  assert.match(render(), /--soundx-button-radius: 0px/);
  settings = { pageWidth: 100, buttonRadius: 100 };
  assert.match(render(), /--soundx-page-width: 1000px/);
  assert.match(render(), /--soundx-button-radius: 40px/);
}
