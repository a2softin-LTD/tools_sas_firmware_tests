import {DeviceTypeCodes} from "../enums/type-codes";

export interface PeripheralBaseInfo {
    index?: number,
    serial?: number,
    type?: DeviceTypeCodes | number,
    version?: string,
    secondaryVersion?: string
}

export interface PcSensorValveState {

    valveOutputIndex?: number
    valveState?: "Open" | "Closed" | "Malfunction"
}

export interface PcSensorDto extends PcSensorValveState, PeripheralBaseInfo {

}