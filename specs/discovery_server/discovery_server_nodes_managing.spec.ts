import { expect, test } from "@playwright/test";
import { IntegrationController } from "../../api/controllers/IntegrationController";
import StatusCode from "status-code-enum";

test.describe('Checking the behavior of the Discovery server', () => {

    test.beforeEach(async () => {
    });

    test.afterEach(async () => {
    });

    test('Disconnecting one of the panel-server nodes', {tag:['@smoke']}, async ({ request }) => {
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