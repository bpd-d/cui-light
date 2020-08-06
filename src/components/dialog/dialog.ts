import { ICuiComponent, ICuiComponentHandler, ICuiOpenable, ICuiClosable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { getStringOrDefault, getIntOrDefault, parseAttribute, is, getActiveClass, isString, getName, replacePrefix, isStringTrue } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory, CuiClassAction } from "../../core/utils/actions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { KeyDownEvent } from "../../plugins/keys/observer";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHandler } from "../../app/handlers/base";

const DIALOG_OPEN_ANIMATION_CLASS = '{prefix}-dialog-default-in';
const DIALOG_CLOSE_ANIMATION_CLASS = '{prefix}-dialog-default-out';
const bodyClass = '{prefix}-dialog-open';
const CONTAINER = '.{prefix}-dialog-container';

export interface CuiDialogEvent {
    timestamp: number;
}

export class CuiDialogArgs {
    escClose: boolean;
    outClose: boolean;
    constructor() {
        this.escClose = false;
        this.outClose = false;
    }

    parse(args: any) {
        this.escClose = isStringTrue(args.escClose);
        this.outClose = isStringTrue(args.outClose)
    }
}

export class CuiDialogComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-dialog`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiDialogHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiDialogHandler extends CuiHandler<CuiDialogArgs> implements ICuiComponentHandler, ICuiOpenable, ICuiClosable {

    #prefix: string;
    #timeout: number;
    #bodyClass: string;
    #scrollY: number;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiDialogHandler", element, new CuiDialogArgs(), utils);

        this.#prefix = prefix;
        this.#timeout = utils.setup.animationTimeLong;
        this.#bodyClass = replacePrefix(bodyClass, prefix);
        this.#scrollY = 0;
    }

    onInit(): void {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
        this._log.debug("Initialized", "handle")
    }
    onUpdate(): void {

    }

    onDestroy(): void {

    }

    async open(args?: any): Promise<boolean> {
        if (this.checkLockAndWarn('open')) {
            return false;
        }
        if (this.isAnyActive() || this.isActive()) {
            this._log.warning("Dialog is already opened");
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Dialog ${this.cuid}`, 'open')
        let action = this.getAction(DIALOG_OPEN_ANIMATION_CLASS);
        let scrollY = window.pageYOffset;
        return this.performAction(action, this.#timeout, this.onOpen.bind(this, args), () => {
            this.element.classList.add(this.activeClassName);
            document.body.classList.add(this.#bodyClass);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
            document.body.style.top = `-${scrollY}px`;
        });
    }

    async close(args: any): Promise<boolean> {
        if (this.checkLockAndWarn("close") || !this.isActive()) {
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Dialog ${this.cuid}`, 'close')
        let action = this.getAction(DIALOG_CLOSE_ANIMATION_CLASS);
        return this.performAction(action, this.#timeout, this.onClose.bind(this, args), () => {
            this.element.classList.remove(this.activeClassName);
            document.body.classList.remove(this.#bodyClass);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        });
    }

    onClose(state: any) {
        const scrollY = document.body.style.top;
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        this.detachEvent(EVENTS.ON_KEYDOWN);
        this.detachEvent(EVENTS.ON_WINDOW_CLICK);
        this.emitEvent(EVENTS.ON_CLOSE, {
            timestamp: Date.now(),
            state: state
        })
        this.isLocked = false;
    }

    onOpen(state?: any) {
        if (this.args.escClose) {
            this.onEvent(EVENTS.ON_KEYDOWN, this.onEscClose.bind(this))
        }
        if (this.args.outClose) {
            this.onEvent(EVENTS.ON_WINDOW_CLICK, this.onWindowClick.bind(this));
        }
        this.emitEvent(EVENTS.ON_OPEN, {
            timestamp: Date.now(),
            state: state
        })
        this.isLocked = false;
    }

    async onEscClose(ev: KeyDownEvent) {
        if (ev.event.key === "Escape") {
            await this.close('Clesed by key');
        }
    }

    onWindowClick(ev: MouseEvent) {
        let container = this.element.querySelector(replacePrefix(CONTAINER, this.#prefix));
        if (!container.contains((ev.target as Node))) {
            this.close('out').then(() => {
                this._log.debug("Closed by click outside")
            });
        }
    }

    isAnyActive(): boolean {
        return document.body.classList.contains(this.#bodyClass);
    }

    getAction(className: string): ICuiComponentAction {
        return new CuiClassAction(replacePrefix(className, this.#prefix));
    }
}