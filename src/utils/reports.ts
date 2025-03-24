import { PanelConvertersUtil } from "./converters/panel-converters.util";
import {ReportModel} from "../../models/ReportModel";

export function reports(
    testDate: string,
    serialNumberHex: string[],
    currentVersion: string,
    finalVersion: string,
    totalTime: number,
    connectionChannel: string,
    upgradeIterationAmount: number,
    overallTestInfo: ReportModel[],
) {
    console.log();
    console.log();
    console.log();
    console.log('******* Total test report *******');
    console.log();
    console.log(`1. Test date: ${testDate}`);
    console.log();
    console.log('2. DevicesID (hex / dec):');
    serialNumberHex.forEach(e => console.log(`'${e}' -> '${PanelConvertersUtil.serialToDec(e)}'`));
    console.log();
    console.log(`3. Current version: ${currentVersion}`);
    console.log();
    console.log(`4. Final version: ${finalVersion}`);
    console.log();
    console.log(`5. Test total time execution: ${totalTime}`);
    console.log();
    console.log(`6. Connection channel: ${connectionChannel}`);
    console.log();
    console.log(`7. Upgrade iteration amount: ${upgradeIterationAmount}`);
    console.log();
    console.log('***************************');
    console.log();
    console.log();
    console.log();
    console.log('******* Test report for each device *******');
    console.log();
    overallTestInfo.forEach(e => {
        console.log(`- connection channel: ${e.connectionChannel}`);
        console.log(`- serial number hex: ${e.serialNumberHex}`);
        console.log(`- test start time: ${e.testStartTime}`);
        console.log(`- test finish time: ${e.testFinishTime}`);
        console.log(`- test duration time: ${e.testDurationInSeconds} sec`);
        console.log(`- upgrade iteration amount: ${e.upgradeIterationAmount}`);
        e.versionFromTo.forEach((version, index) => {
            console.log(`${version} lasted ${e.testVersionUpgradeTime[index]}`)
        })
    });
}

export function vision(serialNumber: number) {
    console.log();
    console.log();
    console.log();
    console.log();
    console.log();
    console.log(`DEVICE_ID = ${serialNumber}`);
    console.log('****************************************************************************************************');
    console.log('****************************************************************************************************');
    console.log();
    console.log(`************************************** DeviceId -> ${serialNumber} *************************************`);
    console.log();
    console.log('****************************************************************************************************');
    console.log('****************************************************************************************************');
}