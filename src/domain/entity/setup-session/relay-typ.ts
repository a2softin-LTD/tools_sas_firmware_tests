type bit = 0 | 1

export interface SetupSessionRelayDto {
    power?: number,
    index?: number,
    serial?: number,
    type?: number,
    version?: string,
    secondaryVersion?: string
    currentPower?: number,
    currentVoltage?: number,
    energyConsumption?: number,
    name?: string,
    signal?: number,
    state?: number,
    temperature?: number,
    operationMode?: number,
    outputIndex?: number,
    signalRoute?: number,
    standbyFrequency?: bit,
    indicationType?: number,
    groupsAllowed?: number[],
    zonesAllowed?: number[],
    reaction?: number,
    time?: number
    inversion?: bit
}