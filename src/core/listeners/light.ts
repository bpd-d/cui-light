import { CuiInstance } from "../../app/instance";

export class LightModeListener {
    #instance: CuiInstance;
    #isInitialized: boolean;
    constructor(instance: CuiInstance) {
        this.#instance = instance;
        this.#isInitialized = false;
    }

    start(): boolean {
        if (!window.matchMedia || this.#isInitialized) {
            return false;
        }
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', this.event.bind(this))
        this.#isInitialized = true
        return true
    }

    stop(): boolean {
        if (this.#isInitialized) {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.event.bind(this));
            this.#isInitialized = false
            return true
        }
        return false;
    }

    private event(ev: MediaQueryListEvent): void {
        if (this.#instance.autoLightMode) {
            if (ev.matches) {
                this.#instance.setLightMode('dark')
            } else {
                this.#instance.setLightMode('light')
            }
        }
    }

}