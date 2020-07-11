import { CuiUtils } from "../models/utils";
export interface ICuiComponentAction {
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export declare class CuiClassAction implements ICuiComponentAction {
    #private;
    constructor(className: string);
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export declare class CuiInboundAction implements ICuiComponentAction {
    #private;
    constructor(name: string);
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
    private setDarkMode;
}
export declare class DummyAction implements ICuiComponentAction {
    constructor();
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}
export declare class CuiActionsFatory {
    static get(value: string): ICuiComponentAction;
}
