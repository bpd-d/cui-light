import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { EVENTS } from "../../core/utils/statics";
import { is, getOffsetTop, getStringOrDefault } from "../../core/utils/functions";

/**
 * Component scrolls to specified target in the document
 * Arguments: 
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 * 
 */

export class CuiScrollComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = is(prefix) ? prefix + 'scroll' : 'cui-scroll';
    }

    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiScrollHandler(element, utils, this.attribute);
    }
}

export interface CuiScrollAttribute {
    target?: string;
    parent?: string;
    behavior?: 'auto' | 'smooth';
}

export class CuiScrollArgs implements ICuiParsable {
    target?: string;
    parent?: string;
    behavior?: 'auto' | 'smooth';

    constructor() {
        this.target = null;
        this.parent = null;
        this.behavior = 'auto';
    }

    parse(val: any): void {
        this.target = getStringOrDefault(val.target, "");
        this.parent = getStringOrDefault(val.parent, "");
        this.behavior = is(val.behavior) && val.behavior.toLowerCase() === 'smooth' ? 'smooth' : 'auto';
    }


}

export class CuiScrollHandler extends CuiHandler<CuiScrollArgs> {
    #parent: HTMLElement;
    #target: HTMLElement;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiScrollHandler", element, attribute, new CuiScrollArgs(), utils);
        this.element = element;
        this.#parent = null;
        this.#target = null;
    }

    onInit(): void {
        this.element.addEventListener('click', this.onClick.bind(this));
        this.setTargets();
    }
    onUpdate(): void {
        this.setTargets();
    }
    onDestroy(): void {
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
            behavior: this.args.behavior
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

    private setTargets(): void {
        this.#target = document.querySelector(this.args.target) as HTMLElement;
        if (is(this.#target)) {
            this.#parent = is(this.args.parent) ? document.querySelector(this.args.parent) : this.#target.parentElement;
        }
    }
}

