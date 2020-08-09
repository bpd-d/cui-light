import { ICuiComponent, ICuiComponentHandler, CuiContext, ICuiEventBus } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase } from "../../app/handlers/base";
import { ICuiResizable, CuiResizeData } from "../../app/observers/resize";
import { generateCUID } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";

export class CuiResizeComponent implements ICuiComponent {
    attribute: string;
    constructor() {
        this.attribute = 'cui-resize';
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiResizeHandler(element, utils, this.attribute);
    }
}

export class CuiResizeHandler extends CuiComponentBase implements ICuiComponentHandler, CuiContext {

    #attribute: string;
    #bus: ICuiEventBus;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiResizeHandler", element, utils);
        this.#attribute = attribute
        this.#bus = utils.bus;
    }


    handle(args: any): void {
        //   this._log.debug(this.#element.getAttribute(this.#attribute));
        this.#bus.on(EVENTS.RESIZE, this.resize, this);
    }

    refresh(args: any): void {
        // console.log(this.#element.getAttribute(this.#attribute));
    }

    destroy(): void {
        this.#bus.detach(EVENTS.RESIZE, this);
    }

    resize(data: CuiResizeData) {
        console.log(data);
    }
}