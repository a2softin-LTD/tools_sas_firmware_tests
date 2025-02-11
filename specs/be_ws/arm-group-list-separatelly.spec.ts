import { TestDataProvider } from "../../utils/TestDataProvider";
import { WsHandler } from "../../src/services/WsHandler";
import { WsControlHandler } from "../../src/services/WsControlHandler";
import { APIResponse, expect, test } from "@playwright/test";
import { Auth} from "../../auth/Auth";
import { HostnameController } from "../../api/controllers/HostnameController";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { Updater} from "../../src/services/Updater";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import {environmentConfig, IServerAddresses} from "../../ws/EnvironmentConfig";
import { Environments } from "../../src/domain/constants/environments";
import { DEVICE_SAS } from "../../index";

const panelSerialNumber: string = DEVICE_SAS;
const env: IServerAddresses = environmentConfig.get(Environments.DEV);
const groupIndexes: any[] = [];

let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData;
let wsUrl: string;
let setupInstance: WsHandler;
let controlInstance: WsControlHandler;

test.describe(`update armed panel ${panelSerialNumber}`, () => {
    // const env = environmentConfig.get(Environments.DEV);

    test.beforeAll(async ({request}) => {
        //setup environment
        JwtToken = await Auth.getAccessToken(
            env.loginUrl,
            request,
            TestDataProvider.SimpleUser,
        );
        // 2. Getting Hostname
        serialNumber = PanelConvertersUtil.serialToDec(panelSerialNumber);

        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log(`DEVICE_ID = ${serialNumber}`);
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');
        console.log();
        console.log(`*********************************** DeviceId -> ${panelSerialNumber} **********************************`);
        console.log();
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');

        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            env.envUrl,
            request,
            serialNumber,
        );
        expect(responseGetHostnameData.status()).toBe(200);

        insideGetHostnameData = await responseGetHostnameData.json();
        wsUrl = buildPanelWsUrl(insideGetHostnameData.result);
        setupInstance = new WsHandler(wsUrl, JwtToken);
        controlInstance = new WsControlHandler(wsUrl, JwtToken);
    })

    test.beforeAll(async () => {
        const state = await setupInstance.createSocket(serialNumber);
        const initialSessionState = state.create;
        if (!initialSessionState.groups.length) {
            throw 'wrong configuration restart panel';
        }

        if (!initialSessionState.users.length) {
            throw 'user not found';
        }

        const sessionUser = TestDataProvider.SimpleUser;
        const attachedSessionUser = initialSessionState.users.find(user => sessionUser.email == user.maksMobileLogin);
        if (!attachedSessionUser) {
            throw 'user not attached to panel';
        }
        if (!attachedSessionUser.mobileAppAllowed) {
            throw 'user dont have permissions for  arm/disarm panel';
        }

        // const hasArmedGroups = initialSessionState.groups.some(checkGroupArmUtil)
        // if (!hasArmedGroups) {
        //     await Updater.armPanel(controlInstance, serialNumber)
        // }
    })

    test('disarm all groups', async () => {
        await Updater.disarmAllGroupsOfPanel(controlInstance, serialNumber);
    })

    test('armSomeGroups', async () => {
        await Updater.armGroupsListOfPanel(controlInstance, serialNumber, groupIndexes);
    })

    test.afterAll(async () => {
        await Updater.disarmPanel(controlInstance, serialNumber);
    })
})