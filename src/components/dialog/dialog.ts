import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { replacePrefix, isStringTrue, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../app/handlers/base";

const DIALOG_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const DIALOG_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-dialog-open';
const CONTAINER = '.{prefix}-dialog-container';

export interface CuiDialogEvent {
    timestamp: number;
}

export class CuiDialogArgs implements ICuiParsable, CuiInteractableArgs {
    escClose: boolean;
    outClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;

    #defTimeout: number;
    #prefix: string;
    constructor(prefix: string, defTimeout: number) {
        this.escClose = false;
        this.outClose = false;

        this.#defTimeout = defTimeout;
        this.#prefix = prefix;
    }


    parse(args: any) {
        this.escClose = isStringTrue(args.escClose);
        this.outClose = isStringTrue(args.outClose);
        this.keyClose = args.keyClose;
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(DIALOG_OPEN_ANIMATION_CLASS, this.#prefix))
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(DIALOG_CLOSE_ANIMATION_CLASS, this.#prefix))
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

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiDialogHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiDialogHandler extends CuiInteractableHandler<CuiDialogArgs> {

    #prefix: string;
    #bodyClass: string;
    #scrollY: number;
    #windowClickEventId: string;

    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiDialogHandler", element, attribute, new CuiDialogArgs(prefix, utils.setup.animationTimeLong), utils);
        this.#bodyClass = replacePrefix(bodyClass, prefix);
        this.#scrollY = 0;
        this.#windowClickEventId = null;
    }

    onInit(): void {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
    }
    onUpdate(): void {

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
        this.helper.setClass(this.#bodyClass, document.body)
        document.body.style.top = `-${this.#scrollY}px`;
    }

    onAfterClose(): void {
        document.body.style.top = '';
        window.scrollTo(0, (this.#scrollY || 0) * -1);
        this.#scrollY = 0;
        this.helper.removeClass(this.#bodyClass, document.body);
        this.detachEvent(EVENTS.WINDOW_CLICK, this.#windowClickEventId);
    }

    onBeforeClose(): boolean {
        return true;
    }

    private isAnyActive(): boolean {
        return this.helper.hasClass(this.#bodyClass, document.body);
    }

    onWindowClick(ev: MouseEvent) {
        let container = this.element.querySelector(replacePrefix(CONTAINER, this.#prefix));
        if (container && !container.contains((ev.target as Node))) {
            this.close('out').then(() => {
                this._log.debug("Closed by click outside")
            });
        }
    }
}