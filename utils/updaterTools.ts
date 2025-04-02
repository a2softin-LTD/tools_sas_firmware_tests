import { Auth } from "../auth/Auth";
import config from "../playwright.config";
import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { HostnameController } from "../api/controllers/HostnameController";
import { buildPanelWsUrl } from "../src/utils/ws-url-builder.util";
import { WsHandler } from "../src/services/WsHandler";
import { Updater } from "../src/services/Updater";
import { PanelParsedInfo } from "../src/domain/entity/setup-session/PanelParsedInfo";
import { PanelUpdateFirmwareConfiguration } from "../src/domain/constants/update-firmware.configuration";
import { tracePanelCommunicationActiveChannel } from "../src/utils/read-panel-communication-active-channel.util";
import { vision } from "../src/utils/reports";
import { Timeouts } from "../src/utils/timeout.util";
import { FIRMWARE_VERSION } from "../ws/FirmwareVersionConfig";
import { TIMEOUT } from "./Constants";
import { ErrorDescriptions } from "../src/utils/errors/Errors";
import { ReportModel } from "../models/ReportModel";
import moment = require("moment");
import { SimpleUserModel } from "../api/models/UserModel";

export async function singleUserSingleDeviceUpdater(
    request: APIRequestContext,
    user: SimpleUserModel,
    versionListAsString: string,
    devicesHex: string,
    cycleAmount: number,
    serialNumber: number,
) {
    let JwtToken: string;
    let insideGetHostnameData: string;
    let wsUrl: string;
    let wsInstance: WsHandler;
    let commandIndex: number = 0;
    let ERROR: string = '';
    let testVersionUpgradeTime: number;

    let channel: string;
    let oldVersion: string;
    let indexDevice: number = 0;
    let indexVersion: number = 0;
    let testDuration: number = 0;

    for (let cycle: number = 0; cycle < cycleAmount; cycle++) {
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

        singleTestInfo.serialNumberHex = devicesHex;
        singleTestInfo.testStartTime = moment().format('LTS');
        testDuration = moment().valueOf();

        // 2. Getting access token
        JwtToken = await Auth.getAccessToken(
            config.loginUrl,
            request,
            user,
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
        oldVersion = (await Updater.currentVersion(wsInstance, serialNumber)).slice(3);
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
                const versions = FIRMWARE_VERSION(versionListAsString);
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
        console.log(`Test finished at ${moment().format('LTS')}`);

        // Pause between tests
        await new Promise((resolve, reject) => {
            setTimeout(resolve, TIMEOUT);
        });
        return singleTestInfo;
    }
}