import {BehaviorSubject, filter, map, Observable, Subject, switchMap, take} from "rxjs";
import {ControlPanelSessionCommands} from "../domain/constants/ws-connection/ws-commands";
import {MaksSetupWsCallback} from "../domain/view/MaksSetupWsCallback";
import {Timeouts} from "../utils/timeout.util";
import {PanelParsedInfo} from "../domain/entity/setup-session/PanelParsedInfo";
import {SessionTypeEnum} from "../domain/constants/ws-connection/session-type.enum";
import {isDefined} from "../utils/is-defined.util";
import {IControlPanelParsedInfo, IControlPanelUpdateBlock} from "../domain/entity/control-session/control-panel-data";
import {IControlSessionUpdateModel} from "../domain/entity/control-session/control-session-update.model";

export class WsHandlerRxControlSession {
    private websocketInstance: WebSocket
    private activeSession: boolean;
    private readonly createConnectionObserver$ = new Subject<IControlPanelParsedInfo>()
    private readonly commandSubscriber$ = new BehaviorSubject<MaksSetupWsCallback>({} as any);
    private readonly subscriber$ = new BehaviorSubject<{ method: string, field: string, data: any }>({} as any)

    id: number = 0;

    private generateId(): number {
        this.id++;
        return this.id;
    }


    private buildServerUrl() {
        return this.serverUrl + '/api1?token=' + this.activeJwtToken
    }


    constructor(
        private readonly serverUrl: string,
        private readonly activeJwtToken: string
    ) {
    }


    initSocket() {
        if (this.activeSession) return;
        this.websocketInstance = new WebSocket(this.buildServerUrl());
        this.websocketInstance.onclose = err => {
            this.close()
            if (err.code) {
                return this.activeSession = false;
            }
            if (this.activeSession) {
                this.activeSession = false
            }
        }
        this.websocketInstance.onmessage = (message) => {
            const callback = JSON.parse(message.data);

            if (callback.server === ControlPanelSessionCommands.PANEL_CHANGES) {
                this.createConnectionObserver$.next(callback.data)
                this.sendToSubscribers(callback.data)
            } else this.commandSubscriber$.next(callback)
        };
    }

    clearSocket() {
        this.websocketInstance = null
    }


    createSession$(serial: number, sessionType = SessionTypeEnum.Setup) {
        const createObserver$ = new Subject()
        this.send$(ControlPanelSessionCommands.OPEN_PANEL_SESSION, {
            serial,
        })
            .subscribe({error: (error) => createObserver$.error(error)})

        return this.createConnectionObserver$
            .pipe(
                take(1)
            )
    }


    send$<T>(command: ControlPanelSessionCommands /*ControlPanelSessionCommands*/, data?: any, awaitTime?: number, raceIgnored?: boolean) {
        return raceIgnored ? this.push$(command, data)
            : Timeouts.decorateTimeoutError$(this.push$(command, data), awaitTime)
    }


    push$<T>(command: string, data?: any) {
        let body = {
            client: command,
            commandId: this.generateId(),
            data
        };

        const subscription = this.getCommandSubscription$(body.commandId, command)
        this.websocketInstance.send(JSON.stringify(body));

        return subscription
    }

    update$<T>(model: IControlSessionUpdateModel) {
        return Timeouts.decorateTimeoutError$(
            this.push$(model.method, model.data)
                .pipe(
                    switchMap(() => this.generateSubscription$(model.subscribeMethod, model.subscribePart)),
                    filter((data) => {
                        const {validityFunction} = model;
                        switch (true) {
                            case !validityFunction:
                            case validityFunction && validityFunction(data):
                                return true;
                            default:
                                return false;
                        }
                    })
                )
            , model.gsmTime || 60)
    }

    getCommandSubscription$(id: any, command: string) {
        return this.commandSubscriber$.pipe(
            filter(message => message.commandId == id),
            map(message => {
                if (message.error) throw message.error
                return message.data
            })
        )

    }


    private sendToSubscribers(data) {
        if (typeof data != "object") return;
        Object.keys(data).forEach(method => {
            Object.keys(data[method]).forEach(field => {
                this.subscriber$.next({method, field, data: data[method][field]})
            })
        })
    }

    close() {
        if (!this.websocketInstance) return;
        this.websocketInstance.close()
        this.websocketInstance = null
    }

    awaitState$<T>(
        rootKey: keyof PanelParsedInfo, structureKey: keyof IControlPanelUpdateBlock,
        objectKey?: string /*keyof operationMode*/,
        awaitedValue?: any
    ) {
        return this.getCommandSubscription$(rootKey, structureKey)
            .pipe(
                filter(
                    (data) => {
                        const allowed = isDefined(data[objectKey]) && data[objectKey] == awaitedValue;
                        console.group();
                        console.log("data:", data, {objectKey, structureKey, rootKey, awaitedValue});
                        console.log("Allowed:", allowed);
                        console.groupEnd();

                        return allowed
                    }
                ),
                take(1)
            )
    }

    generateSubscription$<T>(
        rootKey: keyof PanelParsedInfo, structureKey: keyof IControlPanelUpdateBlock,
    ): Observable<T> {
        return this.subscriber$.asObservable().pipe(
            filter((cfg, index) => rootKey == cfg.method && cfg.field == structureKey),
            map((value) => value.data),
        )
    }

}