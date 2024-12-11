export const DEVICE = process.env.DEVICE_ID || "00:08:B7:10:08:F4";
export const FIRMWARE_VERSION_URLS = process.env.FIRMWARE_VERSIONS ||
    [
        'http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin',
        'http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin',
        'http://dev-file.maks.systems:7070/v2/files/b7/22_72.bin',
        'http://dev-file.maks.systems:7070/v2/files/b7/22_71.bin',
        'http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin',
    ]
        .filter(Boolean).join(',');

export const FIRMWARE_VERSION_URLS_ALL_HUBS =
    [
        'http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin',
        'http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin',
    ]
        .filter(Boolean).join(',')
// export const FIRMWARE_VERSION_URLS = process.env.FIRMWARE_VERSIONS || "http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_72.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_71.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin";