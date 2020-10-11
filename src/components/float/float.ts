import { ICuiComponent, ICuiComponentHandler, ICuiOpenable, ICuiClosable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { replacePrefix, isStringTrue, getOffsetLeft, is } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory, CuiClassAction } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";
import { KeyDownEvent } from "../../plugins/keys/observer";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiHandler } from "../../app/handlers/base";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";
import { BasePositionCalculator, BaseResizeCalculator, ICuiFloatPositionCalculator, ICuiFloatResizeCalculator } from "./helpers";

const FLOAT_OPEN_ANIMATION_CLASS = '{prefix}-float-default-in';
const FLOAT_CLOSE_ANIMATION_CLASS = '{prefix}-float-default-out';
const CONTAINER = '.{prefix}-float-container';
const MOVE = '.{prefix}-float-move';
const RESIZE = '.{prefix}-float-resize';


export class CuiFloatArgs {
    escClose: boolean;
    constructor() {
        this.escClose = false;
    }

    parse(args: any) {
        this.escClose = isStringTrue(args.escClose);
    }
}

export class CuiFloatComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-float`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiFloatHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiFloatHandler extends CuiHandler<CuiFloatArgs> implements ICuiComponentHandler, ICuiOpenable, ICuiClosable {

    #prefix: string;
    #timeout: number;
    #resizeBtn: HTMLElement;
    #moveBtn: HTMLElement;
    #isMoving: boolean;
    #isResizing: boolean;
    #prevX: number;
    #prevY: number;
    #moveListener: CuiMoveEventListener;
    #positionCalculator: ICuiFloatPositionCalculator;
    #resizeCalculator: ICuiFloatResizeCalculator;
    #eventIdOpen: string;
    #eventIdClose: string;
    #eventIdKey: string;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiFloatHandler", element, attribute, new CuiFloatArgs(), utils);
        this.#eventIdOpen = null;
        this.#eventIdClose = null;
        this.#eventIdKey = null;
        this.#prefix = prefix;
        this.#timeout = utils.setup.animationTimeLong;
        this.#isMoving = false;
        this.#isResizing = false;
        this.#prevX = 0;
        this.#prevY = 0;
        this.#moveListener = new CuiMoveEventListener();
        this.#positionCalculator = new BasePositionCalculator();
        this.#resizeCalculator = new BaseResizeCalculator(element as HTMLElement)
    }

    onInit(): void {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
        this.#eventIdClose = this.onEvent(EVENTS.CLOSE, this.close.bind(this));
        this.#eventIdOpen = this.onEvent(EVENTS.OPEN, this.open.bind(this));
        this.#moveBtn = this.element.querySelector(replacePrefix(MOVE, this.#prefix))
        this.#resizeBtn = this.element.querySelector(replacePrefix(RESIZE, this.#prefix))
        this.#moveListener.setCallback(this.onMove.bind(this));
        this.#moveListener.preventDefault(true);
        this.#moveListener.attach();
        this._log.debug("Initialized", "handle")
    }

    onUpdate(): void {

    }

    onDestroy(): void {
        this.#moveListener.detach();
        this.detachEvent(EVENTS.CLOSE, this.#eventIdClose);
        this.detachEvent(EVENTS.OPEN, this.#eventIdOpen);

    }

    async open(args?: any): Promise<boolean> {
        if (this.checkLockAndWarn('open')) {
            return false;
        }
        if (this.isActive()) {
            this._log.warning("Float is already opened");
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Float ${this.cuid}`, 'open')
        let action = this.getAction(FLOAT_OPEN_ANIMATION_CLASS);
        return this.performAction(action, this.#timeout, this.onOpen.bind(this, args), () => {
            this.helper.setClass(this.activeClassName, this.element)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
        });
    }

    async close(args: any): Promise<boolean> {
        if (this.checkLockAndWarn("close") || !this.isActive()) {
            return false;
        }
        this.isLocked = true;
        this._log.debug(`Dialog ${this.cuid}`, 'close')
        let action = this.getAction(FLOAT_CLOSE_ANIMATION_CLASS);
        return this.performAction(action, this.#timeout, this.onClose.bind(this, args), () => {
            this.helper.removeClass(this.activeClassName, this.element)
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        });
    }

    onClose(state: any) {


        this.detachEvent(EVENTS.KEYDOWN, this.#eventIdKey);

        this.emitEvent(EVENTS.CLOSED, {
            timestamp: Date.now(),
            state: state
        })
        this.isLocked = false;
    }

    onOpen(state?: any) {
        if (this.args.escClose) {
            this.#eventIdKey = this.onEvent(EVENTS.KEYDOWN, this.onEscClose.bind(this))
        }
        this.emitEvent(EVENTS.OPENED, {
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

    onMove(ev: ICuiMoveEvent) {
        switch (ev.type) {
            case 'down':
                this.onMouseDown(ev);
                break;
            case 'up':
                this.onMouseUp(ev)
                break;
            case 'move':
                this.onMouseMove(ev);
                break;
        }
    }

    onMouseMove(ev: ICuiMoveEvent) {
        if (this.#isMoving) {
            this.peform(ev, this.move.bind(this))
        } else if (this.#isResizing) {
            this.peform(ev, this.resize.bind(this))
        }
    }

    peform(ev: ICuiMoveEvent, callback: (element: HTMLElement, x: number, y: number, diffX: number, diffY: number) => void) {
        this.mutate(() => {
            if (is(callback))
                callback(this.element as HTMLElement, ev.x, ev.y, (ev.x - this.#prevX), (ev.y - this.#prevY));
            this.#prevX = ev.x;
            this.#prevY = ev.y;
        })
    }

    resize(element: HTMLElement, x: number, y: number, diffX: number, diffY: number): void {
        let [newWidth, newHeight] = this.#resizeCalculator.calculate(x, y, diffX, diffY);
        if (this.fitsWindow(element.offsetTop, element.offsetLeft, newWidth, newHeight)) {
            element.style.width = newWidth + "px";
            element.style.height = newHeight + "px";
        }
    }

    move(element: HTMLElement, x: number, y: number, diffX: number, diffY: number): void {
        let [newX, newY] = this.#positionCalculator.calculate(x, y, diffX, diffY)
        if (this.fitsWindow(newY, newX, element.offsetWidth, element.offsetHeight)) {
            element.style.left = newX + "px";
            element.style.top = newY + "px";
        }
    }

    onMouseDown(ev: ICuiMoveEvent) {
        if (ev.target === this.#moveBtn) {
            this.#isMoving = true;
        } else if (ev.target === this.#resizeBtn) {
            this.#isResizing = true;
        }
        this.#prevX = ev.x;
        this.#prevY = ev.y;
    }

    onMouseUp(ev: ICuiMoveEvent) {
        this.#isMoving = false;
        this.#isResizing = false;

    }

    getAction(className: string): ICuiComponentAction {
        return new CuiClassAction(replacePrefix(className, this.#prefix));
    }

    fitsWindow(top: number, left: number, width: number, height: number) {
        return (top + height < window.innerHeight - 10) &&
            (top > 10) && (left > 10) &&
            (left + width < window.innerWidth - 10);
    }
}