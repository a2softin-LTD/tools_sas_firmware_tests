import {APIResponse, expect, test} from "@playwright/test";
import {IServerAddresses} from "../../ws/EnvironmentConfig";
import {Auth} from "../../auth/Auth";
import {TestDataProvider} from "../../utils/TestDataProvider";
import {HostnameController} from "../../api/controllers/HostnameController";
import {buildPanelWsUrl} from "../utils/ws-url-builder.util";
import {checkGroupArmUtil} from "../utils/check-group-arm.util";
import {Timeouts} from "../utils/timeout.util";
import {ErrorDescriptions} from "../utils/errors/Errors";
import {PanelUpdateFirmwareConfiguration} from "../domain/constants/update-firmware.configuration";
import {WsHandler} from "../services/WsHandler";
import {Updater} from "../services/Updater";
import {WsControlHandler} from "../services/WsControlHandler";

export function armedTestGenerator(config: PanelUpdateFirmwareConfiguration, env: IServerAddresses) {

    let serialNumber: number;
    let JwtToken: string;
    let insideGetHostnameData;
    let wsUrl: string;
    let setupInstance: WsHandler;
    // let setupInstance: WsHandlerRxSetupSession;
    // let controlInstance: WsHandlerRxControlSession;
    let controlInstance: WsControlHandler;
    let notFirstTest = false

    test.describe(`update armed panel ${config.panelSerialNumber}`, () => {

        // const env = environmentConfig.get(Environments.DEV);


        test.beforeAll(async ({request}) => {
            //setup environment
            JwtToken = await Auth.getAccessToken(
                env.loginUrl,
                request,
                TestDataProvider.SimpleUser
            );
            // 2. Getting Hostname
            serialNumber = config.getSerialInDec();
            console.log('****************************************************************************************************');
            console.log('****************************************************************************************************');
            console.log('');
            console.log(`************************************** DeviceId -> ${config.updateChannelName} ****************************************`);
            console.log('');
            console.log('****************************************************************************************************');
            console.log('****************************************************************************************************');

            const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
                env.envUrl,
                request,
                serialNumber
            );
            expect(responseGetHostnameData.status()).toBe(200);

            insideGetHostnameData = await responseGetHostnameData.json();
            wsUrl = buildPanelWsUrl(insideGetHostnameData.result);
            // setupInstance = new WsHandlerRxSetupSession(wsUrl, JwtToken);
            setupInstance = new WsHandler(wsUrl, JwtToken);
            controlInstance = new WsControlHandler(wsUrl, JwtToken)

            notFirstTest = false
        })

        test.beforeAll(async () => {
            // setupInstance.initSocket()
            // const state = await lastValueFrom(setupInstance.createSession$(serialNumber))
            const state = await setupInstance.createSocket(serialNumber)
            console.log("state", state);
            // setupInstance.close()
            const initialSessionState = state.create
            if (!initialSessionState.groups.length) {
                throw 'wrong configuration restart panel'
            }

            if (!initialSessionState.users.length) {
                throw 'user not found'
            }

            const sessionUser = TestDataProvider.SimpleUser
            const attachedSessionUser = initialSessionState.users.find(user => sessionUser.email == user.maksMobileLogin)
            if (!attachedSessionUser) {
                throw 'user not attached to panel'
            }
            if (!attachedSessionUser.mobileAppAllowed) {
                throw 'user dont have permissions for  arm/disarm panel'
            }

            const hasArmedGroups = initialSessionState.groups.some(checkGroupArmUtil)
            console.log("hasArmedGroups", hasArmedGroups);
            if (!hasArmedGroups) {
                await Updater.armPanel(controlInstance, serialNumber)
            }
        })

        test.beforeEach(async () => {
            if (!notFirstTest) return;
            notFirstTest = true;
            const PAUSE: number = 5 * 60 * 1000;//5 mins
            await new Promise((resolve, reject) => {
                console.log("Pause. Waiting for " + PAUSE / 1000 + " sec before run next updating");
                setTimeout(resolve, PAUSE);
            });
        })


        config.firmwareList.forEach((version => {
            test(`positive: Success upgrade a device ${config.panelSerialNumber} to version ${version.config.versionCode},  - Test ID: ${new Date().toISOString()}`, async () => {
                // setupInstance.initSocket()
                // const state = await lastValueFrom(setupInstance.createSession$(serialNumber))
                const TIMEOUT: number = 2400;
                let ERROR: string = '';

                // 3. [WSS] Connection and sending necessary commands to the device via web sockets
                try {
                    await Timeouts.raceError(async () => {
                        Updater.update(setupInstance, serialNumber, version)
                        // lastValueFrom(SetupSessionRxUpdater.updateFirmware$(setupInstance, serialNumber, version))
                    }, {awaitSeconds: TIMEOUT, errorCode: 999});

                } catch (error) {
                    const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
                    console.log(ErrorDescriptions[errorCode]);
                    ERROR = ErrorDescriptions[errorCode];
                }
                setupInstance.close()

                expect(ERROR).toEqual('');
            });
        }))


        test.afterAll(async () => {
            await Updater.disarmPanel(controlInstance, serialNumber)
        })
    })


}