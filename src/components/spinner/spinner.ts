import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { CLASSES, EVENTS, ICONS } from "../../core/utils/statics";
import { is, isString, getStringOrDefault, getIntOrDefault, replacePrefix } from "../../core/utils/functions";
import { IconBuilder } from "../../app/builders/icon";

export class CuiSpinnerArgs implements ICuiParsable {
    spinner: string;
    scale: number;
    constructor() {
        this.spinner = "circle";
        this.scale = 1;
    }

    parse(args: any) {
        if (isString(args)) {
            this.spinner = getStringOrDefault(args, "circle");
        } else {
            this.spinner = getStringOrDefault(args.spinner, "circle");
            this.scale = getIntOrDefault(args.scale, 1);
        }
    }

}

export class CuiSpinnerComponent implements ICuiComponent {
    attribute: string;
    #prefix: string;
    constructor(prefix?: string) {
        this.#prefix = prefix ?? 'cui';
        this.attribute = `${this.#prefix}-spinner`;
        ICONS['spinner_circle'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 7.800378,1.7908996 A 8.4986862,8.4986862 0 0 1 18.2091,7.8003784 8.4986862,8.4986862 0 0 1 12.199621,18.209101 8.4986862,8.4986862 0 0 1 1.7908995,12.199622 8.4986862,8.4986862 0 0 1 7.800378,1.7908996 Z\"></path></svg>";
        ICONS['spinner_circle_double'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 10,1.5000006 A 8.4999997,8.4999997 0 0 1 18.5,10 8.4999997,8.4999997 0 0 1 10,18.499999 8.4999997,8.4999997 0 0 1 1.5000005,10 8.4999997,8.4999997 0 0 1 10,1.5000006 Z\"></path><path d=\"M 10,3.4999997 A 6.5000002,6.5000002 0 0 1 16.5,10 6.5000002,6.5000002 0 0 1 10,16.5 6.5000002,6.5000002 0 0 1 3.5,9.9999993 6.5000002,6.5000002 0 0 1 10,3.4999997 Z\"></path></svg>";
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiSpinnerHandler(element, utils, this.attribute, this.#prefix);
    }
}

export class CuiSpinnerHandler extends CuiHandler<CuiSpinnerArgs> {
    #pauseEventId: string;
    #animationPauseClass: string;
    constructor(element: Element, utils: CuiUtils, attribute: string, prefix: string) {
        super("CuiSpinnerHandler", element, attribute, new CuiSpinnerArgs(), utils);
        this.#pauseEventId = null;
        this.#animationPauseClass = replacePrefix("{prefix}-animation-pause", prefix);
    }

    onInit(): void {
        this.#pauseEventId = this.onEvent(EVENTS.PAUSE, this.onPause.bind(this));
        this.add()
    }

    onUpdate(): void {
        if (this.args.spinner !== this.prevArgs.spinner) {
            this.add();
        }
    }

    onDestroy(): void {
        this.removeIfAnyExisists();
        this.detachEvent(EVENTS.PAUSE, this.#animationPauseClass);
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


    private onPause(flag: boolean) {
        this.fetch(() => {
            if (flag && !this.helper.hasClass(this.#animationPauseClass, this.element)) {
                this.helper.setClassesAs(this.element, this.#animationPauseClass);
            } else {
                this.helper.removeClassesAs(this.element, this.#animationPauseClass);
            }
        })
        this.emitEvent(EVENTS.PAUSED, flag);
    }


}