import {Environments} from "../src/domain/constants/environments";


export interface IServerAddresses {
    loginUrl: string,
    envUrl: string
}

export const environmentConfig = new Map<Environments, IServerAddresses>()
    .set(Environments.DEV, {
            loginUrl: "https://dev-account.maks.systems:10001",
            envUrl: "https://dev-discovery.maks.systems:8080"
        }
    )
    .set(Environments.QA, {
            loginUrl: "https://qa-account.maks.systems:10001",
            envUrl: "https://qa-discovery.maks.systems:8080"
        }
    )
    .set(Environments.PROD, {
            loginUrl: "https://prod-account.maks.systems:10001",
            envUrl: "https://prod-discovery.maks.systems:8080"
        }
    )