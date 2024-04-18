export class Parsers {
    static async serialToDec(serialInHex: string) {
        return parseInt(serialInHex.toLowerCase().split(':').join('').split(' ').join(''), 16);
    }
}