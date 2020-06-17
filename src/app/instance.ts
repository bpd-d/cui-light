import { CuiSetupInit } from "../core/models/setup";
import { is, joinAttributesForQuery, getSystemLightMode, getMatchingAttribute } from "../core/utlis/functions";
import { ElementManager } from "./managers/element";
import { MUTATED_ATTRIBUTES, ATTRIBUTES, STATICS } from "../core/utlis/statics";
import { ICuiLogger, ICuiPlugin, ICuiMutiationPlugin, ICuiComponent } from "../core/models/interfaces";
import { ICuiMutionObserver, CuiMutationObserver } from "./observers/mutations";
//import { CuiAttributeMutationHandler } from "./managers/mutations_old";
import { CuiLoggerFactory } from "../core/factories/logger";
import { CuiToastHandler } from "./managers/toast";
import { CollectionManager } from "./managers/collection";
import { CuiUtils } from "../core/models/utils";
import { CuiInstanceInitError } from "../core/models/errors";

export class CuiInstance {
    #log: ICuiLogger;
    #mutationObserver: ICuiMutionObserver;
    #toastManager: CuiToastHandler;
    #utils: CuiUtils;
    #plugins: ICuiPlugin[];
    #components: ICuiComponent[];
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]) {
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        this.#plugins = plugins ?? [];
        this.#components = components ?? [];
        this.#utils = new CuiUtils(setup);
        this.#log = CuiLoggerFactory.get('CuiInstance')
    }

    init(): CuiInstance {
        // Init elements
        if (!is(window.MutationObserver)) {
            throw new CuiInstanceInitError("Mutation observer does not exists");
        }
        this.#toastManager = new CuiToastHandler(this.#utils.interactions, this.#utils.setup.prefix, this.#utils.setup.animationTimeLong);
        const mutatedAttributes: string[] = this.#components.map(x => { return x.attribute }); // MUTATED_ATTRIBUTES;

        const initElements = document.querySelectorAll(joinAttributesForQuery(mutatedAttributes))
        if (is(initElements)) {
            this.#log.debug(`Initiating ${initElements.length} elements`)
            initElements.forEach((item: any) => {
                let matching: string = getMatchingAttribute(item, mutatedAttributes)
                if (is(matching)) {
                    let component = this.#components.find(c => { return c.attribute === matching });
                    if (is(component)) {
                        this.#utils.styleAppender.append(component.getStyle());
                        item.$handler = component.get(item, this.#utils);
                        item.$handler.handle();
                    }
                }
                else {
                    this.#log.warning("Handler not found")
                }
            })
        }
        // Init plugins
        this.#plugins.forEach(plugin => {
            this.#utils.setup.plugins[plugin.description] = plugin.setup;
            plugin.init(this.#utils);
        })
        this.#mutationObserver = new CuiMutationObserver(document.body, this.#utils)
        this.#mutationObserver.setComponents(this.#components).setAttributes(mutatedAttributes)
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