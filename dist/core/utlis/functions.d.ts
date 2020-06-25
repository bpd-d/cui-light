import { CuiLightMode } from "./types";
/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
export declare function is(val: any, typecheck?: boolean): boolean;
/**
 * Checks if value is empty string, array or object
 *
 *
 * @param val - value
 * @returns whether value passed all conditions
 */
export declare function isEmpty(val: any): boolean;
export declare function getName(prefix: string, name: string): string;
export declare function sleep(timeout: number): Promise<boolean>;
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
export declare function createElementFromString(htmlString: string): Element;
export declare function getMatchingAttribute(element: any, attributes: string[]): string;
export declare function getRangeValue(value: number, min: number, max: number): number;
export declare function increaseValue(value: number, amount: number): number;
export declare function decreaseValue(value: number, amount: number): number;
export declare function clone(object: any): any;
export declare function getSingleColorRatio(first: number, second: number, max: number): number;
/**
 * Creates string containg css selector for array of attributes
 * @param attributes - attributes values
 */
export declare function joinAttributesForQuery(attributes: string[]): string;
/**
 * Checks light system light mode
 * @returns Light Mode - dark/light
 */
export declare function getSystemLightMode(): CuiLightMode;
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export declare function are(...attributes: any[]): boolean;
