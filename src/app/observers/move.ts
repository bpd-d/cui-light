import { EVENTS, ICuiEventBus } from "../../core/index";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";

export class CuiMoveObserver {
    #bus: ICuiEventBus;
    #moveListener: CuiMoveEventListener;
    #stack: ICuiMoveEvent[];
    #isLocked: boolean;
    #eventId: string;
    constructor(bus: ICuiEventBus) {
        this.#bus = bus;
        this.#moveListener = new CuiMoveEventListener();
        this.#moveListener.setCallback(this.onMove.bind(this));
        this.#stack = [];
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
        if (!this.#isLocked)
            this.#bus.emit(EVENTS.GLOBAL_MOVE, null, data);

    }

    private onMoveLock(flag: boolean) {
        this.#isLocked = flag;
    }
}