import { WebSocket } from "ws";

// Function to send a message over WebSocket
export async function sendMessage(ws: WebSocket, message: any) {
    ws.send(JSON.stringify(message));
    console.log('Sent message to WebSocket API:', message);
    new Promise(resolve => setTimeout(resolve, 1000));
}

// Function to handle WebSocket API responses
export async function handleResponse(responseData: string) {
    const response = JSON.parse(responseData);
    if (response.data) {
        return response;
    } else {
        return response.error;
    }
}