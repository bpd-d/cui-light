export interface ICuiFloatPositionCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}

export interface ICuiFloatResizeCalculator {
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number];
}

export class BasePositionCalculator implements ICuiFloatPositionCalculator {

    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        return [x, y];
    }

}

export class OptionalPositionCalculator implements ICuiFloatPositionCalculator {
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        let newX = this.#element.offsetLeft + diffX;
        let newY = this.#element.offsetTop + diffY;
        return [newX, newY];
    }

}

export class BaseResizeCalculator implements ICuiFloatResizeCalculator {
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        let width = x - this.#element.offsetLeft;
        let height = y - this.#element.offsetTop;
        return [width, height];
    }
}

export class OptionalResizeCalculator implements ICuiFloatResizeCalculator {
    #element: HTMLElement;
    constructor(element: HTMLElement) {
        this.#element = element;
    }
    calculate(x: number, y: number, diffX: number, diffY: number): [number, number] {
        let width = this.#element.offsetWidth + diffX;
        let height = this.#element.offsetHeight + diffY;
        return [width, height];
    }
}