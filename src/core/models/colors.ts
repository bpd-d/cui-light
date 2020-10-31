import { getRangeValue, } from "../utils/functions";

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

    setRed(red: number) {
        this.#red = getRangeValue(red, 0, 255);
    }

    setGreen(green: number) {
        this.#green = getRangeValue(green, 0, 255);
    }

    setBlue(blue: number) {
        this.#blue = getRangeValue(blue, 0, 255);
    }

    opacity(val: number): CuiColor {
        this.#alpha = getRangeValue(val, 0, 1);
        return this;
    }

    lighten(amount: number): CuiColor {
        this.shade(amount)
        return this;
    }

    darken(amount: number): CuiColor {
        this.shade(-amount);
        return this;
    }

    invert(): CuiColor {
        this.#blue = 255 - this.#blue;
        this.#red = 255 - this.#red;
        this.#green = 255 - this.#green;
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
        return `rgba(${this.#red}, ${this.#green}, ${this.#blue}, ${this.#alpha})`;
    }

    private shade(percent: number, self: boolean = true) {
        this.#red = this.shadeSingle(this.#red, percent, self);
        this.#green = this.shadeSingle(this.#green, percent, self);
        this.#blue = this.shadeSingle(this.#blue, percent, self);
    }

    private shadeSingle(val: number, percent: number, self: boolean = true) {
        let rel = self ? val : 255;
        let prop = (rel * percent) / 100
        let newVal = val + Math.round(prop);
        return getRangeValue(newVal, 0, 255);
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