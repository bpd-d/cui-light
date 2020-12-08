import { CuiSetupInit } from "cui-light-core/dist/esm/models/setup";
import { ICuiPlugin, ICuiComponent, CuiElement, CuiAlertData } from "cui-light-core/dist/esm/models/interfaces";
import { CuiUtils } from "cui-light-core/dist/esm/models/utils";
import { ElementManager } from "./managers/element";
import { CollectionManager } from "./managers/collection";
import { CuiAlertType } from "cui-light-core/dist/esm/utils/types";
export declare class CuiInstance {
    #private;
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]);
    init(): CuiInstance;
    finish(): void;
    get(selector: string): ElementManager | undefined;
    collection(selector: string): CollectionManager | undefined;
    toast(message: string): Promise<boolean>;
    select(selector: string): Element | null;
    all(selector: string): Element[] | undefined;
    getUtils(): CuiUtils;
    on(event: string, callback: any, element?: CuiElement): void;
    detach(event: string, id: string): void;
    detachAll(event: string): void;
    emit(event: string, element: Element | string, ...args: any[]): void;
    alert(id: string, type: CuiAlertType, data: CuiAlertData): void;
    getPlugin(name: string): ICuiPlugin | undefined;
    createCuiElement<T extends object>(element: HTMLElement, arg: string, data: T): boolean;
}
