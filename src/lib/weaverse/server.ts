import "server-only";
import { buildSdkEnv } from "./env";
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

  let sdkEnv = buildSdkEnv(process.env);

  let client = createWeaverseNextServerClient({
    env: sdkEnv,
    projectId,
    requestContext,
    components: WEAVERSE_SERVER_COMPONENTS,
  });

  return client.loadPage({ type: "INDEX" });
}