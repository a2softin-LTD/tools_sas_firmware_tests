import { FirmwareVersionType } from "./FirmwareVersionType";

export const firmwareVersionConfig = new Map<FirmwareVersionType, {
    versionCode: number,
    fake?: boolean,
    url: string
}>()
    .set(FirmwareVersionType.NEW, {versionCode: 2264, url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_64.bin'})
    .set(FirmwareVersionType.OLD, {versionCode: 2261, url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_63.bin'})
    .set(FirmwareVersionType.OLD, {versionCode: 2261, url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_62.bin'})
    .set(FirmwareVersionType.OLD, {versionCode: 2261, url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_61.bin'})
    .set(FirmwareVersionType.FAKE, {
        versionCode: 1000,
        fake: false,
        url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/10_00.bin'
    });

export const getAnotherVersionConfig = (versionCode: number) => {
    const allowedConfigs = Array.from(firmwareVersionConfig.entries())
        .filter(([_, cfg]) => !cfg.fake && cfg.versionCode != versionCode)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs[0];
}