import { TaskedEventEmitHandler } from "../bus/handlers";
import { ICuiEventListener } from "../models/interfaces";
import { is, round } from "../utils/functions";

interface OnMoveCallback {
    (ev: ICuiMoveEvent): void;
}

interface IMoveListener {
    onMove(data: OnMoveCallback): void
    start(): void;
    stop(): void;
}

export type CuiMoveEventState = "down" | "up" | "move";
export interface ICuiMoveEvent {
    x: number;
    y: number;
    moveX: number;
    moveY: number;
    type: CuiMoveEventState;
    target: EventTarget;
    event: MouseEvent | TouchEvent;
}

export class CuiMoveEventListener implements ICuiEventListener<ICuiMoveEvent> {
    #element: HTMLElement | Document;
    #onEvent: (t: ICuiMoveEvent) => void;
    #isLocked: boolean;
    #isAttached: boolean;
    #preventDefault: boolean;
    #target: Element;
    constructor(element?: HTMLElement) {
        this.#isLocked = false;
        this.#element = element ?? document.body;
        this.#isAttached = false;
        this.#preventDefault = false;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.onTouchMove = this.onTouchMove.bind(this)
    }

    setCallback(callback: (t: ICuiMoveEvent) => void): void {
        this.#onEvent = callback;
    }

    setTarget(element: Element) {
        this.#target = element;
    }
    isInProgress(): boolean {
        return this.#isLocked;
    }
    preventDefault(flag: boolean) {
        this.#preventDefault = flag;
    }
    attach(): void {
        if (this.#isAttached) {
            return;
        }
        this.#element.addEventListener('mousedown', this.onMouseDown, { passive: false } as any)
        this.#element.addEventListener('mouseup', this.onMouseUp, { passive: false } as any)
        this.#element.addEventListener('mousemove', this.onMouseMove, { passive: false } as any)
        this.#element.addEventListener('touchstart', this.onTouchStart, { passive: false } as any)
        this.#element.addEventListener('touchend', this.onTouchEnd, { passive: false } as any)
        this.#element.addEventListener('touchmove', this.onTouchMove, { passive: false } as any)
        this.#isAttached = true;
    }
    detach(): void {
        console.log("On detach")
        if (!this.#isAttached) {
            return;
        }

        this.#element.removeEventListener('mousedown', this.onMouseDown, { passive: false } as any)
        this.#element.removeEventListener('mouseup', this.onMouseUp, { passive: false } as any)
        this.#element.removeEventListener('mousemove', this.onMouseMove, { passive: false } as any)
        this.#element.removeEventListener('touchstart', this.onTouchStart, { passive: false } as any)
        this.#element.removeEventListener('touchend', this.onTouchEnd, { passive: false } as any)
        this.#element.removeEventListener('touchmove', this.onTouchMove, { passive: false } as any)
        this.#isAttached = false;
    }

    isAttached(): boolean {
        return this.#isAttached
    }

    onMouseDown(ev: MouseEvent) {
        if (this.#isLocked) {
            return;
        }
        if (this.#target && !this.#target.contains(ev.target as Node)) {
            return;
        }

        this.#isLocked = true;
        this.publishMouseEvent("down", ev)

    }

    onMouseUp(ev: MouseEvent) {
        if (!this.#isLocked) {
            return;
        }
        this.#isLocked = false;
        this.publishMouseEvent("up", ev)

    }

    onMouseMove(ev: MouseEvent) {
        if (this.#isLocked) {
            this.publishMouseEvent("move", ev)
        }
    }

    onTouchStart(ev: TouchEvent) {
        if (this.#isLocked) {
            return;
        }
        if (this.#target && !this.#target.contains(ev.target as Node)) {
            return;
        }
        this.#isLocked = true;
        this.publishTouchEvent('down', ev);
    }

    onTouchEnd(ev: TouchEvent) {
        if (!this.#isLocked) {
            return;
        }
        this.#isLocked = false;
        this.publishTouchEvent('up', ev);
    }

    onTouchMove(ev: TouchEvent) {
        if (this.#isLocked) {
            this.publishTouchEvent('move', ev);
            // if (this.#preventDefault) {
            //     ev.preventDefault();
            // }
        }
    }

    private publishMouseEvent(type: CuiMoveEventState, ev: MouseEvent) {
        if (this.#preventDefault && ev.cancelable) {
            ev.preventDefault();
        }
        if (is(this.#onEvent)) {
            this.#onEvent({
                type: type,
                x: ev.clientX,
                y: ev.clientY,
                moveX: ev.movementX,
                moveY: ev.movementY,
                target: ev.target,
                event: ev
            })
        }
    }

    private publishTouchEvent(type: CuiMoveEventState, ev: TouchEvent) {
        if (this.#preventDefault && ev.cancelable)
            ev.preventDefault();
        if (is(this.#onEvent)) {
            let touch = null;
            if (ev.touches.length > 0) {
                touch = ev.touches[0]
            } else if (ev.changedTouches.length > 0) {
                touch = ev.changedTouches[0]
            }
            this.#onEvent({
                event: ev,
                type: type,
                target: ev.target,
                x: is(touch) ? touch.clientX : -1,
                y: is(touch) ? touch.clientY : -1,
                moveX: -1,
                moveY: -1
            })
        }
    }

}
