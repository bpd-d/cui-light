import { ICuiMutationHandler, ICuiLogger, IUIInteractionProvider } from "../../core/models/interfaces";
import { ATTRIBUTES, ICONS } from "../../core/utlis/statics";
import { createElementFromString, is } from "../../core/utlis/functions";
import { CuiHandlerBase } from "./base";

export class CuiIconHandler extends CuiHandlerBase implements ICuiMutationHandler {
    #log: ICuiLogger;
    #element: Element;
    #prevIcon: string;
    constructor(element: Element, interactions?: IUIInteractionProvider) {
        super("CuiIconHandler", interactions);
        this.#element = element;
        this.#prevIcon = null;
    }

    handle(): void {
        const iconAttr = this.#element.getAttribute(ATTRIBUTES.icon)
        if (iconAttr === this.#prevIcon) {
            return;
        }

        const iconStr = iconAttr ? ICONS[iconAttr] : null;
        if (!iconStr) {
            return
        }
        const iconSvg = new IconBuilder(iconStr).build();
        const svg = this.#element.querySelector('svg')
        if (is(svg)) {
            svg.remove();
        }
        if (this.#element.childNodes.length > 0) {
            this.mutate(this.insertBefore, iconSvg)
        } else {
            this.mutate(this.appendChild, iconSvg)
        }
    }

    refresh(): void {
        throw new Error("Method not implemented.");
    }

    private insertBefore(iconElement: Element) {
        this.#element.insertBefore(iconElement, this.#element.firstChild);
    }

    private appendChild(iconElement: Element) {
        this.#element.appendChild(iconElement);
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