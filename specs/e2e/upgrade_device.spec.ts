import { APIResponse } from "@playwright/test";
import { test, expect } from "playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { Parsers } from "../../utils/Parsers";
import { WS } from "../../utils/path";
import { WsMethod } from "../../ws/WsMethod";
import { WsHandler } from "../../ws/WsHandler";
import {NEW_VERSION, OLD_VERSION} from "../../utils/constants";

let serialNumber: number;
let JwtToken: string;
let commandIndex: number = 0;

test.describe('API Login tests', () => {
    const ENV = "QA";

    test.beforeAll(async ({ request }) => {
        // 1. Getting access token
        JwtToken = await Auth.getAccessToken(
            ENV,
            request,
            TestDataProvider.SimpleUser
        );
        commandIndex++;
    });

    test('Success upgrade a device', async ({ request }) =>  {
        // 2. Get Hostname
        serialNumber = await Parsers.serialToDec(TestDataProvider.DeviceId);
        const responseGetHostnameData: APIResponse = await HostnameController.getHostname(
            ENV,
            request,
            serialNumber
        );

        expect(responseGetHostnameData.status()).toBe(200);

        const insideGetHostnameData = await responseGetHostnameData.json();

        // 3. [WSS] 1. Connection to the device
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result) + ":" + WS["PORT"];

        await(async () => {

            const wsInstance = new WsHandler(wsUrl, JwtToken);
            await wsInstance.createSocket(serialNumber);
            console.log("Done");
            wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", -1)
                .then(() => {
                    console.log("Return smth");
            });
            try {
                await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, process.env[ENV + "_UPDATE_OLD_VERSION_FTP_URL"]);
            } catch (err) {
                await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, process.env[ENV + "_UPDATE_OLD_VERSION_FTP_URL"]);
            }
            // await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, process.env[ENV + "_UPDATE_NEW_VERSION_FTP_URL"]);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", OLD_VERSION);

            wsInstance.close()
        })();

        // await test();

        // let message: string

        // await (async () => {
        //
        //     // Open the WebSocket connection
        //     const ws = new WebSocket(wsUrl);
        //
        //     // Handle WebSocket events
        //     ws.onopen = () => {
        //         console.log('WebSocket connection established');
        //
        //         // Send a series of messages to the WebSocket API
        //         sendMessage(ws,
        //             {
        //                         client: "openPanelSession",
        //                         commandId: commandIndex++,
        //                         data: serialNumber
        //                     }
        //         );
        //
        //         ws.onmessage = (event: any) => {
        //             console.log('Received message from WebSocket API:', event.data);
        //             // Handle each message response
        //             handleResponse(event.data);
        //         };
        //
        //         sendMessage(ws,
        //             {
        //                         client: "updatePanelFirmware",
        //                         commandId: commandIndex++,
        //                         data: process.env[ENV + "_UPDATE_NEW_VERSION_FTP_URL"]
        //                     }
        //         );
        //     };
        //
        //     ws.onmessage = (event: any) => {
        //         console.log('Received message from WebSocket API:', event.data);
        //         // Handle each message response
        //         handleResponse(event.data);
        //     };
        //
        //     ws.onerror = (error: any) => {
        //         console.error('WebSocket error:', error);
        //     };
        //
        //     ws.onclose = () => {
        //         console.log('WebSocket connection closed');
        //     };
        //
        //     // Wait for the WebSocket connection to be established
        //     await new Promise(resolve => setTimeout(resolve, 20000));
        // })();
    });

});
