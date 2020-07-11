import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export interface CuiKeysObserverPluginSetup {
    autoPrint: boolean;
}
export declare class CuiKeysObserverPlugin implements ICuiPlugin {
    #private;
    description: string;
    name: string;
    setup: CuiKeysObserverPluginSetup;
    constructor(keySetup: CuiKeysObserverPluginSetup);
    init(utils: CuiUtils): void;
    destroy(): void;
}
