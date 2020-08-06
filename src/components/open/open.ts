import { ICuiComponent, ICuiComponentHandler, ICuiOpenable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { getStringOrDefault, getIntOrDefault, is, getActiveClass, isString, getHandlerExtendingOrNull, isStringTrue } from "../../core/utils/functions";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { EVENTS } from "../../core/utils/statics";

export class CuiOpenArgs {
    target: string;
    action: ICuiComponentAction;
    timeout: number;
    prevent: boolean;
    state: string;

    #defTimeout: number;
    constructor(timeout: number) {
        this.target = "";
        this.action = CuiActionsFatory.get("dummy");
        this.timeout = 0;
        this.prevent = false;
        this.state = "";
        this.#defTimeout = timeout;
    }

    parse(args: any) {
        if (is(args) && isString(args)) {
            this.target = args;
            this.action = CuiActionsFatory.get("dummy");
            this.timeout = this.#defTimeout;
            this.prevent = false;
            this.state = "";
            return;
        }
        this.target = getStringOrDefault(args.target, null);
        this.action = CuiActionsFatory.get(args.action)
        this.timeout = getIntOrDefault(args.timeout, this.#defTimeout);
        this.prevent = isStringTrue(args.prevent)
        this.state = args.state;
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

export class CuiOpenHandler extends CuiHandler<CuiOpenArgs> {
    #prefix: string;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOpenHandler", element, new CuiOpenArgs(utils.setup.animationTime), utils);
        this.#prefix = prefix;
    }

    onInit(): void {
        this.element.addEventListener('click', this.onClick.bind(this))
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
        const target = document.querySelector(this.args.target);
        if (!is(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick')
            return;
        }
        this.isLocked = true;
        this.run(target).then((result) => {
            this.activateTarget(ev, target);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        })
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }

    private async run(target: Element): Promise<boolean> {
        let openable = getHandlerExtendingOrNull<ICuiOpenable>(target as any, 'open');
        if (is(openable)) {
            return openable.open(this.args.state);
        } else {
            return this.actionsHelper.performAction(target, this.args.action, this.args.timeout);
        }
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
            state: this.args.state,
            timestamp: Date.now()
        })
    }
}