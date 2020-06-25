import { CuiUtils } from "../../core/models/utils";
export declare class LightModeListener {
    #private;
    constructor(utils: CuiUtils, descriptor: string);
    start(): boolean;
    stop(): boolean;
    private event;
}
