import { is, are } from "./functions";
import { CuiUtils } from "../models/utils";

export interface ICuiComponentAction {
    add(element: Element, utils?: CuiUtils): void;
    remove(element: Element, utils?: CuiUtils): void;
    toggle(element: Element, utils?: CuiUtils): void;
}

export class CuiClassAction implements ICuiComponentAction {
    #class: string;

    constructor(className: string) {
        this.#class = className;
    }

    add(element: Element, utils?: CuiUtils): void {
        if (are(element, this.#class) && !element.classList.contains(this.#class)) {
            element.classList.add(this.#class);
        }
    }

    remove(element: Element, utils?: CuiUtils): void {
        if (are(element, this.#class) && element.classList.contains(this.#class)) {
            element.classList.remove(this.#class);
        }
    }

    toggle(element: Element, utils?: CuiUtils): void {
        if (are(element, this.#class)) {
            if (element.classList.contains(this.#class)) {
                element.classList.remove(this.#class);
            } else {
                element.classList.add(this.#class);
            }
        }
    }
}

export class CuiInboundAction implements ICuiComponentAction {
    #name: string;

    constructor(name: string) {
        this.#name = name;
    }
    add(element: Element, utils?: CuiUtils): void {
        switch (this.#name) {
            case 'dark-mode':
                utils.setLightMode('dark')
                break;
            case 'light-mode':
                utils.setLightMode('light')
                break;
        }
    }

    remove(element: Element, utils?: CuiUtils): void {
        switch (this.#name) {
            case 'dark-mode':
                utils.setLightMode('light')
                break;
            case 'light-mode':
                utils.setLightMode('dark')
                break;
        }
    }

    toggle(element: Element, utils?: CuiUtils): void {
        switch (this.#name) {
            case 'dark-mode':
                this.setDarkMode(utils)
                break;
            case 'light-mode':
                this.setDarkMode(utils)
                break;
        }
    }

    private setDarkMode(utils: CuiUtils) {
        if (utils.getLightMode() === 'dark') {
            utils.setLightMode('light')
        } else {
            utils.setLightMode('dark')
        }
    }
}

export class AttributeAction implements ICuiComponentAction {
    #attributeName: string;
    #attributeValue: string;
    constructor(attribute: string) {
        [this.#attributeName, this.#attributeValue] = attribute.split(',')
    }

    add(element: Element, utils?: CuiUtils): void {
        if (!are(element, this.#attributeName, this.#attributeValue)) {
            return;
        }
        element.setAttribute(this.#attributeName, this.#attributeValue)
    }

    remove(element: Element, utils?: CuiUtils): void {
        if (!are(element, this.#attributeName, this.#attributeValue)) {
            return;
        }
        if (element.hasAttribute(this.#attributeName)) {
            element.removeAttribute(this.#attributeName)
        }

    }

    toggle(element: Element, utils?: CuiUtils): void {
        if (!are(element, this.#attributeName, this.#attributeValue)) {
            return;
        }
        if (element.hasAttribute(this.#attributeName)) {
            element.removeAttribute(this.#attributeName)
        } else {
            element.setAttribute(this.#attributeName, this.#attributeValue)
        }
    }
}

export class DummyAction implements ICuiComponentAction {
    constructor() {
    }

    add(element: Element, utils?: CuiUtils): void {

    }

    remove(element: Element, utils?: CuiUtils): void {
    }

    toggle(element: Element, utils?: CuiUtils): void {
    }
}

export class CuiActionsFatory {
    public static get(value: string): ICuiComponentAction {
        if (!is(value)) {
            return new DummyAction();
        }
        let indicator = value[0];
        switch (indicator) {
            case '.':
                return new CuiClassAction(value.substring(1));
            case '~':
                return new CuiInboundAction(value.substring(1));
            case "&":
                return new AttributeAction(value.substring(1));
            default:
                return new CuiClassAction(value);
        }
    }
}

export class CuiActionsListFactory {
    public static get(value: string): ICuiComponentAction[] {
        if (!is(value)) {
            return [];
        }
        const split = value.split(',');
        return split.map(single => {
            return CuiActionsFatory.get(single.trim());
        })
    }
}