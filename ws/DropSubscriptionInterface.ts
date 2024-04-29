import { PanelUpdateBLock } from "./PanelUpdateBLock";
import { PanelParsedInfo } from "./PanelParsedInfo";

export interface DropSubscriptionInterface {
    field: keyof PanelUpdateBLock,
    method: keyof PanelParsedInfo
}