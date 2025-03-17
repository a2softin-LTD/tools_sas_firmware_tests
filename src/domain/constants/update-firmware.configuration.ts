import { PanelConvertersUtil } from "../../utils/converters/panel-converters.util";
import { UserModel } from "../../../api/models/UserModel";

export class PanelUpdateFirmwareConfiguration {

    constructor(
        public readonly panelSerialNumber: string,
        // public readonly firmwareList: IFirmwareVersionView[],
        public readonly updateChannelName: string,
        public readonly user: UserModel
    ) {
    }

    getSerialInDec() {
        return PanelConvertersUtil.serialToDec(this.panelSerialNumber)

    }
}

