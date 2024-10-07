import {FirmwareVersionType} from "../src/domain/constants/firmware-version.types";

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
        versionCode: 2271,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_71.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2272,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_72.bin'
    });

export const firmwareVersionConfigB3 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLD, {
        versionCode: 2271,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_71.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2272,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_72.bin'
    });

export const firmwareVersionConfigFiveLastVersionsB7 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLD, {
        versionCode: 2267,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_67.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2269,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_69.bin'
    })
    .set(FirmwareVersionType.LAST, {
        versionCode: 2271,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_71.bin'
    })
    // .set(FirmwareVersionType.PENULTIMATE, {
    //     versionCode: 2264,
    //     url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_64.bin'
    // })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        versionCode: 2272,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b7/22_72.bin'
    });

export const firmwareVersionConfigFiveLastVersionsB3 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLD, {
        versionCode: 2267,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_67.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2269,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_69.bin'
    })
    .set(FirmwareVersionType.LAST, {
        versionCode: 2271,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_71.bin'
    })
    // .set(FirmwareVersionType.PENULTIMATE, {
    //     versionCode: 2264,
    //     url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_64.bin'
    // })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        versionCode: 2272,
        url: 'http://devfirmware.maks.systems:8080/v2/files/b3/22_72.bin'
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

export const getAllVersionConfigsFiveLastVersions = (deviceVersion: string):IFirmwareVersionView[] => {
    if (deviceVersion === 'B7') {
        return Array.from(firmwareVersionConfigFiveLastVersionsB7.entries())
            .filter(([_, cfg]) => !cfg.fake)
            .map(([versionType, config]) => ({versionType, config}));
    }
    return Array.from(firmwareVersionConfigFiveLastVersionsB3.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}));
}

