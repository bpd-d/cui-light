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
    constructor(element?: HTMLElement) {
        this.#isLocked = false;
        this.#element = element ?? document;
        this.#isAttached = false;
        this.#preventDefault = false;
    }
    setCallback(callback: (t: ICuiMoveEvent) => void): void {
        this.#onEvent = callback;
    }
    isInProgress(): boolean {
        throw new Error("Method not implemented.");
    }
    preventDefault(flag: boolean) {
        this.#preventDefault = flag;
    }
    attach(): void {
        if (this.#isAttached) {
            return;
        }
        this.#element.addEventListener('mousedown', this.onMouseDown.bind(this))
        this.#element.addEventListener('mouseup', this.onMouseUp.bind(this))
        this.#element.addEventListener('mousemove', this.onMouseMove.bind(this))
        this.#element.addEventListener('touchstart', this.onTouchStart.bind(this))
        this.#element.addEventListener('touchend', this.onTouchEnd.bind(this))
        this.#element.addEventListener('touchmove', this.onTouchMove.bind(this))
        this.#isAttached = true;
    }
    detach(): void {
        if (!this.#isAttached) {
            return;
        }
        this.#element.removeEventListener('mousedown', this.onMouseDown.bind(this))
        this.#element.removeEventListener('mouseup', this.onMouseUp.bind(this))
        this.#element.removeEventListener('mousemove', this.onMouseMove.bind(this))
        this.#element.removeEventListener('touchstart', this.onTouchStart.bind(this))
        this.#element.removeEventListener('touchend', this.onTouchEnd.bind(this))
        this.#element.removeEventListener('touchmove', this.onTouchMove.bind(this))
        this.#isAttached = false;
    }

    isAttached(): boolean {
        return this.#isAttached
    }

    onMouseDown(ev: MouseEvent) {
        this.publishMouseEvent("down", ev)

    }

    onMouseUp(ev: MouseEvent) {
        this.publishMouseEvent("up", ev)

    }

    onMouseMove(ev: MouseEvent) {
        this.publishMouseEvent("move", ev)
    }

    onTouchStart(ev: TouchEvent) {
        this.publishTouchEvent('down', ev);
    }

    onTouchEnd(ev: TouchEvent) {
        this.publishTouchEvent('up', ev);
    }

    onTouchMove(ev: TouchEvent) {
        this.publishTouchEvent('move', ev);
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

// export class CuiMoveEventListener implements ICuiEventListener<ICuiMoveEvent> {
//     #isAttached: boolean;
//     #element: HTMLElement | Document;
//     #callback: (t: ICuiMoveEvent) => void;
//     #listeners: IMoveListener[];
//     #prevent: boolean;
//     constructor(element: HTMLElement | Document, trackOutside: boolean = true) {
//         this.#element = element;
//         this.#listeners = [
//             new MouseMoveListener(element, trackOutside),
//             new TouchMoveListener(element, trackOutside)
//         ]
//         this.#listeners.forEach(listener => listener.onMove(this.onMove.bind(this)))
//     }

//     setCallback(callback: (t: ICuiMoveEvent) => void): void {
//         this.#callback = callback;

//     }
//     isInProgress(): boolean {
//         return false;
//     }

//     preventDefault(flag: boolean) {
//         this.#prevent = flag;
//     }

//     attach(): void {
//         this.#listeners.forEach(listener => listener.start());
//     }
//     detach(): void {
//         this.#listeners.forEach(listener => listener.stop());
//     }
//     isAttached(): boolean {
//         return this.#isAttached;
//     }

//     private onMove(data: ICuiMoveEvent) {
//         if (this.#callback) {
//             this.#callback(data);
//         }
//     }
// }

// export class MouseMoveListener implements IMoveListener {
//     #callback: OnMoveCallback;
//     #element: HTMLElement | Document;
//     #isTracking: boolean;
//     #startX: number;
//     #startY: number;
//     #threshold: number;
//     #trackOutside: boolean
//     constructor(element: HTMLElement | Document, trackOutside: boolean = true) {
//         this.#callback = undefined;
//         this.#element = element;
//         this.#isTracking = false;
//         this.#threshold = 4;
//         this.#trackOutside = trackOutside;
//     }
//     start() {
//         this.#element.addEventListener("mousedown", this.onMouseDown.bind(this))
//         this.#element.addEventListener("mouseup", this.onMouseUp.bind(this))
//         this.#element.addEventListener("mousemove", this.onMouseMove.bind(this))
//     }

//     stop() {
//         this.#element.removeEventListener("mousedown", this.onMouseDown.bind(this))
//         this.#element.removeEventListener("mouseup", this.onMouseUp.bind(this))
//         this.#element.removeEventListener("mousemove", this.onMouseMove.bind(this))
//     }
//     onMove(data: OnMoveCallback): void {
//         this.#callback = data;
//     }

//     onMouseDown(ev: MouseEvent) {
//         this.#isTracking = true;
//         this.#startX = ev.pageX;
//         this.#startY = ev.pageY;
//         this.emit(ev, "down");
//     }

//     onMouseUp(ev: MouseEvent) {
//         if (!this.#isTracking) {
//             return;
//         }
//         this.#isTracking = false;
//         this.emit(ev, "up");
//         this.#startX = 0;
//         this.#startY = 0;
//     }

//     onMouseMove(ev: MouseEvent) {
//         if (!this.#isTracking) {
//             return;
//         }
//         // if (this.#trackOutside && this.isOutOfElement(ev)) {
//         //     this.onMouseUp(ev);
//         //     return;
//         // }
//         this.emit(ev, "move");
//     }

//     emit(ev: MouseEvent, type: CuiMoveEventState) {
//         if (ev.cancelable) {
//             ev.preventDefault();
//         }
//         let ratio = this.calcRatio(ev);
//         let data: ICuiMoveEvent = {
//             type: type,
//             source: "mouse",
//             event: ev,
//             target: ev.target,
//             x: ev.pageX,
//             y: ev.pageY,
//             moveX: ev.movementX,
//             moveY: ev.movementY,
//             ratioX: round(ratio[0], 2),
//             ratioY: round(ratio[1], 2)
//         }
//         this.#callback(data);
//     }

//     calcRatio(ev: MouseEvent): [number, number] {
//         let width = this.#element.offsetWidth;
//         let height = this.#element.offsetHeight;
//         return [(ev.pageX - this.#startX) / width, (ev.pageY - this.#startY) / height];
//     }

//     // isOutOfElement(ev: MouseEvent): boolean {
//     //     return this.#element.offsetTop + this.#threshold > ev.pageY ||
//     //         this.#element.offsetTop + this.#element.offsetHeight - this.#threshold < ev.pageY ||
//     //         this.#element.offsetLeft + this.#threshold > ev.pageX ||
//     //         this.#element.offsetLeft + this.#element.offsetWidth - this.#threshold < ev.pageX
//     // }
// }

// export class TouchMoveListener implements IMoveListener {
//     #element: HTMLElement;
//     #callback: OnMoveCallback;
//     #startX: number;
//     #startY: number;
//     #prevX: number;
//     #prevY: number;
//     #isTracking: boolean;
//     #threshold: number;
//     #trackOutside: boolean;

//     constructor(element: HTMLElement, trackOutside: boolean = true) {
//         this.#element = element;
//         this.#startX = -1;
//         this.#startY = -1;
//         this.#prevX = -1;
//         this.#prevY = -1;
//         this.#isTracking = false;
//         this.#threshold = 10;
//         this.#trackOutside = trackOutside;
//     }

//     start() {
//         this.#element.addEventListener("touchstart", this.onTouchStart.bind(this))
//         this.#element.addEventListener("touchmove", this.onTouchMove.bind(this))
//         this.#element.addEventListener("touchend", this.onTouchEnd.bind(this))
//     }

//     stop() {
//         this.#element.removeEventListener("touchstart", this.onTouchStart.bind(this))
//         this.#element.removeEventListener("touchmove", this.onTouchMove.bind(this))
//         this.#element.removeEventListener("touchend", this.onTouchEnd.bind(this))
//     }
//     onMove(data: OnMoveCallback): void {
//         this.#callback = data;
//     }

//     onTouchStart(ev: TouchEvent) {
//         if (this.#isTracking) {
//             return;
//         }
//         const touch = ev.changedTouches[0];
//         if (touch) {
//             this.#isTracking = true;
//             this.#startX = touch.pageX;
//             this.#startY = touch.pageY;
//             this.#prevX = touch.pageX;
//             this.#prevY = touch.pageY;
//             this.emit(touch, ev, "down");
//         }

//     }

//     onTouchMove(ev: TouchEvent) {
//         if (!this.#isTracking) {
//             return;
//         }
//         const touch = ev.changedTouches[0];
//         if (touch) {
//             if (this.#trackOutside && this.isOutOfElement(touch)) {
//                 this.onTouchEnd(ev);
//                 return;
//             }
//             this.emit(touch, ev, "move");
//             this.#prevX = touch.pageX;
//             this.#prevY = touch.pageY;
//         }

//     }

//     onTouchEnd(ev: TouchEvent) {
//         if (!this.#isTracking) {
//             return;
//         }
//         this.#isTracking = false;
//         const touch = ev.changedTouches[0];
//         this.emit(touch, ev, "up");
//         this.#startX = -1;
//         this.#startY = -1;
//     }

//     emit(ev: Touch, base: TouchEvent, type: CuiMoveEventState) {
//         if (!ev) {
//             return;
//         }
//         if (base.cancelable) {
//             base.preventDefault();
//         }
//         const [ratioX, ratioY] = this.getRatio(ev);
//         let data: ICuiMoveEvent = {
//             source: "touch",
//             event: base,
//             target: ev.target,
//             type: type,
//             x: ev.pageX,
//             y: ev.pageY,
//             moveX: ev.pageX - this.#prevX,
//             moveY: ev.pageY - this.#prevY,
//             ratioX: ratioX,
//             ratioY: ratioY
//         }
//         this.#callback(data);
//     }

//     getRatio(ev: Touch): [number, number] {
//         let width = this.#element.offsetWidth;
//         let height = this.#element.offsetHeight;
//         return [(ev.pageX - this.#startX) / width, (ev.pageY - this.#startY) / height];
//     }

//     isOutOfElement(ev: Touch): boolean {
//         return this.#element.offsetTop + this.#threshold > ev.pageY ||
//             this.#element.offsetTop + this.#element.offsetHeight - this.#threshold < ev.pageY ||
//             this.#element.offsetLeft + this.#threshold > ev.pageX ||
//             this.#element.offsetLeft + this.#element.offsetWidth - this.#threshold < ev.pageX
//     }
// }