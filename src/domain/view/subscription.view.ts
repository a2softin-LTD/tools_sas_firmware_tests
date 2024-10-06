import {PanelUpdateBLock} from "../entity/setup-session/PanelUpdateBLock";
import {PanelParsedInfo} from "../entity/setup-session/PanelParsedInfo";

export interface IDropSubscriptionView {
    field: keyof PanelUpdateBLock,
    method: keyof PanelParsedInfo
}

export interface ICreateSubscriptionView extends IDropSubscriptionView {
    callback: (any) => any
    field: keyof PanelUpdateBLock,
    method: keyof PanelParsedInfo
}
