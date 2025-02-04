import {IPanelGroup, IPanelUser} from "./PanelData";

import {SetupSessionRelayDto} from "./relay-typ";
import {PanelReactionsDto} from "./panel-reaction.dto";
import {PcSensorDto} from "./sensor.dto";

export interface PanelUpdateBLock {
    panelSettings?: any,
    users?: IPanelUser[]
    sensors?: PcSensorDto[]
    keyboards?: any[]
    groups?: IPanelGroup[]
    keyFobs?: any[]
    repeaters?: any[]
    zoneExtenders?: any[]
    relays?: SetupSessionRelayDto[],
    reactions?: PanelReactionsDto[],
    alarmServer?: any
}