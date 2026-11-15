import { mock } from "bun:test";
import assert from "node:assert/strict";
import { Suspense } from "react";

function StubComponent() {
  return null;
}

let dynamic = false;
let menus = 0;
mock.module("next/cache", () => ({
  io: async () => {
    dynamic = true;
  },
}));
mock.module("next/font/local", () => ({
  default: () => ({ variable: "test-font" }),
}));
mock.module("@weaverse/hydrogen/next", () => ({
  WeaverseNextStudioConnect: StubComponent,
}));
mock.module("../../src/lib/weaverse/server.ts", () => ({
  loadWeaverseThemeSettings: async () => {
    assert.equal(
      dynamic,
      true,
      "The boundary must precede even an unconfigured theme loader",
    );
    return null;
  },
}));
mock.module("../../src/lib/storefront/shopify/navigation.ts", () => ({
  readShopifyNavigationOrEmpty: async () => {
    assert.equal(dynamic, true);
    menus++;
    return [];
  },
}));
for (let path of [
  "../../src/components/announcement-bar/connected.tsx",
  "../../src/components/header/connected.tsx",
  "../../src/components/footer/connected.tsx",
])
  mock.module(path, () => ({ default: StubComponent }));
mock.module("../../src/lib/weaverse/root.tsx", () => ({
  WeaverseRoot: StubComponent,
}));

let { default: RootLayout } = await import("../../src/app/layout.tsx");
let html = RootLayout({ children: "page" });
let body = html.props.children;
let suspense = body.props.children.find((element) => element.type === Suspense);
assert.ok(suspense, "Request-time layout remains under Suspense");
let themeLayout = suspense.props.children;
let result = await themeLayout.type(themeLayout.props);
let footer = result.props.children.at(-1);
assert.equal(dynamic, true);
assert.equal(menus, 3);
assert.equal(footer.props.copyrightYear, new Date().getFullYear());
assert.deepEqual(footer.props.legalMenu, []);
