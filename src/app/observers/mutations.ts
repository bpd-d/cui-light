import { ICuiLogger, IUIInteractionProvider, ICuiMutiationPlugin, ICuiComponent, ICuiPluginManager, CuiElement } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is, getMatchingAttribute, are, getMatchingAttributes, generateCUID, registerCuiElement } from "../../core/utils/functions";
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
    _log: ICuiLogger;
    #observer: MutationObserver;
    #options: MutationObserverInit;
    #element: HTMLElement;
    plugins: ICuiPluginManager;
    #components: ICuiComponent[];
    #attributes: string[];
    #utils: CuiUtils;
    constructor(element: HTMLElement, utils: CuiUtils) {
        this.#observer = null
        this.#element = element
        this._log = CuiLoggerFactory.get('CuiMutationObserver')
        this.plugins = null;
        this.#components = [];
        this.#attributes = [];
        this.#utils = utils;

    }

    setPlugins(plugins: ICuiPluginManager) {
        this.plugins = plugins;
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
            childList: true,
            attributeFilter: attributes
        }
        this.#attributes = attributes;
        return this;
    }

    start() {
        this._log.debug("Starting")
        this.#observer = new MutationObserver(this.mutationCallback.bind(this));
        this.#observer.observe(this.#element, this.#options)
        this._log.debug("Started")
        return this;
    }

    stop() {
        this._log.debug("Stopping")
        if (this.#observer !== null)
            this._log.debug("Observer available")
        this.#observer.disconnect()
        this.#observer = null;
        this._log.debug("Stopped")
        return this
    }

    private mutationCallback(mutations: MutationRecord[], observer: MutationObserver) {
        this._log.debug("Mutation")
        mutations.forEach((mutation: MutationRecord) => {
            switch (mutation.type) {
                case 'attributes':
                    const item = mutation.target as any;
                    if (are(item.$handlers, item.$handlers[mutation.attributeName])) {
                        item.$handlers[mutation.attributeName].refresh();
                    }
                    break;

                case 'childList':
                    this.handleChildListMutation(mutation);
                    break;
            }
            if (is(this.plugins)) {
                this.plugins.onMutation(mutation).then(() => {
                    this._log.debug("Mutation performed on plugins")
                })
            }
        })
    }

    private handleChildListMutation(mutation: MutationRecord) {
        const addedLen = mutation.addedNodes.length;
        const removedLen = mutation.removedNodes.length;
        if (addedLen > 0) {
            this._log.debug("Registering added nodes: " + addedLen)
            this.handleAddedNodes(mutation.addedNodes);
        } else if (removedLen > 0) {
            this._log.debug("REmoving nodes: " + removedLen);
            this.handleRemovedNodes(mutation.removedNodes);
        }
    }

    private handleAddedNodes(nodes: NodeList) {
        nodes.forEach((node: any) => {
            registerCuiElement(node, this.#components, this.#attributes, this.#utils);
        })
    }

    private handleRemovedNodes(nodes: NodeList) {
        nodes.forEach(node => {
            this._log.debug("Removing")
        })
    }

    // private registterCuiElement(node: any) {
    //     let element = node as CuiElement
    //     element.$handlers = {};
    //     let matching: string[] = getMatchingAttributes(node, this.#attributes)
    //     if (is(matching)) {
    //         matching.forEach(match => {
    //             let component = this.#components.find(c => { return c.attribute === match });
    //             if (is(component)) {
    //                 this.#utils.styleAppender.append(component.getStyle());
    //                 let handler = component.get(node, this.#utils);
    //                 element.$handlers[component.attribute] = handler;
    //                 element.$handlers[component.attribute].handle();
    //             }
    //         })
    //         element.$cuid = generateCUID(node.tagName)
    //     }
    // }
}