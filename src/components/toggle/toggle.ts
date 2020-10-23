import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler } from "../../app/handlers/base";
import { ICuiComponentAction, CuiActionsFatory, CuiActionsListFactory } from "../../core/utils/actions";
import { is, isString, getStringOrDefault, getName, parseAttribute } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";

export class CuiToggleArgs {
    target: string;
    action: string;
    constructor() {
        this.action = null;
        this.target = null;
    }

    parse(args: any) {
        if (is(args) && isString(args)) {
            this.action = args;
        } else {
            this.target = getStringOrDefault(args.target, null);
            this.action = args.action;
        }
    }
}
export class CuiToggleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? "cui"}-toggle`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiToggleHandler(element, utils, this.attribute);
    }
}

export class CuiToggleHandler extends CuiHandler<CuiToggleArgs> {
    #target: Element;
    #utils: CuiUtils;
    #toggleEventId: string;
    #actions: ICuiComponentAction[];
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiToggleHandler", element, attribute, new CuiToggleArgs(), utils);
        this.#target = this.element;
        this.#utils = utils;
        this.#toggleEventId = null;
        this.#actions = [];
        this.onClick = this.onClick.bind(this);
    }

    onInit(): void {
        this.#target = this.getTarget();
        this.#actions = CuiActionsListFactory.get(this.args.action);
        this.element.addEventListener('click', this.onClick);
        this.#toggleEventId = this.onEvent(EVENTS.TOGGLE, this.toggle.bind(this));

    }
    onUpdate(): void {
        this.#target = this.getTarget();
        this.#actions = CuiActionsListFactory.get(this.args.action);
    }

    onDestroy(): void {
        this.element.removeEventListener('click', this.onClick);
        this.detachEvent(EVENTS.TOGGLE, this.#toggleEventId);
    }

    toggle() {
        this.#actions.forEach(action => action.toggle(this.#target, this.#utils));
        this.emitEvent(EVENTS.TOGGLED, {
            action: this.args.action,
            target: this.#target,
            timestamp: Date.now()
        })
    }

    onClick(ev: MouseEvent) {
        this.toggle();
        ev.preventDefault();
    }

    getTarget(): Element {
        return is(this.args.target) ? document.querySelector(this.args.target) : this.element;
    }
}