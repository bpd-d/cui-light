import { ICuiEventBus, CuiEventReceiver, ICuiLogger, ICuiEventEmitHandler, CuiContext } from "../models/interfaces";
import { is, are } from "../utlis/functions";
import { ArgumentError, CuiBusError } from "../models/errors";
import { CuiLogger } from "../utlis/logger";
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

    on(name: string, callback: any, ctx: CuiContext): void {
        if (!are(name, callback, ctx)) {
            throw new ArgumentError("Missing argument")
        }
        let id = ctx.getCuid();
        if (!is(id)) {
            throw new CuiBusError("Missing component name or cuid")
        }
        this.#log.debug(`Attaching new event: [${name}] for: [${id}]`)
        if (!this.#events[name]) {
            this.#events[name] = {}
        }

        this.#events[name][id] = { ctx: ctx, callback: callback }
    }

    detach(name: string, ctx: CuiContext): void {
        if (!are(name, ctx)) {
            throw new ArgumentError("Missing argument")
        }
        let ev = this.#events[name]
        let id = ctx.getCuid();
        this.#log.debug(`Detaching item: [${id}] from [${name}]`)
        if (this.isAttached(ev, id)) {
            delete ev[id];
        }
    }

    detachAll(name: string): void {
        if (is(name) && this.#events[name]) {
            delete this.#events[name]
        } else {
            this.#log.error(`Event name is missing or incorrect`, "detachAll")
        }
    }

    async emit(event: string, ...args: any[]): Promise<boolean> {
        if (!is(event)) {
            throw new ArgumentError("Event name is incorrect");
        }
        this.#log.debug(`Emit: [${event}]`)
        await this.#eventHandler.handle(this.#events[event], args)
        return true;
    }

    isSubscribing(name: string, ctx: CuiContext) {
        let ev = this.#events[name]
        return this.isAttached(ev, ctx.getCuid())
    }

    private isAttached(ev: CuiEventReceiver, id: string): boolean {
        return is(ev) && is(id) && is(ev[id]);
    }
}