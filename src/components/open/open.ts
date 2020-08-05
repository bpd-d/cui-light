import { ICuiComponent, ICuiComponentHandler, CuiElement, ICuiOpenable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { getStringOrDefault, getIntOrDefault, parseAttribute, is, getActiveClass, isString, getHandlerExtendingOrNull, isStringTrue } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { CuiActionsHelper } from "../../core/helpers/helpers";
import { EVENTS } from "../../core/utils/statics";

export class CuiOpenArgs {
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
            this.target = args;
            this.action = null;
            this.timeout = -1
            this.prevent = false;
            return;
        }
        this.target = getStringOrDefault(args.target, null);
        this.action = CuiActionsFatory.get(args.action)
        this.timeout = getIntOrDefault(args.timeout, -1);
        this.prevent = args.prevent && isStringTrue(args.prevent)
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

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiOpenHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiOpenHandler extends CuiHandlerBase implements ICuiComponentHandler {
    #args: CuiOpenArgs;
    #isInitialized: boolean;
    #prefix: string;
    #actionsHelper: CuiActionsHelper;
    #inProgress: boolean;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOpenHandler", element, utils);
        this.#actionsHelper = new CuiActionsHelper(utils.interactions);
        this.#args = new CuiOpenArgs();
        this.#isInitialized = false;
        this.#prefix = prefix;
        this.#inProgress = false;

    }

    handle(args: any): void {
        this._log.debug("Init", "handle")
        this.#args.parse(args);
        if (this.#args.isValid()) {
            this.element.addEventListener('click', this.onClick.bind(this))
            this.#isInitialized = true;
            this._log.debug("Initialized", "handle")
        }

    }

    refresh(args: any): void {
        this._log.debug("Refresh", "refresh")
        this.#args.parse(args);
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
        this.run(target).then((result) => {
            this.activateTarget(ev, target);
            this.#inProgress = false;
        }).catch((e) => {
            this._log.exception(e);
            this.#inProgress = false;
        })
        if (this.#args.prevent) {
            ev.preventDefault();
        }

    }

    private canPerformAction(): boolean {
        return this.#args.action && this.#args.timeout !== -1;
    }

    private async run(target: Element): Promise<boolean> {
        let openable = getHandlerExtendingOrNull<ICuiOpenable>(target as any, 'open');
        if (is(openable)) {
            console.log("openable");
            return openable.open();
        } else if (this.canPerformAction()) {
            let delay = this.#args.timeout > 0 ? this.#args.timeout : this.utils.setup.animationTime;
            return this.#actionsHelper.performAction(target, this.#args.action, delay);
        }
        return true;
    }

    private activateTarget(ev: MouseEvent, target: Element): void {
        let activeCls = getActiveClass(this.#prefix);
        if (is(target) && !target.classList.contains(activeCls)) {
            target.classList.add(activeCls);
        }
        this.emitOpen(ev);
    }

    emitOpen(ev: MouseEvent) {
        this.emitEvent(EVENTS.ON_OPEN, {
            event: ev,
            timestamp: Date.now()
        })
    }
}