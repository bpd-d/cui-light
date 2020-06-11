import { ICuiLogger, IUIInteractionProvider } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { CuiLogLevel } from "../../core/utlis/types";
import { is } from "../../core/utlis/functions";
import { CuiAttributeMutationHandler } from "../managers/mutations";

export interface ICuiMutionObserver {
    setOptions(options: MutationObserverInit): ICuiMutionObserver;
    start(): ICuiMutionObserver;
    stop(): ICuiMutionObserver;
}


export class CuiMutationObserver implements ICuiMutionObserver {
    #log: ICuiLogger;
    #logLevel: CuiLogLevel;
    private observer: MutationObserver;
    private options: MutationObserverInit;
    private element: HTMLElement;

    constructor(element: HTMLElement, interactions: IUIInteractionProvider, logLevel?: CuiLogLevel) {
        this.observer = null
        this.element = element
        this.#log = CuiLoggerFactory.get('CuiMutationObserver', logLevel)
        this.#logLevel = logLevel

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
                    const item = mutation.target as any;
                    if (is(item.$handler)) {
                        item.$handler.handle();
                    }
                    break;

                case 'childList':
                    this.handleChildListMutation(mutation);
                    break;
            }
        })
    }

    private handleChildListMutation(mutation: MutationRecord) {
        const addedLen = mutation.addedNodes.length;
        const removedLen = mutation.removedNodes.length;
        if (addedLen > 0) {
            this.#log.debug("Registering added nodes: " + addedLen)
            this.handleAddedNodes(mutation.addedNodes);
        } else if (removedLen > 0) {
            this.#log.debug("REmoving nodes: " + removedLen);
            this.handleRemovedNodes(mutation.removedNodes);
        }
    }

    private handleAddedNodes(nodes: NodeList) {
        nodes.forEach(node => {
            let handler = CuiAttributeMutationHandler.get(node)
            if (is(handler)) {
                let item = node as any;
                item['$handler'] = handler;
            }
        })
    }

    private handleRemovedNodes(nodes: NodeList) {
        nodes.forEach(node => {
            this.#log.debug("Removing")
        })
    }
}