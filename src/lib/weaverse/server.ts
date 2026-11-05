import "server-only";

import type { WeaverseNextRequestContext } from "@weaverse/next";
import { createWeaverseNextServerClient } from "@weaverse/next/server";

import { WEAVERSE_SERVER_COMPONENTS } from "./server-components";

export function weaverseProjectId(): string | null {
  let projectId = process.env.WEAVERSE_PROJECT_ID?.trim();
  return projectId || null;
}

export function loadWeaverseHomePage(
  requestContext: WeaverseNextRequestContext,
) {
  let projectId = weaverseProjectId();

  if (!projectId) {
    return null;
  }

  let client = createWeaverseNextServerClient({
    projectId,
    requestContext,
    components: WEAVERSE_SERVER_COMPONENTS,
  });

  return client.loadPage({ type: "INDEX" });
}