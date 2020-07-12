import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { getStringOrDefault, getIntOrDefault, parseAttribute, is, getActiveClass, isString } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { CLASSES, EVENTS } from "../../core/utils/statics";
import { CuiActionsHelper } from "../../core/helpers/helpers";

export class CuiCloseArgs {
    target: string;
    action: ICuiComponentAction;
    timeout: number;
    constructor() {
        this.target = "";
        this.action = null;
        this.timeout = 0;
    }

    parse(args: any) {
        if (is(args) && isString(args)) {
            this.target = args
            this.action = null
            this.timeout = -1
            return;
        }
        this.target = getStringOrDefault(args.target, null);
        this.action = CuiActionsFatory.get(args.action)
        this.timeout = getIntOrDefault(args.timeout, -1);
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

    get(element: Element, utils: CuiUtils): ICuiMutationHandler {
        return new CuiCloseHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiCloseHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #attribute: string;
    #args: CuiCloseArgs;
    #isInitialized: boolean;
    #prefix: string;
    #inProgress: boolean;
    #actionHelper: CuiActionsHelper;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiCloseHandler", element, utils);
        this.#actionHelper = new CuiActionsHelper(utils.interactions);
        this.#attribute = attribute
        this.#args = new CuiCloseArgs();
        this.#isInitialized = false;
        this.#prefix = prefix;
    }

    handle(): void {
        this._log.debug("Init", "handle")
        this.#args.parse(parseAttribute(this.element, this.#attribute));
        this.element.addEventListener('click', this.onClick.bind(this))
        this.#isInitialized = true;
        this._log.debug("Initialized", "handle")
    }

    refresh(): void {
        this._log.debug("Refresh", "refresh")
        this.#args.parse(parseAttribute(this.element, this.#attribute));
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
        if (this.#args.action && this.#args.timeout !== -1) {
            let delay = this.#args.timeout > 0 ? this.#args.timeout : this.utils.setup.animationTime;
            this.#actionHelper.performAction(target, this.#args.action, delay).then(() => {
                target.classList.remove(getActiveClass(this.#prefix));
                this.emitClose(ev);
                this.#inProgress = false
            })
        } else {
            target.classList.remove(getActiveClass(this.#prefix));
            this.emitClose(ev);
            this.#inProgress = false
        }
        ev.preventDefault();
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