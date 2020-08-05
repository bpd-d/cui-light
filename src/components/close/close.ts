import { ICuiComponent, ICuiComponentHandler, ICuiClosable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { getStringOrDefault, getIntOrDefault, parseAttribute, is, getActiveClass, isString, isStringTrue, getHandlerExtendingOrNull } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { CuiActionsHelper } from "../../core/helpers/helpers";

export class CuiCloseArgs {
    target: string;
    action: ICuiComponentAction;
    timeout: number;
    prevent: boolean;
    constructor() {
        this.target = "";
        this.action = null;
        this.timeout = 0;
        this.prevent = false;
    }

    parse(args: any) {
        if (is(args) && isString(args)) {
            this.target = args
            this.action = null
            this.timeout = -1
            this.prevent = false
            return;
        }
        this.target = getStringOrDefault(args.target, null);
        this.action = CuiActionsFatory.get(args.action)
        this.timeout = getIntOrDefault(args.timeout, -1);
        this.prevent = args.prevent && isStringTrue(args.prevent)
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

export class CuiCloseHandler extends CuiHandlerBase implements ICuiComponentHandler {
    #args: CuiCloseArgs;
    #isInitialized: boolean;
    #prefix: string;
    #inProgress: boolean;
    #actionHelper: CuiActionsHelper;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiCloseHandler", element, utils);
        this.#actionHelper = new CuiActionsHelper(utils.interactions);
        this.#args = new CuiCloseArgs();
        this.#isInitialized = false;
        this.#prefix = prefix;
    }

    handle(args: any): void {
        this._log.debug("Init", "handle")
        this.#args.parse(args);
        this.element.addEventListener('click', this.onClick.bind(this))
        this.#isInitialized = true;
        this._log.debug("Initialized", "handle")
    }

    refresh(args: any): void {
        this._log.debug("Refresh", "refresh")
        this.#args.parse(args);
        if (!this.#isInitialized) {
            this.element.addEventListener('click', this.onClick.bind(this))
            this.#isInitialized = true;
            this._log.debug("Initialized", "refresh")
        }
    }

    destroy(): void {
        this._log.debug("Destroy", "destroy")
        if (this.#isInitialized) {
            this.element.removeEventListener('click', this.onClick.bind(this))
            this._log.debug("Destoryed", "destroy")
        }
    }

    onClick(ev: MouseEvent) {
        if (this.#inProgress) {
            return;
        }
        const target = this.getTarget();
        if (!is(target)) {
            this._log.warning(`Target ${this.#args.target} not found`, 'onClick')
            return;
        }
        this.#inProgress = true;
        this.run(target).then((result) => {
            this.onActionFinish(ev, target);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.#inProgress = false;
        })
        if (this.#args.prevent)
            ev.preventDefault();
    }

    private async run(target: Element): Promise<boolean> {
        let closable = getHandlerExtendingOrNull<ICuiClosable>(target as any, 'close');
        if (closable) {
            return closable.close();
        } else if (this.#args.action) {
            let timeout = this.#args.timeout > 0 ? this.#args.timeout : this.utils.setup.animationTime;
            return this.#actionHelper.performAction(target, this.#args.action, timeout);
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
        return is(this.#args.target) ? document.querySelector(this.#args.target) : this.element.parentElement;
    }

    private emitClose(ev: MouseEvent) {
        this.emitEvent(EVENTS.ON_CLOSE, {
            timestamp: Date.now(),
            event: ev
        })
    }
}