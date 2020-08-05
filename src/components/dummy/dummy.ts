import { ICuiComponent, ICuiComponentHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";

export class CuiDummyComponent implements ICuiComponent {
    attribute: string;
    constructor() {
        this.attribute = 'cui-dummy';
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiDummyHandler(element, utils, this.attribute);
    }
}

export class CuiDummyHandler extends CuiHandlerBase implements ICuiComponentHandler {

    #attribute: string;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiDummyHandler", element, utils);

        this.#attribute = attribute
    }

    handle(args: any): void {

    }

    refresh(args: any): void {

    }

    destroy(): void {

    }
}