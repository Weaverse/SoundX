import { createWeaverseNextServerClient } from "@weaverse/next/server";
import type { WeaverseNextComponent, WeaverseNextRequestContext } from "@weaverse/next";
import * as TextBlock from "@/sections/text-block";


export function weaverseProjectId(): string | null {
  const projectId = process.env.WEAVERSE_PROJECT_ID?.trim();
  return projectId || null;
}

export function loadWeaverseHomePage(requestContext: WeaverseNextRequestContext) {
  const projectId = weaverseProjectId();

  if(!projectId) {
    return null
  }

  const client = createWeaverseNextServerClient({
    projectId,
    requestContext,
    components: [
      {
        default: TextBlock.default as WeaverseNextComponent["default"],
        schema: TextBlock.schema,
      },
],
  })

  return client.loadPage({type:'INDEX'})
}

