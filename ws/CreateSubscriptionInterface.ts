import { DropSubscriptionInterface } from "./DropSubscriptionInterface";
import { PanelParsedInfo } from "./PanelParsedInfo";
import { PanelUpdateBLock } from "./PanelUpdateBLock";

export interface CreateSubscriptionInterface extends DropSubscriptionInterface {
    callback: (any) => any
    field: keyof PanelUpdateBLock,
    method: keyof PanelParsedInfo
}