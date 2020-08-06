import { ICuiComponent, ICuiComponentHandler, ICuiClosable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase, CuiHandler } from "../../app/handlers/base";
import { getStringOrDefault, getIntOrDefault, parseAttribute, is, getActiveClass, isString, isStringTrue, getHandlerExtendingOrNull, getParentCuiElement } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { CuiActionsHelper } from "../../core/helpers/helpers";

export class CuiCloseArgs {
    target: string;
    action: ICuiComponentAction;
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
        this.action = CuiActionsFatory.get(args.action)
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

    #prefix: string;
    #actionHelper: CuiActionsHelper;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiCloseHandler", element, new CuiCloseArgs(utils.setup.animationTime), utils);
        this.#prefix = prefix;
    }

    onInit(): void {
        this.element.addEventListener('click', this.onClick.bind(this))
        this._log.debug("Initialized", "onInit")
    }
    onUpdate(): void {
        //
    }
    onDestroy(): void {
        this.element.removeEventListener('click', this.onClick.bind(this))
    }

    onClick(ev: MouseEvent) {
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
            this.onActionFinish(ev, target);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        })
        if (this.args.prevent)
            ev.preventDefault();
    }

    private async run(target: Element): Promise<boolean> {
        let closable = getHandlerExtendingOrNull<ICuiClosable>(target as any, 'close');
        if (closable) {
            return closable.close(this.args.state);
        } else if (this.args.action) {
            return this.#actionHelper.performAction(target, this.args.action, this.args.timeout);
        } else {
            return true;
        }
    }

    private onActionFinish(ev: MouseEvent, target: Element) {
        let activeCls = getActiveClass(this.#prefix);
        if (is(target) && target.classList.contains(activeCls)) {
            target.classList.remove(activeCls);
        }
        this.emitClose(ev);
    }

    private getTarget(): Element {
        return is(this.args.target) ? document.querySelector(this.args.target) : getParentCuiElement(this.element);
    }

    private emitClose(ev: MouseEvent) {
        this.emitEvent(EVENTS.ON_CLOSE, {
            timestamp: Date.now(),
            state: this.args.state,
            event: ev
        })
    }
}