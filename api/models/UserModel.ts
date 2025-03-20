export interface UserModel {
    emailVerified?: boolean,
    role?: string,
    phoneVerified?: boolean,
    phone?: string,
    pib?: string,
    passwordShouldChange?: boolean,
    password?: string,
    passwordEncryptMD5?: string,
    id?: number,
    asInvitations?: Array<any>,
    email?: string,
    preferredLanguage?: string,
    alarmStationId?: number | null | undefined
}

export interface SimpleUserModel {
    email?: string,
    password?: string,
    passwordEncryptMD5?: string,
}