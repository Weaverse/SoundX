"use client"

import {
    createWeaverseNextClient,
    WeaverseNextProvider,
    WeaverseNextRenderer,
    type WeaverseNextLoaderData,
} from "@weaverse/next";

import { WEAVERSE_COMPONENTS } from "./components";
import { clientRequestContext } from "./request-context";

type WeaversePageProps = {
    data: WeaverseNextLoaderData;
    projectId: string,
}

export function WeaversePage({
    data,
    projectId,
}: WeaversePageProps) {
    const client = createWeaverseNextClient({ // nhận danh sách component Tech biết render
        components: WEAVERSE_COMPONENTS,
        projectId,
        requestContext: clientRequestContext(data)
    })

    return (
        <WeaverseNextProvider client={client}> {/* đưa client vào context -> renderer bên trong sử dụng */}
            <WeaverseNextRenderer data={data}></WeaverseNextRenderer>
        </WeaverseNextProvider>
    )
}