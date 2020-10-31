import { CSS_VARIABLES, CuiColor, CuiUtils, is } from "../../core/index";
import { CuiBaseColorsSetter, CuiThemeColorsSetter } from "./colors";
import { PropertySetter } from "./setter";

export class CuiPropertiesHandler {
    #setter: PropertySetter;
    constructor(utils: CuiUtils) {
        this.#setter = new PropertySetter(utils);
    }

    /**
     * Sets main font size
     * @param {number} value numeric value
     * @param {string} unit optional - size unit, px if not provided
     */
    setBaseFontSize(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.lineHeight, value, unit);
    }

    /**
     * Sets base animation time
     * @param {number} value - time value
     * @param {string} unit  - optional - ms is passed when no provided
     */
    setAnimationTime(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.animationTime, value, unit ?? 'ms');
    }

    /**
    * Sets long animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeLong(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.setAnimationTimeLong, value, unit ?? 'ms');
    }

    /**
    * Sets short animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeShort(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.setAnimationTimeShort, value, unit ?? 'ms');
    }

    /**
    * Sets main line size
    * @param {number} value numeric value
    * @param {string} unit optional - size unit, px if not provided
    */
    setBaseLineHeight(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.lineHeight, value, unit);
    }

    /**
     * Sets base margin value
     * @param {number} value - margin value
     * @param {string} unit - optional - margin unit (px default)
     */
    setBaseMargin(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.margin, value, unit)
    }

    /**
    * Sets base padding value
    * @param {number} value - padding value
    * @param {string} unit - optional - padding unit (px default)
    */
    setBasePadding(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.padding, value, unit)
    }

    /**
    * Sets base border radius
    * @param {number} value - border value
    * @param {string} unit - optional - border unit (px default)
    */
    setBaseBorderRadius(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.borderRadius, value, unit)
    }

    /**
   * Sets component space
   * @param {number} value - space value
   * @param {string} unit - optional - space unit (px default)
   */
    setComponentSpace(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.componentSpace, value, unit)
    }

    /**
     * Sets new accordion chevron icon
     * @param value A SVG formatted to be replaced default value
     */
    setAccordionIcon(value: string) {
        if (!is(value)) {
            return;
        }
        this.setCSSVariable(CSS_VARIABLES.accordionIcon, value);
    }

    /**
    * Sets a scrollbar width
    * @param value A SVG formatted to be replaced default value
    */
    setScrollbarWidth(value: number, unit?: string) {
        this.setBaseUnitValue(CSS_VARIABLES.scrollbarWidth, value, unit);
    }

    /**
     * Sets app viewport light background color
     * @param color color to be set
     */
    setAppBackgroundColor(color: CuiColor) {
        if (!is(color)) {
            return;
        }
        this.setCSSVariable(CSS_VARIABLES.colorLightAppBackground, color.toCssString());
    }

    /**
    * Sets app viewport dark background color
    * @param color color to be set
    */
    setDarkAppBackgroundColor(color: CuiColor) {
        if (!is(color)) {
            return;
        }
        this.setCSSVariable(CSS_VARIABLES.colorDarkAppBackground, color.toCssString());
    }

    getBaseColorsSetter(): CuiBaseColorsSetter {
        return new CuiBaseColorsSetter("light", this.#setter)
    }

    getDarkBaseColorsSetter(): CuiBaseColorsSetter {
        return new CuiBaseColorsSetter("dark", this.#setter)
    }

    getAccentThemeColorsSetter(): CuiThemeColorsSetter {
        return new CuiThemeColorsSetter("accent", this.#setter);
    }

    getSecondaryThemeColorsSetter(): CuiThemeColorsSetter {
        return new CuiThemeColorsSetter("secondary", this.#setter);
    }

    getErrorThemeColorsSetter(): CuiThemeColorsSetter {
        return new CuiThemeColorsSetter("error", this.#setter);
    }

    getWarningThemeColorsSetter(): CuiThemeColorsSetter {
        return new CuiThemeColorsSetter("warning", this.#setter);
    }

    getSuccessThemeColorsSetter(): CuiThemeColorsSetter {
        return new CuiThemeColorsSetter("success", this.#setter);
    }

    /**
     * Sets property in interactive way
     * @param {string} name property name - value of {prefix} is replaced by current prefix
     * @param {string} value - property value
     */
    setCSSVariable(name: string, value: string) {
        this.#setter.setProperty(name, value);
    }

    /**
     * Sets unit type CSS variable property
     * @param name Variable name
     * @param value numeric value
     * @param unit unit - optional - px is default value
     */
    private setBaseUnitValue(name: string, value: number, unit?: string) {
        if (!is(value)) {
            return;
        }
        let strVal = `${value}${unit ?? "px"}`;
        this.setCSSVariable(name, strVal);
    }
}