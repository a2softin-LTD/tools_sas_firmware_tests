import { UserModel } from "../api/models/UserModel";
import { LoginModel } from "../api/models/LoginModel";

export class TestDataProvider {

    static readonly SimpleUser: UserModel = {
        emailVerified: true,
        role: "user",
        phoneVerified: false,
        phone: "+380971344443",
        pib: "Пінчук Дмитро Анатолійович",
        passwordShouldChange: false,
        password: 'lepidoptera111278DAP!@#',
        passwordEncryptMD5: '5a2ddac0aeb60f6cd8c96ef2d3f6c394',
        id: 2870,
        asInvitations: [],
        email: "pinchuk.dap@gmail.com",
        preferredLanguage: "uk",
        alarmStationId: null
    }

    static getUserData(
        login: string,
        password: string,
    ): LoginModel {
        const body: LoginModel = {
            login: login,
            password: password,
        };
        return body;
    }

    static readonly DeviceIdWithEthernet: string = "00:08:B7:10:08:F4"; // Office HUB - with WiFi channel
    static readonly DeviceIdWithGSM: string = "00:08:B7:00:00:08"; // Office HUB - with Ethernet channel
    static readonly DeviceIdWithWiFi: string = "00:08:B3:30:03:F0"; // Office HUB - with SimCard channel
    static readonly DeviceIdPin: string = "00:08:B7:10:02:04"; // PIN hub
    static readonly DeviceIdTabachkov1: string = "00:08:B7:FE:33:02"; // Tabachkov HUB #1
    static readonly DeviceIdTabachkov2: string = "00:08:B7:99:99:99"; // Tabachkov HUB #2

}