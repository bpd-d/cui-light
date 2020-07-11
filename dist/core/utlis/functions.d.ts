import { CuiLightMode, CuiWindowSize } from "./types";
import { ICuiComponent } from "../models/interfaces";
import { CuiUtils } from "../models/utils";
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
export declare function getMatchingAttributes(element: any, attributes: string[]): string[];
export declare function getRangeValue(value: number, min: number, max: number): number;
export declare function getRangeValueOrDefault(value: number, min: number, max: number, def: number): number;
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
 * Check print mode in the browser window
 * @returns true if window is displayed in print mode
 */
export declare function getSystemPrintMode(): boolean;
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
export declare function are(...attributes: any[]): boolean;
export declare function calcWindowSize(width: number): CuiWindowSize;
/**
 * Creates object from string.
 * Supported syntaxes are:
 * - JSON
 * - single value
 * - key:value,value;key=value
 *
 * @param attribute - attribute value
 */
export declare function parseAttributeString(attribute: string): any;
/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */
export declare function parseJsonString(attribute: string): any | null;
/**
 * Creates object from JSON string
 * @param attribute - JSON string
 */
export declare function jsonify(attribute: string): any;
export declare function getOffsetTop(element: HTMLElement): number;
export declare function getOffsetLeft(element: HTMLElement): number;
export declare function getIntOrDefault(value: any, def: number): number;
export declare function getStyleValue(target: any, property: string): any;
export declare function prepLogString(message: string, component: string, functionName?: string): string;
export declare function isInRange(value: number, min: number, max: number): boolean;
export declare function getActiveClass(prefix: string): string;
export declare function parseAttribute(element: Element, attribute: string): any;
/**
 *  Checks whether string value contains synonym of true
 * @param value - string to check
 */
export declare function isStringTrue(value: string): boolean;
export declare function boolStringOrDefault(prop: any, def: boolean): boolean;
export declare function getStringOrDefault(value: any, def: string): any;
/**
 * Checks whether device supports touch
 */
export declare function isTouchSupported(): boolean;
/**
 * Checks whether value is type of string
 * @param {any} value - value to be checked
 */
export declare function isString(value: any): boolean;
/**
 * Replaces mask {prefix} with actual value in the string
 * @param {string} value - text containg a mask
 * @param {string} prefix - value to be put in place of mask
 */
export declare function replacePrefix(value: string, prefix: string): string;
/**
 * Generates identifier for Cui element
 *
 * @param element - Cui element selector
 * @returns generated identifier
 */
export declare function generateCUID(element?: string): string;
/**
 * Generates random string
 */
export declare function generateRandomString(): string;
/**
 * Generates random integer
 * @param min - min number
 * @param max - max number
 * @returns random integer
 */
export declare function getRandomInt(min: number, max: number): number;
/**
 * Registers Element as Cui element, initializes handlers, sets component style to document header and sets $cuid
 * @param {any} node - document node
 * @param {ICuiComponent[]} components -supported components array
 * @param {string[]} attributes - supported attributes array
 * @param {CuiUtils} utils - Cui Utils instance
 */
export declare function registerCuiElement(node: any, components: ICuiComponent[], attributes: string[], utils: CuiUtils): void;
export declare function counter(): Generator<number, void, unknown>;
