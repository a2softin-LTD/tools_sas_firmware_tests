import { APIResponse, expect, test } from "@playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { WsHandler } from "../../src/services/WsHandler";
import { FIRMWARE_VERSION } from "../../ws/FirmwareVersionConfig";
import { ErrorDescriptions } from "../../src/utils/errors/Errors";
import { Timeouts } from "../../src/utils/timeout.util";
import { Updater } from "../../src/services/Updater";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import { FIRMWARE_VERSION_URLS, SEVERAL_DEVICES_SAS } from "../../index";
import config from "../../playwright.config";
import { PAUSE, TIMEOUT } from "../../utils/Constants";
import moment = require("moment");

let commandIndex: number = 0;
let ERROR: string = '';
let deviceHexIdIndex: number = 0;

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX (several devices) - positive scenarios', () => {
    test('positive: Success upgrade/downgrade several HUB devices', { tag: '@several_devices_up_down' }, async ({ request }) => {
        // 2. Getting Hostname
        // serialNumbers = PanelConvertersUtil.serialToDec(SEVERAL_DEVICES_SAS);
        const serialNumbers: number[] = SEVERAL_DEVICES_SAS.split(',').map(e => PanelConvertersUtil.serialToDec(e));

        for (const serialNumber of serialNumbers) {
            // 1. Getting access token
            const JwtToken = await Auth.getAccessToken(
                config.loginUrl,
                request,
                // TestDataProvider.SimpleUser
                TestDataProvider.SimpleUser,
            );

            commandIndex++;
            console.log(`DEVICE_ID = ${serialNumber}`);
            console.log();
            console.log();
            console.log();
            console.log();
            console.log();
            console.log('****************************************************************************************************');
            console.log('****************************************************************************************************');
            console.log();
            console.log(`*********************************** DeviceId -> ${SEVERAL_DEVICES_SAS.split(',')[deviceHexIdIndex]} **********************************`);
            console.log();
            console.log('****************************************************************************************************');
            console.log('****************************************************************************************************');

            deviceHexIdIndex++;
            const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
                config.envUrl,
                request,
                serialNumber
            );
            expect(responseGetHostnameData.status()).toBe(200);

            const insideGetHostnameData = await responseGetHostnameData.json();
            const wsUrl = buildPanelWsUrl(insideGetHostnameData.result)
            const wsInstance = new WsHandler(wsUrl, JwtToken);

            console.log(`Test started at ${moment().format('LTS')}`);
            // 3. [WSS] Connection and sending necessary commands to the device via web sockets
            try {
                await Timeouts.raceError(async () => {
                    const versions = FIRMWARE_VERSION(FIRMWARE_VERSION_URLS);
                    const newVersion = versions[0];
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
        }
    });
});

