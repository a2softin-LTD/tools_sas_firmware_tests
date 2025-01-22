import {SetupSessionRelayDto} from "./relay-typ";
import {PanelReactionsDto} from "./panel-reaction.dto";
import {PcSensorDto} from "./sensor.dto";

export interface PanelUpdateBLock {
    panelSettings?: any,
    users?: any[]
    sensors?: PcSensorDto[]
    keyboards?: any[]
    groups?: any[]
    keyFobs?: any[]
    repeaters?: any[]
    zoneExtenders?: any[]
    relays?: SetupSessionRelayDto[],
    reactions?: PanelReactionsDto[],
    alarmServer?: any
}