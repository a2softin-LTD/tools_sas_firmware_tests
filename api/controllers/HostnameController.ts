import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiBuilder } from "../builder/ApiBuilder";

export class HostnameController {

    static async getHostname(
        url: string,
        request: APIRequestContext,
        serialNumber: string | number,
        params?: Record<string, string | number | boolean>
    ): Promise<APIResponse> {
        return await ApiBuilder.sendPostRequest(
            request,
            url,
            `/panelServer/discover/api1/dns/${serialNumber}`,
            params
        )
    }
}