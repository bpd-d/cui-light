import { ICuiEventListener } from "../models/interfaces";
import { is } from "../utlis/functions";

export class CuiKeyPressListener implements ICuiEventListener<KeyboardEvent> {
    #callback: (t: KeyboardEvent) => void;
    #keys: string[];
    #inProgress: boolean;
    #singleEmit: boolean;
    constructor(singleEmit: boolean, keys?: string[]) {
        this.#keys = keys;
        this.#inProgress = false;
        this.#singleEmit = true;
    }

    setCallback(callback: (t: KeyboardEvent) => void): void {
        this.#callback = callback;
    }

    isInProgress(): boolean {
        return this.#inProgress;
    }

    attach(): void {
        document.addEventListener('keydown', this.onKeyDown.bind(this))
        if (this.#singleEmit) {
            document.addEventListener('keyup', this.onKeyUp.bind(this))
        }
    }

    detach(): void {
        document.removeEventListener('keydown', this.onKeyDown.bind(this))
        if (this.#singleEmit) {
            document.addEventListener('keyup', this.onKeyUp.bind(this))
        }
    }

    onKeyDown(ev: KeyboardEvent) {
        if (this.#inProgress) {
            return;
        }
        this.#inProgress = true;
        try {
            if (!is(this.#keys) || this.#keys.includes(ev.code)) {
                this.#callback(ev);
            }

        } catch (e) {
            console.error(e)
        } finally {
            if (!this.#singleEmit)
                this.#inProgress = false;
        }
    }

    onKeyUp(ev: KeyboardEvent) {
        this.#inProgress = false;
    }
}