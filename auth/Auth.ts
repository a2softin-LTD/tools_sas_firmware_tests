import { APIRequestContext, APIResponse } from "@playwright/test";
import { TestDataProvider } from "../utils/TestDataProvider";
import { ApiBuilder } from "../api/builder/ApiBuilder";
import { UserModel } from "../api/models/UserModel";
import { LoginModel } from "../api/models/LoginModel";
import { expect } from "@playwright/test";
import { md5 } from "js-md5";

export class Auth {

    static async getAccessToken(
        url: string,
        request: APIRequestContext,
        user: UserModel
    ): Promise<string> {
        let email: string;
        let password: string;

        // console.log(`process.env.EMAIL = ${process.env.EMAIL}`);
        // console.log(`process.env.PASSWORD_MD5 = ${process.env.PASSWORD_MD5}`);
        // console.log(`process.env.PASSWORD = ${process.env.PASSWORD}`);
        // console.log();
        // console.log();
        // console.log();

        if (!process.env.EMAIL) {
            email = user.email;
        } else {
            email = process.env.EMAIL;
        }

        if (!process.env.PASSWORD_MD5 && !process.env.PASSWORD) {
            // console.log('!process.env.PASSWORD_MD5 && !process.env.PASSWORD');
            password = user.passwordEncryptMD5;
        } else if (process.env.PASSWORD_MD5 && !process.env.PASSWORD) {
            // console.log('process.env.PASSWORD_MD5 && !process.env.PASSWORD');
            password = user.passwordEncryptMD5;
        } else if (!process.env.PASSWORD_MD5 && process.env.PASSWORD) {
            // console.log('!process.env.PASSWORD_MD5 && process.env.PASSWORD');
            // console.log(`process.env.PASSWORD = ${process.env.PASSWORD}`);
            password = md5(process.env.PASSWORD);
            // console.log(`user.password in MD5 = ${password}`);
        }

        const body: LoginModel = TestDataProvider.getUserData(email, password);

        // console.log(body);

        const response: APIResponse = await ApiBuilder.sendPostRequest(
            request,
            url,
            '/login',
            body
        )

        expect(response.status()).toBe(200);

        // console.log(await response.json());

        return (await response.json()).result.access_token;
    }

}