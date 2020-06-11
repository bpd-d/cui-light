import { ICuiMutationHandler, IUIInteractionProvider } from "../../core/models/interfaces";
import { ATTRIBUTES, ICONS } from "../../core/utlis/statics";
import { is } from "../../core/utlis/functions";
import { IconBuilder } from "./icon";
import { CuiHandlerBase } from "./base";

export class CuiSpinnerHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #element: Element;

    constructor(element: Element, interactions?: IUIInteractionProvider) {
        super("CuiSpinnerHandler", interactions);
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