export const ErrorDescriptions = {
    300: "General setup server error",
    301: "Hardware server unreachable",
    302: "Hardware server request timeout",
    303: "Hardware server incorrect reply",
    310: "Panel incorrect reply",
    311: "Panel unreachable",
    312: "Panel unknown command",
    313: "Panel command illegal parameters",
    315: "Panel access denied",
    316: "Panel session expired",
    317: "Panel not enough privileges",
    318: "Panel unknown user",
    319: "Panel busy",
    320: "Panel arm denied",
    321: "Panel command wrong length",
    322: "Panel illegal item index",
    323: "Panel session interrupted",
    324: "Panel command parameter not changed",
    325: "Panel command user pin code occupied",
    326: "Panel command user email occupied",

    999: "The timeout has been exceeded. Possible reasons:\n" +
        "- no connection to the File Server\n" +
        "- no connection to the Device (HUB)\n" +
        "- weak internet connection\n" +
        "- there is no current firmware in the specified FTP path",

    998: "Version is already installed",

    401: "Unexpected server response: 401",
} as const;

