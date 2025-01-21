import { UserModel } from "../api/models/UserModel";
import { LoginModel } from "../api/models/LoginModel";

export class TestDataProvider {

    static readonly SimpleUser: UserModel = {
        emailVerified: true,
        role: "user",
        phoneVerified: false,
        phone: "+380971344443",
        pib: "Test Test Test",
        passwordShouldChange: false,
        password: 'asdASD123',
        passwordEncryptMD5: '8af3982673455323883c06fa59d2872a',
        id: 5653,
        asInvitations: [],
        email: "slobandriana+1@gmail.com",
        preferredLanguage: "uk",
        alarmStationId: null
    }
    static readonly SimpleUserCI: UserModel = {
        emailVerified: true,
        role: "user",
        phoneVerified: false,
        phone: "+380971344443",
        pib: "Test Test Test",
        passwordShouldChange: false,
        password: 'asdASD123',
        passwordEncryptMD5: '8af3982673455323883c06fa59d2872a',
        id: 5653,
        asInvitations: [],
        email: "agntkcak7s@jxpomup.com",
        preferredLanguage: "uk",
        alarmStationId: null
    }

    static readonly SimpleUserRelay: UserModel = {
        emailVerified: true,
        role: "user",
        phoneVerified: false,
        phone: "",
        pib: "Test Test Test",
        passwordShouldChange: false,
        password: 'asdASD123',
        passwordEncryptMD5: '8af3982673455323883c06fa59d2872a',
        id: 5653,
        asInvitations: [],
        email: "andriana99@gmail.com",
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

    static readonly DeviceIdWithEthernet: string = "00:08:B7:10:08:F4"; // Office HUB - with Ethernet channel
    static readonly DeviceIdWithGSM: string = "00:08:B7:00:00:08"; // Office HUB - with SimCard channel
    static readonly DeviceIdWithWiFi: string = "00:08:B7:10:02:08"; // Office HUB - with WiFi channel
    static readonly DeviceIdPin: string = "00:08:B7:10:02:04"; // PIN hub
    static readonly DeviceIdWithRelays: string = "00:08:B7:10:00:7C"; // Relay
}