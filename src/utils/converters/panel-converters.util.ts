export class PanelConvertersUtil {
    static serialToDec(serialInHex: string) {
        return parseInt(serialInHex.toLowerCase().split(':').join('').split(' ').join(''), 16);
    }
}