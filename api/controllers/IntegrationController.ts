import { APIRequestContext, APIResponse } from "@playwright/test";
import { ApiBuilder } from "../builder/ApiBuilder";
import {
    INTEGRATION_READ_PANEL_LIST_FIRST_NODE,
    INTEGRATION_READ_PANEL_LIST_SECOND_NODE
} from "./path";

export class IntegrationController {

    static async getOnlinePanelListFirstNode(
        request: APIRequestContext,
    ): Promise<APIResponse> {
        return await ApiBuilder.sendGetRequest(
            request,
            process.env.DEV_PANEL_FIRST_NODE,
            INTEGRATION_READ_PANEL_LIST_FIRST_NODE,
        );
    };

    static async getOnlinePanelListSecondNode(
        request: APIRequestContext,
    ): Promise<APIResponse> {
        return await ApiBuilder.sendGetRequest(
            request,
            process.env.DEV_PANEL_FIRST_NODE,
            INTEGRATION_READ_PANEL_LIST_SECOND_NODE,
        );
    };
}
