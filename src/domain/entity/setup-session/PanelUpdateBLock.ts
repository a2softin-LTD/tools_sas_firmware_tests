import { SetupSessionRelayDto } from "./relay-typ";

export interface PanelUpdateBLock {
    panelSettings?: any,
    users?: any[]
    sensors?: any[]
    keyboards?: any[]
    groups?: any[]
    keyFobs?: any[]
    repeaters?: any[]
    zoneExtenders?: any[]
    relays?: SetupSessionRelayDto[]
    alarmServer?: any
}