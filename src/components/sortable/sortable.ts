import { ElementBuilder } from "../../app/builders/element";
import { CuiHandler } from "../../app/handlers/base";
import { CuiSimpleDragOverDetector } from "../../app/handlers/drag/detectors";
import { CuiDragHandler } from "../../app/handlers/drag/drag";
import { ICuiElementDetector } from "../../app/handlers/drag/interfaces";
import { CuiSwipeAnimationEngine, PropsTypes } from "../../core/animation/engine";
import { AnimationProperty } from "../../core/animation/interfaces";
import { CLASSES, CuiUtils, delay, EVENTS, getIntOrDefault, ICuiComponent, ICuiComponentHandler, ICuiParsable, is, replacePrefix, SCOPE_SELECTOR } from "../../core/index";
import { ICuiMoveEvent } from "../../core/listeners/move";

const SORTABLE_IS_MOVING = "{prefix}-moving";
const DEFAULT_SELECTOR = " > *";
const SORTABLE_PREVIEW_CLS = "{prefix}-sortable-preview";

export class CuiSortableArgs implements ICuiParsable {
    target: string;
    trigger: string;
    timeout: number;
    threshold: number;
    constructor() {
        this.target = SCOPE_SELECTOR + DEFAULT_SELECTOR;;
        this.trigger = SCOPE_SELECTOR + DEFAULT_SELECTOR;
        this.timeout = 150;
        this.threshold = 5;
    }
    parse(val: any): void {
        this.target = val.target ? SCOPE_SELECTOR + " " + val.target : SCOPE_SELECTOR + DEFAULT_SELECTOR;
        this.trigger = val.trigger ? SCOPE_SELECTOR + " " + val.trigger : SCOPE_SELECTOR + DEFAULT_SELECTOR;
        this.timeout = getIntOrDefault(val.timeout, 150);
        this.threshold = getIntOrDefault(val.threshold, 5);
    }


}

export class CuiSortableComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? "cui";
        this.attribute = this.#prefix + "-sortable";
    }
    getStyle(): string {
        return null;
    }
    get(element: HTMLElement, sutils: CuiUtils): ICuiComponentHandler {
        return new CuiSortableHandler(element, this.attribute, sutils, this.#prefix);
    }
}

export class CuiSortableHandler extends CuiHandler<CuiSortableArgs> {
    #dragHandler: CuiDragHandler;
    #triggers: Element[];
    #targets: Element[];
    #currentTarget: HTMLElement;
    #currentIdx: number;
    #preview: HTMLElement;
    #movingCls: string;
    #detector: ICuiElementDetector;
    #currentBefore: HTMLElement;
    #animation: CuiSwipeAnimationEngine;

    #previewCls: string;
    constructor(element: HTMLElement, attribute: string, utils: CuiUtils, prefix: string) {
        super("CuiSortableHandler", element, attribute, new CuiSortableArgs(), utils);
        this.#dragHandler = new CuiDragHandler(element);
        this.#dragHandler.onDragStart(this.onDragStart.bind(this));
        this.#dragHandler.onDragOver(this.onDragOver.bind(this));
        this.#dragHandler.onDragEnd(this.onDragEnd.bind(this));
        this.#movingCls = replacePrefix(SORTABLE_IS_MOVING, prefix);
        this.#previewCls = replacePrefix(SORTABLE_PREVIEW_CLS, prefix);
        this.#detector = new CuiSimpleDragOverDetector();
        this.#currentBefore = undefined;
        this.#animation = new CuiSwipeAnimationEngine();
        this.#animation.setOnFinish(() => {
            let item = this.#currentTarget;
            let idx = this.#currentIdx;
            this.stopMovementPrep();

            this.utils.bus.emit(EVENTS.MOVE_LOCK, null, false);
            this.emitEvent(EVENTS.SORTED, {
                item: item,
                index: idx,
                timestamp: new Date()
            })
        })
    }

    onInit(): void {
        this.#dragHandler.attach();
        this.getTargetsAndTrggers();
        this.#detector.setThreshold(this.args.threshold)
    }

    onUpdate(): void {
        if (this.args.target !== this.prevArgs.target ||
            this.args.trigger !== this.prevArgs.trigger) {
            this.getTargetsAndTrggers();
        }
        this.#dragHandler.setLongPressTimeout(this.args.timeout);
    }

    onDestroy(): void {
        this.#dragHandler.detach();
    }

    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    private getTargetsAndTrggers() {
        try {
            this.#targets = [...this.element.querySelectorAll(this.args.target)];
            this.#triggers = [...this.element.querySelectorAll(this.args.trigger)];
            if (this.#triggers.length !== this.#targets.length) {
                throw new Error(`Triggers (count ${this.#triggers.length}) and targets (count ${this.#targets.length}) selector are not correct`)
            }
            this.#detector.setElements(this.#targets);
        } catch (e) {
            this._log.error("Incorrect trigger or target selector")
            this._log.exception(e, "getTargetsAndTrggers");
            this.#targets = [];
            this.#triggers = [];
        }
    }

    private onDragStart(data: ICuiMoveEvent): boolean {
        this.#currentIdx = this.getPressedElementIdx(data.target as Node);
        this.#currentTarget = this.#currentIdx > -1 ? this.#targets[this.#currentIdx] as HTMLElement : undefined;
        if (!this.#currentTarget) {
            return false;
        }
        this.utils.bus.emit(EVENTS.MOVE_LOCK, null, true);
        this.startMovementPrep(data);
        this.emitEvent(EVENTS.SORT_START, {
            item: this.#currentTarget,
            index: this.#currentIdx,
            timestamp: new Date()
        })
        return true;
    }

    private onDragOver(data: ICuiMoveEvent): void {
        this.move(data);
        data.event.preventDefault();
    }

    private onDragEnd(data: ICuiMoveEvent): void {
        this.#animation.setElement(this.#preview);
        this.#animation.setProps(this.getFinishAnimation());
        this.#animation.finish(0, 100, false);
    }

    private getPressedElementIdx(target: Node) {
        return this.#triggers.findIndex((trigger: Element) => {
            return trigger.contains(target)
        });
    }

    private startMovementPrep(data: ICuiMoveEvent) {
        this.mutate(() => {
            this.createPreview();
            this.helper.setClass(this.#movingCls, this.#currentTarget);
            this.helper.setClass("cui-locked", this.element);
            this.helper.setClass(CLASSES.swipingOn, document.body);
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        })
    }

    private stopMovementPrep() {
        this.mutate(() => {
            this.helper.removeClass(this.#movingCls, this.#currentTarget);
            this.helper.removeClass(CLASSES.swipingOn, document.body);
            this.helper.removeClass("cui-locked", this.element);
            this.removePreview();
            this.#currentTarget = undefined;
            this.#currentBefore = undefined;
            this.getTargetsAndTrggers();
        })
    }

    private move(data: ICuiMoveEvent) {
        this.mutate(() => {
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        })
    }

    private createPreview() {
        this.#preview = new ElementBuilder("div").setClasses(this.#previewCls).build();
        this.#preview.style.width = `${this.#currentTarget.offsetWidth}px`;
        this.#preview.style.height = `${this.#currentTarget.offsetHeight}px`;
        document.body.appendChild(this.#preview);
    }

    private removePreview() {
        if (this.#preview) {
            this.#preview.remove();
            this.#preview = null;
        }
    }

    private setPreviewPosition(data: ICuiMoveEvent) {
        if (!this.#preview) {
            return;
        }

        this.#preview.style.top = `${data.y}px`;
        this.#preview.style.left = `${data.x}px`;
    }

    private setCurrentPosition(data: ICuiMoveEvent) {
        if (!this.#currentTarget) {
            return;
        }
        let [idx, detected] = this.#detector.detect(data.x, data.y);
        if ((idx !== this.#currentIdx) && this.#currentBefore !== detected) {
            let el = detected;
            this.insertElement(this.#currentTarget, el);
            this.#currentBefore = el as HTMLElement;
            this.getTargetsAndTrggers();
            this.#currentIdx = idx;
        }
    }

    private insertElement(source: Element, destination: Element) {
        if (is(destination)) {
            this.element.insertBefore(source, destination);
        } else {
            this.element.appendChild(source);
        }
    }

    private getFinishAnimation(): AnimationProperty<PropsTypes> {
        const box = this.#currentTarget.getBoundingClientRect();
        return {
            opacity: {
                from: 1,
                to: 0,
            },
            top: {
                from: this.#preview.offsetTop,
                to: box.top > 0 ? box.top : this.#preview.offsetTop,
                unit: "px"
            },
            left: {
                from: this.#preview.offsetLeft,
                to: box.left > 0 ? box.left : this.#preview.offsetLeft,
                unit: "px"
            }
        }
    }
}