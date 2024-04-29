import { WsMethod } from "./WsMethod";
import { PanelData } from "./PanelData";

export interface WsUpdateModel {
    Method?: WsMethod,
    data?: any,
    subscribePart: keyof PanelData
    subscribeMethod: "create" | "update" | "delete",
    validityFunction?: (data: any) => boolean,
    // validator?: SetupServerRequestValidator<any>
    mainTime?: number,
    gsmTime?: number
}