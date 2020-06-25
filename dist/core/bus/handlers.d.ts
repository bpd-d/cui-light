import { ICuiEventEmitHandler, ICuiCallbackExecutor, CuiEventReceiver } from "../models/interfaces";
export declare class SimpleEventEmitHandler implements ICuiEventEmitHandler {
    #private;
    constructor(executor: ICuiCallbackExecutor);
    handle(events: CuiEventReceiver, args: any[]): Promise<void>;
}
export declare class TaskedEventEmitHandler implements ICuiEventEmitHandler {
    #private;
    constructor(executor: ICuiCallbackExecutor);
    handle(events: CuiEventReceiver, args: any[]): Promise<void>;
}
