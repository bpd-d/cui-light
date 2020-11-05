import { ICuiComponent, ICuiComponentHandler, ICuiOpenable, ICuiClosable, CuiElement, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler, CuiChildMutation, CuiInteractableHandler, CuiInteractableArgs } from "../../app/handlers/base";
import { is, replacePrefix, isStringTrue, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { EVENTS, SCOPE_SELECTOR } from "../../core/utils/statics";
import { KeyDownEvent } from "../../plugins/keys/observer";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHoverListener, CuiHoverEvent } from "../../core/listeners/hover";
import { ICuiPositionCalculator } from "../../core/position/interfaces";
import { CuiBasePositionCalculator } from "../../core/position/calculator";
import { AnimationProperty } from "../../core/animation/interfaces";
import { CuiTaskRunner, ICuiTask } from "../../core/utils/task";
import { CuiActionsListFactory, ICuiComponentAction } from "../../core/index";

const bodyClass = '{prefix}-drop-open';
const DROP_POSITION = "{prefix}-drop-position-";
const DROP_TRIGGER = "{prefix}-drop-trigger";
const DROP_DEFAULT_TRIGGER = "> a, button";


export interface CuiDropEvent {
    timestamp: number;
}

export class CuiDropArgs implements ICuiParsable {
    mode: "click" | "hover";
    trigger: string;
    prevent: boolean;
    autoClose: boolean;
    outClose: boolean;
    pos: string;
    action: string;
    timeout: number;
    margin: number;

    #defOpenAct: string
    constructor(prefix: string) {
        this.#defOpenAct = replacePrefix('{prefix}-drop-animation-in', prefix);
        this.mode = "click";
        this.trigger = DROP_DEFAULT_TRIGGER;
        this.autoClose = false;
        this.outClose = false;
        this.prevent = false;
        this.pos = null;
        this.action = this.#defOpenAct;
        this.timeout = 3000;
        this.margin = 8;
    }


    parse(args: any) {
        this.mode = getStringOrDefault(args.mode, 'click').toLowerCase();
        this.trigger = SCOPE_SELECTOR + getStringOrDefault(args.trigger, DROP_DEFAULT_TRIGGER);
        this.prevent = isStringTrue(args.prevent);
        this.autoClose = isStringTrue(args.autoClose);
        this.outClose = args.outClose ? isStringTrue(args.outClose) : true;
        this.pos = getStringOrDefault(args.pos, null);
        this.action = getStringOrDefault(args.action, this.#defOpenAct);
        this.timeout = getIntOrDefault(args.timeout, 3000);
        this.margin = getIntOrDefault(args.margin, 8);
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

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
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
    #windowClickEventId: string;
    #openEventId: string;
    #closeEventId: string;
    #positionCalculator: ICuiPositionCalculator;
    #posClass: string;
    #dropParentCls: string;
    #autoTask: ICuiTask;
    #actions: ICuiComponentAction[];
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuidropHandler", element, attribute, new CuiDropArgs(prefix), utils);
        this.#attribute = attribute;
        this.#prefix = prefix;
        this.#bodyClass = replacePrefix(bodyClass, prefix);
        this.#hoverListener = new CuiHoverListener(this.element);
        this.#hoverListener.setCallback(this.onElementHover.bind(this))
        this.#windowClickEventId = null;
        this.#openEventId = null;
        this.#closeEventId = null;
        this.onTriggerClick = this.onTriggerClick.bind(this)
        this.#positionCalculator = new CuiBasePositionCalculator();
        this.#positionCalculator.setMargin(8);
        this.#positionCalculator.setPreferred("bottom-left");
        this.#posClass = ""
        this.#dropParentCls = replacePrefix(DROP_TRIGGER, prefix)
    }

    onInit(): void {
        this.#trigger = this.element.parentElement.querySelector(this.args.trigger)
        this.#triggerHoverListener = new CuiHoverListener(this.#trigger);
        this.setTriggerEvent();
        this.#openEventId = this.onEvent(EVENTS.OPEN, this.open.bind(this));
        this.#closeEventId = this.onEvent(EVENTS.CLOSE, this.close.bind(this));
        this.#positionCalculator.setStatic(this.args.pos);
        this.#positionCalculator.setMargin(this.args.margin);
        this.#autoTask = new CuiTaskRunner(this.args.timeout, false, this.close.bind(this));
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.mutate(() => {
            AriaAttributes.setAria(this.element, 'aria-dropdown', "");
            if (!this.helper.hasClass(this.#dropParentCls, this.element.parentElement)) {
                this.helper.setClass(this.#dropParentCls, this.element.parentElement);
            }
        })

        this._log.debug("Initialized", "handle")
    }

    onUpdate(): void {
        if (this.#triggerHoverListener.isAttached()) {
            this.#triggerHoverListener.detach();
        } else if (this.prevArgs.mode === 'click') {
            this.#trigger.removeEventListener('click', this.onTriggerClick)
        }

        this.#trigger = this.element.parentElement.querySelector(this.args.trigger)
        this.#triggerHoverListener = new CuiHoverListener(this.#trigger);
        this.setTriggerEvent();
        this.#positionCalculator.setStatic(this.args.pos);
        this.#positionCalculator.setMargin(this.args.margin);
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.#autoTask.setTimeout(this.args.timeout);
    }

    onDestroy(): void {
        this.detachEvent(EVENTS.OPEN, this.#openEventId);
        this.detachEvent(EVENTS.CLOSE, this.#closeEventId);
        this.mutate(() => {
            this.helper.removeClass(this.#dropParentCls, this.element.parentElement);
        })

    }

    /**
    * Api Method open
    */
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
        this.onOpen();
        this.isLocked = false;
        return true
    }

    /**
     * Api Method close
     */
    async close(): Promise<boolean> {
        if (this.checkLockAndWarn("close") || !this.isActive()) {
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Drop ${this.cuid}`, 'close');
        this.onClose();
        this.detachEvent(EVENTS.WINDOW_CLICK, this.#windowClickEventId);
        this.emitEvent(EVENTS.CLOSED, {
            timestamp: Date.now()
        })
        this.#hoverListener.detach();
        this.isLocked = false;
        return true;
    }


    onClose() {
        this.mutate(() => {
            this.helper.removeClass(this.activeClassName, this.element)
            this.helper.removeClass(this.#bodyClass, document.body)
            this.toggleActions();
            this.helper.removeClass(this.#posClass, this.element);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false')
        })
    }

    onOpen() {
        this.helper.setClass(this.activeClassName, this.element);
        this.mutate(() => {
            const box = this.#trigger.getBoundingClientRect();
            try {
                const [x, y, pos] = this.#positionCalculator.calculate(box, this.element.offsetWidth, this.element.offsetHeight)
                this.element.style.top = `${y - box.top}px`;
                this.element.style.left = `${x - box.left}px`;
                this.#posClass = replacePrefix(DROP_POSITION + pos, this.#prefix);
                this.toggleActions();
                this.helper.setClass(this.#posClass, this.element);
                this.helper.setClass(this.#bodyClass, document.body)

                this.emitEvent(EVENTS.OPENED, {
                    timestamp: Date.now()
                })
                this.#hoverListener.attach();
                this.runAutoCloseTask();

                if (this.args.outClose) {
                    this.#windowClickEventId = this.onEvent(EVENTS.WINDOW_CLICK, this.onWindowClick.bind(this));
                }

                AriaAttributes.setAria(this.element, 'aria-expanded', 'true')
            } catch (e) {
                this._log.exception(e)
            }


        })
    }

    /**
     * Event invoked when window is clicked
     * @param ev 
     */
    private onWindowClick(ev: MouseEvent) {
        if (!this.element.contains((ev.target as Node))) {
            this.close();
        }
    }

    private isAnyActive(): boolean {
        return this.helper.hasClass(this.#bodyClass, document.body);
    }

    /**
     * Finds and opens other active drop element
     */
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

    /**
     * Invoked when trigger button is clicked
     * @param ev 
     */
    private onTriggerClick(ev: MouseEvent) {
        if (this.isActive()) {
            this.close();
        } else {
            this.open();
        }
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }

    /**
    * Invoked when trigger button is hovered on
    * @param ev
    */
    private onHoverEvent(ev: CuiHoverEvent) {
        if (ev.isHovering && !this.isActive()) {
            this.open();
        }
        if (this.args.prevent) {
            ev.event.preventDefault();
        }
    }


    /**
     * Method triggered when opened element is hovered on
     * @param ev 
     */
    private onElementHover(ev: CuiHoverEvent) {
        if (ev.isHovering) {
            this.#autoTask.stop();
        } else if (!ev.isHovering && this.args.autoClose) {
            this.runAutoCloseTask();
        }
    }

    /**
     * Sets event on trigger button
     */
    private setTriggerEvent() {
        if (this.args.mode === 'hover') {
            this.#triggerHoverListener.setCallback(this.onHoverEvent.bind(this));
            this.#triggerHoverListener.attach();
        } else {
            this.#trigger.addEventListener('click', this.onTriggerClick)
        }
    }

    /**
     * Runs auto-close task on opened element
     */
    private runAutoCloseTask() {
        if (!this.args.autoClose) {
            return
        }
        this.#autoTask.start();
    }

    private toggleActions() {
        this.#actions.forEach(action => {
            action.toggle(this.element);
        })
    }
}