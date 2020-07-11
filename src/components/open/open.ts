import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { getStringOrDefault, getIntOrDefault, parseAttribute, is, getActiveClass, isString } from "../../core/utlis/functions";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utlis/actions";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { EVENTS } from "../../core/utlis/statics";

export class CuiOpenArgs {
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
            this.target = args;
            this.action = null;
            this.timeout = -1
            return;
        }
        this.target = getStringOrDefault(args.target, null);
        this.action = CuiActionsFatory.get(args.action)
        this.timeout = getIntOrDefault(args.timeout, -1);
    }

    isValid(): boolean {
        return is(this.target);
    }
}

export class CuiOpenComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-open`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiMutationHandler {
        return new CuiOpenHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiOpenHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #attribute: string;
    #args: CuiOpenArgs;
    #isInitialized: boolean;
    #prefix: string;
    #actionsHelper: CuiActionsHelper;
    #inProgress: boolean;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOpenHandler", element, utils);
        this.#actionsHelper = new CuiActionsHelper(utils.interactions);
        this.#attribute = attribute
        this.#args = new CuiOpenArgs();
        this.#isInitialized = false;
        this.#prefix = prefix;
        this.#inProgress = false;

    }

    handle(): void {
        this._log.debug("Init", "handle")
        this.#args.parse(parseAttribute(this.element, this.#attribute));
        if (this.#args.isValid()) {
            this.element.addEventListener('click', this.onClick.bind(this))
            this.#isInitialized = true;
            this._log.debug("Initialized", "handle")
        }

    }

    refresh(): void {
        this._log.debug("Refresh", "refresh")
        this.#args.parse(parseAttribute(this.element, this.#attribute));
        if (this.#args.isValid() && !this.#isInitialized) {
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
        const target = document.querySelector(this.#args.target);
        if (!is(target)) {
            this._log.warning(`Target ${this.#args.target} not found`, 'onClick')
            return;
        }
        this.#inProgress = true;
        if (this.#args.action && this.#args.timeout !== -1) {
            let delay = this.#args.timeout > 0 ? this.#args.timeout : this.utils.setup.animationTime;
            this.#actionsHelper.performAction(target, this.#args.action, delay).then(() => {
                target.classList.add(getActiveClass(this.#prefix));
                this.emitOpen(ev);
                this.#inProgress = false;
            });
        } else {
            target.classList.add(getActiveClass(this.#prefix));
            this.emitOpen(ev);
            this.#inProgress = false;
        }
        ev.preventDefault();
    }

    emitOpen(ev: MouseEvent) {
        this.emitEvent(EVENTS.ON_OPEN, {
            event: ev,
            timestamp: Date.now()
        })
    }
}