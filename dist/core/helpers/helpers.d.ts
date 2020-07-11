import { IUIInteractionProvider } from "../models/interfaces";
import { ICuiComponentAction } from "../utlis/actions";
export declare class CuiActionsHelper {
    #private;
    constructor(interactions: IUIInteractionProvider);
    performAction(target: Element, action: ICuiComponentAction, timeout: number): Promise<boolean>;
}
