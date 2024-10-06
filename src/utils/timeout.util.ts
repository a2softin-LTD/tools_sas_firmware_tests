type PromiseFn = (...params: any[]) => Promise<any>;

export class Timeouts {
    static raceError(
        promise: Promise<any> | PromiseFn,
        config: { awaitSeconds?: number, errorCode?: number } = {}
    ): Promise<any> {
        const promiseFn = promise instanceof Promise ? () => promise : promise
        return Promise.race([promiseFn(), new Promise((resolve, reject) => {
            setTimeout(() => reject(config?.errorCode || -1), (config?.awaitSeconds || 20) * 1000)
        })]);
    }

    static async pause(ms: number) {
        new Promise((resolve, reject) => {
            console.log("Pause...............................................");
            setTimeout(resolve, ms);
        });
    }
}