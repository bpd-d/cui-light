import { ICuiEventBus, CuiEventReceiver, ICuiLogger, ICuiEventEmitHandler, CuiContext, CuiElement } from "../models/interfaces";
import { is, are, generateRandomString } from "../utils/functions";
import { ArgumentError } from "../models/errors";
import { CuiLoggerFactory } from "../factories/logger";

export class CuiEventBus implements ICuiEventBus {
    #events: { [event: string]: CuiEventReceiver }
    #log: ICuiLogger;
    #eventHandler: ICuiEventEmitHandler;

    constructor(emitHandler: ICuiEventEmitHandler) {
        this.#events = {};
        this.#eventHandler = emitHandler;
        this.#log = CuiLoggerFactory.get("CuiEventBus");
    }

    /**
     * Attaches event to event bus
     * 
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to 
     */
    on(name: string, callback: any, cui?: CuiElement): string {
        if (!are(name, callback)) {
            throw new ArgumentError("Missing argument")
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = generateRandomString();


        if (!this.#events[name]) {
            this.#events[name] = {}
        }
        if (this.isAttached(this.#events[name], id, cui)) {
            return null;
        }
        this.#log.debug(`Attaching new event: [${name}] for: [${id}]`)

        this.#events[name][id] = { callback: callback, $cuid: this.getCuid(cui) }
        return id;
    }

    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name: string, id: string, cui?: CuiElement): void {
        if (!are(name, id)) {
            throw new ArgumentError("Missing argument")
        }
        let ev = this.#events[name]
        this.#log.debug(`Detaching item: [${id}] from [${name}]`)
        if (this.isAttached(ev, id)) {
            delete ev[id];
        }
    }

    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void {
        if (is(name) && this.#events[name]) {
            delete this.#events[name]
        } else {
            this.#log.error(`Event name is missing or incorrect`, "detachAll")
        }
    }

    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    async emit(event: string, cuid: string, ...args: any[]): Promise<boolean> {
        if (!is(event)) {
            throw new ArgumentError("Event name is incorrect");
        }

        let callbacks = this.#events[event];
        if (is(callbacks)) {
            this.#log.debug(`Emit: [${event}]`)
            await this.#eventHandler.handle(this.#events[event], cuid, args)
        }
        return true;
    }

    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name: string, id: string, cui?: CuiElement) {
        let ev = this.#events[name]
        return this.isAttached(ev, id, cui)
    }

    private isAttached(ev: CuiEventReceiver, id: string, cui?: CuiElement): boolean {
        if (is(cui)) {
            return is(ev) && is(id) && is(ev[id]) && ev[id].$cuid == cui.$cuid;
        }
        return is(ev) && is(id) && is(ev[id]);
    }

    private getCuid(cui: CuiElement) {
        return is(cui) ? cui.$cuid : null;
    }

    private prepareEventId(ctx: CuiContext) {
        return are(ctx) ? ctx.getId() : generateRandomString();
    }
}   