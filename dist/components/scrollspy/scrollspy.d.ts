import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ICuiComponentAction } from "../../core/utlis/actions";
export interface CuiScrollSpyAttribute {
    selector?: string;
    action?: string;
    link?: string;
    linkAction: string;
    offset: number;
}
export declare class CuiScrollSpyArgs {
    selector: string;
    action: ICuiComponentAction;
    link?: string;
    linkAction?: ICuiComponentAction;
    offset?: number;
    constructor();
    parse(args: any): void;
}
export declare class CuiScrollspyComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string);
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiScrollspyHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string);
    handle(): void;
    refresh(): void;
    destroy(): void;
    private onScroll;
    private parseAttribute;
    private calculateCurrent;
    private calculateCurrentLeft;
    /**
     * Performs action on current, new target and on links if there are any.
     * Returns new target element or null if index is out of range
     *
     * @param idx - new target index
     * @returns New target item
     */
    private setCurrent;
}
