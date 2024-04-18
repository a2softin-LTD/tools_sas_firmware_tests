import { APIResponse } from "@playwright/test";
import { test, expect } from "playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { Parsers } from "../../utils/Parsers";
import { WebSocket } from 'ws';
import { WS } from "../../utils/constants";
import {connectToWebSocket} from "../../ws/client";

let serialNumber: number;
let JwtToken: string;
let commandIndex: number = 0;

test.describe('API Login tests', () => {

    test.beforeAll(async ({ request }) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;
    });

    test('Success upgrade a device', async ({ request }) =>  {
        // 2. Get Hostname
        serialNumber = await Parsers.serialToDec(TestDataProvider.DeviceId);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] 1. Connection to the device
        const commands: Array<string> = ["open", "openPanelSession", "updatePanelFirmware"];
        const messages: Array<string> = [];
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result, WS["PORT"], JwtToken);
        const ftpUrl: string = "ftp://devfirmware.maks.systems:2221/v2/files/b7/22_61.bin";
        const wsMessage1: string = `{"client": ${commands[1]}, "commandId": ${commandIndex++}, "data": ${serialNumber}}`;
        const wsMessage2: string = `{"client": ${commands[2]}, "commandId": ${commandIndex++}, "data": "${ftpUrl}"}`;
        messages.push(wsMessage1, wsMessage2);

        const ws = new WebSocket(wsUrl, { perMessageDeflate: false });

        ws.on('error', console.error);

        ws.on('open', function open() {
            ws.send(wsMessage1);
        });

        ws.on('message', function message(data) {
            console.log('received: %s', data);
        });

        // try {
        //     const websocket = await connectToWebSocket(wsUrl, messages);
        //     expect(websocket.readyState,"Verify Trade Streaming connection").toBe(WebSocket.OPEN);
        //     websocket.onmessage = (event) => {
        //         const data = event.data;
        //         console.log('Received message: ', data);
        //     };
        //
        // } catch (error) {
        //     console.error("WebSocket connection failed: ", error);
        // }
    });

});
