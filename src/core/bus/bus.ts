import { ICuiEventBus, CuiEventReceiver, ICuiLogger, ICuiEventEmitHandler, CuiContext, CuiElement, CuiEventObj } from "../models/interfaces";
import { is, are, generateRandomString, enumerateObject, mapObject } from "../utils/functions";
import { ArgumentError } from "../models/errors";
import { CuiLoggerFactory } from "../factories/logger";
import { CuiEventEmitHandlerFactory, TaskedEventEmitHandler } from "./handlers";
import { CuiCallbackExecutor } from "./executors";
import { CuiBusExtStatistics, ICuiEventBusQueueSetup } from "./interfaces";

interface ICuiBusMapping {
    [name: string]: number;
}




export class CuiEventBus implements ICuiEventBus {
    #events: { [event: string]: CuiEventReceiver }
    #log: ICuiLogger;
    #eventHandler: ICuiEventEmitHandler;
    #name: string;
    constructor(emitHandler: ICuiEventEmitHandler, name?: string) {
        this.#events = {};
        this.#eventHandler = emitHandler;
        this.#name = name ?? "CuiEventBus"
        this.#log = CuiLoggerFactory.get(this.#name);
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
        let id = this.#name + "-" + generateRandomString();


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
    detach(name: string, id: string): void {
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

    /**
     * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
     * @param {string} event - event name
     * @param {string} cuid - cuid of the component
     */
    detachByCuid(event: string, cuid: string): void {
        if (!are(event, cuid)) {
            return;
        }
        let ev = this.#events[event];
        if (!is(ev)) {
            return;
        }
        enumerateObject({ ...ev }, (evId: string, evValue: CuiEventObj) => {
            if (evValue.$cuid === cuid) {
                delete ev[evId]
            }
        })
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


}


export class CuiEventExtBus implements ICuiEventBus {
    #events: { [event: string]: number };
    #log: ICuiLogger;
    #buses: ICuiEventBus[];
    #last: number;
    constructor(setup: ICuiEventBusQueueSetup[]) {
        this.#log = CuiLoggerFactory.get("CuiEventBus");
        this.#buses = [];
        if (is(setup)) {
            this.#log.debug("Initiating buses")
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority
            })
            sorted.forEach((item, index) => {
                this.#buses.push(this.initBusInstance(item.name, item.handler))
                this.#events = {
                    ...this.#events,
                    ...this.mapEvents(item.eventsDef, index),
                }
                this.#log.debug(`Bus ${item.name} has been initialized with number: ${index}`)
            })

            this.#buses.push(this.initBusInstance("DefaultEventBus", 'tasked'))
            this.#last = this.#buses.length - 1;
            this.#log.debug(`Bus initialization finished`);
        }
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
        return this.get(name).on(name, callback, cui);
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
        this.get(name).detach(name, id, cui);
    }

    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name: string): void {
        this.get(name).detachAll(name);
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
        return this.get(event).emit(event, cuid, ...args);
    }

    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name: string, id: string, cui?: CuiElement) {
        return this.get(name).isSubscribing(name, id, cui);
    }

    /**
    * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
    * @param {string} event - event name
    * @param {string} cuid - cuid of the component
    */
    detachByCuid(event: string, cuid: string): void {
        if (!are(event, cuid)) {
            return
        }
        this.get(event).detachByCuid(event, cuid);
    }


    /**
     * Creates and initializes event bus instance
     * @param busName Event bus name for logger
     * @param handlerName handler name to create proper handler instance
     */
    private initBusInstance(busName: string, handlerName: string): ICuiEventBus {
        if (!are(busName, handlerName)) {
            throw new ArgumentError("Bus name or handler name is incorrect");
        }
        let executor = new CuiCallbackExecutor();
        let handler = CuiEventEmitHandlerFactory.get(handlerName, executor);
        return new CuiEventBus(handler, busName);
    }

    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    private mapEvents(events: string[], index: number): ICuiBusMapping {
        return events.reduce((result: ICuiBusMapping, current: string) => {
            if (!result[current]) {
                return {
                    ...result,
                    [current]: index
                }
            }
            return result;
        }, {})
    }

    /**
     * Retrives porper event bus based on event name
     * @param event 
     */
    private get(event: string): ICuiEventBus {
        let idx = this.#events[event];
        return this.#buses[idx ?? this.#last];
    }
}

export class CuiEventBusFactory {
    static get(setup: ICuiEventBusQueueSetup[]): ICuiEventBus {
        return is(setup) ? new CuiEventExtBus(setup) : new CuiEventBus(new TaskedEventEmitHandler(new CuiCallbackExecutor));
    }
}

export class CuiBusExtStatisticsHandler {
    #isOn: boolean;
    #statistics: CuiBusExtStatistics;
    constructor(gather: boolean, queueCount: number) {
        this.#isOn = gather;
        this.#statistics = {
            queueCount: queueCount,
            events: {}
        }
    }

    addEvent(event: string, queueNumber: number, emitCount?: number) {
        this.#statistics.events[event] = {
            name: event,
            queueNumber: queueNumber,
            emits: emitCount ?? 0
        }
    }

    addQueue() {
        this.#statistics.queueCount += 1;
    }

    addEmit(event: string, queueNumber?: number) {
        if (!this.#isOn) {
            return;
        }

        if (this.#statistics.events[event]) {
            this.#statistics.events[event].emits += 1;
        } else {
            this.addEvent(event, queueNumber ?? -1, 1);
        }

    }

    getStatistics(): CuiBusExtStatistics {
        return this.#statistics;
    }

}