export function isNullOrUndefined(object: any): object is null | undefined {
    switch (object) {
        case null:
        case undefined:
            return true
        default:
            return false
    }
}
