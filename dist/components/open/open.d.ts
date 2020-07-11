import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ICuiComponentAction } from "../../core/utlis/actions";
export declare class CuiOpenArgs {
    target: string;
    action: ICuiComponentAction;
    timeout: number;
    constructor();
    parse(args: any): void;
    isValid(): boolean;
}
export declare class CuiOpenComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiOpenHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string);
    handle(): void;
    refresh(): void;
    destroy(): void;
    onClick(ev: MouseEvent): void;
    emitOpen(ev: MouseEvent): void;
}
