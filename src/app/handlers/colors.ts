import { CuiColorSet, CuiColor } from "../../core/models/color";
import { CuiColorSetType } from "../../core/utlis/types";
import { CSS_THEMES, CSS_APP_BACKGROUND_COLORS, CSS_COMPONENT_BACKGROUND_COLORS, CSS_COMPONENT_BORDER_COLORS } from "../../core/utlis/statics";
import { is, clone, getRangeValue } from "../../core/utlis/functions";
import { IUIInteractionProvider } from "../../core/models/interfaces";

export class CuiInstanceColorHandler {
    #root: HTMLElement;
    #interactions: IUIInteractionProvider;
    #LIGHTEN_FACTOR: number = 15;
    #DARKEN_FACTOR: number = 15;

    constructor(interactions: IUIInteractionProvider) {
        this.#root = document.documentElement;
        this.#interactions = interactions;
    }

    setAppBackground(light: CuiColor, dark: CuiColor) {
        this.setPropertyIn(CSS_APP_BACKGROUND_COLORS.light, light.toCssString());
        this.setPropertyIn(CSS_APP_BACKGROUND_COLORS.dark, dark.toCssString());
    }

    setComponentBackground(light: CuiColor, dark: CuiColor) {
        this.setPropertyIn(CSS_COMPONENT_BACKGROUND_COLORS.light, light.toCssString());
        this.setPropertyIn(CSS_COMPONENT_BACKGROUND_COLORS.dark, dark.toCssString());
    }

    setBordersColors(light: CuiColor, dark: CuiColor) {
        this.setPropertyIn(CSS_COMPONENT_BORDER_COLORS.light, light.toCssString());
        this.setPropertyIn(CSS_COMPONENT_BORDER_COLORS.dark, dark.toCssString());
    }

    setColor(type: CuiColorSetType, set: CuiColorSet) {
        const colors = CSS_THEMES[type];
        const baseColor = set.base;
        if (!is(colors) || !is(baseColor)) {
            return
        }
        const mutedColor = set.muted ?? baseColor.clone().lighten(this.#LIGHTEN_FACTOR);
        const activeColor = set.active ?? baseColor.clone().darken(this.#DARKEN_FACTOR);

        this.#interactions.mutate(() => {
            this.setProperty(colors.base, baseColor.toCssString());
            this.setProperty(colors.active, activeColor.toCssString());
            this.setProperty(colors.muted, mutedColor.toCssString());
        }, this)

    }

    setLightenFactor(factor: number) {
        this.#LIGHTEN_FACTOR = getRangeValue(factor, 0, 100);
    }

    setDarkenFactor(factor: number) {
        this.#DARKEN_FACTOR = getRangeValue(factor, 0, 100);
    }

    setProperty(propertyName: string, value: string) {
        this.#root.style.setProperty(propertyName, value);
    }

    setPropertyIn(propertyName: string, value: string) {
        if (!is(value)) {
            return;
        }
        this.#interactions.mutate(() => {
            this.setProperty(propertyName, value);
        }, this)
    }
}