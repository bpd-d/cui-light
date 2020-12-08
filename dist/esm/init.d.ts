import { CuiInitData } from "cui-light-core/dist/esm/models/interfaces";
export declare class CuiInit {
    #private;
    constructor();
    init(data: CuiInitData): Promise<boolean>;
}
