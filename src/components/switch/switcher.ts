import { ICuiComponent, ICuiComponentHandler, ICuiParsable, CuiElement } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { EVENTS, is } from "../../core/index";

const SWITCHER_LIST_ITEM_SELECTOR = "li > a";

export class CuiSwitcherArgs implements ICuiParsable {

    target: string;
    index: string;

    constructor() {

    }

    parse(args: any): void {
        if (!is(args)) {
            return;
        }
        this.target = args.target;
        this.index = args.index;
    }

}

export class CuiSwitcherComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-switcher`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSwitcherHandler(element, utils, this.attribute);
    }
}

export class CuiSwitcherHandler extends CuiHandler<CuiSwitcherArgs>  {
    #targetId: string;
    #isList: boolean;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiSwitcherHandler", element, attribute, new CuiSwitcherArgs(), utils);
        this.#targetId = null;
        this.#isList = element.tagName === 'UL';
    }

    onInit(): void {
        this.setEvents();
        this.getTarget();
    }

    onUpdate(): void {
        this.getTarget();
    }

    onDestroy(): void {
        this.removeEvents();
    }

    getTarget() {
        if (!is(this.args.target)) {
            this.#targetId = null;
        }

        let target = <CuiElement>(document.querySelector(this.args.target) as any);
        if (is(target)) {
            this.#targetId = target.$cuid;
        }
    }

    setEvents() {
        if (this.#isList) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el: Element, index: number) => {
                el.addEventListener('click', this.onListItemClick.bind(this, index))
            })
        } else {
            this.element.addEventListener('click', this.onClickEvent.bind(this))
        }
    }

    removeEvents() {
        if (this.#isList) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el: Element, index: number) => {
                el.removeEventListener('click', this.onListItemClick.bind(this, index))
            })
        } else {
            this.element.removeEventListener('click', this.onClickEvent.bind(this));
        }
    }

    onClickEvent(ev: MouseEvent) {
        this.getTarget();
        if (!is(this.args.index)) {
            return;
        }
        this.onClick(this.args.index.trim());
    }

    onListItemClick(index: number, ev: MouseEvent) {
        this.getTarget();
        this.onClick(index);
    }

    onClick(index: any) {
        if (!is(this.#targetId)) {
            return;
        }
        this.utils.bus.emit(EVENTS.SWITCH, this.#targetId, index);
    }

}