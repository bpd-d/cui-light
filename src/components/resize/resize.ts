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

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiResizeHandler(element, utils, this.attribute);
    }
}

export class CuiResizeHandler extends CuiHandler<CuiResizeArgs> {
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiResizeHandler", element, attribute, new CuiResizeArgs(), utils);
    }

    onInit(): void {
        this.utils.bus.on(EVENTS.RESIZE, this.resize, this);
    }
    onUpdate(): void {

    }
    onDestroy(): void {
        this.utils.bus.detach(EVENTS.RESIZE, this);
    }

    resize(data: CuiResizeData) {
        console.log(data);
    }
}