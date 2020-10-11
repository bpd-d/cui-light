import { ICuiComponent, ICuiComponentHandler, CuiObservables, CuiContext, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler } from "../../app/handlers/base";
import { is, getRangeValue, isString, getIntOrDefault } from "../../core/utils/functions";
import { IconBuilder } from "../icon/icon";
import { ICONS, EVENTS } from "../../core/utils/statics";

export interface CuiCircleProgressChnaged {
    timestamp: number;
    progress: number;
}

export class CuiCircleArgs implements ICuiParsable {
    progress: number;
    constructor() {
        this.progress = 0;
    }

    parse(val: any): void {
        if (!is(val)) {
            this.progress = 0;
        }
        else if (isString(val)) {
            this.progress = getIntOrDefault(val, 0);
        } else {
            this.progress = getIntOrDefault(val.progress, 0);
        }

    }

}

export class CuiCircleComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = (prefix ?? 'cui') + '-circle-progress';
        ICONS['special_circle_progress'] = "<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"circle-progress\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-progress-path\" d=\"M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047\"></path></svg>";
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiCircleHandler(element, utils, this.attribute);
    }
}

export class CuiCircleHandler extends CuiHandler<CuiCircleArgs> {
    #factor: number;
    #full: number;
    #path: any;
    #attr: string;
    #progressEventId: string;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiCircleHandler", element, attribute, new CuiCircleArgs(), utils);
        this.#factor = this.#full = 0;
        this.#path = null
        this.#attr = attribute;
        this.#progressEventId = null;
    }

    onInit(): void {
        const iconSvg = new IconBuilder(ICONS['special_circle_progress']).build();
        const svg = this.element.querySelector('svg')
        if (is(svg)) {
            svg.remove();
        }
        this.element.appendChild(iconSvg);
        this.#path = this.element.querySelector('.circle-progress-path');
        this.#full = this.#path.getTotalLength();
        this.#factor = this.#full / 100;
        this.fetch(this.readStyle)
        this.#progressEventId = this.onEvent(EVENTS.PROGRESS_CHANGE, this.onSetProgress.bind(this))
    }

    onUpdate(): void {
        this.fetch(this.readStyle)
        this.emitEvent(EVENTS.PROGRESS_CHANGED, {
            timestamp: Date.now(),
            progress: this.args.progress
        })
    }

    onDestroy(): void {
        this.detachEvent(EVENTS.PROGRESS_CHANGE, this.#progressEventId);
    }

    onSetProgress(val: any) {
        if (is(val)) {
            this.element.setAttribute(this.#attr, val);
        }
    }

    private updateStyle(value: number) {
        this.#path.style.strokeDashoffset = value;
    }

    private readStyle(): void {
        if (this.prevArgs && this.args.progress === this.prevArgs.progress) {
            return;
        }
        const progress = getRangeValue(this.args.progress, 0, 100);

        this.mutate(this.updateStyle, this.#full - this.#factor * progress);
    }

}