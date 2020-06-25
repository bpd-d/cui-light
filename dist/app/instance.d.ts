import { CuiSetupInit } from "../core/models/setup";
import { ElementManager } from "./managers/element";
import { ICuiPlugin, ICuiComponent, ICuiPluginManager, CuiContext } from "../core/models/interfaces";
import { CollectionManager } from "./managers/collection";
import { CuiUtils } from "../core/models/utils";
export declare class CuiInstance {
    #private;
    plugins: ICuiPluginManager;
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]);
    init(): CuiInstance;
    finish(): void;
    get(selector: string): ElementManager;
    collection(selector: string): CollectionManager;
    toast(message: string): Promise<boolean>;
    select(selector: string): Element;
    all(selector: string): Element[];
    getUtils(): CuiUtils;
    on(event: string, callback: any, context: CuiContext): void;
}
