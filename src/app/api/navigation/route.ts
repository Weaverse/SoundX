import { readShopifyNavigation } from "@/lib/storefront/shopify/navigation";

export async function GET(request: Request) {
  let handle = new URL(request.url).searchParams.get("handle")?.trim();
  let headers = { "Cache-Control": "no-store" };

  if (!handle || handle.length > 255 || !/^[a-z0-9-]+$/.test(handle)) {
    return Response.json(
      { error: "Invalid menu handle." },
      { status: 400, headers },
    );
  }

  try {
    let items = await readShopifyNavigation(handle, request);
    return Response.json({ items: items ?? [] }, { headers });
  } catch {
    // Never serialize SDK exceptions, configuration or credentials.
    return Response.json(
      { error: "Navigation is temporarily unavailable." },
      { status: 503, headers },
    );
  }
}
