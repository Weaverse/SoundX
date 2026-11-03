"use client"

import {
    createWeaverseNextClient,
    WeaverseNextProvider,
    WeaverseNextRenderer,
    type WeaverseNextLoaderData,
} from "@weaverse/next";

import { WEAVERSE_COMPONENTS } from "./components";

type ClientOptions = NonNullable<
  Parameters<typeof createWeaverseNextClient>[0]
>;

type WeaversePageProps = {
    data: WeaverseNextLoaderData;
    projectId: string,
    requestContext:  ClientOptions["requestContext"];
}

export function WeaversePage({
    data,
    projectId,
    requestContext
}: WeaversePageProps) {
    const client = createWeaverseNextClient({ // nhận danh sách component Tech biết render
        components: WEAVERSE_COMPONENTS,
        projectId,
        requestContext
    })

    return (
        <WeaverseNextProvider client={client}> {/* đưa client vào context -> renderer bên trong sử dụng */}
            <WeaverseNextRenderer data={data}></WeaverseNextRenderer>
        </WeaverseNextProvider>
    )
}