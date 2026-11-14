"use client";

import { useEffect, useState } from "react";

import type { NavigationItem } from "./shopify/navigation";

type NavigationState = {
  handle: string;
  items: NavigationItem[];
};

/** Refresh menu data when Studio changes a handle; reuse SSR data otherwise. */
export function useNavigation(
  handle: string,
  initialHandle: string,
  initialItems: NavigationItem[],
) {
  let [resolved, setResolved] = useState<NavigationState | null>(null);

  useEffect(() => {
    if (handle === initialHandle) return;

    let controller = new AbortController();
    let active = true;

    async function load() {
      try {
        let response = await fetch(
          `/api/navigation?handle=${encodeURIComponent(handle)}`,
          { signal: controller.signal, cache: "no-store" },
        );
        if (!response.ok) throw new Error("Navigation unavailable");
        let data: { items: NavigationItem[] } = await response.json();
        if (active) setResolved({ handle, items: data.items });
      } catch {
        if (active) {
          setResolved({ handle, items: [] });
          console.warn("Could not refresh Shopify navigation.");
        }
      }
    }

    void load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [handle, initialHandle]);

  if (handle === initialHandle) return initialItems;
  // Never display a previous handle's links while a newer request is pending.
  return resolved?.handle === handle ? resolved.items : [];
}
