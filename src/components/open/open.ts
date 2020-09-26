import { ICuiComponent, ICuiComponentHandler, ICuiOpenable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler, CuiChildMutation } from "../../app/handlers/base";
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
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiOpenHandler", element, attribute, new CuiOpenArgs(utils.setup.animationTime), utils);
    }

    onInit(): void {
        this.element.addEventListener('click', this.onClick.bind(this))
        this.onEvent(EVENTS.OPEN, this.onOpen.bind(this));
    }
    onUpdate(): void {
        //
    }
    onDestroy(): void {
        this.element.removeEventListener('click', this.onClick.bind(this))
        this.detachEvent(EVENTS.OPEN);
    }

    onClick(ev: MouseEvent) {
        this.onOpen(ev);
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }

    onOpen(ev: MouseEvent) {
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
            this.activateTarget(ev, target, result);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        })
    }

    private async run(target: Element): Promise<boolean> {
        let openable = getHandlerExtendingOrNull<ICuiOpenable>(target as any, 'open');
        if (is(openable)) {
            await openable.open(this.args.state);
            return false;
        } else {
            await this.actionsHelper.performAction(target, this.args.action, this.args.timeout);
            return true;
        }
    }

    private activateTarget(ev: MouseEvent, target: Element, shouldEmit: boolean): void {
        if (is(target) && this.helper.hasClass(this.activeClassName, target)) {
            this.helper.setClassesAs(target, this.activeClassName);
        }
        if (shouldEmit)
            this.emitOpen(ev);
    }

    emitOpen(ev: MouseEvent) {
        this.emitEvent(EVENTS.OPENED, {
            event: ev,
            state: this.args.state,
            timestamp: Date.now()
        })
    }
}