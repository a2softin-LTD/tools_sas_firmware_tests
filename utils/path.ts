export const WS: object = {
    WSS_URL: (hostName: string): string => {
        return `wss://${hostName}`
    },
    PORT: 50100,
};