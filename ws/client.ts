import { WebSocket } from 'ws';

export const connectToWebSocket = (url: string, messages: Array<string>): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(url, { perMessageDeflate: false });

        ws.on('open', () => {
            console.log('WebSocket connection established.');
            ws.send(messages[0]);
            resolve(ws);
        });

        ws.on('message', (data) => {
            console.log('Received message:', data);

        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error.message);
            reject(error);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed.');
        });
    });
};




// export const sendToWebSocket = (url: string, messages: Array<string>): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         const ws = new WebSocket(url);
//         const timer = setTimeout(() => {
//             reject(new Error('Timed out connecting to websocket server'));
//             ws?.close();
//         }, 20000);
//
//         ws.onopen = () => {
//             ws.send(messages[0]);
//             ws.close();
//             clearTimeout(timer);
//             resolve();
//         };
//         ws.onerror = (error) => {
//             // eslint-disable-next-line no-console
//             console.log('Error connecting to websocket server');
//             clearTimeout(timer);
//             reject(error);
//         };
//     });
// };