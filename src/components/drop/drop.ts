import { ICuiComponent, ICuiComponentHandler, ICuiOpenable, ICuiClosable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler, CuiChildMutation } from "../../app/handlers/base";
import { getIntOrDefault, parseAttribute, is, getActiveClass, isString, getName, replacePrefix, isStringTrue, getStringOrDefault, boolStringOrDefault } from "../../core/utils/functions";
import { ICuiComponentAction, CuiClassAction } from "../../core/utils/actions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { KeyDownEvent } from "../../plugins/keys/observer";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHoverListener, CuiHoverEvent } from "../../core/listeners/hover";

const bodyClass = '{prefix}-drop-open';

const DROP_DEFAULT_TRIGGER = "a, button";


export interface CuiDropEvent {
    timestamp: number;
}

export class CuiDropArgs {
    escClose: boolean;
    mode: "click" | "hover";
    match: string;
    trigger: string;
    prevent: boolean;
    autoClose: boolean;
    outClose: boolean;
    constructor() {
        this.escClose = false;
        this.mode = "click";
        this.match = null;
        this.trigger = DROP_DEFAULT_TRIGGER;
        this.autoClose = false;
        this.outClose = false;
    }

    parse(args: any) {
        this.escClose = args.escClose && isStringTrue(args.escClose);
        this.mode = getStringOrDefault(args.mode, 'click').toLowerCase();
        this.match = args.match;
        this.trigger = getStringOrDefault(args.trigger, DROP_DEFAULT_TRIGGER);
        this.prevent = isStringTrue(args.prevent);
        this.autoClose = isStringTrue(args.autoClose);
        this.outClose = args.outClose ? isStringTrue(args.outClose) : true;
    }
}

export class CuiDropComponenet implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-drop`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiDropHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiDropHandler extends CuiHandler<CuiDropArgs> implements ICuiOpenable, ICuiClosable {
    #prefix: string;
    #bodyClass: string;
    #attribute: string;
    #triggerHoverListener: CuiHoverListener;
    #hoverListener: CuiHoverListener;
    #trigger: Element;
    #clearId: any;

    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuidropHandler", element, new CuiDropArgs(), utils);
        this.#attribute = attribute;
        this.#prefix = prefix;
        this.#clearId = null;
        this.#bodyClass = replacePrefix(bodyClass, prefix);
        this.#hoverListener = new CuiHoverListener(this.element);
        this.#hoverListener.setCallback(this.onTargetHover.bind(this))
    }

    onInit(): void {
        this.#trigger = this.element.parentElement.querySelector(this.args.trigger)
        this.#triggerHoverListener = new CuiHoverListener(this.#trigger);
        this.setTriggerEvent();
        AriaAttributes.setAria(this.element, 'aria-dropdown', "");
        this._log.debug("Initialized", "handle")
    }
    onUpdate(): void {
        if (this.#triggerHoverListener.isAttached()) {
            this.#triggerHoverListener.detach();
        } else if (this.prevArgs.mode === 'click') {
            this.#trigger.removeEventListener('click', this.onTriggerClick.bind(this))
        }

        this.#trigger = this.element.parentElement.querySelector(this.args.trigger)
        this.#triggerHoverListener = new CuiHoverListener(this.#trigger);
        this.setTriggerEvent();
    }

    onDestroy(): void {

    }

    async open(): Promise<boolean> {
        if (this.checkLockAndWarn('open')) {
            return false;
        }
        if (this.isActive()) {
            return this.close();
        }
        if (this.isAnyActive()) {
            await this.findAndCloseOpenedDrop();
        }
        this.isLocked = true;
        this._log.debug(`Drop ${this.cuid}`, 'open');
        this.mutate(this.onOpen, this);
        this.emitEvent(EVENTS.OPEN, {
            timestamp: Date.now()
        })
        this.#hoverListener.attach();
        if (this.args.autoClose) {
            this.runAutoCloseTask();
        }
        this.isLocked = false;
        return true
    }

    async close(): Promise<boolean> {
        if (this.checkLockAndWarn("close") || !this.isActive()) {
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Drop ${this.cuid}`, 'close');
        this.mutate(this.onClose, this);
        this.emitEvent(EVENTS.CLOSE, {
            timestamp: Date.now()
        })
        this.#hoverListener.detach();
        this.isLocked = false;
        return true;
    }

    onTargetHover(ev: CuiHoverEvent) {
        if (ev.isHovering && is(this.#clearId)) {
            clearTimeout(this.#clearId);
            this.#clearId = null;
        } else if (!ev.isHovering && !is(this.#clearId) && this.args.autoClose) {
            this.runAutoCloseTask();
        }
    }

    onClose() {
        this.helper.removeClass(this.activeClassName, this.element)
        this.helper.removeClass(this.#bodyClass, document.body)
        AriaAttributes.setAria(this.element, 'aria-expanded', 'false')
        this.detachEvent(EVENTS.KEYDOWN);
        this.detachEvent(EVENTS.WINDOW_CLICK);
    }

    onOpen() {
        this.helper.setClass(this.activeClassName, this.element)
        this.helper.setClass(this.#bodyClass, document.body)
        AriaAttributes.setAria(this.element, 'aria-expanded', 'true')
        if (this.args.escClose) {
            this.onEvent(EVENTS.KEYDOWN, this.onEscClose.bind(this))
        }
        if (this.args.outClose) {
            this.onEvent(EVENTS.WINDOW_CLICK, this.onWindowClick.bind(this));
        }
    }

    onEscClose(ev: KeyDownEvent) {
        if (ev.event.key === "Escape") {
            this.close();
        }
    }

    onWindowClick(ev: MouseEvent) {
        if (!this.element.contains((ev.target as Node))) {
            this.close();
        }
    }

    isAnyActive(): boolean {
        return this.helper.hasClass(this.#bodyClass, document.body);
    }

    getAction(className: string): ICuiComponentAction {
        return new CuiClassAction(replacePrefix(className, this.#prefix));
    }

    async findAndCloseOpenedDrop(): Promise<boolean> {
        const opened = document.querySelector(`[${this.#attribute}].${this.activeClassName}`);
        if (!is(opened)) {
            this._log.warning("Opened drop was not found");
            return false;
        }
        const handler = (<CuiElement>(opened as any)).$handlers[this.#attribute] as any;
        if (!is(handler)) {
            this._log.warning("Drop handler was not found in the element");
            return false;
        }
        return handler.close();
    }

    onTriggerClick(ev: MouseEvent) {
        if (this.isActive()) {
            this.close();
        } else {
            this.open();
        }
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }

    onHoverEvent(ev: CuiHoverEvent) {
        if (ev.isHovering && !this.isActive()) {
            this.open();
        }
        if (this.args.prevent) {
            ev.event.preventDefault();
        }
    }

    setTriggerEvent() {
        if (this.args.mode === 'hover') {
            this.#triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
            this.#triggerHoverListener.attach();
        } else {
            this.#trigger.addEventListener('click', this.onTriggerClick.bind(this))
        }
    }

    runAutoCloseTask() {
        this.#clearId = setTimeout(() => {
            this.close();
        }, 5000)
    }

}