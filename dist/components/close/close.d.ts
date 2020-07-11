import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ICuiComponentAction } from "../../core/utlis/actions";
export declare class CuiCloseArgs {
    target: string;
    action: ICuiComponentAction;
    timeout: number;
    constructor();
    parse(args: any): void;
}
export declare class CuiCloseComponent implements ICuiComponent {
    #private;
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiCloseHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string);
    handle(): void;
    refresh(): void;
    destroy(): void;
    onClick(ev: MouseEvent): void;
    private getTarget;
    private emitClose;
}
