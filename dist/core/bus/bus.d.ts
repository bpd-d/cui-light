import { ICuiEventBus, ICuiEventEmitHandler, CuiContext } from "../models/interfaces";
export declare class CuiEventBus implements ICuiEventBus {
    #private;
    constructor(emitHandler: ICuiEventEmitHandler);
    on(name: string, callback: any, ctx: CuiContext): void;
    detach(name: string, ctx: CuiContext): void;
    detachAll(name: string): void;
    emit(event: string, ...args: any[]): Promise<boolean>;
    isSubscribing(name: string, ctx: CuiContext): boolean;
    private isAttached;
}
