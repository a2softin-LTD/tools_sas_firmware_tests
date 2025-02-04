export interface IControlPanelState {

}

type ArmState = 'ArmedAway'

export enum ArmStatesEnum {
    ArmedAway = "ArmedAway",
    Disarm = 'Disarm',
    ArmedStay = 'ArmedStay',
}

export interface IControlGroupState {
    "index"?: number,
    "name"?: string,
    "state"?: number,
    "states": Array<ArmStatesEnum>,
    "entryTime": number,
    "exitTime": number,
    "entryTimeOnArmStay": number,
    "exitTimeOnArmStay": number,
    "armStayAllowed": boolean,

    "lastActionTime": number,
    "lastActionInitiator": string,
    "lastAlarmTime": number
}

export interface IControlPanelUpdateBlock {
    panel?: object,
    groups?: Array<IControlGroupState>
}


export interface IControlPanelParsedInfo {
    create?: IControlPanelUpdateBlock,
    update?: IControlPanelUpdateBlock,
    delete?: any
}
