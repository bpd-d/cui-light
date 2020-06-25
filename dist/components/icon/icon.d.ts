import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
export declare class CuiIconComponent implements ICuiComponent {
    attribute: string;
    constructor();
    getStyle(): string;
    get(element: Element, utils: CuiUtils): ICuiMutationHandler;
}
export declare class CuiIconHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #private;
    constructor(element: Element, utils: CuiUtils, attribute: string);
    handle(): void;
    refresh(): void;
    private insertBefore;
    private appendChild;
}
export declare class IconBuilder {
    #private;
    constructor(svgString: string);
    setStyle(style: string): IconBuilder;
    setScale(scale: number): IconBuilder;
    build(): Element;
}
export declare class IconScaleAppender {
    append(element: Element, value: number): void;
}
