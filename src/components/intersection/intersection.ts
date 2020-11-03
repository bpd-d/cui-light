import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { CuiIntersectionObserver } from "../../app/observers/intersection";
import { CuiActionsFatory, ICuiComponentAction } from "../../core/utils/actions";
import { is, getRangeValueOrDefault, clone } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";

/**
 * Intersection
 * Toggles action in/out when target is intersecting with the screen
 * 
 * Set this on scrollable element
 * target - children selector
 * offset - 0...1 - tells how much target must intersecting with the screen
 * action - action to trigger
 */

export class CuiIntersectionAttributes {
    target: string;
    action: ICuiComponentAction;
    offset: number
    constructor() {
        this.target = "div";
        this.action = CuiActionsFatory.get('dummy');
        this.offset = 0;
    }

    parse(args: any) {
        this.target = is(args.target) ? args.target : 'div';
        this.action = is(args.action) ? CuiActionsFatory.get(args.action) : CuiActionsFatory.get('dummy');
        this.offset = getRangeValueOrDefault(parseInt(args.offset), 0, 1, 0);
    }
}

export class CuiIntersectionComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-intersection`;
    }

    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiIntersectionHandler(element, utils, this.attribute);
    }
}

export class CuiIntersectionHandler extends CuiHandler<CuiIntersectionAttributes> {

    #observer: CuiIntersectionObserver;
    #targets: Element[];
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiIntersectionHandler", element, attribute, new CuiIntersectionAttributes(), utils);
        this.#observer = new CuiIntersectionObserver(this.element);
        this.#targets = []
    }

    onInit(): void {
        this.parseArguments();
        this.#observer.setCallback(this.onIntersection.bind(this))
        this.#observer.connect();
        this.#targets.forEach(target => {
            this.#observer.observe(target);
        })
    }

    onUpdate(): void {
        this.parseArguments();
    }

    onDestroy(): void {
        this.#observer.disconnect();
    }

    parseArguments() {
        if (this.prevArgs === null || this.prevArgs.target !== this.args.target) {
            this.#targets = [...document.querySelectorAll(this.args.target)];
        }
    }

    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        if (!is(this.#targets)) {
            return;
        }
        let action = null;
        entries.forEach(entry => {
            action = this.getAction(entry.target);
            if (entry.isIntersecting && entry.intersectionRatio >= this.args.offset) {
                action.add(entry.target)
            } else {
                action.remove(entry.target)
            }
            this.emitIntersection(entry)
        })
    }

    getAction(element: Element) {
        return element.hasAttribute('action') ? CuiActionsFatory.get(element.getAttribute('action')) : this.args.action;
    }

    emitIntersection(entry: IntersectionObserverEntry) {
        this.emitEvent(EVENTS.INTERSECTION, {
            entry: entry,
            offset: this.args.offset,
            timestamp: Date.now()
        })
    }
}