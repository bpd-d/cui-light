import { ICuiComponent, ICuiComponentHandler, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler, CuiChildMutation, CuiMutableHandler } from "../../app/handlers/base";
import { getIntOrDefault, is, getActiveClass, isStringTrue, replacePrefix, getStringOrDefault } from "../../core/utils/functions";
import { SCOPE_SELECTOR, EVENTS } from "../../core/index";

/**
 * 
 */

export interface CuiAccordionEvent {
    index: number;
    previous: number;
    currentTarget: Element;
    previousTarget: Element;
    timestamp: number;
}

interface CuiAccordionTarget {
    element: Element,
    listener?: any
}

const ACCORDION_TITLE_CLS = '> * > .{prefix}-accordion-title';
const ACCORDION_ITEMS_CLS = '> *';

export class CuiAccordionArgs {
    single: boolean;
    selector: string;
    items: string;
    timeout: number;
    animation: boolean;
    content: string

    #defTitleSelector: string;
    #defItemsSelector: string;
    #defTimeout: number;
    constructor(prefix: string, timeout: number) {
        this.#defTitleSelector = replacePrefix(ACCORDION_TITLE_CLS, prefix);
        this.#defItemsSelector = replacePrefix(ACCORDION_ITEMS_CLS, prefix);
        this.#defTimeout = timeout;
        this.single = false;
        this.selector = SCOPE_SELECTOR + this.#defTitleSelector;
        this.items = SCOPE_SELECTOR + this.#defItemsSelector;
        this.timeout = this.#defTimeout;
    }

    parse(args: any) {
        if (is(args)) {
            this.single = isStringTrue(args.single);
            this.selector = SCOPE_SELECTOR + getStringOrDefault(args.selector, this.#defTitleSelector);
            this.items = SCOPE_SELECTOR + getStringOrDefault(args.content, this.#defItemsSelector);
            this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
            this.animation = isStringTrue(args.animation);
            return;
        }

    }

    isValid(): boolean {
        return true;
    }
}

export class CuiAccordionComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-accordion`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiAccordionHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiAccordionHandler extends CuiMutableHandler<CuiAccordionArgs> implements ICuiSwitchable {
    #items: Element[];
    #targets: CuiAccordionTarget[];
    #switchEventId: string;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiAccordionHandler", element, attribute, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        this.#switchEventId = null;
    }

    onInit(): void {
        if (this.args.isValid()) {
            try {
                this.initTargets();
                this.#switchEventId = this.onEvent(EVENTS.SWITCH, this.onSwitch.bind(this))
            } catch (e) {
                this._log.exception(e, 'handle')
            }
            this._log.debug("Initialized", "handle")
        }
    }

    onUpdate(): void {
        try {
            this.initTargets();
        } catch (e) {
            this._log.exception(e, 'handle')
        }
    }

    onDestroy(): void {
        this.detachEvent(EVENTS.SWITCH, this.#switchEventId)
    }

    onMutation(mutations: CuiChildMutation) {
        if (mutations.added.length > 0 || mutations.removed.length > 0)
            this.initTargets();
    }

    async switch(index: number): Promise<boolean> {
        this._log.debug("Switch to: " + index);
        if (index < 0 || this.isLocked || !this.isInitialized) {
            return false;
        }

        this.#items = this.queryItems();
        if (this.#items.length <= index) {
            return false;
        }
        this.isLocked = true;
        const current = this.#items[index]
        if (this.helper.hasClass(this.activeClassName, current)) {
            this.helper.removeClassesAs(current, this.activeClassName)
        } else {
            if (this.args.single) {
                this.closeAllExcept(index)
            }
            this.helper.setClassesAs(current, this.activeClassName)

        }
        this.emitEvent(EVENTS.SWITCHED, {
            index: index,
            currentTarget: current,
            timestamp: Date.now()
        })
        this.isLocked = false;
        return true;
    }

    onSwitch(index: any): void {
        this.switch(getIntOrDefault(index, -1)).then(() => {
            this._log.debug("Switch from event to " + index);
        });
    }

    initTargets() {
        this.#items = this.queryItems();
        const t = this.element.querySelectorAll(this.args.selector);
        this.#targets = [];
        t.forEach((item: Element, index: number) => {
            let target: CuiAccordionTarget = { element: item };
            this.setListener(target, index)
            this.#targets.push(target);
        })
    }

    closeAllExcept(current: number) {
        this.mutate(() => {
            this.#items.forEach((item: Element, index: number) => {
                if (current !== index && this.helper.hasClass(this.activeClassName, item)) {
                    item.classList.remove(this.activeClassName)
                }
            })
        })
    }

    setListener(target: CuiAccordionTarget, index: number) {
        target.listener = () => {
            this.switch(index);
        }
        target.element.addEventListener('click', target.listener)
    }

    removeListener(target: CuiAccordionTarget) {
        if (target.listener) {
            target.element.removeEventListener('click', target.listener);
        }
    }

    queryItems(): Element[] {
        return [...this.element.querySelectorAll(this.args.items)]
    }
}