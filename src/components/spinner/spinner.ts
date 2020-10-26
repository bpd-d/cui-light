import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is, isString, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { IconBuilder } from "../../app/builders/icon";

export class CuiSpinnerArgs implements ICuiParsable {
    spinner: string;
    scale: number;
    constructor() {
        this.spinner = null;
        this.scale = 1;
    }

    parse(args: any) {
        if (isString(args)) {
            this.spinner = args
        } else {
            this.spinner = getStringOrDefault(args.spinner, null);
            this.scale = getIntOrDefault(args.scale, 1);
        }
    }

}

export class CuiSpinnerComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'} -offset`;
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
        this.add()
    }

    onUpdate(): void {
        if (this.args.spinner !== this.prevArgs.spinner) {
            this.add();
        }
    }

    onDestroy(): void {
        this.removeIfAnyExisists();
    }

    private addSpinner(iconElement: Element, name: string) {
        this.element.appendChild(iconElement);
        this.element.classList.add(`animation-spinner-${name}`);
    }

    private add() {
        const svgIcon = is(this.args.spinner) ? ICONS[`spinner_${this.args.spinner}`] : null;
        if (!is(svgIcon)) {
            this._log.warning("Incorrect spinner name: " + this.args.spinner);
            return;
        }
        this.removeIfAnyExisists();
        const iconElement = new IconBuilder(svgIcon).setScale(this.args.scale).build();
        this.mutate(this.addSpinner, iconElement, this.args.spinner);
    }

    private removeIfAnyExisists() {
        let existing = this.element.querySelector("svg");
        if (existing) {
            existing.remove();
        }
    }


}