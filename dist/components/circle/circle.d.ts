import { ICuiComponent, ICuiMutationHandler, CuiObservables } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
export declare class CuiCircleComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor();
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiCircleHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string);
    observables(): CuiObservables;
    handle(): void;
    refresh(): void;
    destroy(): void;
    private updateStyle;
    private readStyle;
}
