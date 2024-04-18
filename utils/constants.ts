export const EMPTY_STRING =  "";

export const EMPTY_BODY =  {};

export const WS: object = {
    WSS_URL: (hostName: string, port: number, JwtToken: string): string => {
        return `wss://${hostName}:${port}/sockets?token=${JwtToken}`
    },
    PORT: 50100,
}

export const FTP_URL: string = "ftp://devfirmware.maks.systems:2221/v2/files/b7/22_61.bin";