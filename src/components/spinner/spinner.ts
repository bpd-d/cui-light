import { ICuiComponent, ICuiMutationHandler } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiIconHandler, IconBuilder } from "../icon/icon";
import { CuiHandlerBase } from "../../app/handlers/base";
import { ATTRIBUTES, ICONS } from "../../core/utlis/statics";
import { is } from "../../core/utlis/functions";

export class CuiSpinnerComponent implements ICuiComponent {
    attribute: string;
    constructor() {
        this.attribute = 'data-spinner';
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiMutationHandler {
        return new CuiSpinnerHandler(element, utils);
    }
}

export class CuiSpinnerHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #element: Element;
    constructor(element: Element, utils: CuiUtils) {
        super("CuiSpinnerHandler", utils);
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
        this.mutate(this.addSpinner, iconElement, spinnerName);
    }

    refresh(): void {
        throw new Error("Method not implemented.");
    }

    private addSpinner(iconElement: Element, name: string) {
        this.#element.appendChild(iconElement);
        this.#element.classList.add(`animation-spinner-${name}`);
    }

}