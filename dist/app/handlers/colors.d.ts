import { CuiColorSetType } from "../../core/utlis/types";
import { IUIInteractionProvider } from "../../core/models/interfaces";
import { CuiColor, CuiColorSet } from "../../core/models/colors";
export declare class CuiInstanceColorHandler {
    #private;
    constructor(interactions: IUIInteractionProvider);
    setAppBackground(light: CuiColor, dark: CuiColor): void;
    setComponentBackground(light: CuiColor, dark: CuiColor): void;
    setBordersColors(light: CuiColor, dark: CuiColor): void;
    setColor(type: CuiColorSetType, set: CuiColorSet): void;
    setLightenFactor(factor: number): void;
    setDarkenFactor(factor: number): void;
    setProperty(propertyName: string, value: string): void;
    setPropertyIn(propertyName: string, value: string): void;
}
