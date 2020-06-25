export declare class CuiColor {
    #private;
    constructor(red: number, green: number, blue: number, alpha?: number);
    set(red: number, green: number, blue: number, alpha?: number): void;
    lighten(amount: number): CuiColor;
    darken(amount: number): CuiColor;
    getColorValue(type: string): number;
    toCssString(): string;
    clone(): CuiColor;
}
export interface CuiColorSet {
    base: CuiColor;
    muted?: CuiColor;
    active?: CuiColor;
}
export interface CuiColorTheme {
    base: string;
    muted: string;
    active: string;
}
export interface CuiColorPair {
    light: string;
    dark: string;
}
