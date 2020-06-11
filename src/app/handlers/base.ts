import { ICuiLogger, IUIInteractionProvider } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is } from "../../core/utlis/functions";

export class CuiHandlerBase {
    _log: ICuiLogger;
    #interactions: IUIInteractionProvider;
    constructor(componentName: string, interactionsProvider: IUIInteractionProvider) {
        this._log = CuiLoggerFactory.get(componentName);
        this.#interactions = interactionsProvider;
    }

    mutate(callback: any, ...args: any[]): void {
        if (is(this.#interactions)) {
            this.#interactions.mutate(callback, this, ...args)
        } else {
            callback(...args);
        }
    }

    fetch(callback: any, ...args: any[]): void {
        if (is(this.#interactions)) {
            this.#interactions.fetch(callback, this, ...args)
        } else {
            callback(...args);
        }
    }


}