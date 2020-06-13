import { ICuiPlugin } from "../../../core/models/interfaces";
import { CuiUtils } from "../../../core/models/utils";
import { LightModeListener } from "./listener";
import { getSystemLightMode } from "../../../core/utlis/functions";

export interface AutoLightPluginSetup {
    autoLight: boolean;
}

export class CuiAutoLightModePlugin implements ICuiPlugin {
    description: string;
    setup: AutoLightPluginSetup;
    #listener: LightModeListener;
    constructor(autoLightInit: AutoLightPluginSetup) {
        this.description = "CuiAutoLightModePlugin";
        this.setup = autoLightInit;
    }

    init(utils: CuiUtils): void {
        if (this.setup.autoLight && getSystemLightMode() === 'dark') {
            utils.setLightMode('dark')
        }
        this.#listener = new LightModeListener(utils, this.description);
        this.#listener.start();
        console.log("Auto light initiated")
    }

    async mutation(record: MutationRecord): Promise<boolean> {
        // Plugin doesn't use this functionality;
        return true;
    }

    destroy(): void {
        this.#listener.stop();
    }

}