import { ICuiEventListener } from "../models/interfaces";
import { getRangeValueOrDefault } from "../utils/functions";

export interface CuiScrollEvent {
    base: Event;
    top: number;
    left: number;
}

export class CuiScrollListener implements ICuiEventListener<CuiScrollEvent> {
    #target: Element;
    #inProgress: boolean;
    #threshold: number;
    #prevX: number;
    #prevY: number;
    #callback: (ev: CuiScrollEvent) => void;
    #isAttached: boolean;
    #isRoot: boolean;
    constructor(target: Element, threshold?: number) {
        this.#target = target;
        this.#inProgress = false;
        this.#threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
        this.#prevX = this.#prevY = 0;
        this.#isAttached = false;
        this.#isRoot = target instanceof Window;
    }

    setCallback(callback: (ev: CuiScrollEvent) => void) {
        this.#callback = callback;
    }

    attach() {
        this.#target.addEventListener('scroll', this.listener.bind(this))
        this.#isAttached = true;
    }

    detach() {
        this.#target.removeEventListener('scroll', this.listener.bind(this))
        this.#isAttached = false;
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }

    isAttached(): boolean {
        return this.#isAttached;
    }

    private listener(ev: Event) {
        let left = this.getLeft();
        let top = this.getTop();
        this.#prevX += left;
        this.#prevY += top;
        if (this.#inProgress || !this.passedThreshold()) {
            return;
        }
        this.#inProgress = true;

        requestAnimationFrame(() => {
            this.#callback({
                base: ev,
                top: top,
                left: left
            })
            this.#inProgress = false
            this.#prevX = 0;
            this.#prevY = 0;
        })
    }

    private passedThreshold() {
        return this.#threshold <= 0 || (this.#prevX >= this.#threshold || this.#prevY >= this.#threshold);
    }

    getTop() {
        return this.#isRoot ? window.pageYOffset : this.#target.scrollTop;
    }

    getLeft(): number {
        return this.#isRoot ? window.pageXOffset : this.#target.scrollLeft;
    }
}