import {ControlPanelSessionCommands} from "../../constants/ws-connection/ws-commands";
import {IControlPanelUpdateBlock} from "./control-panel-data";

export interface IControlSessionUpdateModel {
    method?: ControlPanelSessionCommands,
    data?: any,
    subscribePart: keyof IControlPanelUpdateBlock
    subscribeMethod: "create" | "update" | "delete",
    validityFunction?: (data: any) => boolean,
    // validator?: SetupServerRequestValidator<any>
    mainTime?: number,
    gsmTime?: number
}