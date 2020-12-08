import { CuiInitData, CuiInitResult } from "cui-light-core/dist/esm/models/interfaces";
export declare class CuiInitializer {
    #private;
    constructor();
    init(setup: CuiInitData): Promise<CuiInitResult>;
}
