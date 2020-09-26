import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { CuiScrollListener, CuiScrollEvent } from "../../core/listeners/scroll";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { getIntOrDefault, isStringTrue } from "../../core/utils/functions";
import { EVENTS } from "../../core/index";

/**
 * Toggles an action after specified offset is reached in relation to the element or document
 * 
 * target?: string - target which action shall be triggered on
 * action?: string - action to trigger
 * offsetY?: number - vertical offset
 * offsetX?: number - horizontal offset
 * root?: boolean - set true if scroll listener shall be set on document element
 */

export interface CuiOffsetEvent {
    matches: boolean;
    timestamp: number;
}

export interface CuiOffsetAttribute {
    target?: string;
    action?: string;
    offsetY?: number;
    offsetX?: number;
    root?: boolean;
}

export class CuiOffsetArgs {
    target: string;
    action: ICuiComponentAction[];
    offsetY?: number;
    offsetX?: number
    root: boolean;
    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.target = null;
        this.root = false;
    }

    parse(args: any) {
        this.target = args.target;
        this.action = CuiActionsListFactory.get(args.action);
        this.offsetX = getIntOrDefault(args.offsetX, -1);
        this.offsetY = getIntOrDefault(args.offsetY, -1);
        this.root = isStringTrue(args.root)
    }
}
export class CuiOffsetComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-offset`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiOffsetHandler(element, utils, this.attribute);
    }
}

export class CuiOffsetHandler extends CuiHandler<CuiOffsetArgs> {

    #listener: CuiScrollListener;
    #target: Element;
    #utils: CuiUtils;
    #matched: boolean;

    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiOffsetHandler", element, attribute, new CuiOffsetArgs(), utils);
        this.element = element as HTMLElement;

        this.#target = this.element;
        this.#utils = utils;
        this.#matched = false;
    }

    onInit(): void {
        this.parseAttribute();
        this.#listener = new CuiScrollListener(this.args.root ? (window as any) : this.element, this.utils.setup.scrollThreshold);
        this.#listener.setCallback(this.onScroll.bind(this));
        this.#listener.attach();
    }
    onUpdate(): void {
        this.parseAttribute();
    }
    onDestroy(): void {
        this.#listener.detach();
    }

    private onScroll(ev: CuiScrollEvent): void {
        this.checkAndPerformActions(ev.top, ev.left);
    }

    private parseAttribute() {
        this.#target = this.args.target ? this.getRoot().querySelector(this.args.target) : this.element;
        this.checkAndPerformActions(this.element.scrollTop, this.element.scrollLeft);

    }

    private matchesOffset(top: number, left: number) {
        return (this.args.offsetX > 0 && left >= this.args.offsetX) ||
            (this.args.offsetY > 0 && top >= this.args.offsetY)
    }

    private checkAndPerformActions(top: number, left: number) {
        let matchesOffset = this.matchesOffset(top, left);
        if (matchesOffset && !this.#matched) {
            this.args.action.forEach(action => action.add(this.#target, this.#utils));
            this.#matched = true;
            this.callEvent();
        } else if (!matchesOffset && this.#matched) {
            this.args.action.forEach(action => action.remove(this.#target, this.#utils));
            this.#matched = false;
            this.callEvent();
        }
    }

    private callEvent() {
        this.emitEvent(EVENTS.OFFSET, {
            matches: this.#matched,
            timestamp: Date.now()
        })
    }

    getRoot(): Element | Document {
        return this.args.root ? document : this.element;
    }
}