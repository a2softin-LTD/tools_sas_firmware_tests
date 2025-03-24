import { APIResponse, expect, test } from "@playwright/test";
import { Auth } from "../../auth/Auth";
import { HostnameController } from "../../api/controllers/HostnameController";
import { WsHandler } from "../../src/services/WsHandler";
import { FIRMWARE_VERSION } from "../../ws/FirmwareVersionConfig";
import { ErrorDescriptions } from "../../src/utils/errors/Errors";
import { Timeouts } from "../../src/utils/timeout.util";
import { Updater } from "../../src/services/Updater";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import config from "../../playwright.config";
import {PAUSE_BETWEEN_REACTION_CREATION, TIMEOUT} from "../../utils/Constants";
import moment = require("moment");
import { getConfigurationFromFile } from "../../src/utils/getConfigurationFromFile";
import { SimpleUserModel } from "../../api/models/UserModel";

let JwtToken: string;
let insideGetHostnameData: string;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;
let ERROR: string = '';

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX (Single/Multiple device) - positive scenarios', () => {
    test('positive: Success upgrade device/devices', { tag: '@sas_upgrade_path' }, async ({ request }) => {
        // 1. Getting test user data
        const userData = getConfigurationFromFile();
        const USER: SimpleUserModel = userData.userData[0].user;
        const VERSIONS: string = userData.userData[0].versions.filter(Boolean).join(',');
        const DEVICES: number[] = userData.userData[0].deviceIdsHex.map(e => PanelConvertersUtil.serialToDec(e));

        for (const serialNumber of DEVICES) {
            // 2. Getting access token
            JwtToken = await Auth.getAccessToken(
                config.loginUrl,
                request,
                USER,
            );
            commandIndex++;

            // 3. Console vision
            console.log();
            console.log();
            console.log();
            console.log();
            console.log();
            console.log(`DEVICE_ID = ${serialNumber}`);
            console.log('****************************************************************************************************');
            console.log('****************************************************************************************************');
            console.log();
            console.log(`************************************** DeviceId -> ${serialNumber} *************************************`);
            console.log();
            console.log('****************************************************************************************************');
            console.log('****************************************************************************************************');

            // 4. Getting Hostname
            const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
                config.envUrl,
                request,
                serialNumber
            );
            expect(responseGetHostnameData.status()).toBe(200);

            insideGetHostnameData = await responseGetHostnameData.json();
            // @ts-ignore
            wsUrl = buildPanelWsUrl(insideGetHostnameData.result);
            wsInstance = new WsHandler(wsUrl, JwtToken);

            console.log(`Test started at ${moment().format('LTS')}`);
            // 5. [WSS] Connection and sending necessary commands to the device via web sockets
            try {
                await Timeouts.raceError(async () => {
                    const versions = FIRMWARE_VERSION(VERSIONS);
                    const newVersion = versions[0];
                    console.log();
                    console.log(`Starting an update to new version using the URL =  ${newVersion.config.url}`);

                    await Updater.update(wsInstance, serialNumber, newVersion);

                    const prevVersionList = versions.slice(1);
                    for (const version of prevVersionList) {
                        // Pause between tests
                        await new Promise((resolve, reject) => {
                            setTimeout(resolve, 5000);
                        });
                        console.log();
                        console.log(`Starting an update using the URL =  ${version.config.url}`);
                        await Updater.update(wsInstance, serialNumber, version);
                    }
                }, { awaitSeconds: TIMEOUT, errorCode: 999 });
            } catch (error) {
                const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
                console.log(ErrorDescriptions[errorCode]);
                ERROR = ErrorDescriptions[errorCode];
            }

            // 6. Happy pass if there are no errors
            expect(ERROR).toEqual('');
            console.log(`Test finished at ${moment().format('LTS')}`);
        }
    });
});