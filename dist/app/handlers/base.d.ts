import { ICuiLogger, CuiContext } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
export declare class CuiHandlerBase implements CuiContext {
    _log: ICuiLogger;
    utils: CuiUtils;
    element: Element;
    cuid: string;
    constructor(componentName: string, element: Element, utils: CuiUtils);
    mutate(callback: any, ...args: any[]): void;
    fetch(callback: any, ...args: any[]): void;
    getEventName(name: string): string;
    emitEvent(event: string, ...data: any[]): void;
    onEvent(event: string, callback: any): void;
    getId(): string;
}
