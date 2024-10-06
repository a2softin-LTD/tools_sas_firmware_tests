import { WsMethod } from "../constants/ws-connection/ws-commands";
import { PanelData } from "../entity/setup-session/PanelData";

export interface WsUpdateModel {
    method?: WsMethod,
    data?: any,
    subscribePart: keyof PanelData
    subscribeMethod: "create" | "update" | "delete",
    validityFunction?: (data: any) => boolean,
    // validator?: SetupServerRequestValidator<any>
    mainTime?: number,
    gsmTime?: number
}