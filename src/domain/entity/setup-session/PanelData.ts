import { bit } from "../../types/bit.type";

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


export interface IPanelEthernetState {
    ethernet?: number
    ethernetDNS?: string
    ethernetGateway?: string
    ethernetIPAddress?: string
    ethernetIPMask?: string
}

export interface IPanelWifiState {
    wifi?: number,
    wifiLevel?: number,
    wifiName?: string,
    wifiPassword?: string
}

export interface IPanelSimCardState {
    gsm?: number,
    gsmLevel?: number,
    gsmOperatorCode?: number,
    gsmPhoneNumber?: string,

    gsm2?: number,
    gsm2Level?: number,
    gsm2OperatorCode?: number,
    gsm2PhoneNumber?: string,

    gsmBalance?: number,
    gsmBalanceCurrencyCode?: number,

    gsm2Balance?: number,
    gsm2BalanceCurrencyCode?: number,


    gsmApnName?: string;
    gsmApnPassword?: string
    gsmApnUser?: string

    gsm2ApnName?: string;
    gsm2ApnPassword?: string
    gsm2ApnUser?: string

}

export interface IPanelCommunication extends IPanelEthernetState, IPanelWifiState, IPanelSimCardState {

}


export interface IPanelState {
    //extends panel_battery_state, peripheral_base_info, panel_special_configurations
    name?: string,
    state?: number,
    lastActivitySecondsPassed?: number,
    power?: number,
    powerLostTime?: number,
    tamper?: number,
    versionCode?: number,
    powerLostTimeoutMinutes?: number,
    bytesReceived?: number,
    hardwareModification?: string,
    indicationType?: number

    communication?: IPanelCommunication
    alarmAutoCancelTimeout?: number,

    airRaidAlarmRegionId?: number
    timeZoneName?: string,
    operationMode?: number
    engineerModeSecondsLeft?: number
    online?: boolean
    userPinCodeLength?: number
    engineerModeEnabled?: bit

    // entryExitBuzzerBehaviour?: EntryExitBuzzerBehaviourStateEnum
}