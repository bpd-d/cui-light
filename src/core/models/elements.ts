
export type CuiElementBoxType = Element | HTMLElement | Window;

export interface ICuiElementBox {
    getHeight(): number;
    getWidth(): number;
    getTop(): number;
    getLeft(): number;
    getScrollHeight(): number;
    getScrollWidth(): number;
    getScrollTop(): number;
    getScrollLeft(): number;
    queryAll(selector: string): HTMLElement[];
}

export class CuiElementBoxFactory {
    static get(element: CuiElementBoxType): ICuiElementBox {
        if (element instanceof Window) {
            return new WindowElementBox();
        } else if (element instanceof HTMLElement) {
            return new HTMLElementBox(element);
        }
        return new ElementBox(element);
    }
}

export class ElementBox implements ICuiElementBox {
    #box: DOMRect;
    #element: Element;
    constructor(element: Element) {
        this.#element = element;
        this.#box = element.getBoundingClientRect();
    }

    getHeight(): number {
        return this.#box.height;
    }
    getWidth(): number {
        return this.#box.width;
    }
    getTop(): number {
        return this.#box.top;
    }
    getLeft(): number {
        return this.#box.left;
    }
    getScrollHeight(): number {
        return this.#element.scrollHeight;
    }

    getScrollWidth(): number {
        return this.#element.scrollWidth;
    }

    getScrollTop(): number {
        return this.#element.scrollTop;
    }

    getScrollLeft(): number {
        return this.#element.scrollLeft;
    }

    queryAll(selector: string): HTMLElement[] {
        return [...this.#element.querySelectorAll<HTMLElement>(selector)];
    }
}

export class HTMLElementBox implements ICuiElementBox {
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }

    getHeight(): number {
        return this.#element.offsetHeight;
    }
    getWidth(): number {
        return this.#element.offsetWidth;
    }
    getTop(): number {
        return this.#element.offsetTop;
    }
    getLeft(): number {
        return this.#element.offsetLeft;
    }

    getScrollHeight(): number {
        return this.#element.scrollHeight;
    }

    getScrollWidth(): number {
        return this.#element.scrollWidth;
    }

    getScrollTop(): number {
        return this.#element.scrollTop;
    }

    getScrollLeft(): number {
        return this.#element.scrollLeft;
    }

    queryAll(selector: string): HTMLElement[] {
        return [...this.#element.querySelectorAll<HTMLElement>(selector)];
    }
}

export class WindowElementBox implements ICuiElementBox {
    getHeight(): number {
        return window.innerHeight;
    }
    getWidth(): number {
        return window.innerWidth;
    }
    getTop(): number {
        return 0;
    }
    getLeft(): number {
        return 0;
    }

    getScrollHeight(): number {
        return window.innerHeight;
    }

    getScrollWidth(): number {
        return window.innerWidth;
    }

    getScrollTop(): number {
        return window.pageYOffset;
    }
    getScrollLeft(): number {
        return window.pageXOffset;
    }
    queryAll(selector: string): HTMLElement[] {
        return [...document.querySelectorAll(selector)] as any[];
    }

}