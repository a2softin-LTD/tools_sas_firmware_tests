import { PanelParsedInfo } from "../domain/entity/setup-session/PanelParsedInfo";
import { IPanelCommunication } from "../domain/entity/setup-session/PanelData";

enum PanelActiveChannels {
    ethernet = 'ETHERNET',
    wifi = 'WIFI',
    gsm = 'GSM',
}

function canUseWifi(communication: IPanelCommunication): boolean {
    // CommunicatorWiFi
    if (communication.wifiName || communication.wifiPassword) {
        return true;
    }
    return false;
}

function canUseGSM(communication: IPanelCommunication): boolean {
    // CommunicatorGSM
    if (communication.gsmBalance || communication.gsm2Balance) {
        return true;
    }
    return false;
}

export function getPanelCommunicationActiveChannel(state: PanelParsedInfo) {
    const communication = state.create?.panelSettings?.communication;

    if (!communication) {
        throw Error('Unknown device! The test is stopped.')
    } else if (canUseWifi(communication)) {
        return PanelActiveChannels.wifi;
    } else if (canUseGSM(communication)) {
        return PanelActiveChannels.gsm;
    }

    return PanelActiveChannels.ethernet;
}

export function tracePanelCommunicationActiveChannel(state: PanelParsedInfo, modifyFn: (channel: string) => string) {
    return getPanelCommunicationActiveChannel(state);
}