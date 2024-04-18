import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiBuilder {

  static async sendPostRequest(
    request: APIRequestContext,
    url: string,
    endpoint: string,
    body?: object,
    params?: Record<string, string | number | boolean>,
  ): Promise<APIResponse> {
    return await request.post(url + endpoint, {
      headers: {
        "Content-Type": "application/json"
      },
      data: body,
      params: params,
    });
  }

}
