export enum PanelStateBitMaskValue {
    Normal = 0,
    Busy = 0x0001,
    Close = 0x0002,
    Alarm = 0x0004,
    Trouble = 0x0008,
    Warning = 0x0010,
    Info = 0x0020,
    Empty = 0x0040,
    Low = 0x0080,
    High = 0x0100,
    Progress = 0x0200,
    Unknown = 0x0400,
    Removed = 0x0800
}