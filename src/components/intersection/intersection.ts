import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { CuiIntersectionObserver } from "../../app/observers/intersection";
import { CuiActionsFatory, CuiActionsListFactory, ICuiComponentAction } from "../../core/utils/actions";
import { is, getRangeValueOrDefault, clone, getStringOrDefault, isStringTrue } from "../../core/utils/functions";
import { EVENTS, SCOPE_SELECTOR } from "../../core/utils/statics";

const DEFAULT_SELCTOR = "> *";

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
    action: string;
    offset: number;
    isRoot: boolean;
    constructor() {
        this.target = "div";
        this.action = null;
        this.offset = 0;
    }

    parse(args: any) {
        this.target = is(args.target) ? SCOPE_SELECTOR + args.target : SCOPE_SELECTOR + DEFAULT_SELCTOR;
        this.action = getStringOrDefault(args.action, null);
        this.offset = getRangeValueOrDefault(parseFloat(args.offset), 0, 1, 0);
        this.isRoot = isStringTrue(args.isRoot);
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
    #actions: ICuiComponentAction[];
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
            let el = this.args.isRoot ? document.body : this.element;
            this.#targets = [...el.querySelectorAll(this.args.target)];
        }
        this.#actions = CuiActionsListFactory.get(this.args.action);
    }

    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        if (!is(this.#targets)) {
            return;
        }
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= this.args.offset) {
                this.addActions(entry.target);
            } else {
                this.removeActions(entry.target);
            }
            this.emitIntersection(entry)
        })
    }

    emitIntersection(entry: IntersectionObserverEntry) {
        this.emitEvent(EVENTS.INTERSECTION, {
            entry: entry,
            offset: this.args.offset,
            timestamp: Date.now()
        })
    }

    private addActions(element: Element) {
        this.#actions.forEach(action => action.add(element));
    }

    private removeActions(element: Element) {
        this.#actions.forEach(action => action.remove(element));
    }
}