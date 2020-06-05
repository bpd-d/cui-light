import { ICuiMutationHandler } from "../../core/models/interfaces";
import { ATTRIBUTES, ICONS } from "../../core/utlis/statics";
import { createElementFromString, is } from "../../core/utlis/functions";

export class CuiIconHandler implements ICuiMutationHandler {

    #element: Element;
    constructor(element: Element) {
        this.#element = element;
    }

    handle(): void {
        const iconAttr = this.#element.getAttribute(ATTRIBUTES.icon)
        const iconStr = iconAttr ? ICONS[iconAttr] : null;
        const scale = this.#element.hasAttribute(ATTRIBUTES.scale) ? parseFloat(this.#element.getAttribute(ATTRIBUTES.scale)) : 1
        if (!iconStr) {
            return
        }
        const iconSvg = new IconBuilder(iconStr).setScale(scale).build();
        const svg = this.#element.querySelector('svg')
        if (is(svg)) {
            svg.remove();
        }
        if (this.#element.childNodes.length > 0) {
            this.#element.insertBefore(iconSvg, this.#element.firstChild);
        } else {
            this.#element.appendChild(iconSvg);
        }
    }
}

export class IconBuilder {
    #element: string;
    #scale: number;
    #style: string;

    constructor(svgString: string) {
        this.#element = svgString;
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