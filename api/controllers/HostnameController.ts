import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiBuilder } from "../builder/ApiBuilder";

// TODO
type AuthParams = {
    apiKey: string,
} | {
    bearerAuthToken: string
}

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

    static async sendGetRequest(
        request: APIRequestContext,
        endpoint: string,
        authParams: AuthParams,
        params?: Record<string, string | number | boolean>,
    ): Promise<APIResponse> {
        let headers: Record<string, string> = {
            "Content-Type": "application/json",
        }
        if (authParams["apiKey"]) {
            headers["X-Api-Key"] = authParams["apiKey"];
        }
        if (authParams["bearerAuthToken"]) {
            headers["X-Auth-Token"] = `Bearer ${authParams["bearerAuthToken"]}`;
        }
        return await request.get(process.env.API_URL + endpoint, {
            headers: headers,
            params: params,
        });
    }
}
