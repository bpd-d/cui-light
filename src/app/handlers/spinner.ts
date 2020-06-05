import { ICuiMutationHandler } from "../../core/models/interfaces";
import { ATTRIBUTES, ICONS } from "../../core/utlis/statics";
import { is } from "../../core/utlis/functions";
import { IconBuilder } from "./icon";

export class CuiSpinnerHandler implements ICuiMutationHandler {
    #element: Element;

    constructor(element: Element) {
        this.#element = element;
    }
    handle(): void {
        const spinnerName = this.#element.getAttribute(ATTRIBUTES.spinner);
        const svgIcon = is(spinnerName) ? ICONS[`spinner_${spinnerName}`] : null;
        if (!is(svgIcon)) {
            return;
        }
        const iconElement = new IconBuilder(svgIcon).build();
        this.#element.innerHTML = "";
        this.#element.appendChild(iconElement);
        this.#element.classList.add(`animation-spinner-${spinnerName}`);
    }

}