import { ICuiLogger, IUIInteractionProvider, CuiElement, CuiContext, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { CuiUtils } from "../../core/models/utils";
import { getActiveClass, CuiActionsHelper, ICuiComponentAction, is } from "../../core/index";
import { ICuiComponentMutationObserver, CuiComponentMutationHandler } from "../observers/mutations";
import { ICuiIntersectionHandler } from "../observers/intersection";

export interface CuiChildMutation {
    removed: Node[];
    added: Node[];
}

export class ComponentHelper {
    #interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this.#interactions = interactions;
    }

    hasClass(cls: string, element: Element) {
        return cls && element.classList.contains(cls)
    }

    setClass(cls: string, element: Element) {
        this.setClasses([cls], element);
    }

    setClasses(classes: string[], element?: Element) {
        if (element) {
            element.classList.add(...classes)
        }
    }

    setClassesAs(element: Element, ...classes: string[]) {
        this.#interactions.mutate(this.setClasses, this, classes, element);
    }

    removeClass(cls: string, element: Element) {
        this.removeClasses([cls], element);
    }

    removeClasses(classes: string[], element?: Element) {
        if (element) {
            element.classList.remove(...classes)
        }
    }

    removeClassesAs(element: Element, ...classes: string[]) {
        this.#interactions.mutate(this.removeClasses, this, classes, element);
    }

    removeAttribute(attributeName: string, element: Element) {
        if (element.hasAttribute(attributeName))
            element.removeAttribute(attributeName);
    }

    setStyle(element: any, property: string, value: string) {
        if (element["style"] && is(value)) {
            element.style[property] = value
        }
    }


}

export class CuiComponentBase implements CuiContext {
    _log: ICuiLogger;
    utils: CuiUtils;
    element: Element;
    cuid: string;
    isLocked: boolean;
    activeClassName: string;
    helper: ComponentHelper;
    constructor(componentName: string, element: Element, utils: CuiUtils) {
        this._log = CuiLoggerFactory.get(componentName);
        this.utils = utils;
        this.element = element;
        this.cuid = (<any>element).$cuid;
        this.isLocked = false;
        this._log.setId(this.cuid);
        this.activeClassName = getActiveClass(utils.setup.prefix);
        this.helper = new ComponentHelper(utils.interactions);
    }


    mutate(callback: any, ...args: any[]): void {
        this.utils.interactions.mutate(callback, this, ...args)
    }

    fetch(callback: any, ...args: any[]): void {
        this.utils.interactions.fetch(callback, this, ...args)
    }

    getEventName(name: string) {
        return [name, this.cuid].join('-');
    }

    emitEvent(event: string, ...data: any[]) {
        this.utils.bus.emit(event, this.cuid, ...data)
    }

    onEvent(event: string, callback: any): string {
        return this.utils.bus.on(event, callback, this.element as any)
    }

    detachEvent(event: string, id: string) {
        if (id != null) {
            this.utils.bus.detach(event, id);
            id = null;
        }
    }

    getId(): string {
        return this.cuid;
    }

    checkLockAndWarn(fName?: string): boolean {
        if (this.isLocked) {
            this._log.warning("Component is locked", fName)
            return true
        }
        return false;
    }

    /**
     * Helper which checks whether element has an active flag set
     */
    isActive(): boolean {
        return this.element.classList.contains(this.activeClassName);
    }

}

abstract class CuiHandlerBase<T extends ICuiParsable> extends CuiComponentBase implements ICuiComponentHandler {
    args: T;
    prevArgs: T;
    isInitialized: boolean;
    activeClassName: string;
    actionsHelper: CuiActionsHelper;
    #attribute: string;
    constructor(componentName: string, element: Element, attribute: string, args: T, utils: CuiUtils) {
        super(componentName, element, utils);
        this.args = args;

        this.actionsHelper = new CuiActionsHelper(utils.interactions)
        this.prevArgs = null;
        this.isInitialized = false;
        this.#attribute = attribute;
    }

    handle(args: any): void {
        this._log.debug("Init", 'handle');
        if (this.isInitialized) {
            this._log.warning("Trying to initialize component again", 'handle');
            return;
        }
        this.args.parse(args);
        if (!this.element.classList.contains(this.#attribute)) {
            this.element.classList.add(this.#attribute);
        }
        this.onHandle();
        this.isInitialized = true;
    }

    refresh(args: any): void {
        this._log.debug("Update", 'refresh')
        if (!this.isInitialized) {
            this._log.error("Cannot update not initialized component", 'refresh');
            return;
        }
        this.prevArgs = { ...this.args };
        this.args.parse(args);
        this.onRefresh();
    }

    destroy(): void {
        this._log.debug("Destroy", "destroy");
        this.onRemove();
        this.isInitialized = false;
    }



    // Abstract
    abstract onHandle(): void;
    abstract onRefresh(): void;
    abstract onRemove(): void;
}


export abstract class CuiHandler<T extends ICuiParsable> extends CuiHandlerBase<T> {
    args: T;
    prevArgs: T;
    isInitialized: boolean;

    actionsHelper: CuiActionsHelper;
    constructor(componentName: string, element: Element, attribute: string, args: T, utils: CuiUtils) {
        super(componentName, element, attribute, args, utils);
    }

    onHandle() {
        this.onInit();
    }


    onRefresh() {
        this.onUpdate();
    }

    onRemove() {
        this.onDestroy();
    }

    /**
     * Helper created for elements that animate - perfroms an action *add*, after timeout it performs *remove*.
     * 
     * @param action - action to perfrom
     * @param timeout - timeout specified for action removal
     * @param onFinish - callback to be performed after action is finished after removal
     * @param callback - optional - callback to be executed in mutation on action removal, e.g. additional DOM changes on element
     */
    async performAction(action: ICuiComponentAction, timeout: number, onFinish: () => void, callback?: () => void): Promise<boolean> {
        if (await this.actionsHelper.performAction(this.element, action, timeout, callback)) {
            onFinish();
            return true;
        }
        return false;
    }

    // Abstract
    abstract onInit(): void;
    abstract onUpdate(): void;
    abstract onDestroy(): void;

}

export abstract class CuiMutableHandler<T extends ICuiParsable> extends CuiHandlerBase<T> {
    #mutionHandler: ICuiComponentMutationObserver;
    constructor(componentName: string, element: Element, attribute: string, args: T, utils: CuiUtils) {
        super(componentName, element, attribute, args, utils);
        this.#mutionHandler = new CuiComponentMutationHandler(element);
        this.#mutionHandler.onMutation(this.mutation.bind(this))
    }

    onHandle() {
        this.onInit();
        this.#mutionHandler.observe();
    }


    onRefresh() {
        this.#mutionHandler.unobserve();
        this.onUpdate();
        this.#mutionHandler.observe();
    }

    onRemove() {
        this.#mutionHandler.unobserve();
        this.onDestroy();
    }

    /**
     * Callback attached to mutation observer set on root element
     * 
     * @param record - mutation records
     */
    mutation(records: MutationRecord[]): void {
        this._log.debug("Element mutation", "mutation")
        this.onMutation(records.reduce<CuiChildMutation>((result: CuiChildMutation, item: MutationRecord) => {
            if (item.type !== "childList") {
                return result;
            }
            if (item.addedNodes.length > 0) {
                result.added.push(...item.addedNodes)
            }
            if (item.removedNodes.length > 0) {
                result.removed.push(...item.removedNodes)
            }
            return result;
        }, {
            added: [],
            removed: []
        }));
    }

    abstract onMutation(record: CuiChildMutation): void;
    abstract onInit(): void;
    abstract onUpdate(): void;
    abstract onDestroy(): void;
}