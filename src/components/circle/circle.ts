import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandlerBase } from "../../app/handlers/base";
import { is, getRangeValue } from "../../core/utlis/functions";
import { IconBuilder } from "../icon/icon";
import { ICONS, ATTRIBUTES } from "../../core/utlis/statics";

export class CuiCircleComponent implements ICuiComponent {
    attribute: string;
    #iconStr: string;
    constructor() {
        this.attribute = 'circle-progress';
        ICONS['special_circle_progress'] = "<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"circle-progress\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-progress-path\" d=\"M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047\"></path></svg>";
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiMutationHandler {
        return new CuiCircleHandler(element, utils);
    }
}

export class CuiCircleHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #element: Element;
    #isInitialized: boolean;
    #factor: number;
    #full: number;
    #path: any;
    #prevValue: number;
    #iconStr: string;
    constructor(element: Element, utils: CuiUtils) {
        super("CuiCircleHandler", utils);
        this.#element = element;
        this.#factor = this.#full = 0;
        this.#path = null
        this.#prevValue = -1
    }

    handle(): void {
        console.log('circle');
        if (!is(this.#isInitialized)) {
            const iconSvg = new IconBuilder(ICONS['special_circle_progress']).build();
            const svg = this.#element.querySelector('svg')
            if (is(svg)) {
                svg.remove();
            }
            this.#element.appendChild(iconSvg);
            this.#path = this.#element.querySelector('.circle-progress-path');
            this.#full = this.#path.getTotalLength();
            this.#factor = this.#full / 100;
            this.#isInitialized = true;
        }
        this.fetch(this.readStyle)
    }

    refresh(): void {
        throw new Error("Method not implemented.");
    }

    private updateStyle(value: number) {
        console.log('Write progress')
        this.#path.style.strokeDashoffset = value;
    }

    private readStyle(): void {
        console.log('Read progress')
        const value = this.#element.hasAttribute(ATTRIBUTES.circle) ? parseInt(this.#element.getAttribute(ATTRIBUTES.circle)) : 0;
        if (value === this.#prevValue) {
            return;
        }
        this.#prevValue = value;
        const progress = getRangeValue(value, 0, 100);

        this.mutate(this.updateStyle, this.#full - this.#factor * progress);
    }

}