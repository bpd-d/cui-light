import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { CuiScrollListener, CuiScrollEvent } from "../../core/listeners/scroll";
import { ICuiComponentAction, CuiActionsListFactory } from "../../core/utils/actions";
import { are, getIntOrDefault, getStringOrDefault, isStringTrue } from "../../core/utils/functions";
import { EVENTS } from "../../core/index";
import { CuiOffsetModeFactory, ICuiOffsetMode } from "./modes";

/**
 * Toggles an action after specified offset is reached in relation to the element or document
 * 
 * target?: string - target which action shall be triggered on
 * action?: string - action to trigger
 * offsetY?: number - vertical offset
 * offsetX?: number - horizontal offset
 * root?: boolean - set true if scroll listener shall be set on document element
 * mode?: string - static/dynamic 
 */

export interface CuiOffsetEvent {
    matches: boolean;
    offsetX: number;
    offsetY: number;
    limitX: boolean;
    limitY: boolean;
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
    action: string;
    offsetY?: number;
    offsetX?: number
    root: boolean;
    mode: "static" | "dynamic";
    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.target = null;
        this.root = false;
        this.action = null;
        this.mode = 'static';
    }

    parse(args: any) {
        this.target = args.target;
        this.action = args.action;
        this.offsetX = getIntOrDefault(args.offsetX, -1);
        this.offsetY = getIntOrDefault(args.offsetY, -1);
        this.root = isStringTrue(args.root);
        this.mode = getStringOrDefault(args.mode, 'static');
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
    #action: ICuiComponentAction[];
    #prevX: number;
    #prevY: number;
    #threshold: number;
    #root: Element;
    #modeHandler: ICuiOffsetMode;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiOffsetHandler", element, attribute, new CuiOffsetArgs(), utils);
        this.element = element as HTMLElement;

        this.#target = this.element;
        this.#utils = utils;
        this.#matched = false;
        this.#action = null;
        this.#prevX = 0;
        this.#prevY = 0;
        this.#threshold = 20;
        this.#root = null;
        this.#modeHandler = null;

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
        this.#root = this.getRoot();
        this.#target = this.args.target ? this.getRoot().querySelector(this.args.target) : this.element;
        this.#action = CuiActionsListFactory.get(this.args.action);
        this.#modeHandler = CuiOffsetModeFactory.get(this.args.mode);
        this.checkAndPerformActions(this.element.scrollTop, this.element.scrollLeft);

    }

    private checkAndPerformActions(top: number, left: number) {
        let matchesOffset = this.#modeHandler.matches(top, left, this.args.offsetX, this.args.offsetY);
        if (matchesOffset !== this.#matched) {
            this.act(matchesOffset);
            this.#matched = matchesOffset;
            this.callEvent(this.#matched, left, top, ...this.isOnEdge(left, top));
            return;
        }
        if (this.exceededThreshold(left, top)) {
            this.callEvent(this.#matched, left, top, ...this.isOnEdge(left, top));
            this.#prevX = left;
            this.#prevY = top;
        }
    }


    private act(matching: boolean) {
        if (!are(this.#action, this.#target)) {
            return;
        }
        this.isLocked = true;
        this.#action.forEach(action => {
            if (matching) {
                action.add(this.#target, this.#utils)
            } else {
                action.remove(this.#target, this.#utils)
            }
        });
        this.isLocked = false;
    }

    private callEvent(matches: boolean, x: number, y: number, limitX: boolean, limitY: boolean) {
        this.emitEvent(EVENTS.OFFSET, {
            matches: this.#matched,
            offsetX: x,
            offsetY: y,
            limitX: limitX,
            limitY: limitY,
            timestamp: Date.now()
        })
    }

    private getRoot(): Element {
        return this.args.root ? document.body : this.element;
    }

    private exceededThreshold(x: number, y: number): boolean {
        return Math.abs(x - this.#prevX) > this.#threshold || Math.abs(y - this.#prevY) > this.#threshold;
    }

    private isOnEdge(x: number, y: number): [boolean, boolean] {
        let limitY = false;
        let limitX = false;
        if (this.#root.scrollHeight - this.#root.clientHeight <= y + this.#threshold) {
            limitY = true
        }
        if (this.#root.scrollWidth - this.#root.clientWidth <= x + this.#threshold) {
            limitX = true
        }
        return [limitX, limitY];
    }


}