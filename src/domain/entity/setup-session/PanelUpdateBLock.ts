import {IPanelGroup, IPanelUser} from "./PanelData";

export interface PanelUpdateBLock {
    panelSettings?: any,
    users?: IPanelUser[]
    sensors?: any[]
    keyboards?: any[]
    groups?: IPanelGroup[]
    keyFobs?: any[]
    repeaters?: any[]
    zoneExtenders?: any[]
    relays?: any[]
    alarmServer?: any
}