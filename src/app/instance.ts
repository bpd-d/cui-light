import { CuiSetup } from "../core/models/setup";
import { DefaultSetup } from "./defaults/setup";
import { is, getName, joinAttributesForQuery } from "../core/utlis/functions";
import { ElementManager } from "./managers/element";
import { CuiLogLevel } from "../core/utlis/types";
import { CLASSES, MUTATED_ATTRIBUTES, ATTRIBUTES } from "../core/utlis/statics";
import { IUIInteractionProvider, ICuiDictionary, ICuiLogger } from "../core/models/interfaces";
import { FastDom } from "../core/utlis/interactions";
import { CuiInteractionsFactory } from "../core/factories/interactions";
import { CuiDictionary } from "../core/utlis/dictionary";
import { ICuiMutionObserver, CuiMutationObserver } from "./observers/mutations";
import { CuiAttributeMutationHandler } from "./managers/mutations";
import { CuiLoggerFactory } from "../core/factories/logger";
import { CuiInstanceColorHandler } from "./handlers/colors";
import { CuiToastHandler } from "./managers/toast";

export class CuiInstance {
    #log: ICuiLogger;
    #prefix: string;
    #logLevel: CuiLogLevel;
    #interactions: IUIInteractionProvider;
    #cache: ICuiDictionary<ElementManager>;

    #mutationObserver: ICuiMutionObserver;
    #toastManager: CuiToastHandler;

    //pubic
    colors: CuiInstanceColorHandler;
    constructor(setup: CuiSetup) {

        this.#prefix = setup.prefix ?? DefaultSetup.prefix;
        this.#logLevel = setup.logLevel ?? DefaultSetup.logLevel
        this.#interactions = CuiInteractionsFactory.get(setup.interaction)
        this.#log = CuiLoggerFactory.get('CuiInstance', this.#logLevel)
        this.#cache = new CuiDictionary<ElementManager>();
        this.#mutationObserver = new CuiMutationObserver(document.body)
        this.colors = new CuiInstanceColorHandler(this.#interactions)
        this.#toastManager = new CuiToastHandler(this.#interactions, this.#prefix, setup.animationTimeLong ?? DefaultSetup.animationTimeLong);
    }

    init(icons?: any): CuiInstance {
        const initElements = document.querySelectorAll(joinAttributesForQuery([ATTRIBUTES.icon, ATTRIBUTES.spinner]))
        if (is(initElements)) {
            this.#log.debug(`Initiating ${initElements.length} elements`)
            initElements.forEach(item => {
                let handler = CuiAttributeMutationHandler.get(item)
                if (is(handler)) {
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
        return this;
    }

    finish(): void {
        this.#mutationObserver.stop();
    }


    get(selector: string): ElementManager {
        const existing = this.#cache.get(selector);
        if (is(existing)) {
            if (existing.refresh()) {
                return existing;
            }
            this.#cache.remove(selector);
        }
        const elements = this.all(selector);
        if (!elements) {
            return undefined
        }
        const newElement = new ElementManager(elements, this.#interactions, this.#logLevel);
        this.#cache.add(selector, newElement)
        return newElement
    }

    toggleDarkMode(): void {
        const name: string = getName(this.#prefix, CLASSES.dark)
        const classes = document.body.classList
        if (classes.contains(name)) {
            classes.remove(name)
        } else {
            classes.add(name)
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
}