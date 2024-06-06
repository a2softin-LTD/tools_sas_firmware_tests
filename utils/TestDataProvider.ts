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

    static readonly DeviceId: string = "00:08:B7:00:00:08";
    // static readonly DeviceId: string = "00:08:B7:10:02:04";
    // static readonly DeviceId: string = "00:08:B7:FE:33:02";
    // static readonly DeviceId: string = "00:08:B7:99:99:99";

}