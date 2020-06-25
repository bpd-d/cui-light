import { IUIInteractionProvider } from "../models/interfaces";
export declare class FastDom implements IUIInteractionProvider {
    #private;
    private writes;
    private reads;
    private raf;
    private isScheduled;
    constructor();
    mutate(callback: any, ctx: any, ...args: any[]): void;
    fetch(callback: any, ctx: any, ...args: any[]): void;
    private createTask;
    private run;
    private schedule;
    private flush;
}
export declare class SyncInteractions implements IUIInteractionProvider {
    tasks: any[];
    raf: any;
    isRunning: boolean;
    constructor();
    mutate(callback: any, ctx: any, ...args: any[]): void;
    fetch(callback: any, ctx: any, ...args: any[]): void;
    private schedule;
    private flush;
    private createTask;
}
