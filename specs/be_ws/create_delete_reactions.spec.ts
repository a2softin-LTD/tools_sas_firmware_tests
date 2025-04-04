import { APIResponse, expect, test } from "@playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { WsMethod } from "../../src/domain/constants/ws-connection/ws-commands";
import { WsHandler } from "../../src/services/WsHandler";
import { ErrorDescriptions } from "../../src/utils/errors/Errors";
import { Timeouts } from "../../src/utils/timeout.util";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import { PAUSE_BETWEEN_REACTION_CREATION, TIMEOUT } from "../../utils/Constants";
import config from "../../playwright.config";
import { SetupSessionRelayDto } from "../../src/domain/entity/setup-session/relay-typ";
import { generateRelayReactionCommands } from "../../src/utils/generators/reactions/generate-relay-reaction-commands.util";
import { PanelReactionsDto, ReactionAllowedTypes } from "../../src/domain/entity/setup-session/panel-reaction.dto";
import { DEVICE_SAS, REACTION_AMOUNT} from "../../index";

const panelSerialNumber: string = DEVICE_SAS;

let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;
let ERROR: string = '';
let usedRelay: SetupSessionRelayDto;
let reactions: PanelReactionsDto[];

test.describe('[MPX] CRUD new reactions for MPX with Ethernet channel on the HUB - positive scenarios', () => {
    test.beforeAll(async ({request}) => {

        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            config.loginUrl,
            request,
            TestDataProvider.SimpleUserCI,
        );
        commandIndex++;

        // 2. Getting Hostname
        console.log(`DEVICE_ID = ${panelSerialNumber}`);
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
            config.envUrl,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        insideGetHostnameData = await responseGetHostnameData.json();
        wsUrl = buildPanelWsUrl(insideGetHostnameData.result);

        // 3. Create WS instance
        wsInstance = new WsHandler(wsUrl, JwtToken);

        const initialData = await wsInstance.createSocket(serialNumber);

        reactions = initialData.create.reactions;
        usedRelay = initialData.create.relays?.[0];

        if (!usedRelay) {
            throw new Error('Relays are not found');
        }
        if (!reactions) {
            throw new Error('reactions unsupported');
        }

    });

    test('1. Create N relay reactions', { tag: '@sas_reactions_add' }, async () => {
        const reactionAmount = REACTION_AMOUNT;

        // 4. [WS] Connection and sending necessary commands to the device via web sockets
        try {
            const startTimeRangeMins: number = 0
            const endTimeRangeMins: number = Number(REACTION_AMOUNT);

            const reactionCommands: PanelReactionsDto[] = generateRelayReactionCommands(usedRelay, startTimeRangeMins, endTimeRangeMins);

            await Timeouts.raceError(async () => {

                for (let i: number = 0; i < reactionCommands.length; i++) {
                    await new Promise((resolve, reject) => {
                        console.log();
                        console.log("Pause. Waiting for " + PAUSE_BETWEEN_REACTION_CREATION + " sec before run next updating");
                        console.log();
                        console.log();
                        setTimeout(resolve, PAUSE_BETWEEN_REACTION_CREATION);
                    });
                    console.log();
                    console.log(reactionCommands[i]);
                    await wsInstance.update({
                        method: WsMethod.UPDATE_REACTION,
                        subscribePart: 'reactions',
                        subscribeMethod: 'create',
                        data: reactionCommands[i],
                        validityFunction: data => Boolean(data.length)
                    })
                }
            }, { awaitSeconds: TIMEOUT, errorCode: 999 });
        } catch (error) {
            console.log(error);
            const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
            console.log(ErrorDescriptions[errorCode]);
            ERROR = ErrorDescriptions[errorCode];
        }

        // 5. Happy pass if there are no errors
        expect(ERROR).toEqual('');
    });

    test('2. Remove all relay reactions', { tag: '@sas_reactions_delete' }, async () => {
        const removedReactionIndexes = reactions
            .filter(el => ReactionAllowedTypes.relay.includes(el.triggerType))
            .map(el => el.index);

        await Timeouts.raceError(async () => {
            for (const removedReactionIndex of removedReactionIndexes) {
                await new Promise((resolve, reject) => {
                    console.log();
                    console.log("Pause. Waiting for " + PAUSE_BETWEEN_REACTION_CREATION + " sec before run next updating");
                    console.log();
                    console.log();
                    setTimeout(resolve, PAUSE_BETWEEN_REACTION_CREATION);
                });
                console.log();
                await wsInstance.update({
                    method: WsMethod.REMOVE_REACTION,
                    subscribePart: 'reactions',
                    subscribeMethod: 'delete',
                    data: removedReactionIndex,
                    validityFunction: (data: number[]) => data.some(el => el == removedReactionIndex),
                })
            }
        }, { awaitSeconds: TIMEOUT, errorCode: 999 });
    });

});