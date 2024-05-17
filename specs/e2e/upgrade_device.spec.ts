import { APIResponse } from "@playwright/test";
import { expect, test } from "playwright/test";
import {Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { Parsers } from "../../utils/Parsers";
import { WS } from "../../utils/path";
import { WsMethod } from "../../ws/WsMethod";
import { WsHandler } from "../../ws/WsHandler";
import { firmwareVersionConfig, getAnotherVersionConfig } from "../../ws/FirmwareVersionConfig";
import { FirmwareVersionType } from "../../ws/FirmwareVersionType";
import { environmentConfig } from "../../ws/EnvironmentConfig";
import { Environments } from "../../ws/Environments";
import { ErrorHandler } from "../../ws/ErrorHandler";
import { ErrorDescriptions } from "../../ws/Errors";
import { faker } from "@faker-js/faker";
import { Timeouts } from "../../ws/Timeouts";

let serialNumber: number;
let JwtToken: string;
let commandIndex: number = 0;

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX - positive scenarios', () => {
    const env = environmentConfig.get(Environments.QA);

    test.beforeAll(async ({request}) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            env.loginUrl,
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;
    });

    test('positive: Success upgrade a device', async ({request}) => {
        // 2. Getting Hostname
        serialNumber = await Parsers.serialToDec(TestDataProvider.DeviceId);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result) + ":" + WS["PORT"];
        let ERROR: string = "";

        const wsInstance = new WsHandler(wsUrl, JwtToken);
        try {
            const initialData = await wsInstance.createSocket(serialNumber);
            const allowedVersionConfig = getAnotherVersionConfig(initialData["create"]['panelSettings']['versionCode'])
            console.log(`Install version: ${allowedVersionConfig.versionType}`)

            await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, allowedVersionConfig.config.url);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", allowedVersionConfig.config.versionCode);
        } catch (error) {
            if (error) {
                ERROR = ErrorHandler.handleError(error);
                console.log(ERROR);
            }
        }
        wsInstance.close();

        expect(ERROR).toEqual("");
    });

});

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX - negative scenarios', () => {
    const env = environmentConfig.get(Environments.DEV);

    test.beforeAll(async ({request}) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            env.loginUrl,
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;
    });

    test('negative: incorrect Device id - Error: 311', async ({request}) => {
        const config = firmwareVersionConfig.get(FirmwareVersionType.NEW);
        // 2. Getting Hostname
        serialNumber = 10000000000;
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result) + ":" + WS["PORT"];
        let ERROR: string = "";

        const wsInstance = new WsHandler(wsUrl, JwtToken);
        try {
            await wsInstance.createSocket(serialNumber);
            await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, config.url);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", config.versionCode);
        } catch (error) {
            if (error) {
                ERROR = ErrorHandler.handleError(error);
                console.log(ERROR);
            }
        }
        wsInstance.close();

        expect(ERROR).toEqual(ErrorDescriptions["311"]);
    });

    test('negative: non-exist firmware FTP URL - Error: 999', async ({request}) => {
        const TIMEOUT: number = 10;
        const config = firmwareVersionConfig.get(FirmwareVersionType.FAKE);
        // 2. Getting Hostname
        serialNumber = await Parsers.serialToDec(TestDataProvider.DeviceId);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result) + ":" + WS["PORT"];
        let ERROR: string = "";

        const wsInstance = new WsHandler(wsUrl, JwtToken);
        try {
            await Timeouts.race_error(async () => {
                    await wsInstance.createSocket(serialNumber);
                    await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, config.url);
                    await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
                    await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", config.versionCode);
                    return true;
                }, { awaitSeconds: TIMEOUT, errorCode: 999 });
        } catch (error) {
            if (error) {
                ERROR = ErrorHandler.handleError(error);
                console.log(ErrorDescriptions["999"]);
            }
        }
        wsInstance.close();

        expect(ERROR).toEqual("Timeout was exceeded");
    });

    test.skip('negative: incorrect Access token - Error: 401', async ({request}) => {
        const config = firmwareVersionConfig.get(FirmwareVersionType.NEW);
        // 2. Getting Hostname
        serialNumber = await Parsers.serialToDec(TestDataProvider.DeviceId);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result) + ":" + WS["PORT"];
        let ERROR: string = "";

        let wsInstance: WsHandler;
        try {
            wsInstance = new WsHandler(wsUrl, faker.datatype.uuid());
            await wsInstance.createSocket(serialNumber);
            // await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, config.url);
            // await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
            // await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", config.versionCode);
            wsInstance.close();
        } catch (error) {
            if (error) {
                ERROR = ErrorHandler.handleError(error);
                console.log(ERROR);
            }
        }

        expect(ERROR).toEqual("");
    });

});
