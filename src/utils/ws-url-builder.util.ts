export const PANEL_WS_CONNECTION_DEFAULT_PORT = 50100;

export const buildPanelWsUrl = (hostName: string, port: number = PANEL_WS_CONNECTION_DEFAULT_PORT): string => {
    return `wss://${hostName}:${port}`;
}