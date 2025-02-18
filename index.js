//export const DEVICE = process.env.DEVICE_ID_ || "00:08:B7:00:00:16";
export const DEVICE_SAS = process.env.DEVICE_ID || "00:08:B7:10:08:F4";
export const SEVERAL_DEVICES_SAS = process.env.SEVERAL_DEVICES_SAS || "00:08:B7:00:00:08,00:08:B7:10:02:08";
export const REACTION_AMOUNT = process.env.REACTION_AMOUNT || "10";
export const FIRMWARE_VERSION_URLS = process.env.FIRMWARE_VERSIONS ||
        [
            'http://95.67.118.186:29034/fw/xx_76_02/mpx_ua_dev.ebin',
            'http://95.67.118.186:29034/fw/xx_76_01/mpx_ua_dev.ebin',
        ]
        .filter(Boolean).join(',');

export const FIRMWARE_VERSION_URLS_ALL_HUBS =
    [
        'http://95.67.118.186:29034/fw/xx_76_02/mpx_ua_dev.ebin',
        'http://95.67.118.186:29034/fw/xx_76_01/mpx_ua_dev.ebin',
    ]
        .filter(Boolean).join(',')
// export const FIRMWARE_VERSION_URLS = process.env.FIRMWARE_VERSIONS || "http://dev-file.maks.systems:7070/v2/files/b7/22_74.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_73.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_72.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_71.bin,http://dev-file.maks.systems:7070/v2/files/b7/22_75.bin";