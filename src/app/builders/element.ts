import { is, isTouchSupported, enumerateObject } from "../../core/index";

export interface ElementBuilderAttribute {
    [name: string]: string;
}
export class ElementBuilder {
    #id: string;
    #classes: string[];
    #attributes: ElementBuilderAttribute;
    #tag: string;
    constructor(tag: string) {
        this.#tag = tag;
        this.#classes = [];
        this.#attributes = null
    }
    setId(id: string): ElementBuilder {
        this.#id = id;
        return this;
    }

    setClasses(...classList: string[]): ElementBuilder {
        this.#classes = classList;
        return this;
    }

    setAttributes(attributes: ElementBuilderAttribute): ElementBuilder {
        this.#attributes = attributes;
        return this;
    }

    build(innerHTML?: string): HTMLElement {
        let element = document.createElement(this.#tag);
        if (is(this.#id)) {
            element.id = this.#id;
        }
        if (is(this.#classes)) {
            element.classList.add(...this.#classes);
        }
        if (is(this.#attributes)) {
            enumerateObject(this.#attributes, (attr: string, value: string) => {
                element.setAttribute(attr, value);
            })
        }
        if (is(innerHTML)) {
            element.innerHTML = innerHTML;
        }
        return element;
    }
}