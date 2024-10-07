export class ErrorHandler {
    static handleError(errorCode: number): string {
        switch (errorCode) {
            case 300: return 'General setup server error';
            case 301: return 'Hardware server unreachable';
            case 302: return 'Hardware server request timeout';
            case 303: return 'Hardware server incorrect reply';
            case 310: return 'Panel incorrect reply';
            case 311: return 'Panel unreachable';
            case 312: return 'Panel unknown command';
            case 313: return 'Panel command illegal parameters';
            case 315: return 'Panel access denied';
            case 316: return 'Panel session expired';
            case 317: return 'Panel not enough privileges';
            case 318: return 'Panel unknown user';
            case 319: return 'Panel busy';
            case 320: return 'Panel arm denied';
            case 321: return 'Panel command wrong length';
            case 322: return 'Panel illegal item index';
            case 323: return 'Panel session interrupted';
            case 324: return 'Panel command parameter not changed';
            case 325: return 'Panel command user pin code occupied';
            case 326: return 'Panel command user email occupied';

            case 999: return "Timeout was exceeded";
            case 1001: return "Version is already installed"
        }
        return '';
    }
}