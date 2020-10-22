import { ICuiEventEmitHandler, ICuiLogger, ICuiCallbackExecutor, CuiEventReceiver } from "../models/interfaces";
import { is } from "../utils/functions";
import { CuiLoggerFactory } from "../factories/logger";

interface EmitHandlerData {
    events: CuiEventReceiver;
    cuid: string;
    args: any[];
}

class EmitHandlerBase {
    isBusy: boolean;
    queue: EmitHandlerData[];
    constructor() {
        this.queue = [];
        this.isBusy = false;
    }
    idMatches(emitId: string, handleId: string) {
        return !is(emitId) || (is(emitId) && emitId == handleId);
    }
}

export class SimpleEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #log: ICuiLogger;
    #executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        super();
        this.#executor = executor;
        this.#log = CuiLoggerFactory.get("SimpleEventEmitHandler");
    }

    async handle(events: CuiEventReceiver, cuid: string, args: any[]): Promise<void> {
        if (!is(events)) {
            this.#log.warning("No events provided")
            return
        }
        this.queue.push({
            events: events,
            cuid: cuid,
            args: args
        })
        if (!this.isBusy) {
            if (!this.isBusy) {
                this.isBusy = true;
                this.perform();
                if (this.queue.length > 0) {
                    await this.perform();
                }
                this.isBusy = false;
            }
        }
        return;
    }

    private async perform() {
        let task = this.queue.shift();
        for (let id in task.events) {
            let event = task.events[id]
            try {
                if (this.idMatches(task.cuid, event.$cuid))
                    await this.#executor.execute(event.callback, task.args)
            }
            catch (e) {
                this.#log.error(e)
            }
        }
    }
}

export class TaskedEventEmitHandler extends EmitHandlerBase implements ICuiEventEmitHandler {
    #executor: ICuiCallbackExecutor;
    constructor(executor: ICuiCallbackExecutor) {
        super();
        this.#executor = executor;
    }

    async handle(events: CuiEventReceiver, cuid: string, args: any[]): Promise<void> {
        if (!is(events)) {
            return
        }
        this.queue.push({
            events: events,
            cuid: cuid,
            args: args
        })
        if (!this.isBusy) {
            this.isBusy = true;
            this.perform();
            if (this.queue.length > 0) {
                this.perform();
            }
            this.isBusy = false;
        }
        return;
    }

    private async perform(): Promise<void[]> {
        let task = this.queue.shift();
        let promises: Promise<void>[] = []
        for (let id in task.events) {
            let event = task.events[id]
            if (this.idMatches(task.cuid, event.$cuid))
                promises.push(this.#executor.execute(event.callback, task.args))
        }
        return Promise.all(promises)
    }
}


export class CuiEventEmitHandlerFactory {
    static get(name: string, executor: ICuiCallbackExecutor): ICuiEventEmitHandler {
        switch (name) {
            case "tasked":
                return new TaskedEventEmitHandler(executor);
            default:
                return new SimpleEventEmitHandler(executor);
        }
    }
}