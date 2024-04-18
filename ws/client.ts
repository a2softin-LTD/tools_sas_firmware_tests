// Function to send a message over WebSocket
import {WebSocket} from "ws";

export async function sendMessage(ws: WebSocket, message: any) {
    ws.send(JSON.stringify(message));
    console.log('Sent message to WebSocket API:', message);
    new Promise(resolve => setTimeout(resolve, 1000));
}

// Function to handle WebSocket API responses
export async function handleResponse(responseData: string) {
    const response = JSON.parse(responseData);
    if (response.data) {
        console.log('Received successful response:', response);
    } else {
        console.error('Received error response:', response.error);
    }
}