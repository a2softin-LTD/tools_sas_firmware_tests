import { expect, test } from "@playwright/test";
import { IntegrationController } from "../../api/controllers/IntegrationController";
import StatusCode from "status-code-enum";
import { ConsoleCommandController } from "../../console/controller/ConsoleCommandController";
import { FIRST_NODE } from "../../utils/Constants";

test.describe('Checking the behavior of the Discovery server', () => {

    test.beforeEach(async () => {
    });

    test.afterEach(async () => {
    });

    test('Disconnecting one of the panel-server nodes', { tag:['@discovery-server'] }, async ({ request, page }) => {
        test.info().annotations.push({
            type: "4.1",
            description: "https://app.clickup.com/30937733/v/dc/xg4m5-25952/xg4m5-14252",
        });

        const WAIT_TIME: number = 3000;

        let panelListFirstNodeBeforeMigration;
        let panelListFirstNodeAfterMigration;
        let panelListSecondNodeBeforeMigration;
        let panelListSecondNodeAfterMigration;
        let panelListFirstNodeResponse;
        let panelListSecondNodeResponse;
        let panelListFirstNodeResponseBeforeMigration;
        let panelListFirstNodeResponseAfterMigration;
        let panelListSecondNodeResponseBeforeMigration;
        let panelListSecondNodeResponseAfterMigration;

        await test.step("1. Getting device list from First Node", async () => {
            console.log();
            console.log("STEP1: 'Getting device list from First Node' - Started");

            panelListFirstNodeBeforeMigration = await IntegrationController.getOnlinePanelListFirstNode(request);

            expect(panelListFirstNodeBeforeMigration.status()).toBe(StatusCode.SuccessOK);

            panelListFirstNodeResponseBeforeMigration = await panelListFirstNodeBeforeMigration.json();
            console.log(panelListFirstNodeResponseBeforeMigration);

            console.log("STEP1 - Completed");
            console.log();
        });

        await test.step("2. Getting device list from Second Node", async () => {
            console.log();
            console.log("STEP2: 'Getting device list from Second Node' - Started");

            panelListSecondNodeBeforeMigration = await IntegrationController.getOnlinePanelListSecondNode(request);

            expect(panelListSecondNodeBeforeMigration.status()).toBe(StatusCode.SuccessOK);

            panelListSecondNodeResponseBeforeMigration = await panelListSecondNodeBeforeMigration.json();
            console.log(panelListSecondNodeResponseBeforeMigration);

            console.log("STEP2 - Completed");
            console.log();
        });
        
        await test.step("3. Quarantine First Node", async () => {
            console.log();
            console.log("STEP3: 'Quarantine First Node' - Started");

            // Get Firewall rules
            const getFirewallRulesConsoleCommand = ConsoleCommandController.getFirewallRules();

            console.log(getFirewallRulesConsoleCommand);

            // Quarantine First Node
            ConsoleCommandController.disableNode(FIRST_NODE);

            console.log("STEP3 - Completed");
            console.log();
        });

        await test.step("4. Waiting ${WAIT_TIME} minutes while devices migrate to the working Second Node", async () => {
            console.log();
            console.log("STEP4: 'Waiting ${WAIT_TIME} minutes while devices migrate to the working Second Node' - Started");

            await new Promise((resolve, reject) => {
                setTimeout(resolve, WAIT_TIME);
            });

            console.log("STEP4 - Completed");
            console.log();
        });

        await test.step("5. Getting device list from Second Node", async () => {
            console.log();
            console.log("STEP5: 'Getting device list from Second Node' - Started");

            panelListSecondNodeAfterMigration = await IntegrationController.getOnlinePanelListSecondNode(request);

            expect(panelListSecondNodeAfterMigration.status()).toBe(StatusCode.SuccessOK);

            panelListSecondNodeResponse = await panelListSecondNodeAfterMigration.json();
            console.log(panelListSecondNodeResponse);

            console.log("STEP5 - Completed");
            console.log();
        });

        await test.step("6. Check that the Second Node contains all devices of the First Node", async () => {
            console.log();
            console.log("STEP6: 'Check that the Second Node contains all devices of the First Node' - Started");

            expect (panelListSecondNodeAfterMigration).toContain(panelListFirstNodeResponseBeforeMigration);

            console.log("STEP6 - Completed");
            console.log();
        });

        await test.step("7. Bring the First Node out of quarantine", async () => {
            console.log();
            console.log("STEP7: 'Bring the First Node out of quarantine' - Started");



            console.log("STEP7 - Completed");
            console.log();
        });

        await test.step("8. Waiting ${WAIT_TIME} minutes while First Node's devices migrate to the working First Node", async () => {
            console.log();
            console.log("STEP8: 'Waiting ${WAIT_TIME} minutes while First Node's devices migrate to the working First Node' - Started");

            await new Promise((resolve, reject) => {
                setTimeout(resolve, WAIT_TIME);
            });

            console.log("STEP8 - Completed");
            console.log();
        });

        await test.step("9. Check that the devices have returned to the First Node", async () => {
            console.log();
            console.log("STEP9: 'Check that the devices have returned to the First Node' - Started");

            panelListFirstNodeAfterMigration = await IntegrationController.getOnlinePanelListFirstNode(request);

            expect(panelListFirstNodeAfterMigration.status()).toBe(StatusCode.SuccessOK);

            panelListFirstNodeResponseAfterMigration = await panelListFirstNodeAfterMigration.json();
            console.log(panelListFirstNodeResponseAfterMigration);

            expect(panelListFirstNodeResponseAfterMigration).toStrictEqual(panelListFirstNodeResponseBeforeMigration);

            console.log("STEP9 - Completed");
            console.log();
        });

        await test.step("10. Make sure that the devices of the Second Node remain in place.", async () => {
            console.log();
            console.log("STEP10: 'Make sure that the devices of the Second Node remain in place.' - Started");

            panelListFirstNodeAfterMigration = await IntegrationController.getOnlinePanelListFirstNode(request);

            expect(panelListFirstNodeAfterMigration.status()).toBe(StatusCode.SuccessOK);

            panelListFirstNodeResponseAfterMigration = await panelListFirstNodeAfterMigration.json();
            console.log(panelListFirstNodeResponseAfterMigration);

            expect(panelListFirstNodeResponseAfterMigration).toStrictEqual(panelListFirstNodeResponseBeforeMigration);

            console.log("STEP10 - Completed");
            console.log();
        });
    });

    test.skip('Resetting the device to factory settings and initial inclusion in the system without discovery', { tag:['@discovery-server'] }, async ({ request }) => {
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