import { FirmwareVersionType } from "../src/domain/constants/firmware-version.types";
import { FIRMWARE_VERSION_URLS } from "../index";

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
    .set(FirmwareVersionType.OLDEST, {
        versionCode: 2273,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin'
    })
    .set(FirmwareVersionType.OLD, {
        versionCode: 2274,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin'
    }).set(FirmwareVersionType.NEW, {
        versionCode: 2275,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin'
    });

export const firmwareVersionConfigB3 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLDEST, {
        versionCode: 2273,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_73.bin'
    })
    .set(FirmwareVersionType.OLD, {
        versionCode: 2274,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_74.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2275,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_75.bin'
    });

export const firmwareVersionConfigFiveLastVersionsB7 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLDEST, {
        versionCode: 2271,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_71.bin'
    })
    .set(FirmwareVersionType.OLD, {
        versionCode: 2272,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_72.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2273,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin'
    })
    .set(FirmwareVersionType.LAST, {
        versionCode: 2274,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin'
    })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        versionCode: 2275,
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin'
    });

export const firmwareVersionConfigFiveLastVersionsB3 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLDEST, {
        versionCode: 2271,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_71.bin'
    })
    .set(FirmwareVersionType.OLD, {
        versionCode: 2272,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_72.bin'
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: 2273,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_73.bin'
    })
    .set(FirmwareVersionType.LAST, {
        versionCode: 2274,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_74.bin'
    })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        versionCode: 2275,
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_75.bin'
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

let ver = (url: string) => url.slice(url.length - 9, -4).replace('_','');

export const FIRMWARE_VERSION_CONFIG = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.LAST, {
        versionCode: Number(ver(FIRMWARE_VERSION_URLS.split(',')[0])),
        url: FIRMWARE_VERSION_URLS.split(',')[0]
    })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        versionCode: Number(ver(FIRMWARE_VERSION_URLS.split(',')[1])),
        url: FIRMWARE_VERSION_URLS.split(',')[1]
    })
    .set(FirmwareVersionType.OLD, {
        versionCode: Number(ver(FIRMWARE_VERSION_URLS.split(',')[2])),
        url: FIRMWARE_VERSION_URLS.split(',')[2]
    })
    .set(FirmwareVersionType.OLDEST, {
        versionCode: Number(ver(FIRMWARE_VERSION_URLS.split(',')[3])),
        url: FIRMWARE_VERSION_URLS.split(',')[3]
    })
    .set(FirmwareVersionType.NEW, {
        versionCode: Number(ver(FIRMWARE_VERSION_URLS.split(',')[4])),
        url: FIRMWARE_VERSION_URLS.split(',')[4]
    });

export const GET_FIVE_LAST_VERSIONS = ():IFirmwareVersionView[] => {
    return Array.from(FIRMWARE_VERSION_CONFIG.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}));
}

