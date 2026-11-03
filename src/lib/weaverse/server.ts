import { createWeaverseNextServerClient } from "@weaverse/next/server";
import type { WeaverseNextComponent } from "@weaverse/next";
import * as TextBlock from "@/sections/text-block";


export function weaverseProjectId(): string | null {
  const projectId = process.env.WEAVERSE_PROJECT_ID?.trim();
  return projectId || null;
}

export function loadWeaverseHomePage() {
  const projectId = weaverseProjectId();

  if(!projectId) {
    return null
  }

  const client = createWeaverseNextServerClient({
    projectId,
    components: [
      {
        default: TextBlock.default as WeaverseNextComponent["default"],
        schema: TextBlock.schema,
      },
],
  })

  return client.loadPage({type:'INDEX'})
}

