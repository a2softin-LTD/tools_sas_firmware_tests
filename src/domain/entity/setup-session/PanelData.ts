import { PanelReactionsDto } from "./panel-reaction.dto";

export interface PanelData {
    panelSettings?: any,
    users?: any,
    sensors?: any
    keyboards?: any,
    groups?: any,
    keyFobs?: any
    repeaters: any
    alarmServer?: any,
    reactions?: PanelReactionsDto[]
}