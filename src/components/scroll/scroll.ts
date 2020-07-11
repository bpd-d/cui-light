import { ICuiComponent, ICuiMutationHandler, CuiObservables } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { IconBuilder } from "../icon/icon";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ICONS, EVENTS } from "../../core/utlis/statics";
import { is, parseAttributeString, getOffsetTop } from "../../core/utlis/functions";

export class CuiScrollComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = is(prefix) ? prefix + 'scroll' : 'cui-scroll';
    }

    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiMutationHandler {
        return new CuiScrollHandler(element, utils, this.attribute);
    }
}

export interface CuiScrollAttribute {
    target?: string;
    parent?: string;
    behavior?: 'auto' | 'smooth';
}

export class CuiScrollHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #attribute: string;
    #args: CuiScrollAttribute;
    #parent: HTMLElement;
    #target: HTMLElement;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiScrollHandler", element, utils);
        this.element = element;
        this.#attribute = attribute
        this.#args = null;
        this.#parent = null;
        this.#target = null;
    }

    handle(): void {
        this.parseArguments();
        this.element.addEventListener('click', this.onClick.bind(this));
    }

    refresh(): void {
        this.parseArguments();
    }

    destroy(): void {
        this.element.removeEventListener('click', this.onClick.bind(this));
    }

    onClick(ev: MouseEvent) {
        if (!is(this.#target)) {
            return;
        }
        let to = getOffsetTop(this.#target) - this.#parent.offsetTop;
        let from = this.#parent.scrollTop;
        let by = to - from;
        this.#parent.scrollBy({
            top: by,
            behavior: this.#args.behavior ?? 'auto'
        });
        this.emitEvent(EVENTS.ON_SCROLL, {
            to: to,
            by: by,
            target: this.#target,
            parent: this.#parent,
            timestamp: Date.now(),
        })
        ev.preventDefault();
    }

    private parseArguments(): void {
        this.#args = parseAttributeString(this.element.getAttribute(this.#attribute));
        this.#target = document.querySelector(this.#args.target) as HTMLElement;
        if (is(this.#target)) {
            this.#parent = is(this.#args.parent) ? document.querySelector(this.#args.parent) : this.#target.parentElement;
        }
    }
}

