import {bit} from "../../types/bit.type";

import { PanelReactionsDto } from "./panel-reaction.dto";

export interface PanelData {
    panelSettings?: any,
    users?: IPanelUser,
    sensors?: any
    keyboards?: any,
    groups?: any,
    keyFobs?: any
    repeaters: any
    alarmServer?: any,
    reactions?: PanelReactionsDto[]
}


export interface IPanelUser {
    index?: number,
    name?: string,
    state?: number,
    pinCode?: number,
    maksMobileLogin?: string,
    mobileAppAllowed?: bit
    mobilePanicAllowed?: bit
    phoneNumber?: string,
    callOnAlarm?: bit,
    userManagementDisabled?: bit
    cardCode?: number
    groupsAllowed?: number[]
}

export interface IPanelGroup {
    name?: string,
    index?: number,
    state?: number,
    entryTime?: number,
    exitTime?: number,
    entryTimeOnArmStay?: number,
    exitTimeOnArmStay?: number,
}