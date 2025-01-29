import { APIResponse, expect, test } from "@playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { WsHandler } from "../../src/services/WsHandler";
import { ErrorDescriptions } from "../../src/utils/errors/Errors";
import { Timeouts } from "../../src/utils/timeout.util";
import { Updater } from "../../src/services/Updater";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import { DEVICE_SAS, FIRMWARE_VERSION_URLS } from "../../index";
import { FIRMWARE_VERSION, IFirmwareVersionView } from "../../ws/FirmwareVersionConfig";
import config from "../../playwright.config";
import { PAUSE, TIMEOUT } from "../../utils/Constants";
import moment = require("moment");

let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;
let ERROR: string = '';

test.describe('[SAS][WS] Automate firmware upgrade/downgrade testing - positive scenarios', () => {
    test.beforeAll(async ({ request }) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            config.loginUrl,
            request,
            TestDataProvider.SimpleUser,
        );
        commandIndex++;

        // 2. Getting Hostname
        console.log(`DEVICE_ID = ${DEVICE_SAS}`);
        serialNumber = PanelConvertersUtil.serialToDec(DEVICE_SAS);

        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');
        console.log();
        console.log(`************************************** DeviceId -> ${DEVICE_SAS} *********************************`);
        console.log();
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');

        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            config.envUrl,
            request,
            serialNumber,
        );
        expect(responseGetHostnameData.status()).toBe(200);

        insideGetHostnameData = await responseGetHostnameData.json();
        wsUrl = buildPanelWsUrl(insideGetHostnameData.result)
        wsInstance = new WsHandler(wsUrl, JwtToken);

    });

    test('positive: Success downgrade a device to five last versions', { tag: '@sas_upgrade_downgrade' }, async () => {
        console.log(`Test started at ${moment().format('LTS')}`);
        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        try {
            await Timeouts.raceError(async () => {
                const versions = FIRMWARE_VERSION(FIRMWARE_VERSION_URLS);
                const newVersion = versions[0];
                console.log(`Starting an update using the URL =  ${newVersion.config.url}`);

                await Updater.update(wsInstance, serialNumber, newVersion);

                const prevVersionList: IFirmwareVersionView[] = versions.slice(1);//.reverse()
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

