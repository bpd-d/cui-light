import { ICuiComponent, ICuiComponentHandler, ICuiParsable } from "../../core/models/interfaces";
import { CuiUtils } from "../../core/models/utils";
import { CuiComponentBase, CuiHandler, CuiChildMutation } from "../../app/handlers/base";
import { ICONS } from "../../core/utils/statics";
import { is, createElementFromString, isString, getStringOrDefault } from "../../core/utils/functions";

export class CuiIconArgs implements ICuiParsable {
    icon: string;

    parse(val: any) {
        if (!is(val)) {
            this.icon = null;
        }
        if (isString(val)) {
            this.icon = val
            return;
        }
        this.icon = getStringOrDefault(val.icon, "");
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
        super("CuiIconHandler", element, new CuiIconArgs(), utils);
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
        const iconSvg = new IconBuilder(iconStr).build();
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

export class IconBuilder {
    #element: string;
    #scale: number;
    #style: string;

    constructor(svgString: string) {
        this.#element = svgString;
        this.#scale = 1;
    }

    setStyle(style: string): IconBuilder {
        this.#style = style;
        return this
    }

    setScale(scale: number): IconBuilder {
        this.#scale = scale
        return this
    }

    build(): Element {
        let created = createElementFromString(this.#element)
        if (is(created) && this.#scale) {
            let appender = new IconScaleAppender();
            appender.append(created, this.#scale)
        }
        return created
    }
}

export class IconScaleAppender {
    append(element: Element, value: number): void {
        let width = element.hasAttribute("width") ? parseInt(element.getAttribute("width")) : 20;
        let height = element.hasAttribute("height") ? parseInt(element.getAttribute("height")) : 20;
        element.setAttribute("width", (width * value).toString())
        element.setAttribute("height", (height * value).toString())
    }
}