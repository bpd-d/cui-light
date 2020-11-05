import { are, is } from "./functions";

export interface ICuiTask {
    start(): void;
    stop(): void;
    getId(): any;
    setCallback(callback: () => void): void;
    setTimeout(timeout: number): void;
}

export class CuiTaskRunner implements ICuiTask {
    #taskId: any;
    #autoRenew: boolean;
    #timeout: number;
    #callback: () => void;

    constructor(timeout: number, autoRenew: boolean, callback?: () => void) {
        this.#autoRenew = autoRenew;
        this.#timeout = timeout;
        this.#callback = callback;
    }
    start(): void {
        if (!this.canRun()) {
            return;
        }
        this.stop();
        this.#taskId = setTimeout(() => {
            this.#callback();
            this.#taskId = null;
            if (this.#autoRenew) {
                this.start();
            }
        }, this.#timeout);
    }

    stop(): void {
        if (this.#taskId) {
            clearTimeout(this.#taskId);
            this.#taskId = null
        }
    }

    getId() {
        return this.#taskId;
    }

    private canRun(): boolean {
        return is(this.#callback) && this.#timeout > 0;
    }

    setCallback(callback: () => void) {
        this.#callback = callback;
    }

    setTimeout(timeout: number) {
        this.#timeout = timeout;
    }

}