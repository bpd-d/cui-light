import { ICuiEventEmitHandler, ICuiLogger, ICuiCallbackExecutor, CuiEventReceiver } from "../models/interfaces";
import { is } from "../utlis/functions";
import { CuiLoggerFactory } from "../factories/logger";

export class SimpleEventEmitHandler implements ICuiEventEmitHandler {
    #log: ICuiLogger;
    #executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        this.#executor = executor;
        this.#log = CuiLoggerFactory.get("SimpleEventEmitHandler");
    }
    async handle(events: CuiEventReceiver, args: any[]): Promise<void> {
        if (!is(events)) {
            this.#log.warning("No events provided")
            return
        }
        for (let id in events) {
            let event = events[id]
            try {
                await this.#executor.execute(event.callback, event.ctx, args)
            }
            catch (e) {
                this.#log.error(e)
            }
        }
        return;
    }
}

export class TaskedEventEmitHandler implements ICuiEventEmitHandler {
    #executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        this.#executor = executor;
    }
    async handle(events: CuiEventReceiver, args: any[]): Promise<void> {
        if (!is(events)) {
            return
        }
        let promises: Promise<void>[] = []
        for (let id in events) {
            let event = events[id]
            promises.push(this.#executor.execute(event.callback, event.ctx, args))
        }
        Promise.all(promises)
        return;
    }
}