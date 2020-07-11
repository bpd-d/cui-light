import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ICuiComponentAction } from "../../core/utlis/actions";
export declare class CuiIntersectionAttributes {
    target: string;
    action: ICuiComponentAction;
    offset: number;
    constructor();
    parse(args: any): void;
}
export declare class CuiIntersectionComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiIntersectionHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string);
    handle(): void;
    refresh(): void;
    destroy(): void;
    parseArguments(prev: CuiIntersectionAttributes): void;
    onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    getAction(element: Element): ICuiComponentAction;
    emitIntersection(entry: IntersectionObserverEntry): void;
}
