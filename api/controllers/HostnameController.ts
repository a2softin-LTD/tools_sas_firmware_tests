import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiBuilder } from "../builder/ApiBuilder";
import * as process from "process";

export class HostnameController {

    static async getHostname(
        env: string,
        request: APIRequestContext,
        serialNumber: string | number,
        params?: Record<string, string | number | boolean>
    ): Promise<APIResponse> {
        return await ApiBuilder.sendPostRequest(
            request,
            process.env[env + "_ENV_URL"],
            `/panelServer/discover/api1/dns/${serialNumber}`,
            params
        )
    }
}