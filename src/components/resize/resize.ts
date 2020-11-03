import { ICuiComponent, ICuiComponentHandler, CuiContext, ICuiEventBus, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler } from "../../app/handlers/base";
import { ICuiResizable, CuiResizeData } from "../../app/observers/resize";
import { generateCUID } from "../../core/utils/functions";
import { EVENTS } from "../../core/utils/statics";

export class CuiResizeArgs implements ICuiParsable {
    constructor() {

    }

    parse(args: any) {

    }
}

export class CuiResizeComponent implements ICuiComponent {
    attribute: string;
    constructor() {
        this.attribute = 'cui-resize';
    }

    getStyle(): string {
        return null;
    }

    get(element: HTMLElement, utils: CuiUtils): ICuiComponentHandler {
        return new CuiResizeHandler(element, utils, this.attribute);
    }
}

export class CuiResizeHandler extends CuiHandler<CuiResizeArgs> {
    #eventId: string;
    constructor(element: HTMLElement, utils: CuiUtils, attribute: string) {
        super("CuiResizeHandler", element, attribute, new CuiResizeArgs(), utils);
        this.#eventId = null;
    }

    onInit(): void {
        this.#eventId = this.utils.bus.on(EVENTS.RESIZE, this.resize.bind(this));
    }
    onUpdate(): void {

    }
    onDestroy(): void {
        if (this.#eventId !== null) {
            this.utils.bus.detach(EVENTS.RESIZE, this.#eventId);
            this.#eventId = null
        }
    }

    resize(data: CuiResizeData) {
        console.log(data);
    }
}