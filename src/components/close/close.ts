import { ICuiComponent, ICuiComponentHandler, ICuiClosable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler, CuiChildMutation } from "../../app/handlers/base";
import { getStringOrDefault, getIntOrDefault, parseAttribute, is, getActiveClass, isString, isStringTrue, getHandlerExtendingOrNull, getParentCuiElement, are } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { CuiActionsHelper } from "../../core/helpers/helpers";

export class CuiCloseArgs {
    target: string;
    action: string;
    timeout: number;
    prevent: boolean;
    state: string;
    #defTimeout: number;

    constructor(timeout: number) {
        this.target = "";
        this.action = null;
        this.timeout = timeout;
        this.prevent = false;
        this.state = null;
        this.#defTimeout = timeout;
    }

    parse(args: any) {
        if (is(args) && isString(args)) {
            this.target = args
            this.action = null
            this.timeout = this.#defTimeout;
            this.prevent = false
            this.state = null;
            return;
        }
        this.target = getStringOrDefault(args.target, null);
        this.action = args.action;
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.prevent = args.prevent && isStringTrue(args.prevent)
        this.state = args.state;
    }
}

export class CuiCloseComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;

    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-close`;

    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiCloseHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiCloseHandler extends CuiHandler<CuiCloseArgs> {
    #actionHelper: CuiActionsHelper;
    #eventId: string;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiCloseHandler", element, attribute, new CuiCloseArgs(utils.setup.animationTime), utils);
        this.#eventId = null;
    }

    onInit(): void {
        this.element.addEventListener('click', this.onClick.bind(this))
        this.#eventId = this.onEvent(EVENTS.CLOSE, this.onClose.bind(this));
    }

    onUpdate(): void {
        //
    }
    onDestroy(): void {
        this.element.removeEventListener('click', this.onClick.bind(this))
        this.detachEvent(EVENTS.CLOSE, this.#eventId);
    }

    onClick(ev: MouseEvent) {
        this.onClose(ev);
        if (this.args.prevent)
            ev.preventDefault();
    }

    onClose(ev: MouseEvent) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick')
            return;
        }
        this.isLocked = true;
        this.run(target).then((result) => {
            this.onActionFinish(ev, target, result);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        })
    }

    private async run(target: Element): Promise<boolean> {
        let cuiId = (target as any).$cuid;
        if (is(cuiId)) {
            return this.utils.bus.emit(EVENTS.CLOSE, cuiId, this.args.state);
        } else if (are(this.args.action, this.args.timeout)) {
            let action = CuiActionsFatory.get(this.args.action);
            return this.#actionHelper.performAction(target, action, this.args.timeout);
        } else {
            return true;
        }
    }

    private onActionFinish(ev: MouseEvent, target: Element, shouldEmit: boolean) {
        if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
            this.helper.removeClassesAs(target, this.activeClassName);
        }
        if (shouldEmit)
            this.emitClose(ev);
    }

    private getTarget(): Element {
        return is(this.args.target) ? document.querySelector(this.args.target) : getParentCuiElement(this.element);
    }

    private emitClose(ev: MouseEvent) {
        this.emitEvent(EVENTS.CLOSED, {
            timestamp: Date.now(),
            state: this.args.state,
            event: ev
        })
    }
}