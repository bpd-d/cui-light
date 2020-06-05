import { ICuiLogger } from "../../core/models/interfaces";
import { CuiAttributeMutationHandler } from "../managers/mutations";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { CuiLogLevel } from "../../core/utlis/types";

export interface ICuiMutionObserver {
    setOptions(options: MutationObserverInit): ICuiMutionObserver;
    start(): ICuiMutionObserver;
    stop(): ICuiMutionObserver;
}


export class CuiMutationObserver implements ICuiMutionObserver {
    #log: ICuiLogger;

    private observer: MutationObserver;
    private options: MutationObserverInit;
    private element: HTMLElement;

    constructor(element: HTMLElement, logLevel?: CuiLogLevel) {
        this.observer = null
        this.element = element
        this.#log = CuiLoggerFactory.get('CuiMutationObserver', logLevel)

    }

    setOptions(options: MutationObserverInit) {
        this.options = options
        return this
    }

    start() {
        this.#log.debug("Starting")
        this.observer = new MutationObserver(this.mutationCallback)
        this.observer.observe(this.element, this.options)
        this.#log.debug("Started")
        return this;
    }

    stop() {
        this.#log.debug("Stopping")
        if (this.observer !== null)
            this.#log.debug("Observer available")
        this.observer.disconnect()
        this.observer = null;
        this.#log.debug("Stopped")
        return this
    }

    private mutationCallback(mutations: MutationRecord[], observer: MutationObserver) {
        mutations.forEach((mutation: MutationRecord) => {
            switch (mutation.type) {
                case 'attributes':
                    let handler = CuiAttributeMutationHandler.get(mutation.target)
                    if (handler)
                        handler.handle()
                    break;
            }
        })
    }
}