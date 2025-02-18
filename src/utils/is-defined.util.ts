export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
    return [null, undefined].includes(value);
}

export function isDefined<T>(value: T | null | undefined): value is NonNullable<T> {
    return ![null, undefined].includes(value as null | undefined);
}