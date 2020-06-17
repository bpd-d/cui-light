import { ICuiLogger, IUIInteractionProvider } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is } from "../../core/utlis/functions";
import { CuiUtils } from "../../core/models/utils";

export class CuiHandlerBase {
    _log: ICuiLogger;
    utils: CuiUtils;
    constructor(componentName: string, utils: CuiUtils) {
        this._log = CuiLoggerFactory.get(componentName);
        this.utils = utils;
    }

    mutate(callback: any, ...args: any[]): void {
        this.utils.interactions.mutate(callback, this, ...args)
    }

    fetch(callback: any, ...args: any[]): void {
        this.utils.interactions.fetch(callback, this, ...args)
    }


}