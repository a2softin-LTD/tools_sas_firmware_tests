import * as http from "node:http";

let firstBytes: Buffer;

export async function downloadAndVerifySensorFirmware(url: string, deviceType: number) {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            const chunks = [];

            response.on('data', (chunk) => {
                chunks.push(chunk);

                // Stop uploading after getting first 8 bytes
                if (Buffer.concat(chunks).length >= 9) {
                    response.destroy();
                    firstBytes = Buffer.concat(chunks).slice(0, 9);
                    // resolve(firstBytes);

                    // Verifying package correctness
                    if (bin2String(string2Bin(String(firstBytes), 1, 3)) !== 'CGF') {
                        throw Error('The Package is not correct! Please change a package...');
                    }
                    // Verifying firmware adapting
                    if (!isSensorFirmwareAdapted(firstBytes[4], firstBytes[5], deviceType)) {
                        throw Error('The Firmware is not adapted! Please change a firmware...');
                    }
                resolve(
                    {
                        url:url, // стартове посилання
                        version: getSensorFirmwareVersion(firstBytes[6], firstBytes[7])// версія що ми отрмиали на кроці 5
                     }
                    )
                }
            });
            response.on('error', (error) => {
                reject(error);
            });
        }).on('error', (error) => {
            reject(error);
        });

    });
}

function string2Bin(str: string, fromByte: number, toByte: number) {
    let result: any[] = [];
    for (let i: number = fromByte - 1; i < toByte; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}

function bin2String(array: any[]) {
    return String.fromCharCode.apply(String, array);
}

function byteToHex(byte: number) {
    return byte.toString(16).padStart(2, '0');
}

function isSensorFirmwareAdapted(byte1: number, byte2: number, deviceType: number) {
    return (parseInt(byteToHex(byte2) + byteToHex(byte1), 16)) === deviceType;
}

function getSensorFirmwareVersion(number1: number, number2: number) {
    return `${number2}.${formatIndex(number1)}`;
}

function formatIndex(index: number) {
    return index.toString().padStart(2, '0');
}
