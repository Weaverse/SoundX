import { WeaversePage } from "@/lib/weaverse/page";
import {
  loadWeaverseHomePage,
  weaverseProjectId,
} from "@/lib/weaverse/server";
import { headers } from "next/headers";
import { Suspense } from "react";

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function HomeContent({ searchParams }: HomePageProps) {
  const projectId = weaverseProjectId();

  if (!projectId) {
    return <p>Chưa cấu hình Weaverse project cho Tech.</p>;
  }

  const requestHeaders = await headers();
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    for (const entry of Array.isArray(value) ? value : [value]) {
      if (entry !== undefined) query.append(key, entry);
    }
  }

  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const data = await loadWeaverseHomePage({
    headers: new Headers(Object.fromEntries(requestHeaders.entries())),
    pathname: "/",
    pageType: "INDEX",
    searchParams: query,
    url: host ? `${protocol}://${host}/?${query}` : undefined,
    i18n: { country: "US", language: "EN", locale: "en-US", label: "United States", pathPrefix: "" },
  });

  if (!data) {
    return <p>Chưa tải được nội dung trang chủ từ Weaverse.</p>;
  }

  return (
    <WeaversePage
      data={data}
      projectId={projectId}
    />
  );
}

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <Suspense fallback={<p>Đang tải trang chủ…</p>}>
      <HomeContent searchParams={searchParams} />
    </Suspense>
  );
}