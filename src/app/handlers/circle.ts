import { ICuiMutationHandler, IUIInteractionProvider } from "../../core/models/interfaces";
import { is, getRangeValue } from "../../core/utlis/functions";
import { IconBuilder } from "./icon";
import { ICONS, ATTRIBUTES } from "../../core/utlis/statics";
import { CuiHandlerBase } from "./base";

export class CuiCircleHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #element: Element;
    #isInitialized: boolean;
    #factor: number;
    #full: number;
    #path: any;
    #prevValue: number;
    constructor(element: Element, interactions?: IUIInteractionProvider) {
        super("CuiCircleHandler", interactions);
        this.#element = element;
        this.#factor = this.#full = 0;
        this.#path = null
        this.#prevValue = -1
    }

    handle(): void {
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
        // const value = this.#element.hasAttribute(ATTRIBUTES.circle) ? parseInt(this.#element.getAttribute(ATTRIBUTES.circle)) : 0;
        // if (value === this.#prevValue) {
        //     return;
        // }
        // this.#prevValue = value;
        // const progress = getRangeValue(value, 0, 100);

        // this.mutate(this.updateStyle, this.#full - this.#factor * progress);
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