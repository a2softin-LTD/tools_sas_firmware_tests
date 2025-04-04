const fs = require('fs');
const path = require('path');

// Reading data from JSON-file
const testData = JSON.parse(fs.readFileSync('resources/test_data.json', 'utf-8'));

// Test template
const generateTestCreateReaction = (userObject, deviceIdHex, index) => {
    console.log(userObject);

    return `
let serialNumber: number;
let JwtToken: string;
let insideGetHostnameData: any;
let wsUrl: string;
let wsInstance: WsHandler;
let commandIndex: number = 0;
let ERROR: string = '';
let usedRelay: SetupSessionRelayDto;
let reactions: PanelReactionsDto[];
let userObject: any;
let deviceIdHex: string;

test('1. Create N relay reactions', { tag: '@sas_reactions_async_single_user_single_device_create_json' }, async ({ request }) => {
    console.log('TEST STARTED');
    console.log('Test started at ' + moment().format('LTS'));
    
    // 1. Getting user data
    userObject = JSON.parse('${JSON.stringify(userObject)}');
    deviceIdHex = '${deviceIdHex}';
    
    // 2. Getting access token
    JwtToken = await Auth.getAccessToken(
        config.loginUrl,
        request,
        userObject.user,
    );
    commandIndex++;

    // 3. Getting Hostname
    serialNumber = PanelConvertersUtil.serialToDec(deviceIdHex);

    console.log('DEVICE_ID = ${deviceIdHex}');

    const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
        config.envUrl,
        request,
        serialNumber
    );

    expect(responseGetHostnameData.status()).toBe(200);

    insideGetHostnameData = await responseGetHostnameData.json();
    wsUrl = buildPanelWsUrl(insideGetHostnameData.result);

    // 4. Create WS instance
    wsInstance = new WsHandler(wsUrl, JwtToken);

    const initialData: PanelParsedInfo = await wsInstance.createSocket(serialNumber);

    reactions = initialData.create.reactions;
    usedRelay = initialData.create.relays?.[0];

    if (!usedRelay) {
        throw new Error('Relays are not found. Please check!');
    }
    if (!reactions) {
        throw new Error('Reactions unsupported. Please check!');
    }
    console.log('TEST STARTED');
    console.log('start time = ' + moment().valueOf());
            
    // 5. [WS] Connection and sending necessary commands to the device via web sockets
    try {
        const startTimeRangeMin: number = 0;
        const endTimeRangeMin: number = Number(userObject.reactions[${index}]);
        const reactionCommands: PanelReactionsDto[] = generateRelayReactionCommands(usedRelay, startTimeRangeMin, endTimeRangeMin);

        await Timeouts.raceError(async () => {
            for (let i: number = 0; i < reactionCommands.length; i++) {
                await new Promise((resolve, reject) => {
                    console.log();
                    console.log('Pause. Waiting for ' + PAUSE_BETWEEN_REACTION_CREATION / 2 / 1000 + ' sec before next iteration');
                    console.log();
                    setTimeout(resolve, PAUSE_BETWEEN_REACTION_CREATION / 2);
                });
                console.log();
                console.log(reactionCommands[i]);
                await wsInstance.update({
                    method: WsMethod.UPDATE_REACTION,
                    subscribePart: 'reactions',
                    subscribeMethod: 'create',
                    data: reactionCommands[i],
                    validityFunction: data => Boolean(data.length),
                })
            }
        }, {awaitSeconds: TIMEOUT, errorCode: 999});
    } catch (error) {
        console.log(error);
        const errorCode: string = Object.keys(ErrorDescriptions).find(key => ErrorDescriptions[key] === error.error);
        console.log(ErrorDescriptions[errorCode]);
        ERROR = ErrorDescriptions[errorCode];
    }

    // 6. Happy pass if there are no errors
    expect(ERROR).toEqual('');
    console.log();
    console.log('Test started at ' + moment().format('LTS'));
    console.log('TEST COMPLETED');   
})`
};

const generateTestDeleteReaction = (userObject, deviceIdHex) => {
    return `

test('2. Remove all relay reactions', {tag: '@sas_reactions_async_single_user_single_device_delete_json'}, async ({ request }) => {
    // 1. Getting user data
    userObject = JSON.parse('${JSON.stringify(userObject)}');
    deviceIdHex = '${deviceIdHex}';
    
    // 2. Getting access token
    JwtToken = await Auth.getAccessToken(
        config.loginUrl,
        request,
        userObject.user,
    );
    commandIndex++;

    // 3. Getting Hostname
    serialNumber = PanelConvertersUtil.serialToDec(deviceIdHex);

    console.log('DEVICE_ID = ${deviceIdHex}');

    const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
        config.envUrl,
        request,
        serialNumber
    );

    expect(responseGetHostnameData.status()).toBe(200);

    insideGetHostnameData = await responseGetHostnameData.json();
    wsUrl = buildPanelWsUrl(insideGetHostnameData.result);

    // 4. Create WS instance
    wsInstance = new WsHandler(wsUrl, JwtToken);

    const initialData: PanelParsedInfo = await wsInstance.createSocket(serialNumber);

    reactions = initialData.create.reactions;
    usedRelay = initialData.create.relays?.[0];

    if (!usedRelay) {
        throw new Error('Relays are not found. Please check!');
    }
    if (!reactions) {
        throw new Error('Reactions unsupported. Please check!');
    }
    
    console.log('TEST STARTED');
    console.log('start time = ' + moment().valueOf());
    
    const removedReactionIndexes: number[] = reactions
        .filter(el => ReactionAllowedTypes.relay.includes(el.triggerType))
        .map(el => el.index);

    await Timeouts.raceError(async () => {
        for (const removedReactionIndex of removedReactionIndexes) {
            await new Promise((resolve, reject) => {
                console.log();
                console.log("Pause. Waiting for " + PAUSE_BETWEEN_REACTION_DELETE / 4 / 1000 + " sec before run next iteration");
                console.log();
                console.log();
                setTimeout(resolve, PAUSE_BETWEEN_REACTION_CREATION / 4);
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
    
    expect(ERROR).toEqual('');
    console.log();
    console.log('Test finished at ' + moment().format('LTS'));
    console.log('TEST COMPLETED');
})`
};

// Generating spec-file for each test scenario
testData.forEach((userObject, index) => {
    for (const deviceIdHex of userObject["deviceIdsHex"]) {
        let reactionArrayIndex = 0;
        const fileName = `reactions-create-delete-test-${index++ + 1}-${userObject["user"].email.replace(/[^a-zA-Z]/g, "")}.spec.ts`;
        const testContent = `
import { APIResponse, expect, test } from '@playwright/test';
import { Auth } from '../../../../auth/Auth';
import { HostnameController } from '../../../../api/controllers/HostnameController';
import { WsMethod } from '../../../../src/domain/constants/ws-connection/ws-commands';
import { WsHandler } from '../../../../src/services/WsHandler';
import { ErrorDescriptions } from '../../../../src/utils/errors/Errors';
import { Timeouts} from '../../../../src/utils/timeout.util';
import { buildPanelWsUrl } from '../../../../src/utils/ws-url-builder.util';
import { PanelConvertersUtil } from '../../../../src/utils/converters/panel-converters.util';
import { PAUSE_BETWEEN_REACTION_CREATION, PAUSE_BETWEEN_REACTION_DELETE, TIMEOUT } from '../../../../utils/Constants';
import config from '../../../../playwright.config';
import { SetupSessionRelayDto } from '../../../../src/domain/entity/setup-session/relay-typ';
import {
    generateRelayReactionCommands
} from '../../../../src/utils/generators/reactions/generate-relay-reaction-commands.util';
import { PanelReactionsDto, ReactionAllowedTypes } from '../../../../src/domain/entity/setup-session/panel-reaction.dto';
import { PanelParsedInfo } from '../../../../src/domain/entity/setup-session/PanelParsedInfo';
import moment = require('moment');
        ${generateTestCreateReaction(userObject, deviceIdHex, reactionArrayIndex++)};
        ${generateTestDeleteReaction(userObject, deviceIdHex)};
`;
        fs.writeFileSync(path.join('specs/global/autogenerated/create_delete_reactions', fileName), testContent);
        console.log(`Generated a file: ${fileName}`);
    }
});