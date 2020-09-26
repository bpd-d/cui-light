import { isStringTrue, replacePrefix, EVENTS, ICuiComponentAction, CuiClassAction, is, getStringOrDefault, getIntOrDefault, CuiActionsFatory, getName } from "../../core/index";
import { ICuiComponent, CuiUtils, ICuiComponentHandler, ICuiOpenable, ICuiClosable } from "../../index";
import { CuiHandler, CuiChildMutation } from "../../app/handlers/base";
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
        super("CuiOffCanvasHandler", element, attribute, new CuiOffCanvasArgs(prefix, utils.setup.animationTimeLong), utils);
        this.#prefix = prefix;
        this.#bodyClass = replacePrefix(OFFCANVAS_BODY, prefix);
    }

    onInit(): void {
        this.mutate(() => {
            this.setPositionLeft();
            AriaAttributes.setAria(this.element, 'aria-modal', "");
        })
        this.onEvent(EVENTS.OPEN, this.open.bind(this));
        this.onEvent(EVENTS.CLOSE, this.close.bind(this));
        this._log.debug("Initialized", "onInit")
    }
    onUpdate(): void {
        this.setPositionLeft();
    }
    onDestroy(): void {
        //throw new Error("Method not implemented.");
        this.detachEvent(EVENTS.CLOSE);
        this.detachEvent(EVENTS.OPEN);
    }

    async open(args?: any): Promise<boolean> {
        if (this.checkLockAndWarn('open')) {
            return false;
        }
        if (this.isAnyActive() || this.isActive()) {
            this._log.warning("Offcanvas is already opened");
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Offcanvas ${this.cuid}`, 'open')
        let scrollY = window.pageYOffset;
        let action = CuiActionsFatory.get(this.args.open);
        return this.performAction(action, this.args.timeout, this.onOpen.bind(this, args), () => {
            this.helper.setClass(this.activeClassName, this.element)
            this.helper.setClass(this.#bodyClass, document.body)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'true')
            document.body.style.top = `-${scrollY}px`;
        });
    }

    async close(args?: any): Promise<boolean> {
        if (this.checkLockAndWarn("close") || !this.isActive()) {
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Offcanvas ${this.cuid}`, 'close')
        let action = CuiActionsFatory.get(this.args.close);
        return this.performAction(action, this.args.timeout, this.onClose.bind(this, args), () => {
            this.helper.removeClass(this.activeClassName, this.element)
            this.helper.removeClass(this.#bodyClass, document.body)
            const scrollY = document.body.style.top;
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false')
        });
    }

    onClose(state?: any) {
        this.detachEvent(EVENTS.KEYDOWN);
        this.detachEvent(EVENTS.WINDOW_CLICK);
        this.emitEvent(EVENTS.CLOSED, {
            timestamp: Date.now(),
            state: state
        })
        this.isLocked = false;
    }

    onOpen(state?: any) {

        if (this.args.escClose) {
            this.onEvent(EVENTS.KEYDOWN, this.onEscClose.bind(this))
        }
        if (this.args.outClose) {
            this.onEvent(EVENTS.WINDOW_CLICK, this.onWindowClick.bind(this));
        }
        this.emitEvent(EVENTS.OPENED, {
            timestamp: Date.now(),
            state: state
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
        return this.helper.hasClass(this.#bodyClass, document.body);
    }

    setPositionLeft() {
        let cls = getName(this.#prefix, 'left');
        if (this.args.position === 'left' && !this.helper.hasClass(cls, this.element)) {
            this.helper.setClass(cls, this.element)
        } else if (this.args.position == 'right' && this.helper.hasClass(cls, this.element)) {
            this.helper.removeClass(cls, this.element)
        }
    }
}