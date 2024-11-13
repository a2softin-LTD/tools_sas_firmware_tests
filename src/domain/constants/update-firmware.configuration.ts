import {IFirmwareVersionView} from "../../../ws/FirmwareVersionConfig";
import {PanelConvertersUtil} from "../../utils/converters/panel-converters.util";

export class PanelUpdateFirmwareConfiguration {

    constructor(
        public readonly panelSerialNumber: string,
        public readonly firmwareList: IFirmwareVersionView[],
        public readonly updateChannelName: string
    ) {
    }

    getSerialInDec() {
        return PanelConvertersUtil.serialToDec(this.panelSerialNumber)

    }
}

