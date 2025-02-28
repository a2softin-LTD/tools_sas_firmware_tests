import { IPanelUser } from "../../../domain/entity/setup-session/PanelData";
import { faker } from "@faker-js/faker";


export function buildUserEmail() {
    return faker.internet.email({firstName: 'sastest2398_'});
}

export function generateUserCreationModels(
    count: number,
) {
    const commands: Array<IPanelUser> = [];

    for (let min = 0; min < count; min++) {
        commands.push({
            name: `USER #${min}`,
            maksMobileLogin: buildUserEmail(),
            index: 0
        })
    }
    return commands;
}