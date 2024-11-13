import {WebSocket} from "ws";
import {WsMethod} from "../domain/constants/ws-connection/ws-commands";
import {WsUpdateModel} from "../domain/entity/setup-session/WsUpdateModel";
import {MaksSetupWsCallback} from "../domain/view/MaksSetupWsCallback";
import {Timeouts} from "../utils/timeout.util";
import {ICreateSubscriptionView, IDropSubscriptionView} from "../domain/view/subscription.view";
import {isDefined} from "../utils/is-defined.util";
import {PanelParsedInfo} from "../domain/entity/setup-session/PanelParsedInfo";

export class WsHandler {
    private websocketInstance: WebSocket
    private openCallback: any;
    private activeSession: boolean;

    constructor(
        private readonly serverUrl: string,
        private readonly activeJwtToken: string
    ) {
    }

    createSocket(serial: number):Promise<PanelParsedInfo> {
        return new Promise((resolve, reject) => {
            this.openCallback = resolve;

            this.websocketInstance = new WebSocket(this.serverUrl + '/sockets?token=' + this.activeJwtToken);
            this.websocketInstance.onopen = () => {
                this.send(WsMethod.OPEN_PANEL_SESSION, serial)
                    .catch(error => {
                        reject(error)
                    });
            };
            this.websocketInstance.onmessage = (message) => {
                const callback = JSON.parse(message.data);
                //console.log(callback);

                if (callback.server === WsMethod.GET_PANEL_CHANGES) {
                    this.sendData(callback.data);
                    this.sendToSubscribers(callback.data)
                } else this.callSubscription(callback)
            };
            this.websocketInstance.onclose = (err) => {
                if (err.code) {
                    return this.activeSession = false;
                }
                if (this.activeSession) {
                    this.activeSession = false
                }
            }
        });
    }

    id: number = 0;

    private generateId(): number {
        this.id++;
        return this.id;
    }

    send<T>(command: string /*WsMethod*/, data?: any, awaitTime?: number, raceIgnored?: boolean) {
        return raceIgnored ? this.push<T>(command, data) :
            // @ts-ignore
            Timeouts.raceError(this.push(command, data), awaitTime)
    }

    private sendData(data) {
        if (!this.openCallback) return;
        this.openCallback(data);
        this.openCallback = null;
    }

    private push<T>(command: string, data?: any) {
        let body = {
            client: command,
            commandId: this.generateId(),
            data
        };
        return new Promise<T>((resolve, reject) => {
            this.createCommandSubscription({
                id: body.commandId,
                command,
                resolve,
                reject
            });
            //console.log(body);
            this.websocketInstance.send(JSON.stringify(body));
        })
    }

    update<T>(model: WsUpdateModel): Promise<boolean> {
        return Timeouts.raceError(new Promise((resolve, reject) => {
            const subscribePoint: IDropSubscriptionView = {
                method: model.subscribeMethod,
                field: model.subscribePart
            };
            const {validityFunction} = model;
            this.createSubscription({
                ...subscribePoint,
                callback: (data: T) => {
                    switch (true) {
                        case !validityFunction:
                        case validityFunction && validityFunction(data):
                            this.removeSubscription(subscribePoint);
                            return resolve(true);
                        default:
                    }
                }
            });

            this.send(model.method, model.data, null, true)
                .catch(error => reject(error))

            // @ts-ignore
        }), model.gsmTime || 60)
    }

    public removeSubscription(...subscriptionsInfo: IDropSubscriptionView[]) {
        subscriptionsInfo.forEach(({method, field}) => {
            delete this.subs[field][method]
        })
    }

    public createSubscription({field, method, callback}: ICreateSubscriptionView) {
        this.subs[field][method] = callback
    }

    private callbacks = {};

    private createCommandSubscription({id, command, resolve, reject}) {
        this.callbacks[id] = {
            command,
            resolve,
            reject
        }
    }

    private callSubscription(message: MaksSetupWsCallback) {
        if (!this.callbacks[message.commandId]) return;
        //console.log(message);
        if (message.error) {
            this.callbacks[message.commandId].reject(message.error);
        } else {
            //console.log()
            this.callbacks[message.commandId].resolve(message.data);
        }
        delete this.callbacks[message.commandId];
    }

    private sendToSubscribers(data) {
        if (typeof data != "object") return;
        Object.keys(data)
            .forEach(method => {
                Object.keys(data[method])
                    .forEach(field => {
                        try {
                            this.subs[field][method](data[method][field])
                        } catch (e) {
                        }
                    })
            })
    }

    private subs = {
        alarmServer: {},
        groups: {},
        sensors: {},
        keyboards: {},
        users: {},
        panelSettings: {},
        keyFobs: {},
        repeaters: {},
        zoneExtenders: {},
        relays: {}
    };

    close() {
        if (!this.websocketInstance) return;
        this.websocketInstance.close()
        this.websocketInstance = null
    }

    getSubscribedObjectData(rootKey: "create" | "update", structureKey: string/*keyof PanelData*/,
                            objectKey: string /*keyof operationMode*/, awaitedValue: any) {

        return new Promise((resolve, reject) => {
            const subscribePoint: IDropSubscriptionView = {method: rootKey, field: structureKey} as any;
            this.createSubscription({
                ...subscribePoint,
                callback: (data: any) => {
                    const allowed = isDefined(data[objectKey]) && data[objectKey] == awaitedValue;
                    console.group();
                    console.log("data:", data, {objectKey, structureKey, rootKey, awaitedValue});
                    console.log("Allowed:", allowed);
                    console.groupEnd();
                    if (allowed) return;
                    return resolve(true);
                }
            });
        });
    }
}