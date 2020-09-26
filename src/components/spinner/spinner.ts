import { ICuiComponent, ICuiComponentHandler, CuiObservables, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { IconBuilder } from "../icon/icon";
import { CuiComponentBase, CuiHandler } from "../../app/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is, isString, getStringOrDefault } from "../../core/utils/functions";
import { CuiCloseHandler } from "../close/close";

export class CuiSpinnerArgs implements ICuiParsable {
    spinner: string;

    constructor() {
        this.spinner = null;
    }

    parse(args: any) {
        if (isString(args)) {
            this.spinner = args
        } else {
            this.spinner = getStringOrDefault(args.spinner, null);
        }
    }

}

export class CuiSpinnerComponent implements ICuiComponent {
    attribute: string;
    constructor() {
        this.attribute = 'data-spinner';
        ICONS['special_circle_double'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"circle-double\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-double-outer\" d=\"M 50.000002,6.1070619 A 44.867709,44.126654 0 0 1 94.867708,50.233712 44.867709,44.126654 0 0 1 50.000002,94.36037 44.867709,44.126654 0 0 1 5.132292,50.233717 44.867709,44.126654 0 0 1 50.000002,6.1070619\"></path><path class=\"circle-double-inner\" d=\"M 50.000001,15.59972 A 35.383463,34.633995 0 0 1 85.383464,50.233711 35.383463,34.633995 0 0 1 50.000001,84.86771 35.383463,34.633995 0 0 1 14.616536,50.233716 35.383463,34.633995 0 0 1 50.000001,15.59972\"></path></svg>"
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSpinnerHandler(element, utils, this.attribute);
    }
}

export class CuiSpinnerHandler extends CuiHandler<CuiSpinnerArgs> {

    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiSpinnerHandler", element, attribute, new CuiSpinnerArgs(), utils);
    }

    onInit(): void {
        const svgIcon = is(this.args.spinner) ? ICONS[`spinner_${this.args.spinner}`] : null;
        if (!is(svgIcon)) {
            return;
        }
        const iconElement = new IconBuilder(svgIcon).build();
        this.element.innerHTML = "";
        this.mutate(this.addSpinner, iconElement, this.args.spinner);
    }

    onUpdate(): void {
        throw new Error("Method not implemented.");
    }

    onDestroy(): void {
        this.element.innerHTML = "";
    }

    private addSpinner(iconElement: Element, name: string) {
        this.element.appendChild(iconElement);
        this.element.classList.add(`animation-spinner-${name}`);
    }

}