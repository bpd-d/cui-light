import { CuiSetupInit } from "../core/models/setup";
import { CuiInitData, CuiInitResult } from "../core/models/interfaces";
export declare class CuiInitializer {
    #private;
    constructor();
    init(setup: CuiInitData): Promise<CuiInitResult>;
}
export declare class CuiInit {
    #private;
    constructor();
    init(setup: CuiSetupInit, icons: any): Promise<boolean>;
}
