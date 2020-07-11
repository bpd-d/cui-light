import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
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

    get(element: Element, utils: CuiUtils): ICuiMutationHandler {
        return new CuiDummyHandler(element, utils, this.attribute);
    }
}

export class CuiDummyHandler extends CuiHandlerBase implements ICuiMutationHandler {

    #attribute: string;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiDummyHandler", element, utils);

        this.#attribute = attribute
    }

    handle(): void {

    }

    refresh(): void {

    }

    destroy(): void {

    }
}