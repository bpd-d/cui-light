import { ICuiComponent, ICuiPluginManager } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export interface ICuiMutionObserver {
    setPlugins(plugins: ICuiPluginManager): ICuiMutionObserver;
    setComponents(components: ICuiComponent[]): ICuiMutionObserver;
    setAttributes(attributes: string[]): ICuiMutionObserver;
    start(): ICuiMutionObserver;
    stop(): ICuiMutionObserver;
}
export declare class CuiMutationObserver implements ICuiMutionObserver {
    #private;
    plugins: ICuiPluginManager;
    constructor(element: HTMLElement, utils: CuiUtils);
    setPlugins(plugins: ICuiPluginManager): this;
    setComponents(components: ICuiComponent[]): this;
    setAttributes(attributes: string[]): this;
    start(): this;
    stop(): this;
    private mutationCallback;
    private handleChildListMutation;
    private handleAddedNodes;
    private handleRemovedNodes;
}
