import { ICuiLogger } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiHandlerBase {
    _log: ICuiLogger;
    utils: CuiUtils;
    constructor(componentName: string, utils: CuiUtils);
    mutate(callback: any, ...args: any[]): void;
    fetch(callback: any, ...args: any[]): void;
}
