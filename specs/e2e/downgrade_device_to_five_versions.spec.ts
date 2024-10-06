import {APIResponse, expect, test} from "@playwright/test";
import {Auth} from "../../auth/Auth";
import {TestDataProvider} from "../../utils/TestDataProvider";
import {HostnameController} from "../../api/controllers/HostnameController";
import {WsHandler} from "../../ws/WsHandler";
import {getAllVersionConfigsFiveLastVersions} from "../../ws/FirmwareVersionConfig";
import {environmentConfig} from "../../ws/EnvironmentConfig";
import {Environments} from "../../src/domain/constants/environments";
import {ErrorDescriptions} from "../../src/utils/errors/Errors";
import {Timeouts} from "../../src/utils/timeout.util";
import {Updater} from "../../ws/Updater";
import {buildPanelWsUrl} from "../../src/utils/ws-url-builder.util";
import {PanelConvertersUtil} from "../../src/utils/converters/panel-converters.util";

let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;

test.describe('[MPX] Automate firmware upgrade/downgrade testing for MPX - positive scenarios', () => {
    const env = environmentConfig.get(Environments.DEV);

    test.beforeAll(async ({request}) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            env.loginUrl,
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;

        // 2. Getting Hostname
        serialNumber = PanelConvertersUtil.serialToDec(TestDataProvider.DeviceIdWithWiFi);

        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber
        );
        expect(responseGetHostnameData.status()).toBe(200);

        insideGetHostnameData = await responseGetHostnameData.json();
        wsUrl = buildPanelWsUrl(insideGetHostnameData.result)
        wsInstance = new WsHandler(wsUrl, JwtToken);

    });

    test('positive: Success downgrade a device to five last versions', {tag: '@downgrade'}, async ({request}) => {
        const TIMEOUT: number = 1200;
        const PAUSE: number = 30000;
        let ERROR: string = "";

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        try {
            await Timeouts.raceError(async () => {
                const versions = getAllVersionConfigsFiveLastVersions()
                const newVersion = versions[0]
                await Updater.update(wsInstance, serialNumber, newVersion)

                const prevVersionList = versions.slice(1);//.reverse()
                for (const version of prevVersionList) {
                    await new Promise((resolve, reject) => {
                        console.log("Pause. Waiting for " + PAUSE / 1000 + " sec before run next updating");
                        setTimeout(resolve, PAUSE);
                    });
                    await Updater.update(wsInstance, serialNumber, version);
                }
            }, {awaitSeconds: TIMEOUT, errorCode: 999});
        } catch (error) {
            const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
            console.log(ErrorDescriptions[errorCode]);
            ERROR = ErrorDescriptions[errorCode];
        }
        expect(ERROR).toEqual("");
    });

});

