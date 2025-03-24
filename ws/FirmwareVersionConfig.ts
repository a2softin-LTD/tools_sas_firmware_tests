import { FirmwareVersionType } from "../src/domain/constants/firmware-version.types";

export interface IFirmwareVersionConfig {
    version: string,
    fake?: boolean,
    url: string
}

export interface IFirmwareVersionView  {
    versionType:FirmwareVersionType,
    config:IFirmwareVersionConfig
}

export const firmwareVersionConfigB7 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLDEST, {
        version: "2273",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin'
    })
    .set(FirmwareVersionType.OLD, {
        version: "2274",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin'
    }).set(FirmwareVersionType.NEW, {
        version: "2275",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin'
    });

export const firmwareVersionConfigB3 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLDEST, {
        version: "2273",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_73.bin'
    })
    .set(FirmwareVersionType.OLD, {
        version: "2274",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_74.bin'
    })
    .set(FirmwareVersionType.NEW, {
        version: "2275",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_75.bin'
    });

export const firmwareVersionConfigFiveLastVersionsB7 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLDEST, {
        version: "2271",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_71.bin'
    })
    .set(FirmwareVersionType.OLD, {
        version: "2272",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_72.bin'
    })
    .set(FirmwareVersionType.NEW, {
        version: "2273",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin'
    })
    .set(FirmwareVersionType.LAST, {
        version: "2274",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin'
    })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        version: "2275",
        url: 'http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin'
    });

export const firmwareVersionConfigFiveLastVersionsB3 = new Map<FirmwareVersionType, IFirmwareVersionConfig>()
    .set(FirmwareVersionType.OLDEST, {
        version: "2271",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_71.bin'
    })
    .set(FirmwareVersionType.OLD, {
        version: "2272",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_72.bin'
    })
    .set(FirmwareVersionType.NEW, {
        version: "2273",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_73.bin'
    })
    .set(FirmwareVersionType.LAST, {
        version: "2274",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_74.bin'
    })
    .set(FirmwareVersionType.PRE_PENULTIMATE, {
        version: "2275",
        url: 'http://dev-file.maks.systems:7070/v2/files/b3/22_75.bin'
    });

export const getAnotherVersionConfig = (versionCode: string):IFirmwareVersionView => {
    const allowedConfigs = Array.from(firmwareVersionConfigB7.entries())
        .filter(([_, cfg]) => !cfg.fake && cfg.version != versionCode)
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

export const getSingleFirmwareVersion = (url: string) => {
    const versionParts: string[] = url.split('/')[4].split('_');
    return versionParts[1] + '.' + versionParts[2];
}

export const FIRMWARE_VERSION = (versions: string) => {
    const versionList: string[] = versions.split(',');
    let n: number = 0;
    const versionsMap: Map<FirmwareVersionType, IFirmwareVersionConfig> = new Map<FirmwareVersionType, IFirmwareVersionConfig>();
    for (const version of versionList) {
        const versionParts: string[] = version.split('/')[4].split('_');
        const versionNumber: string = versionParts[1] + '.' + versionParts[2];
        versionsMap.set(FirmwareVersionType[String(n)], {
            version: versionNumber,
            url: version,
        })
        n++;
    }
    return Array.from(versionsMap.entries())
        .filter(([_, cfg]) => !cfg.fake)
        .map(([versionType, config]) => ({versionType, config}));
}
