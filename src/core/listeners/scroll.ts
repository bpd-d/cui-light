import { CuiElementBoxFactory, CuiElementBoxType, ICuiElementBox } from "../models/elements";
import { ICuiEventListener } from "../models/interfaces";
import { getRangeValueOrDefault, is } from "../utils/functions";
import { CuiTaskRunner, ICuiTask } from "../utils/task";

const DEFAULT_SCROLL_END_TIMEOUT: number = 50;

export interface CuiScrollEvent {
    base: Event;
    top: number;
    left: number;
    initial: boolean;
    scrolling: boolean;
    source: string;
}

export class CuiScrollListener implements ICuiEventListener<CuiScrollEvent> {
    #target: CuiElementBoxType;
    #inProgress: boolean;
    #threshold: number;
    #prevX: number;
    #prevY: number;
    #callback: (ev: CuiScrollEvent) => void;
    #isAttached: boolean;
    #box: ICuiElementBox;
    #task: ICuiTask;
    #listener: (ev: Event) => void;
    constructor(target: CuiElementBoxType, threshold?: number) {
        this.#target = target;
        this.#box = CuiElementBoxFactory.get(target);
        this.#inProgress = false;
        this.#threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
        this.#prevX = this.#prevY = 0;
        this.#isAttached = false;
        this.#task = new CuiTaskRunner(DEFAULT_SCROLL_END_TIMEOUT, false, this.onScrollFinish.bind(this));
        this.#listener = this.listener.bind(this);
    }

    setCallback(callback: (ev: CuiScrollEvent) => void) {
        this.#callback = callback;
    }

    attach() {
        this.#target.addEventListener('scroll', this.#listener)
        this.#isAttached = true;
        this.listener(undefined, true, "init");
    }

    detach() {
        this.#target.removeEventListener('scroll', this.#listener)
        this.#task.stop();
        this.#isAttached = false;
    }

    setTarget(target: CuiElementBoxType) {
        if (target !== this.#target) {
            this.detach();
            this.#target = target;
            this.attach();
        }
    }

    setThreshold(threshold: number) {
        this.#threshold = getRangeValueOrDefault(threshold, 0, 100, 0);
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }

    isAttached(): boolean {
        return this.#isAttached;
    }

    private listener(ev: Event, initial?: boolean, source?: string) {
        if (!is(this.#callback)) {
            return;
        }
        let left = this.#box.getScrollLeft();
        let top = this.#box.getScrollTop();
        this.#prevX += left;
        this.#prevY += top;
        if (this.#inProgress || (!this.passedThreshold() && is(ev))) {
            return;
        }
        this.#inProgress = true;
        this.#callback({
            base: ev,
            top: top,
            left: left,
            initial: initial ?? false,
            scrolling: is(ev),
            source: source ?? "event"
        })
        if (is(ev))
            this.#task.start();
        this.#inProgress = false
        this.#prevX = 0;
        this.#prevY = 0;
    }

    private passedThreshold() {
        return this.#threshold <= 0 || (this.#prevX >= this.#threshold || this.#prevY >= this.#threshold);
    }

    private onScrollFinish() {
        this.listener(undefined, false, "task");
    }
}