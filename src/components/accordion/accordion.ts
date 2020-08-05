import { ICuiComponent, ICuiComponentHandler, ICuiSwitchable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase, CuiHandler } from "../../app/handlers/base";
import { getIntOrDefault, is, getActiveClass, isStringTrue, replacePrefix, getStringOrDefault } from "../../core/utils/functions";
import { SCOPE_SELECTOR } from "../../core/index";

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
const ACCORDION_CONTENT_CLS = '> * > .{prefix}-accordion-content';
const ACCORDION_ITEMS_CLS = '> *';

const ACCORDION_EVENT = "switch"

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
        this.selector = this.#defTitleSelector;
        this.items = this.#defItemsSelector;
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

export class CuiAccordionHandler extends CuiHandler<CuiAccordionArgs> implements ICuiSwitchable {

    #isInitialized: boolean;
    #items: Element[];
    #activeCls: string;
    #targets: CuiAccordionTarget[];

    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiAccordionHandler", element, new CuiAccordionArgs(prefix, utils.setup.animationTime), utils);

        this.#isInitialized = false;
        this.#activeCls = getActiveClass(prefix);
    }

    onInit(): void {
        if (this.args.isValid()) {
            try {
                this.#items = this.queryItems();
                const t = this.element.querySelectorAll(this.args.selector);
                this.#targets = [];
                t.forEach((item: Element, index: number) => {
                    let target: CuiAccordionTarget = { element: item };
                    this.setListener(target, index)
                    this.#targets.push(target);
                })
            } catch (e) {
                this._log.exception(e, 'handle')
            }
            this.#isInitialized = true;
            this._log.debug("Initialized", "handle")
        }
    }
    onUpdate(): void {
        if (this.args.isValid() && !this.#isInitialized) {
            this.#isInitialized = true;
            this._log.debug("Initialized", "refresh")
        }
        try {
            this.#items = this.queryItems();
            this.#targets.forEach(x => this.removeListener(x))
            const t = this.element.querySelectorAll(this.args.selector);
            this.#targets = [];
            t.forEach((item: Element, index: number) => {
                let target: CuiAccordionTarget = { element: item };
                this.setListener(target, index)
                this.#targets.push(target);
            })
        } catch (e) {
            this._log.exception(e, 'handle')
        }
    }

    onDestroy(): void {
        //
    }


    async switch(index: number): Promise<boolean> {
        this._log.debug("Switch to: " + index);
        if (index < 0 || this.isLocked || !this.#isInitialized) {
            return false;
        }

        this.#items = this.queryItems();
        if (this.#items.length <= index) {
            return false;
        }
        this.isLocked = true;
        const current = this.#items[index]
        if (current.classList.contains(this.#activeCls))
            this.mutate(() => {
                current.classList.remove(this.#activeCls)
            })

        else {
            if (this.args.single) {
                this.closeAllExcept(index)
            }
            this.mutate(() => { current.classList.add(this.#activeCls) })
        }
        this.emitEvent(ACCORDION_EVENT, {
            index: index,
            currentTarget: current,
            timestamp: Date.now()
        })
        this.isLocked = false;
        return true;
    }

    closeAllExcept(current: number) {
        this.mutate(() => {
            this.#items.forEach((item: Element, index: number) => {
                if (current !== index && item.classList.contains(this.#activeCls)) {
                    item.classList.remove(this.#activeCls)
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
        return this.#items = [...this.element.querySelectorAll(this.args.items)]
    }
}