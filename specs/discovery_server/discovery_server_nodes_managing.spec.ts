import { expect, test } from "@playwright/test";
import { IntegrationController } from "../../api/controllers/IntegrationController";
import StatusCode from "status-code-enum";
import {PAUSE} from "../../utils/Constants";

test.describe('Checking the behavior of the Discovery server', () => {

    test.beforeEach(async () => {
    });

    test.afterEach(async () => {
    });

    test('Disconnecting one of the panel-server nodes', { tag:['@discovery-server'] }, async ({ request }) => {
        test.info().annotations.push({
            type: "4.1",
            description: "https://app.clickup.com/30937733/v/dc/xg4m5-25952/xg4m5-14252",
        });

        let panelListFirstNode;
        let panelListSecondNode;
        let panelListFirstNodeResponse;
        let panelListSecondNodeResponse;

        await test.step("1. Getting device list from First Node", async () => {
            console.log("STEP1 - Started");

            panelListFirstNode = await IntegrationController.getOnlinePanelListFirstNode(request);

            expect(panelListFirstNode.status()).toBe(StatusCode.SuccessOK);

            panelListFirstNodeResponse = await panelListFirstNode.json();
            console.log(panelListFirstNodeResponse);

            console.log("STEP1 - Completed");
        });

        await test.step("2. Getting device list from Second Node", async () => {
            console.log("STEP2 - Started");

            panelListSecondNode = await IntegrationController.getOnlinePanelListSecondNode(request);

            expect(panelListSecondNode.status()).toBe(StatusCode.SuccessOK);

            panelListSecondNodeResponse = await panelListSecondNode.json();
            console.log(panelListSecondNodeResponse);

            console.log("STEP2 - Completed");
        });
        
        await test.step("3. Quarantine First Node", async () => {
            console.log("STEP3 - Started");
            console.log("STEP3 - Completed");
        });

        await test.step("4. Waiting 2 minutes while devices migrate to the working Second Node", async () => {
            console.log("STEP4 - Started");

            await new Promise((resolve, reject) => {
                setTimeout(resolve, 2000);
            });

            console.log("STEP4 - Completed");
        });

        await test.step("5. Getting device list from Second Node", async () => {
            console.log("STEP5 - Started");

            panelListSecondNode = await IntegrationController.getOnlinePanelListSecondNode(request);

            expect(panelListSecondNode.status()).toBe(StatusCode.SuccessOK);

            panelListSecondNodeResponse = await panelListSecondNode.json();
            console.log(panelListSecondNodeResponse);

            console.log("STEP5 - Completed");
        });

        await test.step("6. Check that the Second Node contains all devices of the First Node", async () => {
            console.log("STEP6 - Started");

            expect (panelListSecondNodeResponse).toContain(panelListFirstNodeResponse);

            console.log("STEP6 - Completed");
        });

        await test.step("7. Bring the First Node out of quarantine", async () => {
            console.log("STEP7 - Started");
            console.log("STEP7 - Completed");
        });

        await test.step("8. Check that the devices have returned to the First Node", async () => {
            console.log("STEP8 - Started");
            console.log("STEP8 - Completed");
        });
    });

    test('Resetting the device to factory settings and initial inclusion in the system without discovery', { tag:['@discovery-server'] }, async ({ request }) => {
        test.info().annotations.push({
            type: "4.1",
            description: "https://app.clickup.com/30937733/v/dc/xg4m5-25952/xg4m5-14252",
        });

        let panelListFirstNodeResponse;
        let panelListSecondNodeResponse;

        await test.step("1. Getting device list from First node", async () => {
            const panelListFirstNode = await IntegrationController.getOnlinePanelListFirstNode(request);

            expect(panelListFirstNode.status()).toBe(StatusCode.SuccessOK);

            panelListFirstNodeResponse = await panelListFirstNode.json();
            console.log(panelListFirstNodeResponse);
        });

        await test.step("2. Getting device list from Second node", async () => {
            const panelListSecondNode = await IntegrationController.getOnlinePanelListSecondNode(request);

            expect(panelListSecondNode.status()).toBe(StatusCode.SuccessOK);

            panelListFirstNodeResponse = await panelListSecondNode.json();
            console.log(panelListSecondNodeResponse);
        });

    });
});