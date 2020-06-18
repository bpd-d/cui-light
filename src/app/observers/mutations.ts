import { ICuiLogger, IUIInteractionProvider, ICuiMutiationPlugin, ICuiComponent, ICuiPluginManager } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is, getMatchingAttribute } from "../../core/utlis/functions";
import { CuiUtils } from "../../core/models/utils";

export interface ICuiMutionObserver {
    // setOptions(options: MutationObserverInit): ICuiMutionObserver;
    setPlugins(plugins: ICuiPluginManager): ICuiMutionObserver;
    setComponents(components: ICuiComponent[]): ICuiMutionObserver;
    setAttributes(attributes: string[]): ICuiMutionObserver;
    start(): ICuiMutionObserver;
    stop(): ICuiMutionObserver;
}


export class CuiMutationObserver implements ICuiMutionObserver {
    #log: ICuiLogger;
    #observer: MutationObserver;
    #options: MutationObserverInit;
    #element: HTMLElement;
    #plugins: ICuiPluginManager;
    #components: ICuiComponent[];
    #attributes: string[];
    #utils: CuiUtils;
    constructor(element: HTMLElement, utils: CuiUtils) {
        this.#observer = null
        this.#element = element
        this.#log = CuiLoggerFactory.get('CuiMutationObserver')
        this.#plugins = null;
        this.#components = [];
        this.#attributes = [];
        this.#utils = utils;

    }

    setPlugins(plugins: ICuiPluginManager) {
        this.#plugins = plugins;
        return this;
    }

    setComponents(components: ICuiComponent[]) {
        this.#components = components;
        return this;
    }

    setAttributes(attributes: string[]) {
        this.#options = {
            attributes: true,
            subtree: true,
            attributeFilter: attributes
        }
        this.#attributes = attributes;
        return this;
    }

    start() {
        this.#log.debug("Starting")
        this.#observer = new MutationObserver(this.mutationCallback)
        this.#observer.observe(this.#element, this.#options)
        this.#log.debug("Started")
        return this;
    }

    stop() {
        this.#log.debug("Stopping")
        if (this.#observer !== null)
            this.#log.debug("Observer available")
        this.#observer.disconnect()
        this.#observer = null;
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
            if (is(this.#plugins)) {
                this.#plugins.onMutation(mutation).then(() => {
                    this.#log.debug("Mutation performed on plugins")
                })
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
        nodes.forEach((node: any) => {
            const matching = getMatchingAttribute(node, this.#attributes);
            if (is(matching)) {
                const component = this.#components.find(c => { c.attribute === matching });
                if (is(component)) {
                    this.#utils.styleAppender.append(component.getStyle());
                    node.$handler = component.get(node, this.#utils)
                    node.$handler.handle();
                }
            }
        })
    }

    private handleRemovedNodes(nodes: NodeList) {
        nodes.forEach(node => {
            this.#log.debug("Removing")
        })
    }
}