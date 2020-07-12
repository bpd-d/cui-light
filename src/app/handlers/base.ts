import { ICuiLogger, IUIInteractionProvider, CuiElement, CuiContext } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is } from "../../core/utils/functions";
import { CuiUtils } from "../../core/models/utils";

export class CuiHandlerBase implements CuiContext {
    _log: ICuiLogger;
    utils: CuiUtils;
    element: Element;
    cuid: string
    constructor(componentName: string, element: Element, utils: CuiUtils) {
        this._log = CuiLoggerFactory.get(componentName);
        this.utils = utils;
        this.element = element;
        this.cuid = (<any>element).$cuid;
    }


    mutate(callback: any, ...args: any[]): void {
        this.utils.interactions.mutate(callback, this, ...args)
    }

    fetch(callback: any, ...args: any[]): void {
        this.utils.interactions.fetch(callback, this, ...args)
    }

    getEventName(name: string) {
        return [name, this.cuid].join('-');
    }

    emitEvent(event: string, ...data: any[]) {
        this.utils.bus.emit(event, this.cuid, ...data)
    }

    onEvent(event: string, callback: any) {
        this.utils.bus.on(event, callback, this)
    }

    getId(): string {
        return this.cuid;
    }
}