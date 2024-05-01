import { FirmwareVersionType } from "./FirmwareVersionType";

export const firmwareVersionConfig = new Map<FirmwareVersionType, { versionCode: number, url: string }>()
    .set(FirmwareVersionType.NEW, {versionCode:2261, url:'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_61.bin'})
    .set(FirmwareVersionType.OLD, {versionCode:2258, url:'ftp://devfirmware.maks.systems:2221/v2/files/b7/22_58.bin'})
