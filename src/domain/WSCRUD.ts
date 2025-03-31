import { WsUpdateModel } from "./entity/setup-session/WsUpdateModel";
import { WsMethod } from "./constants/ws-connection/ws-commands";
import { IPanelUser, PanelData } from "./entity/setup-session/PanelData";

abstract class WsCreateListItemConfiguration<TEntity> implements WsUpdateModel {
    abstract method: WsMethod;
    abstract subscribePart: keyof PanelData;
    public readonly subscribeMethod = 'create';

    constructor(
        public readonly data: TEntity,
    ) {
    }

    public validityFunction = data => Boolean(data.length)
}

abstract class WsUpdateListItemConfiguration<TEntity> implements WsUpdateModel {
    abstract method: WsMethod;
    abstract subscribePart: keyof PanelData;
    public readonly subscribeMethod = 'update';

    constructor(
        public readonly data: TEntity,
        public validityFunction: (data: TEntity[]) => boolean
    ) {
    }
}

abstract class WsDeleteListItemConfiguration implements WsUpdateModel {
    abstract method: WsMethod;
    abstract subscribePart: keyof PanelData;
    public readonly subscribeMethod = 'delete';

    constructor(
        public readonly data: number,
        public validityFunction: (indexes: number) => boolean
    ) {
    }
}

export class CreateUserConfiguration extends WsCreateListItemConfiguration<IPanelUser> {
    method = WsMethod.UPDATE_USER;
    subscribePart: 'users';
    //

}

export class UpdateUserConfiguration extends WsUpdateListItemConfiguration<IPanelUser> {
    method = WsMethod.UPDATE_USER;
    subscribePart: 'users';

    //

}

class DeleteUserConfiguration extends WsDeleteListItemConfiguration {
    method = WsMethod.REMOVE_USER;
    subscribePart: 'users';
    //

}

// new CreateUserConfiguration(userModels[i])