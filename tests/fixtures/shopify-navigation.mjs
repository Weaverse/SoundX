import { mock } from "bun:test";
import assert from "node:assert/strict";

let scenario = process.argv[2];
let calls = 0;
let requestSeen;
mock.module("server-only", () => ({}));
mock.module("../../src/lib/storefront/shopify/env.ts", () => ({
  readShopifyEnv: () => ({ storeDomain: "example.myshopify.com" }),
}));
mock.module("../../src/lib/storefront/shopify/client.ts", () => ({
  createShopifyReadClient: (request) => {
    requestSeen = request;
    return {
      graphql: async () => {
        calls++;
        if (scenario === "transport-error") {
          throw new Error("synthetic-private-token");
        }
        if (scenario === "graphql-error") {
          return { errors: [{ message: "synthetic-private-token" }] };
        }
        return {
          data: {
            shop: { primaryDomain: { url: "https://shop.example.com" } },
            menu:
              scenario === "missing"
                ? null
                : {
                    items: [
                      {
                        id: "shop",
                        title: "Shop",
                        url: "https://example.myshopify.com/collections?sort=new#top",
                        items: [
                          {
                            id: "child",
                            title: "Child",
                            url: "https://shop.example.com/collections/audio",
                            items: [],
                          },
                          {
                            id: "bad",
                            title: "Bad",
                            url: "javascript:alert(1)",
                            items: [],
                          },
                        ],
                      },
                      {
                        id: "external",
                        title: "Social",
                        url: "https://social.example.com/brand",
                        items: [],
                      },
                      {
                        id: "email",
                        title: "Contact",
                        url: "mailto:test@example.com",
                        items: [],
                      },
                    ],
                  },
          },
        };
      },
    };
  },
}));
let { GET } = await import("../../src/app/api/navigation/route.ts");
let request = new Request(
  `https://store.example/api/navigation?handle=${scenario === "invalid" ? "%3Cinvalid%3E" : "footer-navigation"}`,
);
let response = await GET(request);
let body = await response.json();
assert.equal(response.headers.get("cache-control"), "no-store");
if (scenario === "invalid") {
  assert.equal(response.status, 400);
  assert.equal(calls, 0);
} else if (scenario.endsWith("error")) {
  assert.equal(response.status, 503);
  assert.equal(JSON.stringify(body).includes("synthetic-private-token"), false);
  let { readShopifyNavigationOrEmpty } = await import(
    "../../src/lib/storefront/shopify/navigation.ts"
  );
  let warnings = [];
  console.warn = (...args) => warnings.push(args.join(" "));
  assert.deepEqual(await readShopifyNavigationOrEmpty("footer-navigation"), []);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].includes("synthetic-private-token"), false);
} else {
  assert.equal(response.status, 200);
  assert.equal(requestSeen, request);
  if (scenario === "missing") {
    assert.deepEqual(body.items, []);
  } else {
    assert.equal(body.items[0].href, "/collections?sort=new#top");
    assert.deepEqual(body.items[0].children, [
      { id: "child", title: "Child", href: "/collections/audio", children: [] },
    ]);
    assert.equal(body.items[1].href, "https://social.example.com/brand");
    assert.equal(body.items[2].href, "mailto:test@example.com");
  }
}
