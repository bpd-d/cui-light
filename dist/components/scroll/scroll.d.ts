import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
export declare class CuiScrollComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string;
    get(element: HTMLElement, utils: CuiUtils): ICuiMutationHandler;
}
export interface CuiScrollAttribute {
    target?: string;
    parent?: string;
    behavior?: 'auto' | 'smooth';
}
export declare class CuiScrollHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string);
    handle(): void;
    refresh(): void;
    destroy(): void;
    onClick(ev: MouseEvent): void;
    private parseArguments;
}
