import { ICuiElementDetector } from "./interfaces";

export class CuiDragOverDetector implements ICuiElementDetector {
    #elements: Element[];
    constructor() {
        this.#elements = [];
    }

    setElements(elements: Element[]): void {
        this.#elements = elements;
    }

    detect(x: number, y: number): [number, Element] {
        let reduced = this.#elements ? this.#elements.reduce((closest, child, currentId) => {
            const box = child.getBoundingClientRect();
            let offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child, idx: currentId }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY, element: null, idx: -1 }) : undefined;
        return reduced ? [reduced.idx, reduced.element] : [-1, undefined];
    }

    // private isElement(x: number, y: number, element: Element) {
    //     let box = element.getBoundingClientRect();
    //     return y >= box.top - 4 &&
    //         y <= box.bottom + 4 &&
    //         x >= box.left &&
    //         x <= box.right
    // }
}