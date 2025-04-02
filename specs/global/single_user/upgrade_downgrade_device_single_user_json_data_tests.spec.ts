import { test } from "@playwright/test";
import { PanelConvertersUtil } from "../../../src/utils/converters/panel-converters.util";
import { getConfigurationFromFile } from "../../../src/utils/getConfigurationFromFile";
import { reports } from "../../../src/utils/reports";
import { ReportModel } from "../../../models/ReportModel";
import { singleUserSingleDeviceUpdater } from "../../../utils/updaterTools";
import moment = require("moment");

test('#1 Device. [SAS MPX] positive: Success upgrade device/devices', { tag: '@sas_upgrade_async_single_user_multiple_devices_json' }, async ({request}) => {
    const userData = getConfigurationFromFile();
    const DEVICES_DEC: number[] = userData[0].deviceIdsHex.map(e => PanelConvertersUtil.serialToDec(e));

    let overallTestInfo: ReportModel[] = [];

    console.log("I. TEST PROGRESS");
    console.log();

    const totalTestStartTime: number = moment().valueOf();

    // Main block
    const testResults: ReportModel =  await singleUserSingleDeviceUpdater(
        request,
        userData[0].user,
        userData[0].versions.filter(Boolean).join(','),
        userData[0].deviceIdsHex,
        userData[0].cycle,
        DEVICES_DEC[0],
    );

    console.log(testResults);
    console.log(`Overall test finished at ${moment().format('LTS')}`);

    const totalTestFinishTime: number = moment().valueOf();
    const testDate: string = moment().format('YYYY-MM-DD');
    const serialNumberHex: string = userData[0].deviceIdsHex[0];
    const totalTime: number = Math.round(100 * (totalTestFinishTime - totalTestStartTime) / 1000) / 100;
    const connectionChannel: string = testResults.connectionChannel;
    const upgradeIterationAmount: number = userData[0].cycle;

    reports(
        testDate,
        serialNumberHex,
        totalTime,
        connectionChannel,
        upgradeIterationAmount,
    );
});

test('#2 Device. [SAS MPX] positive: Success upgrade device/devices', { tag: '@sas_upgrade_async_single_user_multiple_devices_json' }, async ({request}) => {
    const userData = getConfigurationFromFile();
    const DEVICES_DEC: number[] = userData[0].deviceIdsHex.map(e => PanelConvertersUtil.serialToDec(e));

    let overallTestInfo: ReportModel[] = [];

    console.log("I. TEST PROGRESS");
    console.log();

    const totalTestStartTime: number = moment().valueOf();

    // Main block
    const testResults: ReportModel =  await singleUserSingleDeviceUpdater(
        request,
        userData[0].user,
        userData[0].versions.filter(Boolean).join(','),
        userData[0].deviceIdsHex,
        userData[0].cycle,
        DEVICES_DEC[1],
    );

    console.log(`Overall test finished at ${moment().format('LTS')}`);

    const totalTestFinishTime: number = moment().valueOf();
    const testDate: string = moment().format('YYYY-MM-DD');
    const serialNumberHex: string = userData[0].deviceIdsHex[1];
    const totalTime: number = Math.round(100 * (totalTestFinishTime - totalTestStartTime) / 1000) / 100;
    const connectionChannel: string = testResults.connectionChannel;
    const upgradeIterationAmount: number = userData[0].cycle;

    reports(
        testDate,
        serialNumberHex,
        totalTime,
        connectionChannel,
        upgradeIterationAmount,
    );
});