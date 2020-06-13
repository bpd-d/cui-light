import { ICuiCallbackExecutor, ICuiEventBus, CuiEventReceiver, ICuiLogger, ICuiEventEmitHandler, CuiContext } from "../models/interfaces";
import { is } from "../utlis/functions";

export class CuiEventBus implements ICuiEventBus {
    #events: { [event: string]: CuiEventReceiver }
    #log: ICuiLogger;
    #eventHandler: ICuiEventEmitHandler;

    constructor(emitHandler: ICuiEventEmitHandler) {
        this.#events = {};
        this.#eventHandler = emitHandler;
    }

    on(name: string, callback: CuiContext, ctx: CuiContext): void {
        let id = ctx.getCuid();
        if (!is(id)) {
            throw new Error("Missing component name or cuid")
        }
        this.#log.debug(`Attaching new event: [${name}] for: [${id}]`)
        if (!this.#events[name]) {
            this.#events[name] = {}
        }

        this.#events[name][id] = { ctx: ctx, callback: callback }
    }

    detach(name: string, ctx: CuiContext): void {
        let ev = this.#events[name]
        let id = ctx.getCuid();
        this.#log.debug(`Detaching item: [${id}] from [${name}]`)
        if (this.isAttached(ev, id)) {
            delete ev[id];
        }
    }

    detachAll(name: string): void {
        if (name && this.#events[name]) {
            delete this.#events[name]
        }
    }

    async emit(event: string, ...args: any[]): Promise<boolean> {
        this.#log.debug(`Emit: [${event}]`)
        await this.#eventHandler.handle(this.#events[event], args)
        return true;
    }

    isSubscribing(name: string, ctx: CuiContext) {
        let ev = this.#events[name]
        return this.isAttached(ev, ctx.getCuid())
    }

    clear(name: string): void {
        let ev = this.#events[name];
        if (ev) {
            delete this.#events[name]
        }
    }

    private isAttached(ev: CuiEventReceiver, id: string): boolean {
        return is(ev) && is(id) && is(ev[id]);
    }
}