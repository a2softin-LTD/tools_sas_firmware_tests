import { WsHandler } from "./WsHandler";
import { IFirmwareVersionView } from "../../ws/FirmwareVersionConfig";
import { ControlPanelSessionCommands, WsMethod } from "../domain/constants/ws-connection/ws-commands";
import { ErrorHandler } from "../utils/errors/ErrorHandler";
import { WsControlHandler } from "./WsControlHandler";
import {
    ArmStatesEnum,
    IControlGroupState, IControlPanelParsedInfo,
    IControlPanelUpdateBlock
} from "../domain/entity/control-session/control-panel-data";
import { PanelParsedInfo } from "../domain/entity/setup-session/PanelParsedInfo";

export class Updater {
    static async currentVersion(wsInstance: WsHandler, serialNumber: number) {
        const initialData: PanelParsedInfo = await wsInstance.createSocket(serialNumber);
        let currentVersion: string = '';
        try {
            currentVersion = initialData['create']['panelSettings']['version'];
        } catch(e) {
            currentVersion = initialData['update']['panelSettings']['version'];
        }
        return currentVersion;
    }

    static async update(wsInstance: WsHandler, serialNumber: number, allowedVersionConfig: IFirmwareVersionView) {
        try {
            const initialData = await wsInstance.createSocket(serialNumber);
            if (initialData['create']['panelSettings']['version'].includes(allowedVersionConfig.config.version)) {
                console.log('Error 101');
                throw 1001;
            }
            // const allowedVersionConfig = getAnotherVersionConfig(initialData['create']['panelSettings']['versionCode'])
            //console.log(`Install the version: ${allowedVersionConfig.versionType}`)

            await wsInstance.send(WsMethod.UPDATE_PANEL_FIRMWARE, allowedVersionConfig.config.url);
            // await wsInstance.getSubscribedObjectData('update', 'panelSettings', "operationMode", 0);
            await wsInstance.getSubscribedObjectData('update', 'panelSettings', "version", allowedVersionConfig.config.version, 'substring');
            wsInstance.close();
        } catch (error) {
            wsInstance.close();
            console.log(error);
            if (error) {
                const ERROR: string = ErrorHandler.handleError(error);
                console.log(`versionError ${allowedVersionConfig.versionType}: ${ERROR}`);
                throw {
                    error: ERROR,
                    config: allowedVersionConfig,
                };
            }
        }
    }

    static async armPanel(wsInstance: WsControlHandler, serialNumber: number) {
        const initialData: IControlPanelParsedInfo = await wsInstance.createSocket(serialNumber);
        const groups: IControlGroupState[] = initialData.create?.groups;
        const firstGroupIndex: number = groups[0].index;

        console.log("armPanel: ", initialData);
        console.log("firstGroupIndex: ", firstGroupIndex);

        await wsInstance.update({
            subscribeMethod: "update", subscribePart: 'groups',
            validityFunction: (groups: IControlPanelUpdateBlock["groups"]) => {
                if (!groups?.length) {
                    return false;
                }
                const armedGroupExist: boolean = Boolean(
                    groups.filter(el => el.states.includes(ArmStatesEnum.ArmedAway))
                        .some(el => el.index == firstGroupIndex),
                )
                return armedGroupExist;
            },
            method: ControlPanelSessionCommands.ARM_AWAY,
            data: {groups: [firstGroupIndex]},
        })
        console.log("wsInstance success!!!");

        wsInstance.close();
    }

    static async disarmPanel(wsInstance: WsControlHandler, serialNumber: number) {
        const initialData = await wsInstance.createSocket(serialNumber);
        const groups = initialData.create?.groups;
        const armedGroups = groups
            .filter(el => el.states.includes(ArmStatesEnum.ArmedAway));

        if (!armedGroups.length) {
            return true;
        }

        const firstGroupIndex = armedGroups[0].index;

        await wsInstance.update({
            subscribeMethod: "update", subscribePart: 'groups',
            validityFunction: (groups: IControlPanelUpdateBlock["groups"]) => {
                if (!groups?.length) {
                    return false;
                }
                const disarmedGroupExist: boolean = Boolean(
                    groups.filter(el => el.states.includes(ArmStatesEnum.Disarm))
                        .some(el => el.index == firstGroupIndex),
                )
                return disarmedGroupExist;
            },
            method: ControlPanelSessionCommands.DISARM,
            data: {groups: [firstGroupIndex]},
        })
        wsInstance.close();
    }

    static async armGroupsListOfPanel(wsInstance: WsControlHandler, serialNumber: number, groupIndexes: Array<number>) {
        const initialData: IControlPanelParsedInfo = await wsInstance.createSocket(serialNumber);
        const initialGroups = initialData.create?.groups;
        const armedGroups = initialGroups
            .filter(el => el.states.some(state => [ArmStatesEnum.ArmedStay, ArmStatesEnum.ArmedAway].includes(state)));
        const notArmedGroupsIndexes: number[] = groupIndexes.filter(gi => !armedGroups.some(group => group.index == gi));

        for (const groupIndex of notArmedGroupsIndexes) {
            await wsInstance.update({
                subscribeMethod: "update", subscribePart: 'groups',
                validityFunction: (groups: IControlPanelUpdateBlock["groups"]) => {
                    if (!groups?.length) return false
                    const armedGroupExist: boolean = Boolean(
                        groups.filter(el => el.states.includes(ArmStatesEnum.ArmedAway))
                            .some(el => el.index == groupIndex),
                    )
                    return armedGroupExist;
                },
                method: ControlPanelSessionCommands.ARM_AWAY,
                data: {groups: [groupIndex]}
            })
        }
        console.log("wsInstance success!!!");

        wsInstance.close();
    }

    static async disarmAllGroupsOfPanel(wsInstance: WsControlHandler, serialNumber: number) {
        const initialData = await wsInstance.createSocket(serialNumber);
        const groups = initialData.create?.groups;
        const armedGroups = groups
            .filter(el => el.states.some(state => [ArmStatesEnum.ArmedStay, ArmStatesEnum.ArmedAway].includes(state)));

        if (!armedGroups.length) {
            return true;
        }

        let groupIndex: number;
        for (const armedGroup of armedGroups) {
            groupIndex = armedGroup.index;

            await wsInstance.update({
                subscribeMethod: "update", subscribePart: 'groups',
                validityFunction: (groups: IControlPanelUpdateBlock["groups"]) => {
                    if (!groups?.length) return false
                    const disarmedGroupExist: boolean = Boolean(
                        groups.filter(el => el.states.includes(ArmStatesEnum.Disarm))
                            .some(el => el.index == groupIndex),
                    )
                    return disarmedGroupExist;
                },
                method: ControlPanelSessionCommands.DISARM,
                data: {groups: [groupIndex]},
            })
        }
        wsInstance.close();
    }
}
