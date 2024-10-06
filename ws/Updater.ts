import { WsHandler } from "./WsHandler";
import { IFirmwareVersionView } from "./FirmwareVersionConfig";
import { WsMethod } from "../src/domain/constants/ws-connection/ws-commands";
import { ErrorHandler } from "../src/utils/errors/ErrorHandler";


export class Updater {
    static async update(wsInstance: WsHandler, serialNumber: number, allowedVersionConfig: IFirmwareVersionView) {
        try {
            const initialData = await wsInstance.createSocket(serialNumber);
            if (initialData["create"]['panelSettings']['versionCode'] == allowedVersionConfig.config.versionCode)
                throw 1001;
            // const allowedVersionConfig = getAnotherVersionConfig(initialData["create"]['panelSettings']['versionCode'])
            console.log(`Install version: ${allowedVersionConfig.versionType}`)

            await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, allowedVersionConfig.config.url);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "operationMode", 0);
            await wsInstance.getSubscribedObjectData("update", 'panelSettings', "versionCode", allowedVersionConfig.config.versionCode);
            wsInstance.close();
        } catch (error) {
            wsInstance.close();
            if (error) {
                const ERROR = ErrorHandler.handleError(error);
                console.log(`versionError ${allowedVersionConfig.versionType}: ${ERROR}`);
                throw {
                    error: ERROR,
                    config: allowedVersionConfig
                };
            }
        }
    }
}