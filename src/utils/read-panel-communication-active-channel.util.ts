import { PanelParsedInfo } from "../domain/entity/setup-session/PanelParsedInfo";
import { IPanelCommunication } from "../domain/entity/setup-session/PanelData";
import { PanelStateBitMaskValue } from "../domain/constants/state-bit-masks";
import { isNullOrUndefined } from "./is-defined.util";

enum PanelActiveChannels {
    wifi = 'Wifi',
    ethernet = 'Ethernet',
    gsm = 'gsm',
}


function canUseEthernet(communication: IPanelCommunication): boolean {

    // channel not supported
    if (isNullOrUndefined(communication.ethernet)) return false;
    //No Link
    if (communication.ethernet & PanelStateBitMaskValue.Empty) return false;
    //No connection
    if (communication.ethernet & PanelStateBitMaskValue.Trouble) return false;

    return true
}

function canUseWifi(communication: IPanelCommunication): boolean {
    if (isNullOrUndefined(communication.wifi)) return false;
    // CommunicatorWiFi  Info                                  Password wrong or required
    if (communication.wifi & PanelStateBitMaskValue.Info) return false;
    // CommunicatorWiFi  Empty                                 No Link
    if (communication.wifi & PanelStateBitMaskValue.Empty) return false;
    // CommunicatorWiFi  Trouble                               No connection
    if (communication.wifi & PanelStateBitMaskValue.Trouble) return false;


    return false
}

function canUseGsm(communication: IPanelCommunication): boolean {

    return false

}


export function getPanelCommunicationActiveChannel(state: PanelParsedInfo) {


    const communication = state.create?.panelSettings?.communication

    if (!communication) {
        'asdasdasd'
        //todo describe if need
    }

    if (canUseEthernet(communication)) return PanelActiveChannels.ethernet
    if (canUseWifi(communication)) return PanelActiveChannels.wifi
    // if (canUseGsm(communication)) skip gsm validation
    return PanelActiveChannels.gsm

}

export function tracePanelCommunicationActiveChannel(state: PanelParsedInfo, modifyFn: (channel: string) => string) {
    const channel = getPanelCommunicationActiveChannel(state)
    console.log(modifyFn(channel))

}