import { CuiInitData, CuiInitResult } from "../core/models/interfaces";
export declare class CuiInitializer {
    #private;
    constructor();
    init(setup: CuiInitData): Promise<CuiInitResult>;
}
export declare class CuiInit {
    #private;
    constructor();
    init(data: CuiInitData): Promise<boolean>;
}
