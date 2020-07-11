import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { getSystemLightMode } from "../../core/utlis/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";

export interface AutoLightPluginSetup {
    autoLight: boolean;
}

export class CuiAutoLightModePlugin implements ICuiPlugin {
    description: string = 'Dark vs Light mode auto switcher';
    name: string = 'auto-light';
    setup: AutoLightPluginSetup;
    #listener: CuiMediaQueryListener;
    #utils: CuiUtils;
    constructor(autoLightInit: AutoLightPluginSetup) {
        this.description = "CuiAutoLightModePlugin";
        this.setup = autoLightInit;
    }

    init(utils: CuiUtils): void {
        this.#utils = utils
        if (this.setup.autoLight && getSystemLightMode() === 'dark') {
            this.#utils.setLightMode('dark')
        }
        this.#listener = new CuiMediaQueryListener('(prefers-color-scheme: dark)')
        this.#listener.setCallback(this.onChange.bind(this))
        this.#listener.attach();
    }

    destroy(): void {
        this.#listener.detach();
    }

    onChange(ev: MediaQueryListEvent) {
        let autoLightSetup = this.#utils.setup.plugins[this.description] as AutoLightPluginSetup;
        let autoLight = autoLightSetup?.autoLight ?? false;
        if (autoLight) {
            if (ev.matches) {
                this.#utils.setLightMode('dark')
            } else {
                this.#utils.setLightMode('light')
            }
        }
    }

}