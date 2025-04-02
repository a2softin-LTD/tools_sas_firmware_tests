import { test } from "@playwright/test";
import { getSingleFirmwareVersion } from "../../../ws/FirmwareVersionConfig";
import { PanelConvertersUtil } from "../../../src/utils/converters/panel-converters.util";
import { getConfigurationFromFile } from "../../../src/utils/getConfigurationFromFile";
import { reports } from "../../../src/utils/reports";
import { ReportModel } from "../../../models/ReportModel";
import { singleUserMultipleDevicesUpdater } from "../../../utils/updaterTools";
import moment = require("moment");

test('#1. Device="00:08:B7:10:02:08" - success upgrade device/devices', {tag: '@sas_upgrade_async_single_user_multiple_devices'}, async ({request}) => {
    const userData = getConfigurationFromFile();
    const DEVICES_HEX: string[] = userData[0].deviceIdsHex;
    const DEVICES_DEC: number[] = userData[0].deviceIdsHex.map(e => PanelConvertersUtil.serialToDec(e));

    let channel: string;
    let oldVersion: string;
    let overallTestInfo: ReportModel[] = [];

    // Number of retries
    test.describe.configure({retries: userData[0].retries});


    console.log("I. TEST PROGRESS");
    console.log();

    const totalTestStartTime: number = moment().valueOf();

    // 1. Getting test user data
    for (const serialNumber of DEVICES_DEC) {
        //await singleUserMultipleDevicesUpdater(request, userData[0].cycle, serialNumber);
    }
    console.log(`Overall test finished at ${moment().format('LTS')}`);

    const totalTestFinishTime: number = moment().valueOf();
    const testDate: string = moment().format('YYYY-MM-DD');
    const serialNumberHex: string[] = userData[0].deviceIdsHex;
    const currentVersion: string = oldVersion;
    const finalVersion: string = getSingleFirmwareVersion(userData[0].versions[userData[0].versions.length - 1]);
    const totalTime: number = Math.round(100 * (totalTestFinishTime - totalTestStartTime) / 1000) / 100;
    const connectionChannel: string = channel;
    const upgradeIterationAmount: number = userData[0].cycle;

    reports(
        testDate,
        serialNumberHex,
        totalTime,
        connectionChannel,
        upgradeIterationAmount,
        overallTestInfo,
    );
});