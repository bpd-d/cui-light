import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ICuiComponentAction } from "../../core/utlis/actions";
export declare class CuiToggleArgs {
    target: string;
    action: ICuiComponentAction;
    constructor();
    parse(args: any): void;
}
export declare class CuiToggleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiToggleHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string);
    handle(): void;
    refresh(): void;
    destroy(): void;
    onClick(ev: MouseEvent): void;
    getTarget(): Element;
}
