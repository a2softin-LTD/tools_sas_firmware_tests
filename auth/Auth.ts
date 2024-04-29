import { APIRequestContext, APIResponse } from "@playwright/test";
import { TestDataProvider } from "../utils/TestDataProvider";
import { ApiBuilder } from "../api/builder/ApiBuilder";
import { UserModel } from "../api/models/UserModel";
import { LoginModel } from "../api/models/LoginModel";
import * as process from "process";
import { expect } from "playwright/test";

/**
 * 
 */
export class Auth {

    static async getAccessToken(
        env: string,
        request: APIRequestContext,
        user: UserModel
    ): Promise<string> {
        const body: LoginModel = TestDataProvider.getUserData(user.email, user.passwordEncryptMD5);
        const response: APIResponse =await ApiBuilder.sendPostRequest(
            request,
            process.env[env + "_LOGIN_URL"],
            '/login',
            body
        )

        expect(response.status()).toBe(200);

        return (await response.json()).result.access_token;
    }

}