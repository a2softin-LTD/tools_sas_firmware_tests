export class Tools {
    static async pause(ms: number) {
        new Promise((resolve, reject) => {
            console.log("Pause...............................................");
            setTimeout(resolve, ms);
        });
    }
}