import {FirmwareVersionType} from "./FirmwareVersionType";

export interface IFirmwareVersionConfig {
    versionCode: number,
    fake?: boolean,
    url: string
}

export interface IFirmwareVersionView  {
    versionType:FirmwareVersionType,
    config:IFirmwareVersionConfig
}

export const firmwareVersionConfig = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.NEWEST, {
        versionCode: 2266,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_66.bin'
    })
    .set(FirmwareVersionType.OLD, {
        versionCode: 2265,
        url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_65.bin'
    });

export const firmwareVersionConfigFiveLastVersions = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.NEWEST, {
        versionCode: 2266,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_66.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2265,
        url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_65.bin'
    })
    .set(FirmwareVersionType.LAST, {
        versionCode: 2264,
        url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_64.bin'
    })
    .set(FirmwareVersionType.PENULTIMATE, {
        versionCode: 2263,
        url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_63.bin'
    })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        versionCode: 2262,
        url: 'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_62.bin'
    });

export const getAnotherVersionConfig = (versionCode: number):IFirmwareVersionView => {
    const allowedConfigs = Array.from(firmwareVersionConfig.entries())
        .filter(([_, cfg]) => !cfg.fake && cfg.versionCode != versionCode)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs[0];
}

export const getAllVersionConfigs = ():IFirmwareVersionView[] => {
    const allowedConfigs = Array.from(firmwareVersionConfig.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs;
}

export const getAllVersionConfigsFiveLastVersions = ():IFirmwareVersionView[] => {
    const allowedConfigs = Array.from(firmwareVersionConfig.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs;
}

