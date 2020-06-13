import { CuiUtils } from "../../../core/models/utils";
import { AutoLightPluginSetup } from "./light";

export class LightModeListener {
    #utils: CuiUtils;
    #isInitialized: boolean;
    #descriptor: string;
    constructor(utils: CuiUtils, descriptor: string) {
        this.#utils = utils;
        this.#descriptor = descriptor;
        this.#isInitialized = false;
    }

    start(): boolean {
        if (!window.matchMedia || this.#isInitialized) {
            return false;
        }
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', this.event.bind(this))
        this.#isInitialized = true
        console.log("Listener initiated")
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
        console.log("Event")
        let autoLightSetup = this.#utils.setup.plugins[this.#descriptor] as AutoLightPluginSetup;
        let autoLight = autoLightSetup?.autoLight ?? false;
        if (autoLight) {
            if (ev.matches) {
                console.log("dark")
                this.#utils.setLightMode('dark')
            } else {
                console.log("Light")
                this.#utils.setLightMode('light')
            }
        }
    }

}