import { APIResponse, expect, test } from "@playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { WsHandler } from "../../src/services/WsHandler";
import {FIRMWARE_VERSION } from "../../ws/FirmwareVersionConfig";
import { ErrorDescriptions } from "../../src/utils/errors/Errors";
import { Timeouts } from "../../src/utils/timeout.util";
import { Updater } from "../../src/services/Updater";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import { FIRMWARE_VERSION_URLS } from "../../index";
import config from "../../playwright.config";

let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX - positive scenarios', () => {
    test.beforeAll(async ({request}) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            config.loginUrl,
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;

        // 2. Getting Hostname
        serialNumber = PanelConvertersUtil.serialToDec(TestDataProvider.DeviceIdWithEthernet);
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');
        console.log();
        console.log('************************************** DeviceId -> Ethernet ****************************************');
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
        wsUrl = buildPanelWsUrl(insideGetHostnameData.result)
        wsInstance = new WsHandler(wsUrl, JwtToken);

    });

    test('positive: Success downgrade a device to five last versions', { tag: '@downgrade' }, async () => {
        const TIMEOUT: number = 2400;
        const PAUSE: number = 300000;
        let ERROR: string = '';

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        try {
            await Timeouts.raceError(async () => {
                const versions = FIRMWARE_VERSION(FIRMWARE_VERSION_URLS);
                const newVersion = versions[0];

                console.log(newVersion.config.url);

                await Updater.update(wsInstance, serialNumber, newVersion);
                await new Promise((resolve, reject) => {
                    console.log("Pause. Waiting for " + PAUSE / 1000 + " sec before run next updating");
                    setTimeout(resolve, PAUSE);
                });

                const prevVersionList = versions.slice(1);//.reverse()
                for (const version of prevVersionList) {
                    await Updater.update(wsInstance, serialNumber, version);
                    await new Promise((resolve, reject) => {
                        console.log("Pause. Waiting for " + PAUSE / 1000 + " sec before run next updating");
                        setTimeout(resolve, PAUSE);
                    });
                }
            }, {awaitSeconds: TIMEOUT, errorCode: 999});
        } catch (error) {
            const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
            console.log(ErrorDescriptions[errorCode]);
            ERROR = ErrorDescriptions[errorCode];
        }

        // 4. Happy pass if there are no errors
        expect(ERROR).toEqual('');
    });

});

