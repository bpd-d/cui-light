import { ICuiComponent, ICuiComponentHandler, CuiObservables } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { CuiScrollListener, CuiScrollEvent } from "../../core/listeners/scroll";
import { ICuiComponentAction, CuiActionsFatory } from "../../core/utils/actions";
import { parseAttributeString, getRangeValue, is, getOffsetTop, getRangeValueOrDefault, isInRange, getOffsetLeft, clone } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";
import { CuiScrollSpyOutOfRangeError } from "../../core/models/errors";

export interface CuiScrollSpyAttribute {
    selector?: string;
    action?: string;
    link?: string;
    linkAction: string;
    offset: number;
}


export class CuiScrollSpyArgs {
    selector: string;
    action: ICuiComponentAction;
    link?: string;
    linkAction?: ICuiComponentAction;
    offset?: number;

    constructor() {
        this.offset = 0;
    }
    parse(args: any) {
        if (!args.selector) {
            throw new Error("Incorrect arguments");
        }
        this.selector = args.selector;
        this.action = CuiActionsFatory.get(args.action);
        this.link = args.link;
        this.linkAction = CuiActionsFatory.get(args.linkAction);
        this.offset = getRangeValueOrDefault(parseInt(args.offset), -1, 1, 0);
    }
}
export class CuiScrollspyComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-scrollspy`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiScrollspyHandler(element, utils, this.attribute);
    }
}

export class CuiScrollspyHandler extends CuiHandlerBase implements ICuiComponentHandler {
    #listener: CuiScrollListener;
    #args: CuiScrollSpyArgs;
    #links: Element[];
    #targets: Element[];
    #currentIdx: number;
    #targetsLength: number;
    #linksLength: number;
    #prevScrollTop: number;
    #prevScrollLeft: number;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiScrollspyHandler", element, utils);
        this.element = element as HTMLElement;
        this.#listener = new CuiScrollListener(this.element, this.utils.setup.scrollThreshold);
        this.#args = new CuiScrollSpyArgs();
        this.#links = [];
        this.#targets = [];
        this.#currentIdx = this.#targetsLength = this.#linksLength = -1;
    }

    handle(args: any): void {
        this._log.debug("Handle", "handle");
        this.#prevScrollTop = this.element.scrollTop;
        this.#prevScrollLeft = this.element.scrollLeft;
        this.parseAttribute(args);
        let current = this.calculateCurrent(this.#prevScrollTop);
        this.setCurrent(current);
        this.setCurrentLink(current, -1);
        this.#currentIdx = current;
        this.#listener.setCallback(this.onScroll.bind(this));
        this.#listener.attach();
    }

    refresh(args: any): void {
        this._log.debug("Refresh")
        this.parseAttribute(args);
        this.#prevScrollTop = this.element.scrollTop;
        this.#prevScrollLeft = this.element.scrollLeft;
        this.calculateCurrent(this.#prevScrollTop);
    }

    destroy() {
        this.#listener.detach();
    }

    private onScroll(ev: CuiScrollEvent): void {
        let idx = -1;
        if (Math.abs(ev.left - this.#prevScrollLeft) > Math.abs(ev.top - this.#prevScrollTop)) {
            idx = this.calculateCurrentLeft(ev.left);
        } else {
            idx = this.calculateCurrent(ev.top);
        }
        if (idx !== this.#currentIdx) {
            let newTarget = this.setCurrent(idx)
            this.setCurrentLink(idx, this.#currentIdx);
            this.#currentIdx = idx;
            this.emitEvent(EVENTS.ON_TARGET_CHANGE, {
                top: ev.top,
                left: ev.left,
                target: newTarget,
                timestamp: Date.now()
            })
        }

        this.#prevScrollTop = this.element.scrollTop;
        this.#prevScrollLeft = this.element.scrollLeft;
    }

    private parseAttribute(args: any) {
        this.#args.parse(args);
        this.#targets = [...this.element.querySelectorAll(this.#args.selector)];
        this.#links = this.#args.link ? [...document.querySelectorAll(this.#args.link)] : [];
        this.#targetsLength = this.#targets.length;
        this.#linksLength = this.#links.length;
    }

    private calculateCurrent(scroll: number): number {
        return this.#targets.findIndex((target: HTMLElement) => {
            let offset = getOffsetTop(target) - (<any>this.element).offsetTop;
            let ratio = offset * this.#args.offset
            return offset + ratio <= scroll && scroll < offset + target.clientHeight + ratio;
        })
    }

    private calculateCurrentLeft(scroll: number): number {
        return this.#targets.findIndex((target: HTMLElement) => {
            let offset = getOffsetLeft(target) - (<any>this.element).offsetLeft;
            let ratio = offset * this.#args.offset
            return offset + ratio <= scroll && scroll < offset + target.clientWidth + ratio;
        })
    }

    /**
     * Performs action on current, new target and on links if there are any.
     * Returns new target element or null if index is out of range
     * 
     * @param idx - new target index
     * @returns New target item
     */
    private setCurrent(idx: number): Element {
        if (!isInRange(idx, 0, this.#targetsLength)) {
            throw new CuiScrollSpyOutOfRangeError("New index is out of targets length")
        }
        let ret = this.#targets[idx]
        this.#args.action.add(ret)
        this.#args.action.remove(this.#targets[this.#currentIdx]);
        return ret;
    }

    private setCurrentLink(idx: number, prev: number) {
        if (this.#linksLength > 0) {
            if (isInRange(idx, 0, this.#linksLength)) {
                this.#args.linkAction.add(this.#links[idx]);
            }
            if (isInRange(prev, 0, this.#linksLength)) {
                this.#args.linkAction.remove(this.#links[prev]);
            }
        }
    }
}