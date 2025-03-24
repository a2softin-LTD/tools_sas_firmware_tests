export interface ReportModel {
    serialNumberHex: string,
    versionFromTo: string[],
    testStartTime: string,
    testFinishTime: string,
    testVersionUpgradeTime: number[],
    testDurationInSeconds: number,
    connectionChannel: string,
    upgradeIterationAmount: number,
    overallTestInfo?: ReportModel[],
}