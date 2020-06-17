import { HTMLAttribute } from "../models/elements";
import { CuiColor } from "../models/color";
import { COLORS, MUTATED_ATTRIBUTES } from "./statics";
import { CuiLightMode } from "./types";
import { ArgumentError } from "../models/errors";

/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 * 
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export function is(val: any, typecheck: boolean = true): boolean {
    if (typeof val !== 'undefined' && val !== null) {
        if (!typecheck) {
            return true;
        } else {
            return !isEmpty(val)
        }
    }
    return false;
}

/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export function isEmpty(val: any): boolean {
    if (typeof val === "string") {
        return val.length === 0
    }
    else if (Array.isArray(val)) {
        return val.length === 0
    }
    return false
}

export function getName(prefix: string, name: string) {
    if (!is(prefix) || !is(name)) {
        throw new ArgumentError("Missing argument value")
    }
    return `${prefix}-${name}`
}

export function sleep(timeout: number): Promise<boolean> {
    return new Promise(resolve => setTimeout(() => {
        resolve(true)
    }, timeout));
}

/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export function createElementFromString(htmlString: string): Element {
    if (!is(htmlString)) {
        return null;
    }
    let template = document.createElement('template')
    template.innerHTML = htmlString
    return template.content.children.length > 0 ? template.content.children[0] : null;
}

export function getMutationAttribute(element: Element): HTMLAttribute {
    let attr = null;
    let len = MUTATED_ATTRIBUTES.length;
    for (let i = 0; i < len; i++) {
        let attribute = MUTATED_ATTRIBUTES[i];
        if (element.hasAttribute(attribute)) {
            attr = {
                name: attribute,
                value: element.getAttribute(attribute)
            }
            break;
        }
    }
    return attr;
}

export function getMatchingAttribute(element: any, attributes: string[]): string {
    let attr = null;
    let len = attributes.length;
    for (let i = 0; i < len; i++) {
        let attribute = attributes[i];
        if (element.hasAttribute(attribute)) {
            attr = attribute
            break;
        }
    }
    return attr;
}

export function getRangeValue(value: number, min: number, max: number) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}

export function increaseValue(value: number, amount: number): number {
    return amount < 0 || amount > 1 ? 0 : value + (value * amount);
}

export function decreaseValue(value: number, amount: number): number {
    return amount < 0 || amount > 1 ? 0 : value - (value * amount);
}

export function clone(object: any): any {
    if (!is(object)) {
        return null;
    }
    return Object.assign({}, object);
}

export function getAvgColorRatio(first: CuiColor, second: CuiColor) {
    let ratio = 0;
    for (let color in COLORS) {
        if (color === 'alpha') {
            ratio += getSingleColorRatio(first.getColorValue(color), second.getColorValue(color), 1);
        }
        ratio += getSingleColorRatio(first.getColorValue(color), second.getColorValue(color), 255);
    }
    return ratio / COLORS.length;
}

export function getSingleColorRatio(first: number, second: number, max: number): number {
    return Math.abs(((first - second) / max) * 100)
}

/**
 * Creates string containg css selector for array of attributes
 * @param attributes - attributes values
 */
export function joinAttributesForQuery(attributes: string[]): string {
    if (!is(attributes)) {
        return ""
    }
    return `[${attributes.join('],[')}]`
}

/**
 * Checks light system light mode
 * @returns Light Mode - dark/light
 */
export function getSystemLightMode(): CuiLightMode {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export function are(...attributes: any[]): boolean {
    if (!is(attributes)) {
        return false
    }
    let result = attributes.find(item => { return is(item) === false })
    return typeof result === "undefined";
}