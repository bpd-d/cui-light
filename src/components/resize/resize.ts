import { ICuiComponent, ICuiMutationHandler, CuiContext, ICuiEventBus } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ICuiResizable, CuiResizeData } from "../../app/observers/resize";
import { generateCUID } from "../../core/utlis/functions";
import { EVENTS } from "../../core/utlis/statics";

export class CuiResizeComponent implements ICuiComponent {
    attribute: string;
    constructor() {
        this.attribute = 'cui-resize';
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiMutationHandler {
        return new CuiResizeHandler(element, utils, this.attribute);
    }
}

export class CuiResizeHandler extends CuiHandlerBase implements ICuiMutationHandler, CuiContext {

    #attribute: string;
    #bus: ICuiEventBus;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiResizeHandler", element, utils);
        this.#attribute = attribute
        this.#bus = utils.bus;
    }


    handle(): void {
        //   this._log.debug(this.#element.getAttribute(this.#attribute));
        this.#bus.on(EVENTS.ON_RESIZE, this.resize, this);
    }

    refresh(): void {
        // console.log(this.#element.getAttribute(this.#attribute));
    }

    destroy(): void {
        this.#bus.detach(EVENTS.ON_RESIZE, this);
    }

    resize(data: CuiResizeData) {
        console.log(data);
    }

    getId(): string {
        return generateCUID(this.#attribute);
    }
}