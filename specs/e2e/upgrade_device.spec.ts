import { APIResponse } from "@playwright/test";
import { test, expect } from "playwright/test";
import { Auth } from "../../auth/Auth";
import { TestDataProvider } from "../../utils/TestDataProvider";
import { HostnameController } from "../../api/controllers/HostnameController";
import { Parsers } from "../../utils/Parsers";
import { WebSocket } from 'ws';
import {FTP_URL, WS} from "../../utils/constants";
import {handleResponse, sendMessage} from "../../ws/client";

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
        const wsUrl: string = WS["WSS_URL"](insideGetHostnameData.result, WS["PORT"], JwtToken);
        const ftpUrl: string = FTP_URL;

        await (async () => {

            // Open the WebSocket connection
            const ws = new WebSocket(wsUrl);

            // Handle WebSocket events
            ws.onopen = () => {
                console.log('WebSocket connection established');

                // Send a series of messages to the WebSocket API
                sendMessage(ws,
                    {
                                client: "openPanelSession",
                                commandId: commandIndex++,
                                data: serialNumber
                            }
                );

                sendMessage(ws,
                    {
                                client: "updatePanelFirmware",
                                commandId: commandIndex++,
                                data: ftpUrl
                            }
                );
            };

            ws.onmessage = (event: any) => {
                console.log('Received message from WebSocket API:', event.data);
                // Handle each message response
                handleResponse(event.data);
            };

            ws.onerror = (error: any) => {
                console.error('WebSocket error:', error);
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
                // Close the browser once the WebSocket connection is closed
            };

            // Wait for the WebSocket connection to be established
            await new Promise(resolve => setTimeout(resolve, 20000));
        })();
    });

});
