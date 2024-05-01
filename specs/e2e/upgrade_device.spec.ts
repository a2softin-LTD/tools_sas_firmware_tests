import { APIResponse } from "@playwright/test";
import { expect, test } from "playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { Parsers } from "../../utils/Parsers";
import { WS } from "../../utils/path";
import { WsMethod } from "../../ws/WsMethod";
import { WsHandler } from "../../ws/WsHandler";
import { firmwareVersionConfig } from "../../ws/FirmwareVersionConfig";
import { FirmwareVersionType } from "../../ws/FirmwareVersionType";
import { environmentConfig } from "../../ws/EnvironmentConfig";
import { Environments } from "../../ws/Environments";
import {ErrorHandler} from "../../ws/ErrorHandler";

let serialNumber: number;
let JwtToken: string;
let commandIndex: number = 0;

test.describe('API Login tests', () => {
    const env = environmentConfig.get(Environments.QA);
    const config  = firmwareVersionConfig.get(FirmwareVersionType.OLD);

    test.beforeAll(async ({ request }) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            env.loginUrl,
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;
    });

    test('Success upgrade a device', async ({ request }) =>  {
        // 2. Get Hostname
        serialNumber = await Parsers.serialToDec(TestDataProvider.DeviceId);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] 1. Connection to the device
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result) + ":" + WS["PORT"];
        let ERROR = "";

        await(async () => {
            const wsInstance = new WsHandler(wsUrl, JwtToken);
            try {
                await wsInstance.createSocket(serialNumber);
                await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, config.url);
                await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
                await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", config.versionCode);
            } catch (error) {
                if (error) {
                    ERROR = ErrorHandler.handleError(error)
                    console.log(ERROR);
                }
            }
            wsInstance.close()
        })();
        expect(ERROR).toEqual("");
    });

});
