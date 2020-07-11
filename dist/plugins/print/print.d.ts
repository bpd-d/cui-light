import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export interface AutoPrintPluginSetup {
    autoPrint: boolean;
}
export declare class CuiAutoPrintModePlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: AutoPrintPluginSetup;
    constructor(autoPrintInit: AutoPrintPluginSetup);
    init(utils: CuiUtils): void;
    destroy(): void;
    onChange(ev: MediaQueryListEvent): void;
}
