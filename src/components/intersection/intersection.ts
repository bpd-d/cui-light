import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { CuiIntersectionObserver } from "../../app/observers/intersection";
import { CuiActionsFatory, ICuiComponentAction } from "../../core/utils/actions";
import { is, parseAttributeString, getRangeValueOrDefault, clone } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";

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

    get(element: Element, utils: CuiUtils): ICuiMutationHandler {
        return new CuiIntersectionHandler(element, utils, this.attribute);
    }
}

export class CuiIntersectionHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #attribute: string;
    #observer: CuiIntersectionObserver;
    #args: CuiIntersectionAttributes;
    #targets: Element[];
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiIntersectionHandler", element, utils);
        this.#attribute = attribute
        this.#observer = new CuiIntersectionObserver(this.element);
        this.#args = new CuiIntersectionAttributes();
        this.#targets = []
    }

    handle(): void {
        this.parseArguments(null);
        this.#observer.setCallback(this.onIntersection.bind(this))
        this.#observer.connect();
        this.#targets.forEach(target => {
            this.#observer.observe(target);
        })
    }

    refresh(): void {
        let prev = clone(this.#args)
        this.parseArguments(prev);
    }

    destroy(): void {
        this.#observer.disconnect();
    }

    parseArguments(prev: CuiIntersectionAttributes) {
        this.#args.parse(parseAttributeString(this.element.getAttribute(this.#attribute)));
        if (prev === null || prev.target !== this.#args.target) {
            this.#targets = [...document.querySelectorAll(this.#args.target)];
        }
    }

    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        if (!is(this.#targets)) {
            return;
        }
        let action = null;
        entries.forEach(entry => {
            action = this.getAction(entry.target);
            if (entry.isIntersecting && entry.intersectionRatio > this.#args.offset) {
                action.add(entry.target)
            } else {
                action.remove(entry.target)
            }
            this.emitIntersection(entry)
        })
    }

    getAction(element: Element) {
        return element.hasAttribute('action') ? CuiActionsFatory.get(element.getAttribute('action')) : this.#args.action;
    }

    emitIntersection(entry: IntersectionObserverEntry) {
        this.emitEvent(EVENTS.ON_INTERSECTION, {
            entry: entry,
            offset: this.#args.offset,
            timestamp: Date.now()
        })
    }
}