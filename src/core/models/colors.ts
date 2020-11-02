import { getRangeValue, is, isInRange, } from "../utils/functions";
import { CuiColorError } from "./errors";

export class CuiColor {
    #red: number;
    #green: number;
    #blue: number;
    #alpha: number;
    constructor(red: number, green: number, blue: number, alpha?: number) {
        this.set(red, green, blue, alpha);
    }

    static create(colorStr: string): CuiColor {
        if (!is(colorStr)) {
            throw new CuiColorError(`Given color value is not in a valid format`)
        }
        let trimmed = colorStr.trim();
        let parser: ColorParser = null;
        if (colorStr.startsWith("#")) {
            parser = new HexColorParser(colorStr);
        } else if (colorStr.startsWith("rgb")) {
            parser = new RgbColorParser(colorStr);
        } else {
            throw new CuiColorError("Unknown color string format");
        }

        return parser.parse();
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


interface ColorParser {
    trim(): void;
    isValid(): boolean;
    parse(): CuiColor;
}

export class HexColorParser implements ColorParser {
    #colorStr: string;
    constructor(colorStr: string) {
        this.#colorStr = colorStr;
    }

    trim(): void {
        this.#colorStr = this.#colorStr ? this.#colorStr.trim() : undefined;
        return
    }

    isValid(): boolean {
        return is(this.#colorStr) && this.#colorStr.startsWith("#")
    }
    parse(): CuiColor {
        let red: number = 0;
        let blue: number = 0;
        let green: number = 0;
        let alpha: number = 1;
        let length = this.#colorStr.length;
        if (this.#colorStr.length === 4) {
            red = parseInt(this.#colorStr[1] + this.#colorStr[1], 16);
            green = parseInt(this.#colorStr[2] + this.#colorStr[2], 16);
            blue = parseInt(this.#colorStr[3] + this.#colorStr[3], 16);
        } else {
            red = parseInt(this.#colorStr[1] + this.#colorStr[2], 16);
            green = parseInt(this.#colorStr[3] + this.#colorStr[4], 16);
            blue = parseInt(this.#colorStr[5] + this.#colorStr[6], 16);

            if (length > 7) {
                let alphaHex = parseInt(this.#colorStr[7] + this.#colorStr[8], 16);
                alpha = parseFloat((alphaHex / 255).toFixed(2));
            }
        }
        return new CuiColor(red, green, blue, alpha);
    }
}

export class RgbColorParser implements ColorParser {
    #colorStr: string;

    constructor(colorStr: string) {
        this.#colorStr = colorStr;
    }

    trim(): void {
        this.#colorStr = is(this.#colorStr) ? this.#colorStr.trim() : undefined;
    }

    isValid(): boolean {
        return is(this.#colorStr) && this.#colorStr.startsWith("rgb");
    }

    parse(): CuiColor {
        let len = this.#colorStr.length;
        let str = this.#colorStr.startsWith("rgba") ? this.#colorStr.substring(5, len - 1) : this.#colorStr.substring(4, len - 1);
        let split = str.split(",");
        if (!isInRange(split.length, 3, 4)) {
            return undefined;
        }
        let red: number = parseInt(split[0]);
        let green: number = parseInt(split[1]);
        let blue: number = parseInt(split[2]);
        let alpha: number = split.length === 4 ? parseFloat(split[3]) : 1
        return new CuiColor(red, green, blue, alpha);
    }
}