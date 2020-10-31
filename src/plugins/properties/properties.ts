import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiPropertiesHandler } from "./handler";

export interface CuiCSSVariablesPluginSetup {

}

export class CuiCSSVariablesPlugin implements ICuiPlugin {
    description: string;
    name: string = 'css-variables-plugin';
    setup: CuiCSSVariablesPluginSetup;
    handler: CuiPropertiesHandler;
    constructor(keySetup: CuiCSSVariablesPluginSetup) {
        this.description = "CuiCSSVariablesPlugin";
        this.setup = keySetup;
    }

    init(utils: CuiUtils): void {
        this.handler = new CuiPropertiesHandler(utils);
    }

    destroy(): void {

    }
}
