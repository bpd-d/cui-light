import { isStringTrue, replacePrefix, EVENTS, is, getStringOrDefault, getIntOrDefault, getName, ICuiParsable } from "../../core/index";
import { ICuiComponent, CuiUtils, ICuiComponentHandler } from "../../index";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../app/handlers/base";
import { AriaAttributes } from "../../core/utils/aria";

const OFFCANVAS_RIGHT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-right-in";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-right-out";
const OFFCANVAS_LEFT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-left-in";
const OFFCANVAS_LEFT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-left-out";

const OFFCANVAS_BODY = "{prefix}-off-canvas-open";
const OFFCANVAS_CONTAINER_CLS = '.{prefix}-off-canvas-container';

export class CuiOffCanvasArgs implements ICuiParsable, CuiInteractableArgs {
    escClose: boolean;
    outClose: boolean;
    openAct: string;
    closeAct: string;
    keyClose: string;
    position: 'left' | 'right';
    timeout: number;

    #prefix: string;
    #defTimeout: number;
    constructor(prefix: string, timeout: number) {
        this.#prefix = prefix;
        this.escClose = false;
        this.position = 'right';
        this.openAct = this.getDefaultOpenClass();
        this.closeAct = this.getDefaultCloseClass();
        this.#defTimeout = timeout;
        this.timeout = timeout;
        this.outClose = false;
        this.keyClose = undefined;
    }


    parse(args: any) {
        if (is(args)) {
            this.escClose = isStringTrue(args.escClose);
            this.outClose = isStringTrue(args.outClose);
            this.position = getStringOrDefault(args.position, 'right');
            this.openAct = getStringOrDefault(args.openAct, this.getDefaultOpenClass())
            this.closeAct = getStringOrDefault(args.closeAct, this.getDefaultCloseClass());
            this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
            this.keyClose = args.keyClose;
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

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiOffCanvasHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiOffCanvasHandler extends CuiInteractableHandler<CuiOffCanvasArgs>  {

    #prefix: string;
    #bodyClass: string;
    #scrollY: number;
    #windowClickEventId: string;

    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOffCanvasHandler", element, attribute, new CuiOffCanvasArgs(prefix, utils.setup.animationTime), utils);
        this.#prefix = prefix;
        this.#bodyClass = replacePrefix(OFFCANVAS_BODY, prefix);
        this.#windowClickEventId = null;
        this.#scrollY = 0;
    }

    onInit(): void {
        this.mutate(() => {
            this.setPositionLeft();
            AriaAttributes.setAria(this.element, 'aria-modal', "");
        })
    }
    onUpdate(): void {
        this.setPositionLeft();
    }
    onDestroy(): void {

    }
    onBeforeOpen(): boolean {
        if (this.isAnyActive()) {
            return false;
        }
        this.#scrollY = window.pageYOffset;
        return true;
    }

    onAfterOpen(): void {
        if (this.args.outClose) {
            this.#windowClickEventId = this.onEvent(EVENTS.WINDOW_CLICK, this.onWindowClick.bind(this));
        }
        this.helper.setClass(this.#bodyClass, document.body);
        document.body.style.top = `-${scrollY}px`;
    }
    onAfterClose(): void {
        this.detachEvent(EVENTS.WINDOW_CLICK, this.#windowClickEventId);
        this.helper.removeClass(this.#bodyClass, document.body);
        document.body.style.top = '';
        window.scrollTo(0, this.#scrollY * -1);
    }
    onBeforeClose(): boolean {
        return true;
    }

    onWindowClick(ev: MouseEvent) {
        const container = this.element.querySelector(replacePrefix(OFFCANVAS_CONTAINER_CLS, this.#prefix));
        if (container && !container.contains((ev.target as Node))) {
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