import { CuiAlertData, CuiContext } from "cui-light-core/dist/esm/models/interfaces";
import { CuiUtils } from "cui-light-core/dist/esm/models/utils";
import { CuiAlertType } from "cui-light-core/dist/esm/utils/types";
export interface ICuiAlertHandler {
    show(root: Element): void;
}
declare abstract class CuiAlertHandlerBase implements ICuiAlertHandler, CuiContext {
    #private;
    closeStr: string;
    iconStr: string;
    content: string;
    title: string;
    prefix: string;
    reverse: boolean;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData);
    getId(): string;
    show(root: Element): void;
    updateElement(element: HTMLElement): void;
    onClose(arg: any): void;
    abstract createElement(): HTMLElement;
}
export declare class CuiAlertHandler extends CuiAlertHandlerBase {
    #private;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData);
    createElement(): HTMLElement;
}
export declare class CuiInfoAlertUpHandler extends CuiAlertHandlerBase {
    #private;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData);
    createElement(): HTMLElement;
}
export declare class CuiYesNoPopUpHandler extends CuiAlertHandlerBase {
    #private;
    constructor(setup: CuiUtils, id: string, data: CuiAlertData);
    createElement(): HTMLElement;
}
export declare class CuiAlertFactory {
    static get(id: string, type: CuiAlertType, data: CuiAlertData, utils: CuiUtils): ICuiAlertHandler | undefined;
}
export {};
