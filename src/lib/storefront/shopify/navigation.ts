import "server-only";

import { gql } from "@shopify/hydrogen";

import { createShopifyReadClient } from "./client";
import { readShopifyEnv } from "./env";

const NAVIGATION_QUERY = gql(`
  query StorefrontNavigation($handle: String!) {
    shop {
      primaryDomain {
        url
      }
    }
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
          items {
            id
            title
            url
          }
        }
      }
    }
  }
`);

export type NavigationItem = {
  id: string;
  title: string;
  href: string;
  children: NavigationItem[];
};

type RawMenuItem = {
  id: string;
  title: string;
  url?: string | null;
  items?: RawMenuItem[];
};

function normalizeHref(
  value: string | null | undefined,
  storeHosts: Set<string>,
  primaryOrigin: string,
): string | null {
  if (!value?.trim()) {
    return null;
  }

  try {
    let url = new URL(value, primaryOrigin);

    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      return url.href;
    }

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    if (storeHosts.has(url.host)) {
      return `${url.pathname}${url.search}${url.hash}`;
    }

    return url.href;
  } catch {
    return null;
  }
}

function normalizeItems(
  items: RawMenuItem[],
  storeHosts: Set<string>,
  primaryOrigin: string,
): NavigationItem[] {
  let navigation: NavigationItem[] = [];

  for (let item of items) {
    let href = normalizeHref(item.url, storeHosts, primaryOrigin);

    if (!href) {
      continue;
    }

    navigation.push({
      id: item.id,
      title: item.title,
      href,
      children: normalizeItems(item.items ?? [], storeHosts, primaryOrigin),
    });
  }

  return navigation;
}

export async function readShopifyNavigation(
  handle: string,
  request?: Request,
): Promise<NavigationItem[] | null> {
  let menuHandle = handle.trim();

  if (!menuHandle) {
    return null;
  }

  let client = createShopifyReadClient(request);

  let { data, errors } = await client.graphql(NAVIGATION_QUERY, {
    variables: {
      handle: menuHandle,
    },
  });

  if (errors?.length || !data) {
    throw new Error("Could not read Shopify navigation.");
  }

  if (!data.menu) {
    return null;
  }

  let primaryDomain = new URL(data.shop.primaryDomain.url);
  let { storeDomain } = readShopifyEnv();

  let storeHosts = new Set([storeDomain, primaryDomain.host]);

  return normalizeItems(data.menu.items, storeHosts, primaryDomain.origin);
}

/** A menu outage must not prevent the rest of the shared layout rendering. */
export async function readShopifyNavigationOrEmpty(handle: string) {
  try {
    return (await readShopifyNavigation(handle)) ?? [];
  } catch {
    console.warn("Could not load a Shopify navigation menu.");
    return [];
  }
}
