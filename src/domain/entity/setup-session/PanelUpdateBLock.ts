import {SetupSessionRelayDto} from "./relay-typ";
import {PanelReactionsDto} from "./panel-reaction.dto";

export interface PanelUpdateBLock {
    panelSettings?: any,
    users?: any[]
    sensors?: any[]
    keyboards?: any[]
    groups?: any[]
    keyFobs?: any[]
    repeaters?: any[]
    zoneExtenders?: any[]
    relays?: SetupSessionRelayDto[],
    reactions?: PanelReactionsDto[],
    alarmServer?: any
}