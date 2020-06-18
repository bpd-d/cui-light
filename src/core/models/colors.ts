import { getRangeValue, increaseValue, decreaseValue } from "../utlis/functions";

export class CuiColor {
    #red: number;
    #green: number;
    #blue: number;
    #alpha: number;
    constructor(red: number, green: number, blue: number, alpha?: number) {
        this.set(red, green, blue, alpha);
    }

    set(red: number, green: number, blue: number, alpha?: number) {
        this.#alpha = getRangeValue(alpha ?? 1, 0, 1);
        this.#blue = getRangeValue(blue, 0, 255);
        this.#red = getRangeValue(red, 0, 255);
        this.#green = getRangeValue(green, 0, 255);
    }
    lighten(amount: number): CuiColor {
        let percent = getRangeValue(amount, 0, 100) / 100;
        this.set(increaseValue(this.#red, percent),
            increaseValue(this.#green, percent),
            increaseValue(this.#blue, percent),
            this.#alpha)
        return this;
    }

    darken(amount: number): CuiColor {
        let percent = getRangeValue(amount, 0, 100) / 100;
        this.set(decreaseValue(this.#red, percent),
            decreaseValue(this.#green, percent),
            decreaseValue(this.#blue, percent),
            this.#alpha)
        return this;
    }

    getColorValue(type: string): number {
        const t = type ? type.toLowerCase() : '#'
        switch (type) {
            case 'red':
                return this.#red;
            case 'green':
                return this.#green;
            case 'blue':
                return this.#blue;
            case 'alpha':
                return this.#alpha;
        }
        return -1
    }

    toCssString(): string {
        return `rgba(${this.#red},${this.#green},${this.#blue}, ${this.#alpha})`;
    }

    clone() {
        return new CuiColor(this.#red, this.#green, this.#blue, this.#alpha)
    }
}

export interface CuiColorSet {
    base: CuiColor,
    muted?: CuiColor,
    active?: CuiColor
}

export interface CuiColorTheme {
    base: string,
    muted: string,
    active: string
}

export interface CuiColorPair {
    light: string,
    dark: string
}