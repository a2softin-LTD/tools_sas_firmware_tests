import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiBuilder } from "../builder/ApiBuilder";
import * as process from "process";

export class HostnameController {

    static async getHostname(
        request: APIRequestContext,
        serialNumber: string | number,
        params?: Record<string, string | number | boolean>
    ): Promise<APIResponse> {
        return await ApiBuilder.sendPostRequest(
            request,
            process.env.ENV_URL,
            `/panelServer/discover/api1/dns/${serialNumber}`,
            params
        )
    }
}