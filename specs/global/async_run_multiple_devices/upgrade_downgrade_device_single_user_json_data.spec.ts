import { APIRequestContext, APIResponse, expect, test} from "@playwright/test";
import { Auth } from "../../../auth/Auth";
import { HostnameController } from "../../../api/controllers/HostnameController";
import { WsHandler } from "../../../src/services/WsHandler";
import { FIRMWARE_VERSION, getSingleFirmwareVersion } from "../../../ws/FirmwareVersionConfig";
import { ErrorDescriptions } from "../../../src/utils/errors/Errors";
import { Timeouts } from "../../../src/utils/timeout.util";
import { Updater } from "../../../src/services/Updater";
import { buildPanelWsUrl } from "../../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../../src/utils/converters/panel-converters.util";
import { TIMEOUT } from "../../../utils/Constants";
import { getConfigurationFromFile } from "../../../src/utils/getConfigurationFromFile";
import { SimpleUserModel } from "../../../api/models/UserModel";
import { PanelUpdateFirmwareConfiguration } from "../../../src/domain/constants/update-firmware.configuration";
import { tracePanelCommunicationActiveChannel } from "../../../src/utils/read-panel-communication-active-channel.util";
import { PanelParsedInfo } from "../../../src/domain/entity/setup-session/PanelParsedInfo";
import config from "../../../playwright.config";
import moment = require("moment");
import { reports, vision } from "../../../src/utils/reports";
import { ReportModel } from "../../../models/ReportModel";

let JwtToken: string;
let insideGetHostnameData: string;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;
let ERROR: string = '';
let testVersionUpgradeTime: number;

const userData = getConfigurationFromFile();
const USER: SimpleUserModel = userData[0].user;
const VERSIONS: string = userData[0].versions.filter(Boolean).join(',');
const DEVICES_HEX: string[] = userData[0].deviceIdsHex;
const DEVICES_DEC: number[] = userData[0].deviceIdsHex.map(e => PanelConvertersUtil.serialToDec(e));

let channel: string;
let oldVersion: string;
let overallTestInfo: ReportModel[] = [];
let singleTestInfo: ReportModel = {
    serialNumberHex: "",
    versionFromTo: [],
    testStartTime: "",
    testFinishTime: "",
    testVersionUpgradeTime: [],
    testDurationInSeconds: 0,
    connectionChannel: "",
    upgradeIterationAmount: 0,
};
let indexDevice: number = 0;
let indexVersion: number = 0;
let testDuration: number = 0;

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX (Single user and multiple devices) - positive scenarios', () => {

    // Number of retries
    test.describe.configure({ retries: userData[0].retries });

    test('positive: Success upgrade device/devices', { tag: '@sas_upgrade_async_multiple_devices_path' }, async ({ request }) => {
        console.log("I. TEST PROGRESS");
        console.log();

        const totalTestStartTime: number = moment().valueOf();

        // 1. Getting test user data
        await Promise.allSettled(DEVICES_DEC.map(serialNumber =>
            deviceUpdater(request, serialNumber, userData[0].cycle, indexDevice))
        );

        console.log(`Overall test finished at ${moment().format('LTS')}`);

        const totalTestFinishTime: number = moment().valueOf();
        const testDate: string = moment().format('YYYY-MM-DD');
        const serialNumberHex: string[] = DEVICES_HEX;
        const currentVersion: string = oldVersion;
        const finalVersion: string = getSingleFirmwareVersion(userData[0].versions[userData[0].versions.length - 1]);
        const totalTime: number = Math.round(100 * (totalTestFinishTime - totalTestStartTime) / 1000) / 100;
        const connectionChannel: string = channel;
        const upgradeIterationAmount: number = userData[0].cycle;

        reports(
            testDate,
            serialNumberHex,
            currentVersion,
            finalVersion,
            totalTime,
            connectionChannel,
            upgradeIterationAmount,
            overallTestInfo,
        );
    });
});

async function deviceUpdater(request: APIRequestContext, serialNumber: number, cycleAmount: number, deviceIndex) {
    try {
        for (let cycle: number = 0; cycle < cycleAmount; cycle++) {
            singleTestInfo.serialNumberHex = DEVICES_HEX[deviceIndex]; // serial convert to hex
            singleTestInfo.testStartTime = moment().format('LTS');
            testDuration = moment().valueOf();

            // 2. Getting access token
            JwtToken = await Auth.getAccessToken(
                config.loginUrl,
                request,
                USER,
            );
            commandIndex++;

            // 3. Getting Hostname
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
            const initialData = await Updater.currentVersion(wsInstance, serialNumber);
            oldVersion = initialData.slice(3);
            singleTestInfo.versionFromTo[indexVersion] = oldVersion;

            const state: PanelParsedInfo = await wsInstance.createSocket(serialNumber);
            // const initialSessionState: PanelUpdateBLock = state.create;
            let configuration: PanelUpdateFirmwareConfiguration;
            channel = tracePanelCommunicationActiveChannel(state, channel => `device ${channel} ${configuration.getSerialInDec()}`);

            // 4. Console vision
            vision(serialNumber, channel, moment().format('LTS'));

            // 5. [WSS] Connection and sending necessary commands to the device via web sockets
            try {
                await Timeouts.raceError(async () => {
                    const versions = FIRMWARE_VERSION(VERSIONS);
                    const newVersion = versions[0];
                    singleTestInfo.versionFromTo[indexVersion] += ` -> ${newVersion.config.version}`;

                    console.log();
                    console.log(`Initiate an update to a new version using the URL: "${newVersion.config.url}"`);

                    testVersionUpgradeTime = moment().valueOf();
                    await Updater.update(wsInstance, serialNumber, newVersion);
                    testVersionUpgradeTime = moment().valueOf() - testVersionUpgradeTime;
                    singleTestInfo.testVersionUpgradeTime[indexVersion] = Math.round(100 * testVersionUpgradeTime / 1000) / 100;

                    const prevVersionList = versions.slice(1);
                    indexVersion++;
                    for (const version of prevVersionList) {
                        singleTestInfo.versionFromTo[indexVersion] = (await Updater.currentVersion(wsInstance, serialNumber)).slice(3);

                        // Pause between tests
                        await new Promise((resolve, reject) => {
                            setTimeout(resolve, TIMEOUT);
                        });

                        console.log();
                        console.log(`Initiate an update to a new version using the URL: "${version.config.url}"`);

                        testVersionUpgradeTime = moment().valueOf();
                        await Updater.update(wsInstance, serialNumber, version);
                        testVersionUpgradeTime = moment().valueOf() - testVersionUpgradeTime;
                        singleTestInfo.testVersionUpgradeTime[indexVersion] = Math.round(100 * testVersionUpgradeTime / 1000) / 100;

                        singleTestInfo.versionFromTo[indexVersion] += ` -> ${version.config.version}`;
                        indexVersion++;
                    }
                }, {awaitSeconds: TIMEOUT, errorCode: 999});
            } catch (error) {
                const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
                console.log(ErrorDescriptions[errorCode]);
                ERROR = ErrorDescriptions[errorCode];
            }

            // 6. Happy pass if there are no errors
            singleTestInfo.connectionChannel = channel;
            singleTestInfo.testFinishTime = moment().format('LTS');
            singleTestInfo.testDurationInSeconds = Math.round(100 * (moment().valueOf() - testDuration) / 1000) / 100;
            expect(ERROR).toEqual('');
            indexDevice++;
            indexVersion = 0;
            overallTestInfo.push(singleTestInfo);
            console.log(`Test finished at ${moment().format('LTS')}`);

            // Pause between tests
            await new Promise((resolve, reject) => {
                setTimeout(resolve, TIMEOUT);
            });
        }
    } catch (error) {
        console.log(error, serialNumber)
    }
}