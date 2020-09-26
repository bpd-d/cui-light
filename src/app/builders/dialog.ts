import { ElementBuilder } from "./element";
import { is } from "../../core/index";

export class DialogBuilder {
    #header: Element;
    #body: Element;
    #footer: Element;
    #prefix: string;
    #switches: string;
    #reverse: boolean;
    constructor(prefix: string, reverse: boolean, switches?: string) {
        this.#prefix = prefix;
        this.#header = this.#footer = this.#body = null;
        this.#switches = switches ?? "";
        this.#reverse = reverse;
    }

    createHeader(title: string, classes: string[], elements?: Element[]) {
        if (!is(classes)) {
            classes = []
        }
        if (!is(elements)) {
            elements = []
        }
        let headerBuilder = new ElementBuilder('div');
        headerBuilder.setClasses(`${this.#prefix}-dialog-header`, ...classes)
        this.#header = headerBuilder.build();

        let titleElement = new ElementBuilder('span').setClasses(this.getPrefixedString("-dialog-title")).build(title)

        this.#header.appendChild(titleElement);
        this.appendChildrens(this.#header, ...elements);

    }

    createFooter(classes: string[], elements: Element[]) {
        if (!is(classes)) {
            classes = []
        }
        if (!is(elements)) {
            elements = []
        }
        this.#footer = new ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-footer"), ...classes).build();
        this.appendChildrens(this.#footer, ...elements);
    }

    createBody(classes: string[], elements: Element[]) {
        if (!is(classes)) {
            classes = []
        }
        if (!is(elements)) {
            elements = []
        }
        this.#body = new ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-body"), ...classes).build();
        this.appendChildrens(this.#body, ...elements);
    }

    build(id: string): HTMLElement {
        let classes = [this.getPrefixedString("-dialog")]
        if (this.#reverse) {
            classes.push(this.getPrefixedString('-reverse-auto'));
        }
        let dialog = new ElementBuilder('div').setId(id).setClasses(...classes).setAttributes({
            [this.getPrefixedString('-dialog')]: this.#switches
        }).build();
        let container = new ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-container")).build();
        container.appendChild(this.#header);
        container.appendChild(this.#body);
        container.appendChild(this.#footer);
        dialog.appendChild(container);
        return dialog;
    }

    private appendChildrens(parent: Element, ...elements: Element[]) {
        if (is(elements)) {
            elements.forEach((element) => parent.appendChild(element));
        }
    }
    private getPrefixedString(str: string) {
        return this.#prefix + str
    }
}