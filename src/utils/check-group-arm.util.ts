import {IPanelGroup} from "../domain/entity/setup-session/PanelData";
import {PanelStateBitMaskValue} from "../domain/constants/state-bit-masks";

export const checkGroupArmUtil = (group: IPanelGroup) => {
    return group.state & PanelStateBitMaskValue.Close

    //BitMaskValue.Close - під охороною
    // якщо додатково BitMaskValue.Warning - охорона "залишаюсь" (периметр)
}