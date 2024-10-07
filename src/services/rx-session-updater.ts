import {IFirmwareVersionView} from "../../ws/FirmwareVersionConfig";
import {WsHandlerRxSetupSession} from "./ws-handler-rx-setup-session";
import {catchError, map, of, switchMap, tap, throwError} from "rxjs";
import {ControlPanelSessionCommands, WsMethod} from "../domain/constants/ws-connection/ws-commands";
import {ErrorHandler} from "../utils/errors/ErrorHandler";
import {WsHandlerRxControlSession} from "./ws-handler-rx-control-session";

export class SetupSessionRxUpdater {
    static updateFirmware$(wsInstance: WsHandlerRxSetupSession, serialNumber: number, allowedVersionConfig: IFirmwareVersionView) {
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
                    //  await "panel update"  activation
                    wsInstance.awaitState$("update", 'panelSettings', "operationMode", 0)
                ),
                switchMap(() =>
                    //  await "panel update" complete
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

    updateFirmwareOnArmPanel$(wsSetupInstance: WsHandlerRxSetupSession, wsControlInstance: WsHandlerRxControlSession,
                              serialNumber: number, allowedVersionConfig: IFirmwareVersionView) {
        wsSetupInstance.initSocket()
        //  create setup session
        return wsSetupInstance.createSession$(serialNumber)
            .pipe(
                map((initialData => {
                    if (initialData.create.panelSettings.versionCode == allowedVersionConfig.config.versionCode) {
                        throw 1001
                    }

                    console.log(`Install version: ${allowedVersionConfig.versionType}`)
                    return true
                })),

                switchMap(() => {
                    // todo - check if user can arm panel
                    return of(true)
                }),

                switchMap(() => {
                    //  create control session
                    wsControlInstance.initSocket()
                    return wsControlInstance.createSession$(serialNumber)
                }),
                switchMap(() => {
                    // todo -  arm 1st group of panel. add subscription checker
                    return wsControlInstance.send$(ControlPanelSessionCommands.ARM_AWAY, {groups: [1]})
                }),

                switchMap(() => {
                    //todo - implement logic for update firmware on arm panel N times. MB user 'keepPanelSession' command (increase session time)
                    return of(true)
                }),


                switchMap(() => {
                    //TODO  disarm 1st group of panel . add subscription checker
                    return wsControlInstance.send$(ControlPanelSessionCommands.DISARM, {groups: [1]})
                }),

                tap(() => {
                    //close sockets
                    wsControlInstance.close()
                    wsSetupInstance.close()
                }),

                catchError(errorCode => {
                    wsSetupInstance.close()
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