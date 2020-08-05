import { isStringTrue, replacePrefix, EVENTS, ICuiComponentAction, CuiClassAction, is, getStringOrDefault, getIntOrDefault, CuiActionsFatory, getName } from "../../core/index";
import { ICuiComponent, CuiUtils, ICuiComponentHandler, ICuiOpenable, ICuiClosable } from "../../index";
import { CuiHandler } from "../../app/handlers/base";
import { KeyDownEvent } from "../../plugins/keys/observer";
import { AriaAttributes } from "../../core/utils/aria";

const OFFCANVAS_RIGHT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-right-in";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-right-out";
const OFFCANVAS_LEFT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-left-in";
const OFFCANVAS_LEFT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-left-out";

const OFFCANVAS_BODY = "{prefix}-off-canvas-open";
const OFFCANVAS_CONTAINER_CLS = '.{prefix}-off-canvas-container';

export class CuiOffCanvasArgs {
    escClose: boolean;
    outClose: boolean;
    open: string;
    close: string;
    position: 'left' | 'right';
    timeout: number;
    #prefix: string;
    #defTimeout: number;
    constructor(prefix: string, timeout: number) {
        this.#prefix = prefix;
        this.escClose = false;
        this.position = 'right';
        this.open = this.getDefaultOpenClass();
        this.close = this.getDefaultCloseClass();
        this.#defTimeout = timeout;
        this.timeout = timeout;
    }

    parse(args: any) {
        if (is(args)) {
            this.escClose = isStringTrue(args.escClose);
            this.outClose = isStringTrue(args.outClose);
            this.position = getStringOrDefault(args.position, 'right');
            this.open = getStringOrDefault(args.openCls, this.getDefaultOpenClass())
            this.close = getStringOrDefault(args.closeCls, this.getDefaultCloseClass());
            this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        }
    }

    getDefaultOpenClass(): string {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_IN : OFFCANVAS_LEFT_ANIM_DEFAULT_IN, this.#prefix);
    }

    getDefaultCloseClass(): string {
        return replacePrefix(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT : OFFCANVAS_LEFT_ANIM_DEFAULT_OUT, this.#prefix);
    }
}

export class CuiOffCanvasComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-off-canvas`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiOffCanvasHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiOffCanvasHandler extends CuiHandler<CuiOffCanvasArgs> implements ICuiOpenable, ICuiClosable {

    #prefix: string;
    #bodyClass: string;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOffCanvasHandler", element, new CuiOffCanvasArgs(prefix, utils.setup.animationTimeLong), utils);
        this.#prefix = prefix;
        this.#bodyClass = replacePrefix(OFFCANVAS_BODY, prefix);
    }

    onInit(): void {
        this.mutate(() => {
            this.setPositionLeft();
            AriaAttributes.setAria(this.element, 'aria-modal', "");
        })
        this._log.debug("Initialized", "onInit")
    }
    onUpdate(): void {
        this.setPositionLeft();
    }
    onDestroy(): void {
        //throw new Error("Method not implemented.");
    }

    async open(): Promise<boolean> {
        if (this.checkLockAndWarn('open')) {
            return false;
        }
        if (this.isAnyActive() || this.isActive()) {
            this._log.warning("Offcanvas is already opened");
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Offcanvas ${this.cuid}`, 'open')
        let action = CuiActionsFatory.get(this.args.open);
        return this.performAction(action, this.args.timeout, this.mutate.bind(this, this.onOpen));
    }

    async close(): Promise<boolean> {
        if (this.checkLockAndWarn("close") || !this.isActive()) {
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Offcanvas ${this.cuid}`, 'close')
        let action = CuiActionsFatory.get(this.args.close);
        return this.performAction(action, this.args.timeout, this.mutate.bind(this, this.onClose));
    }

    onClose() {
        this.element.classList.remove(this.activeClassName);
        document.body.classList.remove(this.#bodyClass);
        AriaAttributes.setAria(this.element, 'aria-expanded', 'false')
        this.detachEvent(EVENTS.ON_KEYDOWN);
        this.detachEvent(EVENTS.ON_WINDOW_CLICK);
        this.emitEvent(EVENTS.ON_CLOSE, {
            timestamp: Date.now()
        })
        this.isLocked = false;
    }

    onOpen() {
        this.element.classList.add(this.activeClassName);
        document.body.classList.add(this.#bodyClass);
        AriaAttributes.setAria(this.element, 'aria-expanded', 'true')
        if (this.args.escClose) {
            this.onEvent(EVENTS.ON_KEYDOWN, this.onEscClose.bind(this))
        }
        if (this.args.outClose) {
            this.onEvent(EVENTS.ON_WINDOW_CLICK, this.onWindowClick.bind(this));
        }
        this.emitEvent(EVENTS.ON_OPEN, {
            timestamp: Date.now()
        })
        this.isLocked = false;
    }

    onEscClose(ev: KeyDownEvent) {
        if (ev.event.key === "Escape") {
            this.close();
        }
    }

    onWindowClick(ev: MouseEvent) {
        const container = this.element.querySelector(replacePrefix(OFFCANVAS_CONTAINER_CLS, this.#prefix));
        if (!container.contains((ev.target as Node))) {
            this.close();
        }
    }

    isAnyActive(): boolean {
        return document.body.classList.contains(this.#bodyClass);
    }

    setPositionLeft() {
        let cls = getName(this.#prefix, 'left');
        if (this.args.position === 'left' && !this.element.classList.contains(cls)) {
            this.element.classList.add(cls);
        } else if (this.args.position == 'right' && this.element.classList.contains(cls)) {
            this.element.classList.remove(cls);
        }
    }
}