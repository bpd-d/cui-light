import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { getSystemPrintMode } from "../../core/utlis/functions";
import { CuiMediaQueryListener } from "../../core/listeners/media";

export interface AutoPrintPluginSetup {
    autoPrint: boolean;
}

export class CuiAutoPrintModePlugin implements ICuiPlugin {
    description: string = 'Auto print mode';
    name: string = 'auto-print';
    setup: AutoPrintPluginSetup;
    #listener: CuiMediaQueryListener;
    #utils: CuiUtils;
    constructor(autoPrintInit: AutoPrintPluginSetup) {
        this.description = "CuiAutoPrintModePlugin";
        this.setup = autoPrintInit;
    }

    init(utils: CuiUtils): void {
        this.#utils = utils
        if (this.setup.autoPrint && getSystemPrintMode()) {
            this.#utils.setPrintMode(true)
        }
        this.#listener = new CuiMediaQueryListener('print')
        this.#listener.setCallback(this.onChange.bind(this))
        this.#listener.attach();
    }

    destroy(): void {
        this.#listener.detach();
    }

    onChange(ev: MediaQueryListEvent) {
        this.setup = this.#utils.setup.plugins[this.description] as AutoPrintPluginSetup;
        let autoPrint = this.setup?.autoPrint ?? false;
        if (autoPrint) {
            console.log(ev.matches)
            if (ev.matches) {
                this.#utils.setPrintMode(true)
            } else {
                this.#utils.setPrintMode(false)
            }
        }
    }

}