import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { replacePrefix, isStringTrue, is, getIntOrDefault, getStringOrDefault } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../app/handlers/base";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";
import { BasePositionCalculator, BaseResizeCalculator, ICuiFloatPositionCalculator, ICuiFloatResizeCalculator } from "./helpers";
import { CLASSES, EVENTS } from "../../core/index";

const FLOAT_OPEN_ANIMATION_CLASS = '.{prefix}-float-default-in';
const FLOAT_CLOSE_ANIMATION_CLASS = '.{prefix}-float-default-out';
const MOVE = '.{prefix}-float-move';
const RESIZE = '.{prefix}-float-resize';


export class CuiFloatArgs implements CuiInteractableArgs, ICuiParsable {
    escClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;

    #defTimeout: number;
    #prefix: string;
    constructor(prefix: string, defTimeout: number) {
        this.escClose = false;
        this.keyClose = undefined;
        this.openAct = "";
        this.closeAct = "";
        this.timeout = defTimeout;

        this.#defTimeout = defTimeout;
        this.#prefix = prefix;
    }


    parse(args: any) {
        this.escClose = isStringTrue(args.escClose);
        this.keyClose = args.keyClose;
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(FLOAT_OPEN_ANIMATION_CLASS, this.#prefix))
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(FLOAT_CLOSE_ANIMATION_CLASS, this.#prefix))
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

export class CuiFloatHandler extends CuiInteractableHandler<CuiFloatArgs> {
    #isMoving: boolean;
    #isResizing: boolean;
    #prevX: number;
    #prevY: number;
    #prefix: string;
    #moveListener: CuiMoveEventListener;
    #positionCalculator: ICuiFloatPositionCalculator;
    #resizeCalculator: ICuiFloatResizeCalculator;
    #resizeBtn: HTMLElement;
    #moveBtn: HTMLElement;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiFloatHandler", element, attribute, new CuiFloatArgs(prefix, utils.setup.animationTimeLong), utils);
        this.#isMoving = false;
        this.#isResizing = false;
        this.#prevX = 0;
        this.#prevY = 0;
        this.#moveListener = new CuiMoveEventListener();
        this.#moveListener.preventDefault(true);
        this.#positionCalculator = new BasePositionCalculator();
        this.#resizeCalculator = new BaseResizeCalculator(element as HTMLElement)
        this.#prefix = prefix;
    }

    onInit(): void {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
        this.#moveBtn = this.element.querySelector(replacePrefix(MOVE, this.#prefix))
        this.#resizeBtn = this.element.querySelector(replacePrefix(RESIZE, this.#prefix))
        this.#moveListener.setCallback(this.onMove.bind(this));

    }

    onUpdate(): void {

    }

    onDestroy(): void {
    }
    onBeforeOpen(): boolean {
        return true
    }
    onAfterOpen(): void {
        this.#moveListener.attach();
    }
    onAfterClose(): void {
        this.#moveListener.detach();
    }
    onBeforeClose(): boolean {
        return true;
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


    onMouseDown(ev: ICuiMoveEvent) {
        if (ev.target === this.#moveBtn) {
            this.#isMoving = true;
        } else if (ev.target === this.#resizeBtn) {
            this.#isResizing = true;
        }
        this.#prevX = ev.x;
        this.#prevY = ev.y;
        this.helper.setClassesAs(document.body, CLASSES.swipingOn);
        // Lock global move handler
        this.utils.bus.emit(EVENTS.MOVE_LOCK, null, true);
    }

    onMouseMove(ev: ICuiMoveEvent) {
        if (this.#isMoving) {
            this.peform(ev, this.move.bind(this))
        } else if (this.#isResizing) {
            this.peform(ev, this.resize.bind(this))
        }
    }


    onMouseUp(ev: ICuiMoveEvent) {
        this.#isMoving = false;
        this.#isResizing = false;
        this.helper.removeClassesAs(document.body, CLASSES.swipingOn);
        // Unlock global handler
        this.utils.bus.emit(EVENTS.MOVE_LOCK, null, true);

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
            this.mutate(() => {
                element.style.width = newWidth + "px";
                element.style.height = newHeight + "px";
            })
        }
    }

    move(element: HTMLElement, x: number, y: number, diffX: number, diffY: number): void {
        let [newX, newY] = this.#positionCalculator.calculate(x, y, diffX, diffY)
        if (this.fitsWindow(newY, newX, element.offsetWidth, element.offsetHeight)) {
            this.mutate(() => {
                element.style.left = newX + "px";
                element.style.top = newY + "px";
            })
        }
    }



    fitsWindow(top: number, left: number, width: number, height: number) {
        return (top + height < window.innerHeight - 10) &&
            (top > 10) && (left > 10) &&
            (left + width < window.innerWidth - 10);
    }
}