export class Timeouts {
    public static race_error(promise: Promise<any>, awaitSeconds: number = 20): Promise<any> {
        return Promise.race([promise, new Promise((resolve, reject) => {
            setTimeout(() => reject(), awaitSeconds * 1000)
        })]);
    }
}