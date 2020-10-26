import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiHandler } from "../../app/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is, isString, getStringOrDefault, getIntOrDefault } from "../../core/utils/functions";
import { IconBuilder } from "../../app/builders/icon";

export class CuiIconArgs implements ICuiParsable {
    icon: string;
    scale: number;

    constructor() {
        this.icon = null;
        this.scale = 1;
    }
    parse(val: any) {
        if (isString(val)) {
            this.icon = getStringOrDefault(val, "");
        } else {
            this.icon = getStringOrDefault(val.icon, "");
            this.scale = getIntOrDefault(val.scale, 1);
        }

    }
}

export class CuiIconComponent implements ICuiComponent {
    attribute: string;
    constructor(prefix?: string) {
        this.attribute = `${prefix ?? 'cui'}-icon`;
    }

    getStyle(): string {
        return null;
    }

    get(element: Element, utils: CuiUtils): ICuiComponentHandler {
        return new CuiIconHandler(element, utils, this.attribute);
    }
}



export class CuiIconHandler extends CuiHandler<CuiIconArgs> {

    #currentIcon: string;
    constructor(element: Element, utils: CuiUtils, attribute: string) {
        super("CuiIconHandler", element, attribute, new CuiIconArgs(), utils);
        this.#currentIcon = null;

    }

    onInit(): void {
        if (this.#currentIcon !== null) {
            this._log.debug("Icon already initialized")
            return;
        }
        this.addIcon(this.args.icon)
        this.#currentIcon = this.args.icon;
    }

    onUpdate(): void {
        if (this.args.icon === this.#currentIcon) {
            return;
        }
        this.addIcon(this.args.icon);
        this.#currentIcon = this.args.icon;
    }

    onDestroy(): void {
        const svg = this.element.querySelector('svg')
        if (is(svg)) {
            svg.remove();
        }
        this.#currentIcon = null;
    }

    private addIcon(icon: string) {
        const iconStr = icon ? ICONS[icon] : null;
        if (!iconStr) {
            return;
        }
        const iconSvg = new IconBuilder(iconStr).setScale(this.args.scale).build();
        const svg = this.element.querySelector('svg')
        if (is(svg)) {
            svg.remove();
        }

        if (this.element.childNodes.length > 0) {
            this.mutate(this.insertBefore, iconSvg)
        } else {
            this.mutate(this.appendChild, iconSvg)
        }
    }

    private insertBefore(iconElement: Element) {
        this.element.insertBefore(iconElement, this.element.firstChild);
    }

    private appendChild(iconElement: Element) {
        this.element.appendChild(iconElement);
    }
}
