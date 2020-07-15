import { CuiSetupInit } from "../core/models/setup";
import { is, joinAttributesForQuery, are, registerCuiElement } from "../core/utils/functions";
import { ElementManager } from "./managers/element";
import { STATICS, EVENTS, CSS_VARIABLES } from "../core/utils/statics";
import { ICuiLogger, ICuiPlugin, ICuiComponent, ICuiPluginManager, CuiContext, CuiElement } from "../core/models/interfaces";
import { ICuiMutionObserver, CuiMutationObserver } from "./observers/mutations";
import { CuiLoggerFactory } from "../core/factories/logger";
import { CuiToastHandler } from "./managers/toast";
import { CollectionManager } from "./managers/collection";
import { CuiUtils } from "../core/models/utils";
import { CuiInstanceInitError } from "../core/models/errors";
import { CuiPluginManager } from "./managers/plugins";


export class CuiInstance {
    #log: ICuiLogger;
    #mutationObserver: ICuiMutionObserver;
    #toastManager: CuiToastHandler;
    #utils: CuiUtils;
    plugins: ICuiPluginManager;
    #components: ICuiComponent[];
    #rootElement: HTMLElement;
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]) {
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        this.plugins = new CuiPluginManager(plugins);
        this.#components = components ?? [];
        this.#utils = new CuiUtils(setup);
        this.#log = CuiLoggerFactory.get('CuiInstance')
        this.#rootElement = setup.root;
    }

    init(): CuiInstance {
        this.#log.debug("Instance started", "init")
        // Init elements
        if (!is(window.MutationObserver)) {
            throw new CuiInstanceInitError("Mutation observer does not exists");
        }
        this.#toastManager = new CuiToastHandler(this.#utils.interactions, this.#utils.setup.prefix, this.#utils.setup.animationTimeLong);
        const mutatedAttributes: string[] = this.#components.map(x => { return x.attribute }); // MUTATED_ATTRIBUTES; 
        const initElements = is(mutatedAttributes) ? this.#rootElement.querySelectorAll(joinAttributesForQuery(mutatedAttributes)) : null
        if (is(initElements)) {
            this.#log.debug(`Initiating ${initElements.length} elements`)
            try {
                initElements.forEach((item: any) => {
                    registerCuiElement(item, this.#components, mutatedAttributes, this.#utils);
                })
            } catch (e) {
                this.#log.exception(e);
            }
        }
        this.#log.debug("Init plugins", "init")
        // Init plugins
        this.plugins.init(this.#utils);

        if (are(this.#components, mutatedAttributes)) {
            this.#log.debug("Init mutation observer", "init")
            this.#mutationObserver = new CuiMutationObserver(this.#rootElement, this.#utils)
            this.#mutationObserver.setComponents(this.#components).setAttributes(mutatedAttributes)
            this.#mutationObserver.setPlugins(this.plugins);
            this.#mutationObserver.start();
        }

        this.#log.debug("Setting CSS globals", 'init')
        this.#utils.interactions.mutate(() => {
            this.#utils.setProperty(CSS_VARIABLES.animationTimeLong, `${this.#utils.setup.animationTimeLong}ms`)
            this.#utils.setProperty(CSS_VARIABLES.animationTime, `${this.#utils.setup.animationTime}ms`);
            this.#utils.setProperty(CSS_VARIABLES.animationTimeShort, `${this.#utils.setup.animationTimeShort}ms`);
        }, null)


        this.#utils.bus.emit(EVENTS.INSTANCE_INITIALIZED, null)
        return this;
    }

    finish(): void {
        this.#mutationObserver.stop();
        this.#utils.bus.emit(EVENTS.INSTANCE_FINISHED, null)
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

    on(event: string, callback: any, context: CuiContext, element?: CuiElement): void {
        if (!are(event, callback)) {
            this.#log.error("Incorrect arguments", "on")
        }
        this.#utils.bus.on(event, callback, context, element);
    }
}