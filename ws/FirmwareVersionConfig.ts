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

export const firmwareVersionConfigB7 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLD, {
        versionCode: 2267,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_67.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2268,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_68.bin'
    });

export const firmwareVersionConfigB3 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLD, {
        versionCode: 2267,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_67.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2268,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_68.bin'
    });

export const firmwareVersionConfigFiveLastVersions = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLD, {
        versionCode: 2264,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_64.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2265,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_65.bin'
    })
    .set(FirmwareVersionType.LAST, {
        versionCode: 2266,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_66.bin'
    })
    .set(FirmwareVersionType.PENULTIMATE, {
        versionCode: 2267,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_67.bin'
    })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        versionCode: 2268,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_68.bin'
    });

export const getAnotherVersionConfig = (versionCode: number):IFirmwareVersionView => {
    const allowedConfigs = Array.from(firmwareVersionConfigB7.entries())
        .filter(([_, cfg]) => !cfg.fake && cfg.versionCode != versionCode)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs[0];
}

export const getAllVersionConfigsB7 = ():IFirmwareVersionView[] => {
    const allowedConfigs = Array.from(firmwareVersionConfigB7.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs;
}

export const getAllVersionConfigsB3 = ():IFirmwareVersionView[] => {
    const allowedConfigs = Array.from(firmwareVersionConfigB3.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs;
}

export const getAllVersionConfigsFiveLastVersions = ():IFirmwareVersionView[] => {
    const allowedConfigs = Array.from(firmwareVersionConfigFiveLastVersions.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}))
    return allowedConfigs;
}

