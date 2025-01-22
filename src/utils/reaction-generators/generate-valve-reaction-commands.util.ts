import {PanelReactionsDto, ReactionTemplateTriggerTypes} from "../../domain/entity/setup-session/panel-reaction.dto";
import {PcSensorDto} from "../../domain/entity/setup-session/sensor.dto";

export function generateValveReactionCommands(
    valve: PcSensorDto,
    startTimeMins: number,
    endTimeMins: number
) {
    const commands: Array<PanelReactionsDto> = [];

    const iterations = Math.round((endTimeMins - startTimeMins) / 2);


    for (let min = startTimeMins; min < endTimeMins; min = min + 2) {
        commands.push({
            name: `Valve reaction #${min}`,
            triggerType: ReactionTemplateTriggerTypes.ValveClose,
            triggerTargetIndex: valve.valveOutputIndex,
            triggerAtMinuteOfTheDay: min,
            triggerWeekly: [1, 2, 3, 4, 5, 6, 7],
            index: 0
        })

        commands.push({
            name: `Valve reaction #${min + 1}`,
            triggerType: ReactionTemplateTriggerTypes.ValveOpen,
            triggerTargetIndex: valve.valveOutputIndex,
            triggerAtMinuteOfTheDay: min + 1,
            triggerWeekly: [1, 2, 3, 4, 5, 6, 7],
            index: 0
        })

    }
    return commands;
}