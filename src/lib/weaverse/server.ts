import "server-only";

import { createWeaverseNextServerClient } from "@weaverse/hydrogen/next/server";
import { headers } from "next/headers";

import { buildSdkEnv } from "./env";
import { buildRequestContext, type RequestContextInput } from "./request-info";
import { WEAVERSE_SERVER_COMPONENTS } from "./server-components";
import { themeSchema } from "./theme-schema";

export function weaverseProjectId(): string | null {
  let projectId = process.env.WEAVERSE_PROJECT_ID?.trim();
  return projectId || null;
}

export type LoadWeaversePageOptions = Omit<RequestContextInput, "headers">;

export async function loadWeaversePage({
  type,
  handle,
  pathname,
  searchParams,
  locale,
}: LoadWeaversePageOptions) {
  try {
    let projectId = weaverseProjectId();

    if (!projectId) {
      return null;
    }

    let requestHeaders = await headers();

    let requestContext = buildRequestContext({
      headers: new Headers(requestHeaders),
      type,
      handle,
      pathname,
      searchParams,
      locale,
    });

    let client = createWeaverseNextServerClient({
      env: buildSdkEnv(process.env),
      projectId,
      requestContext,
      components: WEAVERSE_SERVER_COMPONENTS,
      themeSchema,
    });

    let data = await client.loadPage({
      type,
      handle,
      cache: {
        revalidate: 60,
        tags: ["weaverse:page"],
      },
    });
    let pageId = data?.page?.id;

    if (typeof pageId === "string" && pageId.startsWith("fallback_page_")) {
      return null;
    }
    return data ?? null;
  } catch {
    return null;
  }
}

export async function loadWeaverseThemeSettings(
  options: LoadWeaversePageOptions,
) {
  try {
    let projectId = weaverseProjectId();

    if (!projectId) {
      return null;
    }
    let requestHeader = await headers();

    let requestContext = buildRequestContext({
      headers: new Headers(requestHeader),
      type: options.type,
      handle: options.handle,
      pathname: options.pathname,
      searchParams: options.searchParams,
      locale: options.locale,
    });
    let client = createWeaverseNextServerClient({
      env: buildSdkEnv(process.env),
      projectId,
      requestContext,
      components: WEAVERSE_SERVER_COMPONENTS,
      themeSchema,
    });

    return (await client.loadThemeSettings()) ?? null;
  } catch {
    return null;
  }
}
