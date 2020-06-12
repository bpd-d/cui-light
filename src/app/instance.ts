import { CuiSetup } from "../core/models/setup";
import { DefaultSetup } from "./defaults/setup";
import { is, getName, joinAttributesForQuery, getSystemLightMode } from "../core/utlis/functions";
import { ElementManager } from "./managers/element";
import { CuiLogLevel, CuiClearCacheType, CuiLightMode } from "../core/utlis/types";
import { CLASSES, MUTATED_ATTRIBUTES, ATTRIBUTES } from "../core/utlis/statics";
import { IUIInteractionProvider, ICuiDictionary, ICuiLogger, ICuiCacheManager } from "../core/models/interfaces";
import { FastDom } from "../core/utlis/interactions";
import { CuiInteractionsFactory } from "../core/factories/interactions";
import { CuiDictionary } from "../core/utlis/dictionary";
import { ICuiMutionObserver, CuiMutationObserver } from "./observers/mutations";
import { CuiAttributeMutationHandler } from "./managers/mutations";
import { CuiLoggerFactory } from "../core/factories/logger";
import { CuiInstanceColorHandler } from "./handlers/colors";
import { CuiToastHandler } from "./managers/toast";
import { CollectionManager } from "./managers/collection";
import { CuiCacheManager } from "./managers/cache";
import { LightModeListener } from "../core/listeners/light";

export class CuiInstance {
    #log: ICuiLogger;
    #prefix: string;
    #logLevel: CuiLogLevel;
    #interactions: IUIInteractionProvider;
    #cache: ICuiDictionary<ElementManager>;
    #collectionCache: ICuiDictionary<CollectionManager>;
    #mutationObserver: ICuiMutionObserver;
    #toastManager: CuiToastHandler;
    #cacheManager: ICuiCacheManager;
    #lightModeListener: LightModeListener;
    autoLightMode: boolean;

    //pubic
    colors: CuiInstanceColorHandler;
    constructor(setup: CuiSetup) {
        this.#prefix = setup.prefix ?? DefaultSetup.prefix;
        this.#logLevel = setup.logLevel ?? DefaultSetup.logLevel
        this.#interactions = CuiInteractionsFactory.get(setup.interaction)
        this.#log = CuiLoggerFactory.get('CuiInstance', this.#logLevel)
        this.#cache = new CuiDictionary<ElementManager>();
        this.#collectionCache = new CuiDictionary<CollectionManager>();
        this.#cacheManager = new CuiCacheManager(setup.cacheSize ?? DefaultSetup.cacheSize);
        this.#mutationObserver = new CuiMutationObserver(document.body, this.#interactions)
        this.colors = new CuiInstanceColorHandler(this.#interactions)
        this.#toastManager = new CuiToastHandler(this.#interactions, this.#prefix, setup.animationTimeLong ?? DefaultSetup.animationTimeLong);
        this.#lightModeListener = new LightModeListener(this);
        this.autoLightMode = setup.autoLightMode ?? DefaultSetup.autoLightMode;
    }

    init(icons?: any): CuiInstance {
        const initElements = document.querySelectorAll(joinAttributesForQuery([ATTRIBUTES.icon, ATTRIBUTES.spinner, ATTRIBUTES.circle]))
        if (is(initElements)) {
            this.#log.debug(`Initiating ${initElements.length} elements`)
            initElements.forEach((item: any) => {
                let handler = CuiAttributeMutationHandler.get(item, this.#interactions)
                if (is(handler)) {
                    item.$handler = handler;
                    handler.handle();
                } else {
                    this.#log.warning("Handler not found")
                }
            })
        }
        this.#mutationObserver.setOptions({
            attributes: true,
            subtree: true,
            attributeFilter: MUTATED_ATTRIBUTES
        });
        this.#mutationObserver.start();
        this.#lightModeListener.start();
        if (this.autoLightMode && getSystemLightMode() === 'dark') {
            this.setLightMode('dark')
        }
        return this;
    }

    finish(): void {
        this.#mutationObserver.stop();
    }


    get(selector: string): ElementManager {
        const existing = this.#cacheManager.get(selector);
        if (is(existing)) {
            return existing as ElementManager;
        }
        const elements = this.all(selector);
        if (!elements) {
            return undefined
        }
        const newElement = new ElementManager(elements, this.#interactions, this.#logLevel);
        this.#cacheManager.put(selector, newElement)
        return newElement
    }

    collection(selector: string): CollectionManager {
        const existing = this.#cacheManager.get(selector);
        if (is(existing)) {
            return existing as CollectionManager;
        }
        const elements = this.all(selector);
        if (!is(elements)) {
            return undefined;
        }
        let manager = new CollectionManager(elements, this.#interactions, this.#logLevel);
        this.#cacheManager.put(selector, manager)
        return manager;
    }

    // toggleDarkMode(): void {
    //     const name: string = getName(this.#prefix, CLASSES.dark)
    //     const classes = document.body.classList
    //     if (classes.contains(name)) {
    //         classes.remove(name)
    //     } else {
    //         classes.add(name)
    //     }
    // }

    setLightMode(mode: CuiLightMode) {
        const name: string = getName(this.#prefix, CLASSES.dark);
        const classes = document.body.classList;
        if (mode === 'dark' && !classes.contains(name)) {
            classes.add(name);
        } else if (mode === 'light' && classes.contains(name)) {
            classes.remove(name);
        }
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

    clearCache(clearType: CuiClearCacheType): void {
        switch (clearType) {
            case 'element':
                this.#cache.clear();
                break;
            case 'collection':
                this.#collectionCache.clear();
                break;
            case 'all':
                this.#cache.clear();
                this.#collectionCache.clear();
        }
    }
}