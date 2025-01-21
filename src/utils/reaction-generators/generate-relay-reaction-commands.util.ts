import { SetupSessionRelayDto } from "../../domain/entity/setup-session/relay-typ";
import { PanelReactionsDto, ReactionTemplateTriggerTypes } from "../../domain/entity/setup-session/panel-reaction.dto";

export function generateRelayReactionCommands(
    relay: SetupSessionRelayDto,
    startTimeMins: number,
    endTimeMins: number
) {
    const commands: Array<PanelReactionsDto> = [];

    const iterations = Math.round((endTimeMins - startTimeMins) / 2);

    for (let min = startTimeMins; min < endTimeMins; min = min + 2) {
        commands.push({
            name: `reaction #${min}`,
            triggerType: ReactionTemplateTriggerTypes.OutputOn,
            triggerTargetIndex: relay.outputIndex,
            triggerAtMinuteOfTheDay: min,
            triggerWeekly: [1, 2, 3, 4, 5, 6, 7],
            index: 0
        })

        commands.push({
            name: `reaction #${min + 1}`,
            triggerType: ReactionTemplateTriggerTypes.OutputOff,
            triggerTargetIndex: relay.outputIndex,
            triggerAtMinuteOfTheDay: min + 1,
            triggerWeekly: [1, 2, 3, 4, 5, 6, 7],
            index: 0
        })

    }
    return commands;
}