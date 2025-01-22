export enum ReactionTemplateTriggerTypes {
    OutputOn = 1,
    OutputOff = 2,
    ArmAway = 3,
    Disarm = 4,
    ArmStay = 5,
    ValveOpen = 6,
    ValveClose = 7
}

export interface PanelReactionsDto {
    triggerType?: ReactionTemplateTriggerTypes,
    triggerTargetIndex?: number// groupIndex for arm\disarm outIndex for on off
    triggerAtMinuteOfTheDay?: number
    triggerWeekly?: number[]
    name?: string
    index?: number
}

export const ReactionAllowedTypes = {
    relay: [ReactionTemplateTriggerTypes.OutputOff, ReactionTemplateTriggerTypes.OutputOn],
    valve: [ReactionTemplateTriggerTypes.ValveClose, ReactionTemplateTriggerTypes.ValveOpen],
}