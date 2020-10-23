import { EVENTS, ICuiEventBus } from "../../core/index";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";

export class CuiMoveObserver {
    #bus: ICuiEventBus;
    #moveListener: CuiMoveEventListener;
    #isLocked: boolean;
    #eventId: string;
    #firstEvent: ICuiMoveEvent;
    constructor(bus: ICuiEventBus) {
        this.#bus = bus;
        this.#moveListener = new CuiMoveEventListener();
        this.#moveListener.setCallback(this.onMove.bind(this));
        this.#firstEvent = null;
    }

    attach() {
        if (!this.#moveListener.isAttached()) {
            this.#moveListener.attach();
            this.#eventId = this.#bus.on(EVENTS.MOVE_LOCK, this.onMoveLock.bind(this))
        }
    }

    detach() {
        if (this.#moveListener.isAttached()) {
            this.#moveListener.detach();
            this.#eventId && this.#bus.detach(EVENTS.MOVE_LOCK, this.#eventId);
        }

    }

    isAttached() {
        return this.#moveListener.isAttached();
    }

    private onMove(data: ICuiMoveEvent) {
        if (this.#isLocked) {
            return;
        }
        switch (data.type) {
            case "down":
                this.#firstEvent = data;
                break;
            case "move":
                if (this.#firstEvent) {
                    this.#bus.emit(EVENTS.GLOBAL_MOVE, null, this.#firstEvent);
                    this.#firstEvent = null;
                }
                this.#bus.emit(EVENTS.GLOBAL_MOVE, null, data);
                break;
            case "up":
                if (this.#firstEvent) {
                    this.#firstEvent = null;
                    return;
                }

                this.#bus.emit(EVENTS.GLOBAL_MOVE, null, data);
                break;
        }





    }

    private onMoveLock(flag: boolean) {
        this.#isLocked = flag;
    }
}