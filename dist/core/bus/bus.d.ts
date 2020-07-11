import { ICuiEventBus, ICuiEventEmitHandler, CuiContext, CuiElement } from "../models/interfaces";
export declare class CuiEventBus implements ICuiEventBus {
    #private;
    constructor(emitHandler: ICuiEventEmitHandler);
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to
     */
    on(name: string, callback: any, ctx: CuiContext, cui?: CuiElement): string;
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name: string, ctx: CuiContext, cui?: CuiElement): void;
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void;
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event: string, cuid: string, ...args: any[]): Promise<boolean>;
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name: string, ctx: CuiContext, cui?: CuiElement): boolean;
    private isAttached;
    private getCuid;
    private prepareEventId;
}
