import { APIResponse, expect, test } from "@playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { WsMethod } from "../../src/domain/constants/ws-connection/ws-commands";
import { WsHandler } from "../../src/services/WsHandler";
import { FIRMWARE_VERSION, firmwareVersionConfigB3 } from "../../ws/FirmwareVersionConfig";
import { FirmwareVersionType } from "../../src/domain/constants/firmware-version.types";
import { environmentConfig } from "../../ws/EnvironmentConfig";
import { Environments } from "../../src/domain/constants/environments";
import { ErrorHandler } from "../../src/utils/errors/ErrorHandler";
import { ErrorDescriptions } from "../../src/utils/errors/Errors";
import { Timeouts } from "../../src/utils/timeout.util";
import { Updater } from "../../src/services/Updater";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import { FIRMWARE_VERSION_URLS_ALL_HUBS } from "../../index";
import config from "../../playwright.config";
import {PAUSE, TIMEOUT} from "../../utils/Constants";
import moment = require("moment");

let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;
let ERROR: string = '';

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX with WiFi channel on the HUB - positive scenarios', () => {
    test.beforeAll(async ({request}) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            config.loginUrl,
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;

        // 2. Getting Hostname
        serialNumber = PanelConvertersUtil.serialToDec(TestDataProvider.DeviceIdWithWiFi);

        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log(`DEVICE_ID = ${serialNumber}`);
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');
        console.log();
        console.log(`******************************* DeviceId -> WiFi -> ${TestDataProvider.DeviceIdWithWiFi} ******************************`);
        console.log();
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');

        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            config.envUrl,
            request,
            serialNumber
        );
        expect(responseGetHostnameData.status()).toBe(200);

        insideGetHostnameData = await responseGetHostnameData.json();
        wsUrl = buildPanelWsUrl(insideGetHostnameData.result);
        wsInstance = new WsHandler(wsUrl, JwtToken);

    });

    test('positive: Success upgrade a device', { tag: '@upgrade' }, async () => {
        console.log(`Test started at ${moment().format('LTS')}`);
        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        try {   
            await Timeouts.raceError(async () => {
                const versions = FIRMWARE_VERSION(FIRMWARE_VERSION_URLS_ALL_HUBS);
                const newVersion = versions[0];
                console.log();
                console.log(`Starting an update using the URL =  ${newVersion.config.url}`);

                await Updater.update(wsInstance, serialNumber, newVersion);

                const prevVersionList = versions.slice(1);//.reverse()
                for (const version of prevVersionList) {
                    await new Promise((resolve, reject) => {
                        console.log();
                        console.log("Updating. Waiting for " + (3 * PAUSE / 1000) + " sec");
                        console.log(`Current time is ${moment().format('LTS')}`);
                        console.log();
                        console.log();
                        setTimeout(resolve, 3 * PAUSE);
                    });
                    console.log(`Starting an update using the URL =  ${version.config.url}`);

                    await Updater.update(wsInstance, serialNumber, version);
                }
            }, {awaitSeconds: TIMEOUT, errorCode: 999});
        } catch (error) {
            const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
            console.log(ErrorDescriptions[errorCode]);
            ERROR = ErrorDescriptions[errorCode];
        }

        // 4. Happy pass if there are no errors
        expect(ERROR).toEqual('');
        await new Promise((resolve, reject) => {
            console.log();
            console.log("Updating. Waiting for " + (3 * PAUSE / 1000) + " sec");
            console.log(`Current time is ${moment().format('LTS')}`);
            console.log();
            console.log();
            setTimeout(resolve, 3 * PAUSE);
        });
        console.log(`Test finished at ${moment().format('LTS')}`);
    });

});

test.describe.skip('[MPX] Automate firmware upgrade/downgrade testing for MPX - negative scenarios', () => {
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

    test.skip('negative: incorrect Device id - Error: 311', {tag: '@no_upgrade'}, async ({request}) => {
        const config = firmwareVersionConfigB3.get(FirmwareVersionType.NEW);
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
        const wsUrl: string = buildPanelWsUrl(insideGetHostnameData.result);
        let ERROR: string = '';
        const TIMEOUT: number = 10;

        const wsInstance = new WsHandler(wsUrl, JwtToken);
        try {
            await Timeouts.raceError(async () => {

            }, {awaitSeconds: TIMEOUT, errorCode: 311});
            await wsInstance.createSocket(serialNumber);
            await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, config.url);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", config.versionCode);
        } catch (error) {
            wsInstance.close();
            ERROR = ErrorHandler.handleError(error);
            console.log(ERROR);
            expect(ERROR).toEqual(ErrorDescriptions["311"]);
        }
    });

    test.skip('negative: File Server Crashes - Error: 999', {tag: '@no_upgrade'}, async ({request}) => {
        const TIMEOUT: number = 10;
        const config = firmwareVersionConfigB3.get(FirmwareVersionType.FAKE);
        // 2. Getting Hostname
        serialNumber = PanelConvertersUtil.serialToDec(TestDataProvider.DeviceIdWithWiFi);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        const wsUrl: string = buildPanelWsUrl(insideGetHostnameData.result);
        let ERROR: string = '';

        const wsInstance = new WsHandler(wsUrl, JwtToken);
        try {
            await Timeouts.raceError(async () => {
                await wsInstance.createSocket(serialNumber);
                await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, config.url);
                await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
                await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", config.versionCode);
                return true;
            }, {awaitSeconds: TIMEOUT, errorCode: 999});
        } catch (error) {
            ERROR = ErrorHandler.handleError(error);
            console.log(ErrorDescriptions["999"]);
        }
        wsInstance.close();

        expect(ERROR).toEqual("Timeout was exceeded");
    });

    test.skip('negative: incorrect Access token - Error: 401', {tag: '@no_upgrade'}, async ({request}) => {
        const TIMEOUT: number = 60;
        const config = firmwareVersionConfigB3.get(FirmwareVersionType.FAKE);
        // 2. Getting Hostname
        serialNumber = PanelConvertersUtil.serialToDec(TestDataProvider.DeviceIdWithWiFi);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        const wsUrl: string = buildPanelWsUrl(insideGetHostnameData.result);
        let ERROR: string = '';

        try {
            const wsInstance = new WsHandler(wsUrl, (Math.random() + 1).toString(36).substring(7));
            await Timeouts.raceError(async () => {
                await wsInstance.createSocket(serialNumber);
                await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, config.url);
                await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
                await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", config.versionCode);
                return true;
            }, {awaitSeconds: TIMEOUT, errorCode: 999});
        } catch (error) {
            ERROR = ErrorHandler.handleError(error);
            console.log(ErrorDescriptions["401"]);
        }
        wsInstance.close();

        expect(ERROR).toEqual(ErrorDescriptions["401"]);
    });

});
