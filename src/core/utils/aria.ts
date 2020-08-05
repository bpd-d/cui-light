export class AriaAttributes {
    public static setLabel(element: Element, label: string): void {
        if (!element.hasAttribute('aria-label')) {
            element.setAttribute('aria-label', label);
        }
    }

    public static setAria(element: Element, attr: string, value: string) {
        if (!element.hasAttribute(attr)) {
            element.setAttribute(attr, value);
        }
    }

    public static removeAria(element: Element, attr: string) {
        if (element.hasAttribute(attr)) {
            element.removeAttribute(attr);
        }
    }
}