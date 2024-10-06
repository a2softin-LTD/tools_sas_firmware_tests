import {IFirmwareVersionView} from "../../ws/FirmwareVersionConfig";
import {RxWsHandlerComposite} from "./ws-handler-rx-composite";
import {catchError, map, switchMap, tap, throwError} from "rxjs";
import {WsMethod} from "../domain/constants/ws-connection/ws-commands";
import {ErrorHandler} from "../utils/errors/ErrorHandler";

export class SetupSessionRxUpdater {
    static updateFirmware$(wsInstance: RxWsHandlerComposite, serialNumber: number, allowedVersionConfig: IFirmwareVersionView) {
        wsInstance.initSocket()

        return wsInstance.createSession$(serialNumber)
            .pipe(
                map((initialData => {
                    if (initialData.create.panelSettings.versionCode == allowedVersionConfig.config.versionCode) {
                        throw 1001
                    }

                    console.log(`Install version: ${allowedVersionConfig.versionType}`)
                    return true
                })),

                switchMap(() =>
                    wsInstance.send$(WsMethod.UPDATE_PANEL_FIRMWARE, allowedVersionConfig.config.url)
                ),

                switchMap(() =>
                    wsInstance.awaitState$("update", 'panelSettings', "operationMode", 0)
                ),
                switchMap(() =>
                    wsInstance.awaitState$("update", 'panelSettings', "versionCode", allowedVersionConfig.config.versionCode)
                ),
                tap(() => {
                    wsInstance.close()
                }),

                catchError(errorCode => {
                    wsInstance.close()
                    if (errorCode) {
                        const ERROR = ErrorHandler.handleError(errorCode);
                        console.log(`versionError ${allowedVersionConfig.versionType}: ${ERROR}`);
                        return throwError(() => ({
                            error: ERROR,
                            config: allowedVersionConfig
                        }))
                    }

                })
            )


    }
}