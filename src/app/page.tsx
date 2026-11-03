import { WeaversePage } from "@/lib/weaverse/page";
import {
  loadWeaverseHomePage,
  weaverseProjectId,
} from "@/lib/weaverse/server";

export default async function HomePage() {
  const projectId = weaverseProjectId();

  if (!projectId) {
    return <p>Chưa cấu hình Weaverse project cho Tech.</p>;
  }

  const data = await loadWeaverseHomePage();

  if (!data) {
    return <p>Chưa tải được nội dung trang chủ từ Weaverse.</p>;
  }

  return (
    <WeaversePage
      data={data}
      projectId={projectId}
      requestContext={undefined}
    />
  );
}