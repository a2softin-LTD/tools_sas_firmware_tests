import {PanelUpdateBLock} from "../entity/setup-session/PanelUpdateBLock";
import {PanelParsedInfo} from "../entity/setup-session/PanelParsedInfo";

export interface IDropSubscriptionView<type = PanelUpdateBLock> {
    field: keyof type,
    method: keyof PanelParsedInfo
}

export interface ICreateSubscriptionView<type = PanelUpdateBLock> extends IDropSubscriptionView<type> {
    callback: (any) => any
    field: keyof type,
    method: keyof PanelParsedInfo
}
