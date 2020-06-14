import { CuiSetupInit } from "../core/models/setup";
import { is, joinAttributesForQuery, getSystemLightMode } from "../core/utlis/functions";
import { ElementManager } from "./managers/element";
import { MUTATED_ATTRIBUTES, ATTRIBUTES, STATICS } from "../core/utlis/statics";
import { ICuiLogger, ICuiPlugin, ICuiMutiationPlugin } from "../core/models/interfaces";
import { ICuiMutionObserver, CuiMutationObserver } from "./observers/mutations";
import { CuiAttributeMutationHandler } from "./managers/mutations";
import { CuiLoggerFactory } from "../core/factories/logger";
import { CuiToastHandler } from "./managers/toast";
import { CollectionManager } from "./managers/collection";
import { CuiUtils } from "../core/models/utils";

export class CuiInstance {
    #log: ICuiLogger;
    #mutationObserver: ICuiMutionObserver;
    #toastManager: CuiToastHandler;
    #utils: CuiUtils;
    #plugins: ICuiPlugin[];
    constructor(setup: CuiSetupInit, plugins?: ICuiPlugin[]) {
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        this.#plugins = plugins ?? [];
        this.#utils = new CuiUtils(setup);
        this.#log = CuiLoggerFactory.get('CuiInstance')
        this.#mutationObserver = new CuiMutationObserver(document.body, this.#utils.interactions)
        this.#toastManager = new CuiToastHandler(this.#utils.interactions, this.#utils.setup.prefix, this.#utils.setup.animationTimeLong);

    }

    init(icons?: any): CuiInstance {
        // Init elements
        const initElements = document.querySelectorAll(joinAttributesForQuery([ATTRIBUTES.icon, ATTRIBUTES.spinner, ATTRIBUTES.circle]))
        if (is(initElements)) {
            this.#log.debug(`Initiating ${initElements.length} elements`)
            initElements.forEach((item: any) => {
                let handler = CuiAttributeMutationHandler.get(item, this.#utils.interactions)
                if (is(handler)) {
                    item.$handler = handler;
                    handler.handle();
                } else {
                    this.#log.warning("Handler not found")
                }
            })
        }
        // Init plugins
        this.#plugins.forEach(plugin => {
            this.#utils.setup.plugins[plugin.description] = plugin.setup;
            plugin.init(this.#utils);
        })
        this.#mutationObserver.setOptions({
            attributes: true,
            subtree: true,
            attributeFilter: MUTATED_ATTRIBUTES
        });

        this.#mutationObserver.setPlugins(this.#plugins.filter(plugin => {
            let mutated = plugin as any;
            return is(mutated['mutation']);
        }) as any);
        this.#mutationObserver.start();
        return this;
    }

    finish(): void {
        this.#mutationObserver.stop();
    }


    get(selector: string): ElementManager {
        const existing = this.#utils.cache.get(selector);
        if (is(existing)) {
            return existing as ElementManager;
        }
        const elements = this.all(selector);
        if (!elements) {
            return undefined
        }
        const newElement = new ElementManager(elements, this.#utils);
        this.#utils.cache.put(selector, newElement)
        return newElement
    }

    collection(selector: string): CollectionManager {
        const existing = this.#utils.cache.get(selector);
        if (is(existing)) {
            return existing as CollectionManager;
        }
        const elements = this.all(selector);
        if (!is(elements)) {
            return undefined;
        }
        let manager = new CollectionManager(elements, this.#utils.interactions);
        this.#utils.cache.put(selector, manager)
        return manager;
    }


    async toast(message: string): Promise<boolean> {
        if (!is(message)) {
            return false;
        }
        return this.#toastManager.show(message)
    }

    select(selector: string): Element {
        return document.querySelector(selector)
    }

    all(selector: string): Element[] {
        const nodes: NodeListOf<Element> = document.querySelectorAll(selector);
        if (!is(nodes)) {
            return undefined;
        }
        return [...nodes];
    }

    getUtils(): CuiUtils {
        return this.#utils;
    }
    // clearCache(clearType: CuiClearCacheType): void {
    //     switch (clearType) {
    //         case 'element':
    //             this.#cache.clear();
    //             break;
    //         case 'collection':
    //             this.#collectionCache.clear();
    //             break;
    //         case 'all':
    //             this.#cache.clear();
    //             this.#collectionCache.clear();
    //     }
    // }
}