import { CuiSetupInit } from "cui-light-core/dist/esm/models/setup";
import { is, joinAttributesForQuery, are, registerCuiElement, addCuiArgument } from "cui-light-core/dist/esm/utils/functions";
import { STATICS, EVENTS, CSS_VARIABLES } from "cui-light-core/dist/esm/utils/statics";
import { ICuiLogger, ICuiPlugin, ICuiComponent, ICuiPluginManager, CuiElement, CuiAlertData } from "cui-light-core/dist/esm/models/interfaces";
import { ICuiMutionObserver, CuiMutationObserver } from "cui-light-core/dist/esm/observers/mutations";
import { CuiLoggerFactory } from "cui-light-core/dist/esm/factories/logger";
import { CuiUtils } from "cui-light-core/dist/esm/models/utils";
import { CuiInstanceInitError } from "cui-light-core/dist/esm/models/errors";
import { CuiAlertFactory } from "./handlers/alert";
import { CuiMoveObserver } from "./observers/move";
import { ElementManager } from "./managers/element";
import { CuiToastHandler } from "./managers/toast";
import { CollectionManager } from "./managers/collection";
import { CuiPluginManager } from "./managers/plugins";
import { CuiAlertType } from "cui-light-core/dist/esm/utils/types";


export class CuiInstance {
    #log: ICuiLogger;
    #mutationObserver: ICuiMutionObserver | undefined;
    #toastManager: CuiToastHandler | undefined;
    #utils: CuiUtils;
    #plugins: ICuiPluginManager;
    #components: ICuiComponent[];
    #rootElement: HTMLElement;
    #moveObserver: CuiMoveObserver;
    #mutatedAttributes: string[];
    constructor(setup: CuiSetupInit, plugins: ICuiPlugin[], components: ICuiComponent[]) {
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        this.#plugins = new CuiPluginManager(plugins);
        this.#components = components ?? [];
        this.#utils = new CuiUtils(setup);
        this.#log = CuiLoggerFactory.get('CuiInstance')
        this.#rootElement = setup.root;
        this.#moveObserver = new CuiMoveObserver(this.#utils.bus);
        this.#mutationObserver = undefined;
        this.#toastManager = undefined;
        this.#mutatedAttributes = [];
    }

    init(): CuiInstance {
        this.#log.debug("Instance started", "init")
        // Init elements
        if (!is(window.MutationObserver)) {
            throw new CuiInstanceInitError("Mutation observer does not exists");
        }
        this.#toastManager = new CuiToastHandler(this.#utils.interactions, this.#utils.setup.prefix, this.#utils.setup.animationTimeLong ?? 0);
        this.#mutatedAttributes = this.#components.map(x => { return x.attribute }); // MUTATED_ATTRIBUTES; 
        const initElements = is(this.#mutatedAttributes) ? this.#rootElement.querySelectorAll(joinAttributesForQuery(this.#mutatedAttributes)) : null
        if (is(initElements)) {
            //@ts-ignore initElements already checked
            this.#log.debug(`Initiating ${initElements.length} elements`)
            try {
                //@ts-ignore initElements already checked
                initElements.forEach((item: any) => {
                    registerCuiElement(item, this.#components, this.#mutatedAttributes, this.#utils);
                })
            } catch (e) {
                this.#log.exception(e);
            }
        }
        this.#log.debug("Init plugins", "init")
        // Init plugins
        this.#plugins.init(this.#utils);

        if (are(this.#components, this.#mutatedAttributes)) {
            this.#log.debug("Init mutation observer", "init")
            this.#mutationObserver = new CuiMutationObserver(this.#rootElement, this.#utils)
            this.#mutationObserver.setComponents(this.#components).setAttributes(this.#mutatedAttributes)
            this.#mutationObserver.setPlugins(this.#plugins);
            this.#mutationObserver.start();
        }

        this.#log.debug("Setting CSS globals", 'init')
        this.#utils.interactions.mutate(() => {
            this.#utils.setProperty(CSS_VARIABLES.animationTimeLong, `${this.#utils.setup.animationTimeLong}ms`)
            this.#utils.setProperty(CSS_VARIABLES.animationTime, `${this.#utils.setup.animationTime}ms`);
            this.#utils.setProperty(CSS_VARIABLES.animationTimeShort, `${this.#utils.setup.animationTimeShort}ms`);
        }, null)
        this.#moveObserver.attach();

        this.#utils.bus.emit(EVENTS.INSTANCE_INITIALIZED, null)
        return this;
    }

    finish(): void {
        if (this.#mutationObserver)
            this.#mutationObserver.stop();
        this.#moveObserver.detach();
        this.#utils.bus.emit(EVENTS.INSTANCE_FINISHED, null)
    }

    get(selector: string): ElementManager | undefined {
        const elements = this.all(selector);
        if (!elements) {
            return undefined;
        }
        const newElement = new ElementManager(elements, this.#utils);
        return newElement
    }

    collection(selector: string): CollectionManager | undefined {
        const elements = this.all(selector);
        if (!is(elements)) {
            return undefined;
        }
        // @ts-ignore already checked
        let manager = new CollectionManager(elements, this.#utils.interactions);
        return manager;
    }


    async toast(message: string): Promise<boolean> {
        if (!are(message, this.#toastManager)) {
            return false;
        }
        //@ts-ignore toast manager exists
        return this.#toastManager.show(message)
    }

    select(selector: string): Element | null {
        return document.querySelector(selector)
    }

    all(selector: string): Element[] | undefined {
        const nodes: NodeListOf<Element> = document.querySelectorAll(selector);
        if (!is(nodes)) {
            return undefined;
        }
        return [...nodes];
    }

    getUtils(): CuiUtils {
        return this.#utils;
    }

    on(event: string, callback: any, element?: CuiElement): void {
        if (!are(event, callback)) {
            this.#log.error("Incorrect arguments", "on")
        }
        this.#utils.bus.on(event, callback, element);
    }

    detach(event: string, id: string): void {
        if (!are(event, id)) {
            this.#log.error("Incorrect arguments", "detach")
        }
        this.#utils.bus.detach(event, id);
    }

    detachAll(event: string): void {
        if (!is(event)) {
            this.#log.error("Incorrect arguments", "detachAll")
        }
        this.#utils.bus.detachAll(event);
    }

    emit(event: string, element: Element | string, ...args: any[]): void {
        if (!are(event, element)) {
            this.#log.warning("Not enough data to emit event", "emit")
            return;
        }
        let el = typeof element === 'string' ? document.querySelector(element) : element;
        let cuid = (<CuiElement>(el as any)).$cuid;
        if (!is(cuid)) {
            this.#log.warning("Element is not a cUI element", "emit")
            return
        }
        this.#utils.bus.emit(event, cuid, ...args);
    }

    alert(id: string, type: CuiAlertType, data: CuiAlertData): void {
        let popup = CuiAlertFactory.get(id, type, data, this.#utils);
        if (!popup) {
            this.#log.error("Possibly incorrect alert type");
            return;
        }
        popup.show(this.#rootElement);
    }

    getPlugin(name: string): ICuiPlugin | undefined {
        return this.#plugins.get(name);
    }

    createCuiElement<T extends object>(element: HTMLElement, arg: string, data: T): boolean {
        if (!is(arg) || !this.#mutatedAttributes.includes(arg)) {
            this.#log.error("Element cannot be created: Unknown attribute")
            return false;
        }
        if (!addCuiArgument(element, arg, data)) {
            this.#log.error("Element cannot be created: Missing data")
            return false;
        }
        return true;
    }
}