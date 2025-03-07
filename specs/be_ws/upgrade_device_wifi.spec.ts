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
