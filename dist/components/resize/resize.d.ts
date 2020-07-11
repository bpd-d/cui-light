import { ICuiComponent, ICuiMutationHandler, CuiContext } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { CuiResizeData } from "../../app/observers/resize";
export declare class CuiResizeComponent implements ICuiComponent {
    attribute: string;
    constructor();
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiResizeHandler extends CuiHandlerBase implements ICuiMutationHandler, CuiContext {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string);
    handle(): void;
    refresh(): void;
    destroy(): void;
    resize(data: CuiResizeData): void;
    getId(): string;
}
