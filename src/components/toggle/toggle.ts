import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler } from "../../app/handlers/base";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { is, isString, getStringOrDefault, getName, parseAttribute } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";

export class CuiToggleArgs {
    target: string;
    action: ICuiComponentAction;
    constructor() {
        this.action = null;
        this.target = null;
    }

    parse(args: any) {
        if (is(args) && isString(args)) {
            this.action = CuiActionsFatory.get(args)
        } else {
            this.target = getStringOrDefault(args.target, null);
            console.log(args.action)
            this.action = CuiActionsFatory.get(args.action)
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
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiToggleHandler", element, attribute, new CuiToggleArgs(), utils);
        this.#target = this.element;
        this.#utils = utils;
        this.#toggleEventId = null;
    }

    onInit(): void {
        this.#target = this.getTarget();
        this.element.addEventListener('click', this.onClick.bind(this));
        this.#toggleEventId = this.onEvent(EVENTS.TOGGLE, this.toggle.bind(this));

    }
    onUpdate(): void {
        this.#target = this.getTarget();
    }
    onDestroy(): void {
        this.element.removeEventListener('click', this.onClick.bind(this));
        this.detachEvent(EVENTS.TOGGLE, this.#toggleEventId);
    }

    toggle() {
        console.log(this.args.action)
        this.args.action.toggle(this.#target, this.#utils)
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