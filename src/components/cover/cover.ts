import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { replacePrefix, isStringTrue, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { AriaAttributes } from "../../core/utils/aria";
import { CuiInteractableArgs, CuiInteractableHandler } from "../../app/handlers/base";

const COVER_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const COVER_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-cover-open';

export interface CuiDialogEvent {
    timestamp: number;
}

export class CuiCoverArgs implements ICuiParsable, CuiInteractableArgs {
    escClose: boolean;
    timeout: number;
    openAct: string;
    closeAct: string;
    keyClose: string;

    #defTimeout: number;
    #prefix: string;
    constructor(prefix: string, defTimeout: number) {
        this.escClose = false;

        this.#defTimeout = defTimeout;
        this.#prefix = prefix;
    }


    parse(args: any) {
        this.escClose = isStringTrue(args.escClose);
        this.keyClose = args.keyClose;
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.openAct = getStringOrDefault(args.openAct, replacePrefix(COVER_OPEN_ANIMATION_CLASS, this.#prefix))
        this.closeAct = getStringOrDefault(args.closeAct, replacePrefix(COVER_CLOSE_ANIMATION_CLASS, this.#prefix))
    }
}

export class CuiCoverComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-cover`;
    }

    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiCoverHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiCoverHandler extends CuiInteractableHandler<CuiCoverArgs> {

    #bodyClass: string;
    #scrollY: number;

    constructor(element: HTMLElement, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiDialogHandler", element, attribute, new CuiCoverArgs(prefix, utils.setup.animationTimeLong), utils);
        this.#bodyClass = replacePrefix(bodyClass, prefix);
        this.#scrollY = 0;
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
        this.helper.setClass(this.#bodyClass, document.body)
        document.body.style.top = `-${this.#scrollY}px`;
        AriaAttributes.setAria(this.element, 'aria-hidden', "false");
    }

    onAfterClose(): void {
        document.body.style.top = '';
        window.scrollTo(0, (this.#scrollY || 0) * -1);
        this.#scrollY = 0;
        this.helper.removeClass(this.#bodyClass, document.body);
        AriaAttributes.setAria(this.element, 'aria-hidden', "true");
    }

    onBeforeClose(): boolean {
        return true;
    }

    private isAnyActive(): boolean {
        return this.helper.hasClass(this.#bodyClass, document.body);
    }
}