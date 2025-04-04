import { SetupSessionRelayDto } from "../../../domain/entity/setup-session/relay-typ";
import { PanelReactionsDto, ReactionTemplateTriggerTypes } from "../../../domain/entity/setup-session/panel-reaction.dto";

export function generateRelayReactionCommands(
    relay: SetupSessionRelayDto,
    startTimeMin: number,
    endTimeMin: number
) {
    const commands: Array<PanelReactionsDto> = [];

    for (let min: number = startTimeMin; min < endTimeMin; min = min + 2) {
        commands.push({
            name: `reaction #${min}`,
            triggerType: ReactionTemplateTriggerTypes.OutputOn,
            triggerTargetIndex: relay.outputIndex,
            triggerAtMinuteOfTheDay: min,
            triggerWeekly: [1, 2, 3, 4, 5, 6, 7],
            index: 0,
        });

        commands.push({
            name: `reaction #${min + 1}`,
            triggerType: ReactionTemplateTriggerTypes.OutputOff,
            triggerTargetIndex: relay.outputIndex,
            triggerAtMinuteOfTheDay: min + 1,
            triggerWeekly: [1, 2, 3, 4, 5, 6, 7],
            index: 0,
        });
    }
    return commands;
}