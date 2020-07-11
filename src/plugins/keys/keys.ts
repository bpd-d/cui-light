import { ICuiPlugin } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { ICuiKeysObserver, CuiKeysObserver } from "./observer";


export interface CuiKeysObserverPluginSetup {
    autoPrint: boolean;
}

export class CuiKeysObserverPlugin implements ICuiPlugin {
    description: string;
    name: string = 'keys-observer';
    setup: CuiKeysObserverPluginSetup;
    #keysObserver: ICuiKeysObserver;
    constructor(keySetup: CuiKeysObserverPluginSetup) {
        this.description = "CuiKeysObserverPlugin";
        this.setup = keySetup;
    }

    init(utils: CuiUtils): void {
        this.#keysObserver = new CuiKeysObserver(utils.bus);
        this.#keysObserver.connect();
    }

    destroy(): void {
        this.#keysObserver.disconnect();
    }
}