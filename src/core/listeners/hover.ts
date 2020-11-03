import { ICuiEventListener } from "../models/interfaces";
import { are } from "../utils/functions";

export interface CuiHoverEvent {
    isHovering: boolean;
    event: MouseEvent;
    timestamp: number;
}
export class CuiHoverListener implements ICuiEventListener<CuiHoverEvent> {
    #target: Element;
    #callback: (t: CuiHoverEvent) => void = null;
    #inProgress: boolean;
    #isHovering: boolean;
    #isAttached: boolean;
    constructor(target: Element) {
        this.#target = target;
        this.#inProgress = false;
        this.#isHovering = false;
    }

    setCallback(callback: (t: CuiHoverEvent) => void): void {
        this.#callback = callback;
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }
    attach(): void {
        this.#target.addEventListener("mouseover", this.onMouseOver.bind(this));
        this.#target.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.#target.addEventListener("mouseout", this.onMouseOut.bind(this));
        this.#isAttached = true;
    }

    detach(): void {
        this.#target.removeEventListener("mouseover", this.onMouseOver.bind(this));
        this.#target.removeEventListener("mousemove", this.onMouseMove.bind(this));
        this.#target.removeEventListener("mouseout", this.onMouseOut.bind(this));
        this.#isAttached = false;
    }

    private emit(mouseEvent: MouseEvent, force: boolean) {
        if (!are(this.#callback)) {
            return;
        }
        if (!force && this.#inProgress) {
            return;
        }
        this.#inProgress = true;
        window.requestAnimationFrame(this.invoke.bind(this, {
            isHovering: this.#isHovering,
            event: mouseEvent,
            timestamp: Date.now()
        }))
    }

    isAttached() {
        return this.#isAttached;
    }
    private invoke(ev: CuiHoverEvent) {
        this.#callback(ev);
        this.#inProgress = false;
    }

    private onMouseOver(ev: MouseEvent) {
        this.#isHovering = true;
        this.emit(ev, true);
    }

    private onMouseOut(ev: MouseEvent) {
        this.#isHovering = false;
        this.emit(ev, true);
    }

    private onMouseMove(ev: MouseEvent) {
        this.emit(ev, false);
    }
}