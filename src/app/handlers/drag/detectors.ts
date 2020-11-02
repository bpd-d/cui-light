import { is } from "../../../core/index";
import { ICuiElementDetector } from "./interfaces";

// export class CuiDragOverDetector implements ICuiElementDetector {
//     #elements: Element[];
//     constructor() {
//         this.#elements = [];
//     }

//     setElements(elements: Element[]): void {
//         this.#elements = elements;
//     }

//     detect(x: number, y: number): [number, Element] {
//         let reduced = this.#elements ? this.#elements.reduce((closest, child, currentId) => {
//             const box = child.getBoundingClientRect();
//             let offset = y - box.top - box.height / 2;
//             if (offset < 0 && offset > closest.offset) {
//                 return { offset: offset, element: child, idx: currentId }
//             } else {
//                 return closest
//             }
//         }, { offset: Number.NEGATIVE_INFINITY, element: null, idx: -1 }) : undefined;
//         return reduced ? [reduced.idx, reduced.element] : [-1, undefined];
//     }
// }

// export class CuiComplexDragOverDetector implements ICuiElementDetector {
//     #elements: Element[];
//     constructor() {
//         this.#elements = [];
//     }

//     setElements(elements: Element[]): void {
//         this.#elements = elements;
//     }

//     detect(x: number, y: number): [number, Element] {
//         let reduced = this.#elements ? this.#elements.reduce((closest, child, currentId) => {
//             const box = child.getBoundingClientRect();
//             let offsetY = y - box.top - box.height / 2;
//             let offsetX = x - box.left - box.width / 2;
//             if (offsetY < 0 && offsetY > closest.offsetY && offsetX < 0 && offsetX > closest.offsetX) {
//                 return { offsetX: offsetX, offsetY: offsetY, element: child, idx: currentId }
//             } else {
//                 return closest
//             }
//         }, { offsetX: Number.NEGATIVE_INFINITY, offsetY: Number.NEGATIVE_INFINITY, element: null, idx: -1 }) : undefined;
//         return reduced ? [reduced.idx, reduced.element] : [-1, undefined];
//     }
// }

export class CuiSimpleDragOverDetector implements ICuiElementDetector {
    #elements: Element[];
    #count: number;
    #threshold: number;
    constructor() {
        this.#elements = [];
        this.#count = 0;
        this.#threshold = 5;
    }

    setElements(elements: Element[]): void {
        this.#elements = elements;
        this.#count = this.#elements.length;
    }

    setThreshold(value: number) {
        this.#threshold = value
    }

    detect(x: Number, y: Number): [number, Element] {
        if (!is(this.#elements)) {
            return [-1, undefined];
        }

        let idx: number = -1;
        let found: Element = undefined;

        for (let i = 0; i < this.#count; i++) {
            if (this.isInBounds(this.#elements[i], x, y)) {
                if (i === 0) {
                    idx = i;
                    found = this.#elements[i];
                    //break;
                } else if (i < this.#count - 1) {
                    idx = i + 1;
                    found = this.#elements[i + 1];
                    //break;
                }
                break;
            }
        }

        return [idx, found];
    }

    // private isInBounds(element: Element, x: Number, y: Number): boolean {
    //     const box = element.getBoundingClientRect();
    //     return x > box.left + this.#threshold && x < box.left + box.width - this.#threshold &&
    //         y > box.top + this.#threshold && y < box.top + box.height - this.#threshold;
    // }

    private isInBounds(element: Element, x: Number, y: Number): boolean {
        const box = element.getBoundingClientRect();
        if (box.width === 0) {
            console.log(element);
        }
        return x > box.left - this.#threshold && x < box.left + box.width + this.#threshold &&
            y > box.top - this.#threshold && y < box.top + box.height + this.#threshold;
    }

}