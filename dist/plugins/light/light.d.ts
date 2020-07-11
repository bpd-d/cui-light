import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export interface AutoLightPluginSetup {
    autoLight: boolean;
}
export declare class CuiAutoLightModePlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: AutoLightPluginSetup;
    constructor(autoLightInit: AutoLightPluginSetup);
    init(utils: CuiUtils): void;
    destroy(): void;
    onChange(ev: MediaQueryListEvent): void;
}
