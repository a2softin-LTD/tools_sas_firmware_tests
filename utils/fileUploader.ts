import * as http from "node:http";

let firstBytes: Buffer;

export async function downloadAndVerifySensorFirmware(url: string, bytes: number) {

    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            const chunks = [];

            response.on('data', (chunk) => {
                chunks.push(chunk);

                // Stop uploading after getting first 8 bytes
                if (Buffer.concat(chunks).length >= bytes) {
                    response.destroy();
                    firstBytes = Buffer.concat(chunks).slice(0, bytes);
                    resolve(firstBytes);
                    
                    // Verifying package correctness
                    if (bin2String(string2Bin(String(firstBytes), 1, 3)) !== 'CGF') {
                        throw Error('The Package is not correct! Please change a package...');
                    } else {
                        // Verifying firmware adapring
                        if(!isSensorFirmwareAdapted(byteToHex(firstBytes[4]), byteToHex(firstBytes[5]))) {
                            throw Error('The Firmware is not adapted! Please change a firmware...');
                        } else {
                            // Getting firmware version
                            for (const value of firstBytes) {
                                //console.log(Buffer([value]))
                            }
                            getSensorFirmwareVersion(firstBytes[6], firstBytes[7]);
                        }
                    }
                }
            });
            response.on('error', (error) => {
                reject(error);
            });
        }).on('error', (error) => {
            reject(error);
        });
        return 1; // //////////////////////
    });
}

function string2Bin(str: string, fromByte: number, toByte: number) {
    let result: any[] = [];
    for (let i:number = fromByte - 1; i < toByte; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}

function bin2String(array: any[]) {
    return String.fromCharCode.apply(String, array);
}

function byteToHex(byte: number) {
    return byte.toString(16);
}

function hexToByte(hex: any) {
    const key: string = '0123456789abcdef';
    let newBytes: any[] = [];
    let currentChar: number = 0;
    let currentByte: number = 0;
    for (let i: number = 0; i < hex.length; i++) {   // Go over two 4-bit hex chars to convert into one 8-bit byte
        currentChar = key.indexOf(hex[i]);
        if (i%2===0) { // First hex char
            currentByte = (currentChar << 4); // Get 4-bits from first hex char
        }
        if (i%2===1) { // Second hex char
            currentByte += (currentChar);     // Concat 4-bits from second hex char
            newBytes.push(currentByte);       // Add byte
        }
    }
    return new Uint8Array(newBytes);
}

function byte2dec(byteArray: number[]) {
    const uint8Array = new Uint8Array(byteArray);
    //console.log(uint8Array.toHex());

    return 1;
}

function isSensorFirmwareAdapted(byte1: string, byte2: string) {
    try {
        return parseInt(byte2 + byte1, 16);
    } catch (e) {
        console.log(e.message);
    }
    return false;
}

function getSensorFirmwareVersion(byte1: number, byte2: number) {
    const version = byte2dec([0o3, 24])
    console.log(version);
}