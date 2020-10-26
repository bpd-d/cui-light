import { createElementFromString, is } from "../../core/index";

export class IconBuilder {
    #element: string;
    #scale: number;
    #appender: IconScaleAppender;

    constructor(svgString: string) {
        this.#element = svgString;
        this.#scale = 1;
        this.#appender = new IconScaleAppender();
    }

    setScale(scale: number): IconBuilder {
        this.#scale = scale
        return this
    }

    build(): Element {
        let created = createElementFromString(this.#element)
        if (is(created) && this.#scale) {
            this.#appender.append(created, this.#scale)
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