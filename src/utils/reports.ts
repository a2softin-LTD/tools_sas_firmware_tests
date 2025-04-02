import { PanelConvertersUtil } from "./converters/panel-converters.util";

export function reports(
    testDate: string,
    serialNumberHex: string,
    totalTime: number,
    connectionChannel: string,
    upgradeIterationAmount: number,
) {
    console.log();
    console.log();
    console.log();
    console.log('II. TEST REPORT');
    console.log();
    console.log(`1. Test date: ${testDate}`);
    console.log();
    console.log('2. DeviceID (hex / dec):');
    console.log(`'${serialNumberHex}' / '${PanelConvertersUtil.serialToDec(serialNumberHex)}'`);
    console.log();
    console.log(`3. Test total time execution: ${totalTime} sec`);
    console.log();
    console.log(`4. Connection channel: ${connectionChannel}`);
    console.log();
    console.log(`5. Upgrade iteration amount: ${upgradeIterationAmount}`);
    console.log();
}

export function vision(serialNumber: number, channel: string, time: string) {
    console.log();
    console.log(`DEVICE_ID = ${serialNumber}`);
    console.log(`Connection channel: "${channel}"`);
    console.log(`Test started at ${time}`);
    console.log();
}