import { CuiUtils, EVENTS, ICuiEventBus } from "../../core/index";
import { CuiMoveEventListener, ICuiMoveEvent } from "../../core/listeners/move";

export class CuiMoveObserver {
    #bus: ICuiEventBus;
    #moveListener: CuiMoveEventListener;
    #stack: ICuiMoveEvent[];
    #isLocked: boolean;
    constructor(bus: ICuiEventBus) {
        this.#bus = bus;
        this.#moveListener = new CuiMoveEventListener();
        this.#moveListener.setCallback(this.onMove.bind(this));
        this.#stack = [];
    }

    attach() {
        if (!this.#moveListener.isAttached())
            this.#moveListener.attach();
    }

    detach() {
        if (this.#moveListener.isAttached())
            this.#moveListener.detach();
    }

    isAttached() {
        return this.#moveListener.isAttached();
    }

    private onMove(data: ICuiMoveEvent) {
        // this.#stack.push(data);
        // this.handle();
        this.#bus.emit(EVENTS.GLOBAL_MOVE, null, data);

    }

    private handle() {
        if (this.#isLocked) {
            return;
        }
        this.#isLocked = true;
        if (this.#stack.length === 0) {
            this.#isLocked = false;
        } else {
            this.#bus.emit(EVENTS.GLOBAL_MOVE, null, this.#stack.shift()).catch((e) => {
                console.error(e);
            }).finally(() => {
                this.#isLocked = false;
                this.handle();
            });
        }
    }
}