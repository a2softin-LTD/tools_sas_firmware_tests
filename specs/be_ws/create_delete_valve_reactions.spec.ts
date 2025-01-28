import { APIResponse, expect, test } from "@playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider  } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { WsMethod } from "../../src/domain/constants/ws-connection/ws-commands";
import { WsHandler } from "../../src/services/WsHandler";
import { ErrorDescriptions } from "../../src/utils/errors/Errors";
import { Timeouts } from "../../src/utils/timeout.util";
import { buildPanelWsUrl } from "../../src/utils/ws-url-builder.util";
import { PanelConvertersUtil } from "../../src/utils/converters/panel-converters.util";
import { PAUSE, PAUSE_BETWEEN_REACTION_CREATION, TIMEOUT } from "../../utils/Constants";
import config from "../../playwright.config";
import { SetupSessionRelayDto} from "../../src/domain/entity/setup-session/relay-typ";
import { PanelReactionsDto, ReactionAllowedTypes } from "../../src/domain/entity/setup-session/panel-reaction.dto";
import { isValve } from "../../src/domain/entity/enums/type-codes";
import { generateValveReactionCommands } from "../../src/utils/reaction-generators/generate-valve-reaction-commands.util";

let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;
let ERROR: string = '';
let usedValve: SetupSessionRelayDto

let reactions: PanelReactionsDto[]

test.describe('[MPX] CRUD new reactions for MPX with Ethernet channel on the HUB - positive scenarios', () => {
    test.beforeAll(async ({request}) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            config.loginUrl,
            request,
            TestDataProvider.SimpleUserRelay
        );
        commandIndex++;

        // 2. Getting Hostname
        serialNumber = PanelConvertersUtil.serialToDec(TestDataProvider.DeviceIdWithEthernet);

        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log('****************************************************************************************************');
        console.log('****************************************************************************************************');
        console.log();
        console.log(`*********************************** DeviceId -> ${serialNumber} **********************************`);
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
        wsInstance = new WsHandler(wsUrl, JwtToken);

        const initialData = await wsInstance.createSocket(serialNumber);

        reactions = initialData.create.reactions

        usedValve = initialData.create.sensors.find(el => isValve(el.type));

        if (!usedValve) {
            throw new Error('Valve are not found');
        }
        if (!reactions) {
            throw new Error('reactions unsupported')
        }

    });

    test('remove all valve reactions', async () => {
        // try {

        const removedReactionIndexes = reactions
            .filter(el => ReactionAllowedTypes.valve.includes(el.triggerType))
            .map(el => el.index)


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
                    validityFunction: (data: number[]) => data.some(el => el == removedReactionIndex)
                })
            }
        }, {awaitSeconds: TIMEOUT, errorCode: 999});

        // } catch (error) {
        // }
    });

    test('create valve reactions for time range', async () => {

        // 3. [WSS] Connection and sending necessary commands to the device via web sockets
        try {
            const startTimeRangeMins: number = 0
            const endTimeRangeMins: number = 5
            const amountCommands: number = 12;
            const reactionCommands = generateValveReactionCommands(usedValve, startTimeRangeMins, endTimeRangeMins)

            await Timeouts.raceError(async () => {

                for (let i = 0; i < reactionCommands.length; i++) {
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
            }, {awaitSeconds: TIMEOUT, errorCode: 999});
        } catch (error) {
            console.log(error);
            const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
            console.log(ErrorDescriptions[errorCode]);
            ERROR = ErrorDescriptions[errorCode];
        }

        // 4. Happy pass if there are no errors
        expect(ERROR).toEqual('');
        await new Promise((resolve, reject) => {
            console.log();
            console.log("Pause. Waiting for " + PAUSE / 1000 + " sec before run next updating");
            console.log();
            console.log();
            setTimeout(resolve, PAUSE);
        });
    });

});