import { WsMethod } from "../src/domain/constants/ws-connection/ws-commands";
import { PanelData } from "../src/domain/entity/setup-session/PanelData";

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