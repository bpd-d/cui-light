(window["webpackJsonpcui_light"] = window["webpackJsonpcui_light"] || []).push([[1],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return is; });
/* unused harmony export isEmpty */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return getName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return createElementFromString; });
/* unused harmony export getMatchingAttribute */
/* unused harmony export getMatchingAttributes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return getRangeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return getRangeValueOrDefault; });
/* unused harmony export increaseValue */
/* unused harmony export decreaseValue */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return clone; });
/* unused harmony export getSingleColorRatio */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return joinAttributesForQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return getSystemLightMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return getSystemPrintMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return are; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return calcWindowSize; });
/* unused harmony export parseAttributeString */
/* unused harmony export parseJsonString */
/* unused harmony export jsonify */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return getOffsetTop; });
/* unused harmony export getOffsetLeft */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return getIntOrDefault; });
/* unused harmony export getStyleValue */
/* unused harmony export prepLogString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return isInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getActiveClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return parseAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return isStringTrue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return boolStringOrDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return getStringOrDefault; });
/* unused harmony export isTouchSupported */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return replacePrefix; });
/* unused harmony export generateCUID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return generateRandomString; });
/* unused harmony export getRandomInt */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return registerCuiElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addCuiArgument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return counter; });
/* unused harmony export getHandlerExtendingOrNull */
/* unused harmony export hasFunction */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return getParentCuiElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return getChildrenHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return enumerateObject; });
/* unused harmony export round */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return calculateNextIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return getFirstMatching; });
/* unused harmony export mapObject */
/* unused harmony export mapObjectArray */
/* unused harmony export delay */
/* harmony import */ var _models_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _statics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);


/**
 * Checks if value is defined an is not null
 * Additionally with type check it can check value if it is not empty string or collection or object
 *
 * @param val - value
 * @param typecheck - default true - additional check whether value is not empty (string, collection, object)
 * @returns whether value passed all conditions
 */
function is(val, typecheck = true) {
    if (typeof val !== 'undefined' && val !== null) {
        if (!typecheck) {
            return true;
        }
        else {
            return !isEmpty(val);
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
function isEmpty(val) {
    if (typeof val === "string") {
        return val.length === 0;
    }
    if (typeof val === "boolean") {
        return val;
    }
    else if (Array.isArray(val)) {
        return val.length === 0;
    }
    return false;
}
function getName(prefix, name) {
    if (!is(prefix) || !is(name)) {
        throw new _models_errors__WEBPACK_IMPORTED_MODULE_0__[/* ArgumentError */ "b"]("Missing argument value");
    }
    return `${prefix}-${name}`;
}
function sleep(timeout) {
    return new Promise(resolve => setTimeout(() => {
        resolve(true);
    }, timeout));
}
/**
 * Creates proper html element from given string
 * @param htmlString - string containing html
 */
function createElementFromString(htmlString) {
    if (!is(htmlString)) {
        return null;
    }
    let template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.children.length > 0 ? template.content.children[0] : null;
}
function getMatchingAttribute(element, attributes) {
    let attr = null;
    let len = attributes.length;
    for (let i = 0; i < len; i++) {
        let attribute = attributes[i];
        if (element.hasAttribute(attribute)) {
            attr = attribute;
            break;
        }
    }
    return attr;
}
function getMatchingAttributes(element, attributes) {
    if (!element || !is(element.hasAttribute)) {
        return [];
    }
    return attributes.filter(a => {
        return element.hasAttribute(a);
    });
}
function getRangeValue(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    return value;
}
function getRangeValueOrDefault(value, min, max, def) {
    if (value === null || typeof value === 'undefined' || isNaN(value)) {
        return def;
    }
    return getRangeValue(value, min, max);
}
function increaseValue(value, amount) {
    return amount < 0 || amount > 1 ? 0 : value + (value * amount);
}
function decreaseValue(value, amount) {
    return amount < 0 || amount > 1 ? 0 : value - (value * amount);
}
function clone(object) {
    if (!is(object)) {
        return null;
    }
    return Object.assign({}, object);
}
function getSingleColorRatio(first, second, max) {
    return Math.abs(((first - second) / max) * 100);
}
/**
 * Creates string containg css selector for array of attributes
 * @param attributes - attributes values
 */
function joinAttributesForQuery(attributes) {
    if (!is(attributes)) {
        return "";
    }
    return `[${attributes.join('],[')}]`;
}
/**
 * Checks light system light mode
 * @returns Light Mode - dark/light
 */
function getSystemLightMode() {
    return window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
/**
 * Check print mode in the browser window
 * @returns true if window is displayed in print mode
 */
function getSystemPrintMode() {
    return window.matchMedia &&
        window.matchMedia('print').matches;
}
/**
 * Verifies whether attributes exist and have some values
 * @param attributes attributes list
 */
function are(...attributes) {
    if (!is(attributes)) {
        return false;
    }
    let c = attributes.length;
    for (let i = 0; i < c; i++) {
        if (!is(attributes[i])) {
            return false;
        }
    }
    return true;
}
function calcWindowSize(width) {
    if (width <= 640) {
        return 'small';
    }
    else if (width > 640 && width <= 960) {
        return "medium";
    }
    else if (width > 960 && width <= 1200) {
        return "large";
    }
    return 'xlarge';
}
/**
 * Creates object from string.
 * Supported syntaxes are:
 * - JSON
 * - single value
 * - key:value,value;key=value
 *
 * @param attribute - attribute value
 */
function parseAttributeString(attribute) {
    let ret = {};
    if (!is(attribute)) {
        return ret;
    }
    //@ts-ignore - null already checked
    ret = parseJsonString(attribute.trim());
    if (!is(ret)) {
        //@ts-ignore - null already checked
        if (!attribute.includes(';') && !attribute.includes(':')) {
            ret = attribute;
        }
        else {
            ret = {};
            //@ts-ignore - null already checked
            attribute.split(';').forEach(val => {
                let sp = val.split(':');
                if (sp.length === 2) {
                    ret[sp[0].trim()] = sp[1].trim();
                }
            });
        }
    }
    return ret;
}
/**
 * Creates object from JSON string
* String must start with { and end with }
 *
 * @param attribute - attribute value
 * @returns object if string passes test, null otherwise
 */
function parseJsonString(attribute) {
    let out = null;
    if (is(attribute) && attribute.startsWith('{') && attribute.endsWith('}')) {
        try {
            out = jsonify(attribute);
        }
        catch (e) {
            console.error(prepLogString("An exception occured", 'Functions', 'parseJsonString'), e);
        }
        return out;
    }
    return null;
}
/**
 * Creates object from JSON string
 * @param attribute - JSON string
 */
function jsonify(attribute) {
    return attribute && attribute.length > 0 ? JSON.parse(attribute) : {};
}
function getOffsetTop(element) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetTop - parseInt(getStyleValue(element, 'margin-top')) - parseInt(getStyleValue(element, 'padding-top')) - parseInt(getStyleValue(element, 'border-top-width'));
    return val < 0 ? element.offsetTop : val;
}
function getOffsetLeft(element) {
    if (!is(element)) {
        return -1;
    }
    let val = element.offsetLeft - parseInt(getStyleValue(element, 'margin-left')) - parseInt(getStyleValue(element, 'padding-left')) - parseInt(getStyleValue(element, 'border-left-width'));
    return val < 0 ? element.offsetLeft : val;
}
function getIntOrDefault(value, def) {
    let integer = parseInt(value);
    return isNaN(integer) ? def : integer;
}
function getStyleValue(target, property) {
    if (!is(target) || !is(property)) {
        return null;
    }
    if (target.currentStyle) {
        return target.currentStyle[property];
    }
    else if (window.getComputedStyle) {
        return window.getComputedStyle(target, null).getPropertyValue(property);
    }
    return null;
}
function prepLogString(message, component, functionName) {
    return `[${new Date().toLocaleString()}][${component !== null && component !== void 0 ? component : "-"}][${functionName !== null && functionName !== void 0 ? functionName : '-'}][${message}]`;
}
function isInRange(value, min, max) {
    return is(value) && value >= min && value <= max;
}
function getActiveClass(prefix) {
    return `${prefix !== null && prefix !== void 0 ? prefix : ""}-active`;
}
function parseAttribute(element, attribute) {
    return are(element, attribute) ? parseAttributeString(element.getAttribute(attribute)) : null;
}
/**
 *  Checks whether string value contains synonym of true
 * @param value - string to check
 */
function isStringTrue(value) {
    return is(value) ? ['y', 't', 'true', 'yes'].includes(value.toLowerCase()) : false;
}
function boolStringOrDefault(prop, def) {
    return is(prop) ? isStringTrue(prop) : def;
}
function getStringOrDefault(value, def) {
    return is(value) ? value.toLowerCase() : def;
}
/**
 * Checks whether device supports touch
 */
function isTouchSupported() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}
/**
 * Checks whether value is type of string
 * @param {any} value - value to be checked
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Replaces mask {prefix} with actual value in the string
 * @param {string} value - text containg a mask
 * @param {string} prefix - value to be put in place of mask
 */
function replacePrefix(value, prefix) {
    return !is(value) ? value : value.replace("{prefix}", prefix !== null && prefix !== void 0 ? prefix : "");
}
/**
 * Generates identifier for Cui element
 *
 * @param element - Cui element selector
 * @returns generated identifier
 */
function generateCUID(element) {
    let starter = is(element) ? element : "cui-element";
    return `${starter}-${_statics__WEBPACK_IMPORTED_MODULE_1__[/* COMPONENTS_COUNTER */ "b"].next().value}`;
}
/**
 * Generates random string
 */
function generateRandomString() {
    let rand = getRandomInt(1, 1000);
    let rand2 = getRandomInt(1, 100);
    return `${Math.floor(Math.random() * rand2)}-${Math.floor(rand)}`;
}
/**
 * Generates random integer
 * @param min - min number
 * @param max - max number
 * @returns random integer
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Registers Element as Cui element, initializes handlers, sets component style to document header and sets $cuid
 * @param {any} node - document node
 * @param {ICuiComponent[]} components -supported components array
 * @param {string[]} attributes - supported attributes array
 * @param {CuiUtils} utils - Cui Utils instance
 */
function registerCuiElement(node, components, attributes, utils) {
    let element = node;
    element.$handlers = {};
    let matching = getMatchingAttributes(node, attributes);
    if (is(matching)) {
        element.$cuid = node.hasAttribute(_statics__WEBPACK_IMPORTED_MODULE_1__[/* CUID_ATTRIBUTE */ "h"]) ? node.getAttribute(_statics__WEBPACK_IMPORTED_MODULE_1__[/* CUID_ATTRIBUTE */ "h"]) : generateCUID(node.tagName);
        node.setAttribute(_statics__WEBPACK_IMPORTED_MODULE_1__[/* CUID_ATTRIBUTE */ "h"], element.$cuid);
        matching.forEach(match => {
            let component = components.find(c => { return c.attribute === match; });
            if (!is(component)) {
                return;
            }
            try {
                //@ts-ignore - component already checked agains undefined
                utils.styleAppender.append(component.getStyle());
                //@ts-ignore - component already checked agains undefined
                let handler = component.get(node, utils);
                //@ts-ignore - component already checked agains undefined
                element.$handlers[component.attribute] = handler;
                //@ts-ignore - component already checked agains undefined
                element.$handlers[component.attribute].handle(parseAttribute(node, component.attribute));
            }
            catch (e) {
                let attr = matching ? matching.join(", ") : "";
                throw new _models_errors__WEBPACK_IMPORTED_MODULE_0__[/* RegisterElementError */ "h"](`An error occured during [${attr}] initialization: ${e.message}`);
            }
        });
    }
}
function addCuiArgument(element, cuiArg, args) {
    if (!are(cuiArg, args, element)) {
        return false;
    }
    if (element.hasAttribute(cuiArg)) {
        return false;
    }
    let argArr = [];
    enumerateObject(args, (arg, value) => {
        argArr.push(`${arg}: ${value}`);
    });
    element.setAttribute(cuiArg, argArr.join("; "));
    return true;
}
function* counter() {
    let idx = 0;
    while (true) {
        let reset = yield idx++;
        if (reset || idx > 200000) {
            idx = 0;
        }
    }
}
function getHandlerExtendingOrNull(target, fName) {
    if (!is(target.$handlers)) {
        return null;
    }
    for (let handler in target.$handlers) {
        if (target.$handlers.hasOwnProperty(handler)) {
            let h = target.$handlers[handler];
            if (hasFunction(h, fName))
                return h;
        }
    }
    return null;
}
/**
 * Checks whether property exists on the object and it is a function
 * @param obj - object
 * @param fName - property name
 */
function hasFunction(obj, fName) {
    return is(obj[fName]) && typeof obj[fName] === 'function';
}
/**
 * Gets closest parent element which is a cUI element
 * @param element
 */
function getParentCuiElement(element) {
    if (!is(element)) {
        return undefined;
    }
    let parent = element.parentElement;
    return is(parent) && is(parent.$cuid) ? parent : getParentCuiElement(parent);
}
/**
 * Calculates element height by calculating childerns heights
 * @param element
 */
function getChildrenHeight(element) {
    let height = 0;
    if (!element) {
        return -1;
    }
    Array.from(element.children).forEach((child) => {
        height += child.getBoundingClientRect().height;
    });
    return height > 0 ? height + 4 : height;
}
function enumerateObject(object, callback) {
    if (!are(object, callback)) {
        return;
    }
    for (let prop in object) {
        if (object.hasOwnProperty(prop)) {
            callback(prop, object[prop]);
        }
    }
}
function round(value, decimalPlaces) {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.floor(value) / multiplier;
}
function calculateNextIndex(val, currentIndex, totalLength) {
    let idx = -1;
    switch (val) {
        case 'prev':
            idx = currentIndex <= 0 ? totalLength - 1 : currentIndex - 1;
            break;
        case 'next':
            idx = currentIndex < totalLength - 1 ? currentIndex + 1 : 0;
            break;
        case 'first':
            idx = 0;
            break;
        case 'last':
            idx = totalLength - 1;
        default:
            idx = getIntOrDefault(val, -1);
            break;
    }
    return idx;
}
function getFirstMatching(array, callback) {
    let count = array.length;
    if (!array || count === 0) {
        return undefined;
    }
    for (let idx = 0; idx < count; idx++) {
        if (callback(array[idx], idx)) {
            return array[idx];
        }
    }
    return undefined;
}
function mapObject(input, callback) {
    return callback(input);
}
function mapObjectArray(input, callback) {
    return input.map((item) => {
        return mapObject(item, callback);
    });
}
/**
 * Delays callback execution by specific time. Callback cannot be called again until previous execution finishes or was cancelled
 * @param callback - callback to execute
 * @param delayTime - time in ms that execution shall be delayed by
 * @returns Cancel callback
 */
function delay(callback, delayTime) {
    if (!are(callback, delayTime)) {
        throw new Error("[delay]: Input arguments are not correct");
    }
    let id = null;
    return function (...args) {
        if (id === null) {
            id = setTimeout(() => {
                callback(...args);
                id = null;
            }, delayTime);
        }
        return function () {
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        };
    };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CUID_ATTRIBUTE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLASSES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return ICONS; });
/* unused harmony export COLORS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CSS_APP_BACKGROUND_COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CSS_COMPONENT_BACKGROUND_COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CSS_COMPONENT_BORDER_COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CSS_THEMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SCOPE_SELECTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CSS_VARIABLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return STATICS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return EVENTS; });
/* unused harmony export OBSERVABLE_SCROLL */
/* unused harmony export OBSERVABLE_INTERSECTION */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return COMPONENTS_COUNTER; });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);

const CUID_ATTRIBUTE = "cuid";
const CLASSES = {
    dark: 'dark',
    animProgress: 'animation-progress',
    print: 'print',
    active: 'active',
    swipingOn: "swiping-on",
    selectionOff: "selection-off",
};
const ICONS = {
    close: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 1.9999999,1.9999999 18,18\"></path><path d=\"M 18,1.9999999 1.9999999,18\"></path></svg>",
    accordion: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 5.0000475,7.4490018 10.000024,12.551028 15,7.4490018\"></path></svg>",
    special_menu: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path class=\"menu_handle_2\" d=\"M 1,10 H 19\"></path><path class=\"menu_handle_1\" d=\"M 1,4.8571429 H 19\"></path><path  class=\"menu_handle_3\" d=\"M 1,15.142857 H 19\"></path></svg>",
    special_fail: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-fail\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7.000001 A 43,43 0 0 1 92.999999,50 43,43 0 0 1 50,92.999999 43,43 0 0 1 7.0000011,50 43,43 0 0 1 50,7.000001 Z\"></path><path class=\"arm_1\" d=\"M 28.536809,28.536809 71.342023,71.342023\"></path><path class=\"arm_2\" d=\"M 71.342023,28.536809 28.536809,71.342023\"></path></svg>",
    special_success: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"special-success\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle\" d=\"M 50,7 A 43,43 0 0 1 93,50 43,43 0 0 1 50,93 43,43 0 0 1 7,50 43,43 0 0 1 50,7 Z\"></path><path class=\"arm\" d=\"M 22.988405,48.234784 36.946233,72.410453 75.516456,33.84023\"></path></svg>",
};
const COLORS = ['red', 'green', 'blue', 'alpha'];
const CSS_APP_BACKGROUND_COLORS = {
    light: '--cui-color-light-app-background',
    dark: '--cui-color-dark-app-background'
};
const CSS_COMPONENT_BACKGROUND_COLORS = {
    light: '--cui-color-light-background',
    dark: '--cui-color-dark-background '
};
const CSS_COMPONENT_BORDER_COLORS = {
    light: '--cui-color-light-border',
    dark: '--cui-color-dark-border'
};
const CSS_THEMES = {
    light: {
        base: '--cui-color-light-base',
        muted: '--cui-color-light-muted',
        active: '--cui-color-light-active'
    },
    dark: {
        base: '--cui-color-dark-base',
        muted: '--cui-color-dark-muted',
        active: '--cui-color-dark-active'
    },
    accent: {
        base: '--cui-color-primary',
        muted: '--cui-color-primary-muted',
        active: '--cui-color-primary-active'
    },
    secondary: {
        base: '--cui-color-secondary',
        muted: '--cui-color-secondary-muted',
        active: '--cui-color-secondary-active'
    },
    success: {
        base: '--cui-color-success',
        muted: '--cui-color-success-muted',
        active: '--cui-color-success-active'
    },
    warning: {
        base: '--cui-color-warning',
        muted: '--cui-color-warning-muted',
        active: '--cui-color-warning-active'
    },
    error: {
        base: '--cui-color-error',
        muted: '--cui-color-error-muted',
        active: '--cui-color-error-active'
    }
};
const SCOPE_SELECTOR = ":scope ";
const CSS_VARIABLES = {
    fontSize: "--{prefix}-font-size",
    lineHeight: "--{prefix}-line-height",
    animationTime: "--{prefix}-animation-time",
    animationTimeLong: "--{prefix}-animation-time-long",
    animationTimeShort: "--{prefix}-animation-time-short",
    colorLightAppBackground: "--{prefix}-color-light-app-background",
    colorLightBackground: "--{prefix}-color-light-background",
    colorLightBorder: "--{prefix}-color-light-border",
    colorLightBase: "--{prefix}-color-light-base",
    colorLightActive: "--{prefix}-color-light-active",
    colorLightMuted: "--{prefix}-color-light-muted",
    colorDarkAppBackground: "--{prefix}-color-dark-app-background",
    colorDarkBackground: "--{prefix}-color-dark-background",
    colorDarkBorder: "--{prefix}-color-dark-border",
    colorDarkBase: "--{prefix}-color-dark-base",
    colorDarkActive: "--{prefix}-color-dark-active",
    colorDarkMuted: "--{prefix}-color-dark-muted",
    colorAccent: "--{prefix}-color-primary",
    colorAccentActive: "--{prefix}-color-primary-active",
    colorAccentMuted: "--{prefix}-color-primary-muted",
    colorAccentShade: "--{prefix}-color-primary-shade",
    colorAccentShadeDark: "--{prefix}-color-primary-shade-dark",
    colorSecondary: "--{prefix}-color-secondary",
    colorSecondaryActive: "--{prefix}-color-secondary-active",
    colorSecondaryMuted: "--{prefix}-color-secondary-muted",
    colorSecondaryShade: "--{prefix}-color-secondary-shade",
    colorSecondaryShadeDark: "--{prefix}-color-secondary-shade-dark",
    colorWarning: "--{prefix}-color-warning",
    colorWarningActive: "--{prefix}-color-warning-active",
    colorWarningMuted: "--{prefix}-color-warning-muted",
    colorWarningShade: "--{prefix}-color-warning-shade",
    colorWarningShadeDark: "--{prefix}-color-warning-shade-dark",
    colorSuccess: "--{prefix}-color-success",
    colorSuccessActive: "--{prefix}-color-success-active",
    colorSuccessMuted: "--{prefix}-color-success-muted",
    colorSuccessShade: "--{prefix}-color-success-shade",
    colorSuccessShadeDark: "--{prefix}-color-success-shade-dark",
    colorError: "--{prefix}-color-error",
    colorErrorActive: "--{prefix}-color-error-active",
    colorErrorMuted: "--{prefix}-color-error-muted",
    colorErrorShade: "--{prefix}-color-error-shade",
    colorErrorShadeDark: "--{prefix}-color-error-shade-dark",
    inputBackground: "--{prefix}-input-background-color",
    colorShade: "--{prefix}-color-shade",
    colorShadeDarker: "--{prefix}-color-shade-darker",
    colorShadeLight: "--{prefix}-color-shade-light",
    colorShadeLighter: "--{prefix}-color-shade-light-lighter",
    outline: "--{prefix}-outline",
    borderRadius: "--{prefix}-border-radius",
    padding: "--{prefix}-padding",
    margin: "--{prefix}-margin",
    scrollbarWidth: "--{prefix}-scrollbar-width",
    componentSpace: "--{prefix}-component-space",
    accordionIcon: "--{prefix}-accordion-icon"
};
class STATICS {
}
STATICS.logLevel = 'none';
STATICS.prefix = 'cui';
const EVENTS = {
    INSTANCE_INITIALIZED: 'instance-initialized',
    INSTANCE_FINISHED: 'instance-finished',
    RESIZE: "resize",
    OPEN: "open",
    OPENED: "opened",
    CLOSE: "close",
    CLOSED: "closed",
    TOGGLE: "toggle",
    TOGGLED: 'toggled',
    SWITCH: "switch",
    SWITCHED: "switched",
    ON_SCROLL: "scroll",
    TARGET_CHANGE: 'targetchange',
    INTERSECTION: 'intersection',
    KEYDOWN: 'keydown',
    SCROLLBY: 'scrollby',
    WINDOW_CLICK: 'windowclick',
    OFFSET: 'offset',
    PROGRESS_CHANGE: "progresschange",
    PROGRESS_CHANGED: "progresschanged",
    CHANGE: "change",
    CHANGED: "changed",
    GLOBAL_MOVE: "globalmove",
    MOVE_LOCK: "movelock",
    PAUSE: "pause",
    PAUSED: "paused",
    SORTED: "sorted",
    SORT_START: "sortstart"
};
const OBSERVABLE_SCROLL = "SCROLL";
const OBSERVABLE_INTERSECTION = "INTERSECTION";
const COMPONENTS_COUNTER = Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* counter */ "g"])();


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CuiClassAction; });
/* unused harmony export CuiInboundAction */
/* unused harmony export AttributeAction */
/* unused harmony export DummyAction */
/* unused harmony export CuiActionsFatory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuiActionsListFactory; });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _class, _name, _attributeName, _attributeValue;

class CuiClassAction {
    constructor(className) {
        _class.set(this, void 0);
        __classPrivateFieldSet(this, _class, className);
    }
    add(element, utils) {
        if (Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* are */ "b"])(element, __classPrivateFieldGet(this, _class)) && !element.classList.contains(__classPrivateFieldGet(this, _class))) {
            element.classList.add(__classPrivateFieldGet(this, _class));
        }
    }
    remove(element, utils) {
        if (Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* are */ "b"])(element, __classPrivateFieldGet(this, _class)) && element.classList.contains(__classPrivateFieldGet(this, _class))) {
            element.classList.remove(__classPrivateFieldGet(this, _class));
        }
    }
    toggle(element, utils) {
        if (Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* are */ "b"])(element, __classPrivateFieldGet(this, _class))) {
            if (element.classList.contains(__classPrivateFieldGet(this, _class))) {
                element.classList.remove(__classPrivateFieldGet(this, _class));
            }
            else {
                element.classList.add(__classPrivateFieldGet(this, _class));
            }
        }
    }
}
_class = new WeakMap();
class CuiInboundAction {
    constructor(name) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, name);
    }
    add(element, utils) {
        if (!utils) {
            return;
        }
        switch (__classPrivateFieldGet(this, _name)) {
            case 'dark-mode':
                utils.setLightMode('dark');
                break;
            case 'light-mode':
                utils.setLightMode('light');
                break;
        }
    }
    remove(element, utils) {
        if (!utils) {
            return;
        }
        switch (__classPrivateFieldGet(this, _name)) {
            case 'dark-mode':
                utils.setLightMode('light');
                break;
            case 'light-mode':
                utils.setLightMode('dark');
                break;
        }
    }
    toggle(element, utils) {
        if (!utils) {
            return;
        }
        switch (__classPrivateFieldGet(this, _name)) {
            case 'dark-mode':
                this.setDarkMode(utils);
                break;
            case 'light-mode':
                this.setDarkMode(utils);
                break;
        }
    }
    setDarkMode(utils) {
        if (utils.getLightMode() === 'dark') {
            utils.setLightMode('light');
        }
        else {
            utils.setLightMode('dark');
        }
    }
}
_name = new WeakMap();
class AttributeAction {
    constructor(attribute) {
        var _a, _b;
        _attributeName.set(this, void 0);
        _attributeValue.set(this, void 0);
        _a = this, _b = this, [({ set value(_c) { __classPrivateFieldSet(_a, _attributeName, _c); } }).value, ({ set value(_c) { __classPrivateFieldSet(_b, _attributeValue, _c); } }).value] = attribute.split(',');
    }
    add(element, utils) {
        if (!Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* are */ "b"])(element, __classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue))) {
            return;
        }
        element.setAttribute(__classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue));
    }
    remove(element, utils) {
        if (!Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* are */ "b"])(element, __classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue))) {
            return;
        }
        if (element.hasAttribute(__classPrivateFieldGet(this, _attributeName))) {
            element.removeAttribute(__classPrivateFieldGet(this, _attributeName));
        }
    }
    toggle(element, utils) {
        if (!Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* are */ "b"])(element, __classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue))) {
            return;
        }
        if (element.hasAttribute(__classPrivateFieldGet(this, _attributeName))) {
            element.removeAttribute(__classPrivateFieldGet(this, _attributeName));
        }
        else {
            element.setAttribute(__classPrivateFieldGet(this, _attributeName), __classPrivateFieldGet(this, _attributeValue));
        }
    }
}
_attributeName = new WeakMap(), _attributeValue = new WeakMap();
class DummyAction {
    constructor() {
    }
    add(element, utils) {
    }
    remove(element, utils) {
    }
    toggle(element, utils) {
    }
}
class CuiActionsFatory {
    static get(value) {
        if (!Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(value)) {
            return new DummyAction();
        }
        let indicator = value[0];
        switch (indicator) {
            case '.':
                return new CuiClassAction(value.substring(1));
            case '~':
                return new CuiInboundAction(value.substring(1));
            case "&":
                return new AttributeAction(value.substring(1));
            default:
                return new CuiClassAction(value);
        }
    }
}
class CuiActionsListFactory {
    static get(value) {
        if (!Object(_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(value)) {
            return [];
        }
        const split = value.split(',');
        return split.map(single => {
            return CuiActionsFatory.get(single.trim());
        });
    }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ErrorBase */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ItemNotFoundError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ArgumentError; });
/* unused harmony export CuiBusError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CuiInstanceInitError; });
/* unused harmony export CuiScrollSpyOutOfRangeError */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return RegisterElementError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimatorError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CSSVariableError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return CuiColorError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return CuiPositionError; });
class ErrorBase extends Error {
    constructor(name, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
class ItemNotFoundError extends ErrorBase {
    constructor(message) {
        super("ItemNotFoundError", message);
    }
}
class ArgumentError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}
class CuiBusError extends ErrorBase {
    constructor(message) {
        super("ArgumentError", message);
    }
}
class CuiInstanceInitError extends ErrorBase {
    constructor(message) {
        super("CuiInstanceInitError", message);
    }
}
class CuiScrollSpyOutOfRangeError extends ErrorBase {
    constructor(message) {
        super("CuiScrollSpyOutOfRangeError", message);
    }
}
class RegisterElementError extends ErrorBase {
    constructor(message) {
        super("RegisterElementError", message);
    }
}
class AnimatorError extends ErrorBase {
    constructor(message) {
        super("AnimatorError", message);
    }
}
class CSSVariableError extends ErrorBase {
    constructor(message) {
        super("CSSVariableError", message);
    }
}
class CuiColorError extends ErrorBase {
    constructor(message) {
        super("CuiColorError", message);
    }
}
class CuiPositionError extends ErrorBase {
    constructor(message) {
        super("CuiPositionError", message);
    }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ logger_CuiLoggerFactory; });

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/utils/logger.js
class CuiLogger {
    constructor(name, level) {
        this.level = level;
        this.component = name;
        this.id = "-";
    }
    setLevel(level) {
        this.level = level;
    }
    setId(id) {
        this.id = id;
    }
    debug(message, functionName) {
        if (this.level === 'debug') {
            console.log(this.prepString(message, "debug", functionName));
        }
    }
    error(message, functionName) {
        if (this.level === 'error' || this.level === 'debug' || this.level === 'warning')
            console.error(this.prepString(message, "error", functionName));
    }
    warning(message, functionName) {
        if (this.level === 'warning' || this.level === 'debug')
            console.warn(this.prepString(message, "warning", functionName));
    }
    exception(e, functionName) {
        console.error(this.prepString(`An exception occured: ${e.name}: ${e.message}`, "exception", functionName));
        if (this.level === 'debug')
            console.error(e.stack);
    }
    performance(callback, functionName) {
        if (this.level !== 'debug') {
            return;
        }
        let start = Date.now();
        callback();
        console.log(this.prepString(`Performance measure: ${Date.now() - start}ms`, "performance", functionName));
    }
    prepString(message, level, functionName) {
        return `[${new Date().toLocaleString()}][${level}][${this.component}][${functionName !== null && functionName !== void 0 ? functionName : '-'}][${this.id}][${message}]`;
    }
}

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/statics.js
var statics = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/factories/logger.js


/**
 *
 */
class logger_CuiLoggerFactory {
    /**
     * Gets new instance of component focused logger
     * @param name - component name
     */
    static get(name, logLevel) {
        return new CuiLogger(name, logLevel !== null && logLevel !== void 0 ? logLevel : statics["l" /* STATICS */].logLevel);
    }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementBuilder; });
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _id, _classes, _attributes, _tag;

class ElementBuilder {
    constructor(tag) {
        _id.set(this, void 0);
        _classes.set(this, void 0);
        _attributes.set(this, void 0);
        _tag.set(this, void 0);
        __classPrivateFieldSet(this, _tag, tag);
        __classPrivateFieldSet(this, _classes, []);
        __classPrivateFieldSet(this, _attributes, undefined);
        __classPrivateFieldSet(this, _id, undefined);
    }
    setId(id) {
        __classPrivateFieldSet(this, _id, id);
        return this;
    }
    setClasses(...classList) {
        __classPrivateFieldSet(this, _classes, classList);
        return this;
    }
    setAttributes(attributes) {
        __classPrivateFieldSet(this, _attributes, attributes);
        return this;
    }
    build(innerHTML) {
        let element = document.createElement(__classPrivateFieldGet(this, _tag));
        if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(__classPrivateFieldGet(this, _id))) {
            // @ts-ignore id is checked
            element.id = __classPrivateFieldGet(this, _id);
        }
        if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(__classPrivateFieldGet(this, _classes))) {
            element.classList.add(...__classPrivateFieldGet(this, _classes));
        }
        if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(__classPrivateFieldGet(this, _attributes))) {
            // @ts-ignore attributes are checked
            Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* enumerateObject */ "i"])(__classPrivateFieldGet(this, _attributes), (attr, value) => {
                element.setAttribute(attr, value);
            });
        }
        if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(innerHTML)) {
            // @ts-ignore innerHTML checked already
            element.innerHTML = innerHTML;
        }
        return element;
    }
}
_id = new WeakMap(), _classes = new WeakMap(), _attributes = new WeakMap(), _tag = new WeakMap();


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SWIPE_ANIMATIONS_DEFINITIONS; });
const SWIPE_ANIMATIONS_DEFINITIONS = {
    "slide": {
        current: {
            left: {
                transform: {
                    translateX: {
                        from: 0,
                        to: -100,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: 0,
                        to: 100,
                        unit: "%"
                    }
                }
            }
        },
        previous: {
            left: {
                transform: {
                    translateX: {
                        from: 100,
                        to: 0,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: -100,
                        to: 0,
                        unit: "%"
                    }
                }
            }
        }
    },
    fade: {
        current: {
            left: {
                opacity: {
                    from: 1,
                    to: 0
                }
            },
            right: {
                opacity: {
                    from: 1,
                    to: 0
                }
            }
        },
        previous: {
            left: {
                opacity: {
                    from: 0,
                    to: 1
                }
            },
            right: {
                opacity: {
                    from: 0,
                    to: 1
                }
            }
        }
    },
    push: {
        current: {
            left: {
                transform: {
                    translateX: {
                        from: 0,
                        to: -10,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: 0,
                        to: 10,
                        unit: "%"
                    }
                }
            }
        },
        previous: {
            left: {
                transform: {
                    translateX: {
                        from: 100,
                        to: 0,
                        unit: "%"
                    }
                }
            },
            right: {
                transform: {
                    translateX: {
                        from: -100,
                        to: 0,
                        unit: "%"
                    }
                }
            }
        }
    }
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuiMoveEventListener; });
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _element, _onEvent, _isLocked, _isAttached, _preventDefault, _target;

class CuiMoveEventListener {
    constructor(element) {
        _element.set(this, void 0);
        _onEvent.set(this, void 0);
        _isLocked.set(this, void 0);
        _isAttached.set(this, void 0);
        _preventDefault.set(this, void 0);
        _target.set(this, void 0);
        __classPrivateFieldSet(this, _isLocked, false);
        __classPrivateFieldSet(this, _element, element !== null && element !== void 0 ? element : document.body);
        __classPrivateFieldSet(this, _isAttached, false);
        __classPrivateFieldSet(this, _preventDefault, false);
        __classPrivateFieldSet(this, _onEvent, undefined);
        __classPrivateFieldSet(this, _target, undefined);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }
    setCallback(callback) {
        __classPrivateFieldSet(this, _onEvent, callback);
    }
    setTarget(element) {
        __classPrivateFieldSet(this, _target, element);
    }
    isInProgress() {
        return __classPrivateFieldGet(this, _isLocked);
    }
    preventDefault(flag) {
        __classPrivateFieldSet(this, _preventDefault, flag);
    }
    attach() {
        if (__classPrivateFieldGet(this, _isAttached)) {
            return;
        }
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).addEventListener('touchmove', this.onTouchMove, { passive: false });
        __classPrivateFieldSet(this, _isAttached, true);
    }
    detach() {
        console.log("On detach");
        if (!__classPrivateFieldGet(this, _isAttached)) {
            return;
        }
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('mousedown', this.onMouseDown, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('mouseup', this.onMouseUp, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('mousemove', this.onMouseMove, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('touchstart', this.onTouchStart, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('touchend', this.onTouchEnd, { passive: false });
        //@ts-ignore
        __classPrivateFieldGet(this, _element).removeEventListener('touchmove', this.onTouchMove, { passive: false });
        __classPrivateFieldSet(this, _isAttached, false);
    }
    isAttached() {
        return __classPrivateFieldGet(this, _isAttached);
    }
    onMouseDown(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        if (__classPrivateFieldGet(this, _target) && !__classPrivateFieldGet(this, _target).contains(ev.target)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, true);
        this.publishMouseEvent("down", ev);
    }
    onMouseUp(ev) {
        if (!__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, false);
        this.publishMouseEvent("up", ev);
    }
    onMouseMove(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            this.publishMouseEvent("move", ev);
        }
    }
    onTouchStart(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        if (__classPrivateFieldGet(this, _target) && !__classPrivateFieldGet(this, _target).contains(ev.target)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, true);
        this.publishTouchEvent('down', ev);
    }
    onTouchEnd(ev) {
        if (!__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        __classPrivateFieldSet(this, _isLocked, false);
        this.publishTouchEvent('up', ev);
    }
    onTouchMove(ev) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            this.publishTouchEvent('move', ev);
        }
    }
    publishMouseEvent(type, ev) {
        if (__classPrivateFieldGet(this, _preventDefault) && ev.cancelable) {
            ev.preventDefault();
        }
        if (!Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(__classPrivateFieldGet(this, _onEvent))) {
            return;
        }
        // @ts-ignore
        __classPrivateFieldGet(this, _onEvent).call(this, {
            type: type,
            x: ev.clientX,
            y: ev.clientY,
            moveX: ev.movementX,
            moveY: ev.movementY,
            target: ev.target,
            event: ev
        });
    }
    publishTouchEvent(type, ev) {
        if (__classPrivateFieldGet(this, _preventDefault) && ev.cancelable)
            ev.preventDefault();
        if (!Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(__classPrivateFieldGet(this, _onEvent))) {
            return;
        }
        let touch = null;
        if (ev.touches.length > 0) {
            touch = ev.touches[0];
        }
        else if (ev.changedTouches.length > 0) {
            touch = ev.changedTouches[0];
        }
        // @ts-ignore - already checked
        __classPrivateFieldGet(this, _onEvent).call(this, {
            event: ev,
            type: type,
            target: ev.target,
            //@ts-ignore
            x: Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(touch) ? touch.clientX : -1,
            //@ts-ignore
            y: Object(_utils_functions__WEBPACK_IMPORTED_MODULE_0__[/* is */ "w"])(touch) ? touch.clientY : -1,
            moveX: -1,
            moveY: -1
        });
    }
}
_element = new WeakMap(), _onEvent = new WeakMap(), _isLocked = new WeakMap(), _isAttached = new WeakMap(), _preventDefault = new WeakMap(), _target = new WeakMap();


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuiSetup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CuiSetupInit; });
class CuiSetup {
    constructor() {
        this.autoLightMode = false;
        this.scrollThreshold = 20;
        this.resizeThreshold = 20;
        this.prefix = "cui";
        this.plugins = {};
    }
    fromInit(init) {
        var _a;
        this.prefix = (_a = init.prefix) !== null && _a !== void 0 ? _a : "cui";
        this.logLevel = init.logLevel;
        this.cacheSize = init.cacheSize;
        this.autoLightMode = init.autoLightMode;
        this.animationTime = init.animationTime;
        this.animationTimeShort = init.animationTimeShort;
        this.animationTimeLong = init.animationTimeLong;
        this.scrollThreshold = init.scrollThreshold;
        this.resizeThreshold = init.resizeThreshold;
        return this;
    }
}
class CuiSetupInit {
    constructor() {
        this.prefix = 'cui';
        this.app = '$cui';
        this.logLevel = 'warning';
        this.interaction = 'async';
        this.animationTime = 300;
        this.animationTimeShort = 150;
        this.animationTimeLong = 500;
        this.cacheSize = 500;
        this.autoLightMode = false;
        this.scrollThreshold = 20;
        this.resizeThreshold = 20;
        this.root = document.body;
        this.busSetup = undefined;
        this.development = undefined;
    }
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CuiMutationObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuiComponentMutationHandler; });
/* harmony import */ var _factories_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _observer, _options, _element, _components, _attributes, _utils, _queryString, _isObserving, _observer_1, _element_1, _disabled, _options_1;


class CuiMutationObserver {
    constructor(element, utils) {
        _observer.set(this, void 0);
        _options.set(this, void 0);
        _element.set(this, void 0);
        _components.set(this, void 0);
        _attributes.set(this, void 0);
        _utils.set(this, void 0);
        _queryString.set(this, void 0);
        __classPrivateFieldSet(this, _observer, undefined);
        this.plugins = undefined;
        __classPrivateFieldSet(this, _options, undefined);
        __classPrivateFieldSet(this, _element, element);
        this._log = _factories_logger__WEBPACK_IMPORTED_MODULE_0__[/* CuiLoggerFactory */ "a"].get('CuiMutationObserver');
        __classPrivateFieldSet(this, _components, []);
        __classPrivateFieldSet(this, _attributes, []);
        __classPrivateFieldSet(this, _utils, utils);
        __classPrivateFieldSet(this, _queryString, "");
    }
    setPlugins(plugins) {
        this.plugins = plugins;
        return this;
    }
    setComponents(components) {
        __classPrivateFieldSet(this, _components, components);
        return this;
    }
    setAttributes(attributes) {
        __classPrivateFieldSet(this, _options, {
            attributes: true,
            subtree: true,
            childList: true,
            attributeFilter: attributes
        });
        __classPrivateFieldSet(this, _attributes, attributes);
        __classPrivateFieldSet(this, _queryString, Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* joinAttributesForQuery */ "A"])(attributes));
        return this;
    }
    start() {
        this._log.debug("Starting");
        if (!__classPrivateFieldGet(this, _options)) {
            this._log.error("Cannot start - options are not defined");
            return this;
        }
        __classPrivateFieldSet(this, _observer, new MutationObserver(this.mutationCallback.bind(this)));
        __classPrivateFieldGet(this, _observer).observe(__classPrivateFieldGet(this, _element), __classPrivateFieldGet(this, _options));
        this._log.debug("Started");
        return this;
    }
    stop() {
        this._log.debug("Stopping");
        if (!__classPrivateFieldGet(this, _observer)) {
            this._log.debug("Observer not available");
            return this;
        }
        __classPrivateFieldGet(this, _observer).disconnect();
        __classPrivateFieldSet(this, _observer, undefined);
        this._log.debug("Stopped");
        return this;
    }
    mutationCallback(mutations, observer) {
        mutations.forEach((mutation) => {
            switch (mutation.type) {
                case 'attributes':
                    const item = mutation.target;
                    if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* is */ "w"])(mutation.attributeName)) {
                        // @ts-ignore - attribute name is checked
                        if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* are */ "b"])(item.$handlers, item.$handlers[mutation.attributeName])) {
                            // @ts-ignore - attribute name is checked
                            item.$handlers[mutation.attributeName].refresh(Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* parseAttribute */ "B"])(item, mutation.attributeName));
                        }
                    }
                    else {
                        this._log.error("Mutation attribute doesn't not exisits");
                    }
                    break;
                case 'childList':
                    this.handleChildListMutation(mutation);
                    break;
            }
            if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* is */ "w"])(this.plugins)) {
                // @ts-ignore plugins is defined here
                this.plugins.onMutation(mutation).then(() => {
                    //
                });
            }
        });
    }
    handleChildListMutation(mutation) {
        const addedLen = mutation.addedNodes.length;
        const removedLen = mutation.removedNodes.length;
        if (addedLen > 0) {
            this._log.debug("Registering added nodes: " + addedLen);
            this.handleAddedNodes(mutation.addedNodes);
        }
        else if (removedLen > 0) {
            this._log.debug("Removing nodes: " + removedLen);
            this.handleRemovedNodes(mutation.removedNodes);
        }
    }
    handleAddedNodes(nodes) {
        nodes.forEach((node) => {
            try {
                Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* registerCuiElement */ "C"])(node, __classPrivateFieldGet(this, _components), __classPrivateFieldGet(this, _attributes), __classPrivateFieldGet(this, _utils));
                let childrens = node.hasChildNodes() ? node.querySelectorAll(__classPrivateFieldGet(this, _queryString)) : null;
                if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* is */ "w"])(childrens)) {
                    childrens.forEach((child) => {
                        Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* registerCuiElement */ "C"])(child, __classPrivateFieldGet(this, _components), __classPrivateFieldGet(this, _attributes), __classPrivateFieldGet(this, _utils));
                    });
                }
            }
            catch (e) {
                this._log.exception(e);
            }
        });
    }
    handleRemovedNodes(nodes) {
        nodes.forEach((node) => {
            this.destroySingleElement(node);
            let childrens = node.hasChildNodes() ? node.querySelectorAll(__classPrivateFieldGet(this, _queryString)) : null;
            if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* is */ "w"])(childrens)) {
                childrens.forEach((child) => {
                    this.destroySingleElement(child);
                });
            }
        });
    }
    destroySingleElement(node) {
        let element = node;
        if (element.$handlers) {
            for (let name in element.$handlers) {
                if (element.$handlers.hasOwnProperty(name)) {
                    try {
                        element.$handlers[name].destroy();
                    }
                    catch (e) {
                        this._log.exception(e, 'remove - ' + name);
                    }
                }
            }
        }
    }
}
_observer = new WeakMap(), _options = new WeakMap(), _element = new WeakMap(), _components = new WeakMap(), _attributes = new WeakMap(), _utils = new WeakMap(), _queryString = new WeakMap();
class CuiComponentMutationHandler {
    constructor(target) {
        _isObserving.set(this, void 0);
        _observer_1.set(this, void 0);
        _element_1.set(this, void 0);
        _disabled.set(this, void 0);
        _options_1.set(this, {
            childList: true,
            subtree: true
        });
        __classPrivateFieldSet(this, _observer_1, undefined);
        __classPrivateFieldSet(this, _disabled, false);
        __classPrivateFieldSet(this, _isObserving, false);
        __classPrivateFieldSet(this, _element_1, target);
    }
    observe() {
        if (!__classPrivateFieldGet(this, _isObserving) && !__classPrivateFieldGet(this, _disabled) && __classPrivateFieldGet(this, _observer_1)) {
            __classPrivateFieldGet(this, _observer_1).observe(__classPrivateFieldGet(this, _element_1), __classPrivateFieldGet(this, _options_1));
            __classPrivateFieldSet(this, _isObserving, true);
        }
    }
    unobserve() {
        if (__classPrivateFieldGet(this, _isObserving) && __classPrivateFieldGet(this, _observer_1)) {
            __classPrivateFieldGet(this, _observer_1).disconnect();
            __classPrivateFieldSet(this, _isObserving, false);
        }
    }
    isObserving() {
        return __classPrivateFieldGet(this, _isObserving);
    }
    disable(flag) {
        __classPrivateFieldSet(this, _disabled, flag);
        if (__classPrivateFieldGet(this, _disabled)) {
            this.unobserve();
        }
    }
    onMutation(callback) {
        if (__classPrivateFieldGet(this, _isObserving))
            this.unobserve();
        __classPrivateFieldSet(this, _observer_1, new MutationObserver(callback));
    }
}
_isObserving = new WeakMap(), _observer_1 = new WeakMap(), _element_1 = new WeakMap(), _disabled = new WeakMap(), _options_1 = new WeakMap();


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuiActionsHelper; });
/* harmony import */ var _utils_statics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _interactions;


class CuiActionsHelper {
    constructor(interactions) {
        _interactions.set(this, void 0);
        __classPrivateFieldSet(this, _interactions, interactions);
    }
    performAction(target, action, timeout, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                __classPrivateFieldGet(this, _interactions).mutate(() => {
                    action.add(target);
                    target.classList.add(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _interactions).mutate(() => {
                            action.remove(target);
                            target.classList.remove(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                            if (callback)
                                callback();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
    performActions(target, actions, timeout, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                __classPrivateFieldGet(this, _interactions).mutate(() => {
                    actions.forEach(x => x.add(target));
                    target.classList.add(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _interactions).mutate(() => {
                            actions.forEach(x => x.remove(target));
                            target.classList.remove(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                            if (callback)
                                callback();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
    performSwitchAction(inTarget, outTarget, inAction, outAction, onFinish, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                __classPrivateFieldGet(this, _interactions).mutate(() => {
                    inAction.forEach(x => x.add(inTarget));
                    inTarget.classList.add(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                    if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* is */ "w"])(outTarget)) {
                        //@ts-ignore
                        outAction.forEach(x => x.add(outTarget));
                        //@ts-ignore
                        outTarget.classList.add(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                    }
                    setTimeout(() => {
                        __classPrivateFieldGet(this, _interactions).mutate(() => {
                            inAction.forEach(x => x.remove(inTarget));
                            inTarget.classList.remove(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                            if (Object(_utils_functions__WEBPACK_IMPORTED_MODULE_1__[/* is */ "w"])(outTarget)) {
                                //@ts-ignore
                                outAction.forEach(x => x.remove(outTarget));
                                //@ts-ignore
                                outTarget.classList.remove(_utils_statics__WEBPACK_IMPORTED_MODULE_0__[/* CLASSES */ "a"].animProgress);
                            }
                            onFinish();
                            resolve(true);
                        }, null);
                    }, timeout);
                }, null);
            });
        });
    }
}
_interactions = new WeakMap();


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CUI_LIGHT_COMPONENTS_VERSION; });
const CUI_LIGHT_COMPONENTS_VERSION = "0.2.1";


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CUI_LIGHT_PLUGINS_VERSION; });
const CUI_LIGHT_PLUGINS_VERSION = "0.2.1";


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CUI_CORE_VERSION; });
const CUI_CORE_VERSION = "0.2.1";
// export * from "./models/colors";
// export * from "./models/errors";
// export * from "./models/events";
// export * from "./models/interfaces";
// export * from "./models/setup";
// export * from "./models/utils";
// // Utils
// export * from "./utils/actions";
// export * from "./utils/dictionary";
// export * from "./utils/functions";
// export * from "./utils/interactions";
// export * from "./utils/logger";
// export * from "./utils/types";
// export * from "./utils/statics";
// export * from "./styles/appender";
// // Factories
// export * from "./factories/logger";
// export * from "./factories/interactions";
// //Helpers
// export * from "./helpers/helpers";
// // BUS
// export * from "./bus/executors";
// export * from "./bus/handlers";
// export * from "./bus/bus";
// // Listeners
// export * from "./listeners/keys";
// export * from "./listeners/media";
// export * from "./listeners/scroll";


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ GetComponents; });

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/factories/logger.js + 1 modules
var logger = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/observers/mutations.js
var mutations = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/utils/aria.js
class AriaAttributes {
    static setLabel(element, label) {
        if (!element.hasAttribute('aria-label')) {
            element.setAttribute('aria-label', label);
        }
    }
    static setAria(element, attr, value) {
        if (!element.hasAttribute(attr)) {
            element.setAttribute(attr, value);
        }
    }
    static removeAria(element, attr) {
        if (element.hasAttribute(attr)) {
            element.removeAttribute(attr);
        }
    }
}

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/helpers/helpers.js
var helpers = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/actions.js
var utils_actions = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/functions.js
var functions = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/statics.js
var statics = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/handlers/base.js
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _interactions, _emittedEvents, _attribute, _openEventId, _closeEventId, _keyCloseEventId, _openAct, _closeAct, _mutionHandler;







class base_ComponentHelper {
    constructor(interactions) {
        _interactions.set(this, void 0);
        __classPrivateFieldSet(this, _interactions, interactions);
    }
    hasClass(cls, element) {
        return cls && element.classList.contains(cls) ? true : false;
    }
    setClass(cls, element) {
        this.setClasses([cls], element);
    }
    setClasses(classes, element) {
        if (element) {
            element.classList.add(...classes);
        }
    }
    setClassesAs(element, ...classes) {
        __classPrivateFieldGet(this, _interactions).mutate(this.setClasses, this, classes, element);
    }
    removeClass(cls, element) {
        this.removeClasses([cls], element);
    }
    removeClasses(classes, element) {
        if (element) {
            element.classList.remove(...classes);
        }
    }
    removeClassesAs(element, ...classes) {
        __classPrivateFieldGet(this, _interactions).mutate(this.removeClasses, this, classes, element);
    }
    removeAttribute(attributeName, element) {
        if (element && element.hasAttribute(attributeName))
            element.removeAttribute(attributeName);
    }
    setStyle(element, property, value) {
        if (element && element["style"] && Object(functions["w" /* is */])(value)) {
            element.style[property] = value;
        }
    }
}
_interactions = new WeakMap();
class base_CuiComponentBase {
    constructor(componentName, element, utils) {
        _emittedEvents.set(this, void 0);
        this._log = logger["a" /* CuiLoggerFactory */].get(componentName);
        this.utils = utils;
        this.element = element;
        this.cuid = element.$cuid;
        this.isLocked = false;
        this._log.setId(this.cuid);
        this.activeClassName = Object(functions["k" /* getActiveClass */])(utils.setup.prefix);
        this.helper = new base_ComponentHelper(utils.interactions);
        __classPrivateFieldSet(this, _emittedEvents, []);
        this.componentName = componentName;
    }
    mutate(callback, ...args) {
        this.utils.interactions.mutate(callback, this, ...args);
    }
    fetch(callback, ...args) {
        this.utils.interactions.fetch(callback, this, ...args);
    }
    getEventName(name) {
        return [name, this.cuid].join('-');
    }
    /**
     * Emits event using passed data and cuid of the element
     * NOTE: Don't use it to emit global events
     * @param event Event name
     * @param data Data to emit
     */
    emitEvent(event, ...data) {
        if (!__classPrivateFieldGet(this, _emittedEvents).includes(event))
            __classPrivateFieldGet(this, _emittedEvents).push(event);
        this.utils.bus.emit(event, this.cuid, ...data);
    }
    onEvent(event, callback) {
        return this.utils.bus.on(event, callback, this.element);
    }
    detachEvent(event, id) {
        if (id != null) {
            this.utils.bus.detach(event, id);
            id = "";
        }
    }
    getId() {
        return this.cuid;
    }
    checkLockAndWarn(fName) {
        if (this.isLocked) {
            this._log.warning("Component is locked", fName);
            return true;
        }
        return false;
    }
    /**
     * Helper which checks whether element has an active flag set
     */
    isActive() {
        return this.element.classList.contains(this.activeClassName);
    }
    detachEmiitedEvents() {
        __classPrivateFieldGet(this, _emittedEvents).forEach(event => {
            this.utils.bus.detachByCuid(event, this.cuid);
            this._log.debug("Detaching event: " + event + " on component delete");
        });
    }
    registerInDebug() {
        this.utils.development.registerElement(this.element, this.cuid, this.componentName);
    }
    removeFromDebug() {
        this.utils.development.unregisterElement(this.cuid, this.componentName);
    }
    setDebugProperty(name, value) {
        this.utils.development.setProperty(this.cuid, this.componentName, name, value);
    }
    logInfo(message, functionName) {
        this._log.debug(message, functionName);
        this.utils.development.pushState(this.cuid, this.componentName, "info", message, functionName);
    }
    logWarning(message, functionName) {
        this._log.warning(message, functionName);
        this.utils.development.pushState(this.cuid, this.componentName, "warning", message, functionName);
    }
    pushDebugState(type, message, functionName) {
        this.utils.development.pushState(this.cuid, this.componentName, type, message, functionName);
    }
    logError(message, functionName, error) {
        this._log.error(message, functionName);
        if (error) {
            this._log.exception(error, functionName);
        }
        this.utils.development.pushState(this.cuid, this.componentName, "error", message, functionName);
    }
}
_emittedEvents = new WeakMap();
class base_CuiHandlerBase extends base_CuiComponentBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, utils);
        _attribute.set(this, void 0);
        this.args = args;
        this.actionsHelper = new helpers["a" /* CuiActionsHelper */](utils.interactions);
        this.prevArgs = undefined;
        this.isInitialized = false;
        __classPrivateFieldSet(this, _attribute, attribute);
    }
    handle(args) {
        this.logInfo("Init", 'handle');
        if (this.isInitialized) {
            this.logWarning("Trying to initialize component again", 'handle');
            return;
        }
        this.args.parse(args);
        if (!this.element.classList.contains(__classPrivateFieldGet(this, _attribute))) {
            this.element.classList.add(__classPrivateFieldGet(this, _attribute));
        }
        this.registerInDebug();
        this.onHandle();
        this.isInitialized = true;
    }
    refresh(args) {
        this.logInfo("Update", 'refresh');
        if (!this.isInitialized) {
            this.logError("Cannot update not initialized component", 'refresh');
            return;
        }
        this.prevArgs = Object(functions["f" /* clone */])(this.args);
        this.args.parse(args);
        this.pushDebugState("info", "Component update", 'refresh');
        this.onRefresh();
    }
    destroy() {
        this.logInfo("Destroy", "destroy");
        this.onRemove();
        this.detachEmiitedEvents();
        this.removeFromDebug();
        this.isInitialized = false;
    }
}
_attribute = new WeakMap();
class CuiHandler extends base_CuiHandlerBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, attribute, args, utils);
    }
    onHandle() {
        this.onInit();
    }
    onRefresh() {
        this.onUpdate();
    }
    onRemove() {
        this.onDestroy();
    }
    /**
     * Helper created for elements that animate - perfroms an action *add*, after timeout it performs *remove*.
     *
     * @param action - action to perfrom
     * @param timeout - timeout specified for action removal
     * @param onFinish - callback to be performed after action is finished after removal
     * @param callback - optional - callback to be executed in mutation on action removal, e.g. additional DOM changes on element
     */
    performAction(actions, timeout, onFinish, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.actionsHelper.performActions(this.element, actions, timeout, callback)) {
                onFinish();
                return true;
            }
            return false;
        });
    }
}
class base_CuiInteractableHandler extends base_CuiHandlerBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, attribute, args, utils);
        _openEventId.set(this, void 0);
        _closeEventId.set(this, void 0);
        _keyCloseEventId.set(this, void 0);
        _openAct.set(this, void 0);
        _closeAct.set(this, void 0);
        __classPrivateFieldSet(this, _openEventId, null);
        __classPrivateFieldSet(this, _closeEventId, null);
        __classPrivateFieldSet(this, _keyCloseEventId, null);
        __classPrivateFieldSet(this, _closeAct, []);
        __classPrivateFieldSet(this, _openAct, []);
    }
    onHandle() {
        __classPrivateFieldSet(this, _openEventId, this.onEvent(statics["i" /* EVENTS */].OPEN, this.openFromEvent.bind(this)));
        __classPrivateFieldSet(this, _closeEventId, this.onEvent(statics["i" /* EVENTS */].CLOSE, this.closeFromEvent.bind(this)));
        __classPrivateFieldSet(this, _openAct, utils_actions["a" /* CuiActionsListFactory */].get(this.args.openAct));
        __classPrivateFieldSet(this, _closeAct, utils_actions["a" /* CuiActionsListFactory */].get(this.args.closeAct));
        this.onInit();
    }
    onRefresh() {
        if (!this.prevArgs || this.args.openAct !== this.prevArgs.openAct) {
            __classPrivateFieldSet(this, _openAct, utils_actions["a" /* CuiActionsListFactory */].get(this.args.openAct));
        }
        if (!this.prevArgs || this.args.closeAct !== this.prevArgs.closeAct) {
            __classPrivateFieldSet(this, _closeAct, utils_actions["a" /* CuiActionsListFactory */].get(this.args.closeAct));
        }
        this.onUpdate();
    }
    onRemove() {
        this.detachEvent(statics["i" /* EVENTS */].CLOSE, __classPrivateFieldGet(this, _closeEventId));
        this.detachEvent(statics["i" /* EVENTS */].OPEN, __classPrivateFieldGet(this, _openEventId));
        this.onDestroy();
    }
    open(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn("open")) {
                return false;
            }
            if (this.isActive()) {
                this.logWarning("Component is already opened");
                return false;
            }
            if (this.args.escClose || Object(functions["w" /* is */])(this.args.keyClose)) {
                __classPrivateFieldSet(this, _keyCloseEventId, this.onEvent(statics["i" /* EVENTS */].KEYDOWN, this.onKeyClose.bind(this)));
            }
            if (!this.onBeforeOpen()) {
                return false;
            }
            this.isLocked = true;
            return this.performAction(__classPrivateFieldGet(this, _openAct), this.args.timeout, this.onActionFinish.bind(this, this.onAfterOpen.bind(this), statics["i" /* EVENTS */].OPENED, args), () => {
                this.helper.setClass(this.activeClassName, this.element);
                AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
            });
            ;
        });
    }
    close(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn("close")) {
                return false;
            }
            if (!this.isActive()) {
                this.logWarning("Component is already closed");
                return false;
            }
            this.detachEvent(statics["i" /* EVENTS */].KEYDOWN, __classPrivateFieldGet(this, _keyCloseEventId));
            if (!this.onBeforeClose()) {
                return false;
            }
            this.isLocked = true;
            return this.performAction(__classPrivateFieldGet(this, _closeAct), this.args.timeout, this.onActionFinish.bind(this, this.onAfterClose.bind(this), statics["i" /* EVENTS */].CLOSED, args), () => {
                this.helper.removeClass(this.activeClassName, this.element);
                AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
            });
            ;
        });
    }
    /**
     * Helper created for elements that animate - perfroms an action *add*, after timeout it performs *remove*.
     *
     * @param action - action to perfrom
     * @param timeout - timeout specified for action removal
     * @param onFinish - callback to be performed after action is finished after removal
     * @param callback - optional - callback to be executed in mutation on action removal, e.g. additional DOM changes on element
     */
    performAction(actions, timeout, onFinish, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.actionsHelper.performActions(this.element, actions, timeout, callback)) {
                onFinish();
                return true;
            }
            return false;
        });
    }
    openFromEvent(args) {
        this.open(args);
    }
    closeFromEvent(args) {
        this.close(args);
    }
    onActionFinish(callback, event, args) {
        callback();
        this.emitEvent(event, {
            timestamp: Date.now(),
            state: args
        });
        this.isLocked = false;
    }
    onKeyClose(ev) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.args.escClose && ev.event.key === "Escape" || Object(functions["w" /* is */])(this.args.keyClose) && ev.event.key === this.args.keyClose) {
                yield this.close('Closed by key');
            }
        });
    }
}
_openEventId = new WeakMap(), _closeEventId = new WeakMap(), _keyCloseEventId = new WeakMap(), _openAct = new WeakMap(), _closeAct = new WeakMap();
class base_CuiMutableHandler extends base_CuiHandlerBase {
    constructor(componentName, element, attribute, args, utils) {
        super(componentName, element, attribute, args, utils);
        _mutionHandler.set(this, void 0);
        __classPrivateFieldSet(this, _mutionHandler, new mutations["a" /* CuiComponentMutationHandler */](element));
        __classPrivateFieldGet(this, _mutionHandler).onMutation(this.mutation.bind(this));
    }
    onHandle() {
        this.onInit();
        __classPrivateFieldGet(this, _mutionHandler).observe();
    }
    onRefresh() {
        __classPrivateFieldGet(this, _mutionHandler).unobserve();
        this.onUpdate();
        __classPrivateFieldGet(this, _mutionHandler).observe();
    }
    onRemove() {
        __classPrivateFieldGet(this, _mutionHandler).unobserve();
        this.onDestroy();
    }
    /**
     * Callback attached to mutation observer set on root element
     *
     * @param record - mutation records
     */
    mutation(records) {
        this._log.debug("Element mutation", "mutation");
        this.onMutation(records.reduce((result, item) => {
            if (item.type !== "childList") {
                return result;
            }
            if (item.addedNodes.length > 0) {
                result.added.push(...item.addedNodes);
            }
            if (item.removedNodes.length > 0) {
                result.removed.push(...item.removedNodes);
            }
            return result;
        }, {
            added: [],
            removed: []
        }));
    }
}
_mutionHandler = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/accordion/accordion.js
var accordion_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var accordion_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var accordion_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _defTitleSelector, _defItemsSelector, _defTimeout, _prefix, _items, _targets, _switchEventId;



const ACCORDION_TITLE_CLS = '> * > .{prefix}-accordion-title';
const ACCORDION_ITEMS_CLS = '> *';
class accordion_CuiAccordionArgs {
    constructor(prefix, timeout) {
        _defTitleSelector.set(this, void 0);
        _defItemsSelector.set(this, void 0);
        _defTimeout.set(this, void 0);
        accordion_classPrivateFieldSet(this, _defTitleSelector, Object(functions["D" /* replacePrefix */])(ACCORDION_TITLE_CLS, prefix));
        accordion_classPrivateFieldSet(this, _defItemsSelector, Object(functions["D" /* replacePrefix */])(ACCORDION_ITEMS_CLS, prefix));
        this.animation = false;
        accordion_classPrivateFieldSet(this, _defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        this.single = false;
        this.selector = statics["k" /* SCOPE_SELECTOR */] + accordion_classPrivateFieldGet(this, _defTitleSelector);
        this.items = statics["k" /* SCOPE_SELECTOR */] + accordion_classPrivateFieldGet(this, _defItemsSelector);
        this.timeout = accordion_classPrivateFieldGet(this, _defTimeout);
    }
    parse(args) {
        if (Object(functions["w" /* is */])(args)) {
            this.single = Object(functions["z" /* isStringTrue */])(args.single);
            this.selector = statics["k" /* SCOPE_SELECTOR */] + Object(functions["t" /* getStringOrDefault */])(args.selector, accordion_classPrivateFieldGet(this, _defTitleSelector));
            this.items = statics["k" /* SCOPE_SELECTOR */] + Object(functions["t" /* getStringOrDefault */])(args.content, accordion_classPrivateFieldGet(this, _defItemsSelector));
            this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, accordion_classPrivateFieldGet(this, _defTimeout));
            this.animation = Object(functions["z" /* isStringTrue */])(args.animation);
            return;
        }
    }
    isValid() {
        return true;
    }
}
_defTitleSelector = new WeakMap(), _defItemsSelector = new WeakMap(), _defTimeout = new WeakMap();
class CuiAccordionComponent {
    constructor(prefix) {
        _prefix.set(this, void 0);
        accordion_classPrivateFieldSet(this, _prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${accordion_classPrivateFieldGet(this, _prefix)}-accordion`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new accordion_CuiAccordionHandler(element, utils, this.attribute, accordion_classPrivateFieldGet(this, _prefix));
    }
}
_prefix = new WeakMap();
class accordion_CuiAccordionHandler extends base_CuiMutableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiAccordionHandler", element, attribute, new accordion_CuiAccordionArgs(prefix, utils.setup.animationTime), utils);
        _items.set(this, void 0);
        _targets.set(this, void 0);
        _switchEventId.set(this, void 0);
        accordion_classPrivateFieldSet(this, _switchEventId, null);
        accordion_classPrivateFieldSet(this, _items, []);
        accordion_classPrivateFieldSet(this, _targets, []);
        accordion_classPrivateFieldSet(this, _switchEventId, null);
    }
    onInit() {
        if (this.args.isValid()) {
            try {
                this.initTargets();
                accordion_classPrivateFieldSet(this, _switchEventId, this.onEvent(statics["i" /* EVENTS */].SWITCH, this.onSwitch.bind(this)));
            }
            catch (e) {
                this._log.exception(e, 'handle');
            }
            this._log.debug("Initialized", "handle");
        }
    }
    onUpdate() {
        try {
            this.initTargets();
        }
        catch (e) {
            this._log.exception(e, 'handle');
        }
    }
    onDestroy() {
        this.detachEvent(statics["i" /* EVENTS */].SWITCH, accordion_classPrivateFieldGet(this, _switchEventId));
    }
    onMutation(mutations) {
        if (mutations.added.length > 0 || mutations.removed.length > 0)
            this.initTargets();
    }
    switch(index) {
        return accordion_awaiter(this, void 0, void 0, function* () {
            this._log.debug("Switch to: " + index);
            if (index < 0 || this.isLocked || !this.isInitialized) {
                return false;
            }
            accordion_classPrivateFieldSet(this, _items, this.queryItems());
            if (accordion_classPrivateFieldGet(this, _items).length <= index) {
                return false;
            }
            this.isLocked = true;
            const current = accordion_classPrivateFieldGet(this, _items)[index];
            if (this.helper.hasClass(this.activeClassName, current)) {
                this.helper.removeClassesAs(current, this.activeClassName);
            }
            else {
                if (this.args.single) {
                    this.closeAllExcept(index);
                }
                this.helper.setClassesAs(current, this.activeClassName);
            }
            this.emitEvent(statics["i" /* EVENTS */].SWITCHED, {
                index: index,
                currentTarget: current,
                timestamp: Date.now()
            });
            this.isLocked = false;
            return true;
        });
    }
    onSwitch(index) {
        this.switch(Object(functions["n" /* getIntOrDefault */])(index, -1)).then(() => {
            this._log.debug("Switch from event to " + index);
        });
    }
    initTargets() {
        accordion_classPrivateFieldSet(this, _items, this.queryItems());
        const t = this.element.querySelectorAll(this.args.selector);
        accordion_classPrivateFieldSet(this, _targets, []);
        t.forEach((item, index) => {
            let target = { element: item };
            this.setListener(target, index);
            accordion_classPrivateFieldGet(this, _targets).push(target);
        });
    }
    closeAllExcept(current) {
        this.mutate(() => {
            accordion_classPrivateFieldGet(this, _items).forEach((item, index) => {
                if (current !== index && this.helper.hasClass(this.activeClassName, item)) {
                    item.classList.remove(this.activeClassName);
                }
            });
        });
    }
    setListener(target, index) {
        target.listener = () => {
            this.switch(index);
        };
        target.element.addEventListener('click', target.listener);
    }
    removeListener(target) {
        if (target.listener) {
            target.element.removeEventListener('click', target.listener);
        }
    }
    queryItems() {
        return [...this.element.querySelectorAll(this.args.items)];
    }
}
_items = new WeakMap(), _targets = new WeakMap(), _switchEventId = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/animation/definitions.js
var definitions = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/models/errors.js
var errors = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/animation/animators.js
var animators_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var animators_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _unit;


/**
 * Changes the opacity of the element from 0 to 1
 */
class animators_OpacityAnimator {
    constructor() {
        this.length = this.to = this.from = -1;
        this.rtl = false;
    }
    setProperty(prop) {
        if (!prop || !Object(functions["w" /* is */])(prop.from) || !Object(functions["w" /* is */])(prop.to)) {
            throw new errors["a" /* AnimatorError */]("[OpacityAnimator] Property has incorrect format");
        }
        this.from = prop.from;
        this.to = prop.to;
        this.length = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
    }
    perform(element, progress, factor) {
        if (this.to < 0) {
            return;
        }
        let current = this.length * progress;
        if (element["style"]) {
            element.style.opacity = this.rtl ? Math.max(this.from - current, 0) : Math.min(this.from + current, 1);
        }
    }
}
/**
 * Changes any style property of the element
 */
class animators_PropertyAnimator {
    constructor(property) {
        _unit.set(this, void 0);
        if (!Object(functions["w" /* is */])(property)) {
            throw new errors["a" /* AnimatorError */]("[PropertyAnimator] Valid property is required");
        }
        this.property = property;
        this.length = this.to = this.from = -1;
        this.rtl = false;
        animators_classPrivateFieldSet(this, _unit, "");
    }
    setProperty(prop) {
        if (!prop || !Object(functions["w" /* is */])(prop.from) || !Object(functions["w" /* is */])(prop.to)) {
            throw new errors["a" /* AnimatorError */]("[PropertyAnimator] Property has incorrect format");
        }
        this.from = prop.from;
        this.to = prop.to;
        this.length = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
        animators_classPrivateFieldSet(this, _unit, prop.unit);
    }
    perform(element, progress, factor) {
        if (!this.property) {
            return;
        }
        let current = this.length * progress;
        if (element["style"]) {
            element.style[this.property] = this.createValue(this.rtl ? this.from - current : this.from + current, animators_classPrivateFieldGet(this, _unit));
        }
    }
    createValue(value, unit) {
        return `${value}${unit !== null && unit !== void 0 ? unit : ""}`;
    }
}
_unit = new WeakMap();
/**
 * Changes transform property of the element. Supports mulitple properties at the time
 */
class animators_TransformAnimator {
    constructor() {
        this.prop = undefined;
    }
    setProperty(prop) {
        if (!prop) {
            throw new errors["a" /* AnimatorError */]("[TransformAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }
    build(progress) {
        let props = [];
        for (let name in this.prop) {
            let cur = this.prop[name];
            let diff = Math.abs(cur.to - cur.from);
            let rtl = cur.from > cur.to;
            let val = rtl ? cur.from - (diff * progress) : cur.from + (diff * progress);
            props.push(this.buildSingle(name, val, cur.unit));
        }
        return props.join(" ");
    }
    buildSingle(name, value, unit) {
        return `${name}(${value}${unit})`;
    }
    perform(element, progress) {
        if (!this.prop) {
            return;
        }
        if (element["style"]) {
            element.style.transform = this.build(progress);
        }
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/animation/engine.js
var engine_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var engine_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _engine, _timeout, _factory, _onError, _onFinishCallback, _animators, _lock, _animStartStamp, _element, _cleanOnFinish, _errorOccured, _factory_1, _onError_1, _element_1, _animators_1, _animationEngine, _factory_2, _onError_2;


class engine_CuiAnimation {
    constructor(element) {
        _engine.set(this, void 0);
        _timeout.set(this, void 0);
        _factory.set(this, void 0);
        _onError.set(this, void 0);
        engine_classPrivateFieldSet(this, _engine, new engine_CuiAnimationEngine(true));
        engine_classPrivateFieldSet(this, _onError, undefined);
        engine_classPrivateFieldSet(this, _timeout, 0);
        engine_classPrivateFieldSet(this, _factory, new engine_AnimatorFactory());
        if (element) {
            engine_classPrivateFieldGet(this, _engine).setElement(element);
        }
    }
    setElement(element) {
        engine_classPrivateFieldGet(this, _engine).setElement(element);
    }
    setTimeout(timeout) {
        engine_classPrivateFieldSet(this, _timeout, timeout);
    }
    onError(callback) {
        engine_classPrivateFieldSet(this, _onError, callback);
        engine_classPrivateFieldGet(this, _engine).setOnError(callback);
    }
    onFinish(callback) {
        engine_classPrivateFieldGet(this, _engine).onFinish(callback);
    }
    perform(props, timeout, factor) {
        if (!Object(functions["w" /* is */])(props)) {
            this.reportError(new Error("Animation property cannot be empty"));
            return;
        }
        let animators = [];
        try {
            for (let prop in props) {
                let animator = engine_classPrivateFieldGet(this, _factory).get(prop);
                if (!animator)
                    return;
                animator.setProperty(props[prop]);
                animators.push(animator);
                engine_classPrivateFieldGet(this, _engine).setAnimators(animators);
                engine_classPrivateFieldGet(this, _engine).animate(timeout !== null && timeout !== void 0 ? timeout : engine_classPrivateFieldGet(this, _timeout));
            }
        }
        catch (e) {
            this.reportError(e);
            return;
        }
    }
    reportError(e) {
        if (engine_classPrivateFieldGet(this, _onError)) {
            engine_classPrivateFieldGet(this, _onError).call(this, e);
        }
        else {
            console.error(e);
        }
    }
}
_engine = new WeakMap(), _timeout = new WeakMap(), _factory = new WeakMap(), _onError = new WeakMap();
class engine_AnimatorFactory {
    get(id) {
        if (!Object(functions["w" /* is */])(id)) {
            return undefined;
        }
        switch (id) {
            case "opacity":
                return new animators_OpacityAnimator();
            case "transform":
                return new animators_TransformAnimator();
            default:
                return new animators_PropertyAnimator(id);
        }
    }
}
class engine_CuiAnimationEngine {
    constructor(cleanOnFinish) {
        _onFinishCallback.set(this, void 0);
        _animators.set(this, void 0);
        _lock.set(this, void 0);
        _animStartStamp.set(this, void 0);
        _element.set(this, void 0);
        _cleanOnFinish.set(this, void 0);
        _errorOccured.set(this, void 0);
        _factory_1.set(this, void 0);
        _onError_1.set(this, void 0);
        engine_classPrivateFieldSet(this, _animators, []);
        engine_classPrivateFieldSet(this, _element, undefined);
        engine_classPrivateFieldSet(this, _animStartStamp, -1);
        engine_classPrivateFieldSet(this, _cleanOnFinish, cleanOnFinish !== null && cleanOnFinish !== void 0 ? cleanOnFinish : false);
        engine_classPrivateFieldSet(this, _factory_1, new engine_AnimatorFactory());
        engine_classPrivateFieldSet(this, _lock, false);
        engine_classPrivateFieldSet(this, _onFinishCallback, undefined);
        engine_classPrivateFieldSet(this, _errorOccured, false);
        engine_classPrivateFieldSet(this, _onError_1, undefined);
    }
    onFinish(callback) {
        engine_classPrivateFieldSet(this, _onFinishCallback, callback);
    }
    setAnimators(animators) {
        engine_classPrivateFieldSet(this, _animators, animators);
    }
    setProps(props) {
        if (!Object(functions["w" /* is */])(props)) {
            return;
        }
        engine_classPrivateFieldSet(this, _animators, []);
        try {
            for (let prop in props) {
                let animator = engine_classPrivateFieldGet(this, _factory_1).get(prop);
                if (!animator)
                    return;
                animator.setProperty(props[prop]);
                engine_classPrivateFieldGet(this, _animators).push(animator);
            }
        }
        catch (e) {
            this.reportError(e);
        }
    }
    setElement(element) {
        engine_classPrivateFieldSet(this, _element, element);
    }
    setOnError(callback) {
        engine_classPrivateFieldSet(this, _onError_1, callback);
    }
    animate(timeout, progress, revert) {
        if (engine_classPrivateFieldGet(this, _lock)) {
            return;
        }
        if (!engine_classPrivateFieldGet(this, _element) || engine_classPrivateFieldGet(this, _animators).length === 0) {
            this.reportError(new Error("Animation cannot be performed: element or animators are not set"));
            return;
        }
        let animationProgress = progress !== null && progress !== void 0 ? progress : 0;
        let shouldCalcRevert = revert ? revert : false;
        engine_classPrivateFieldSet(this, _lock, true);
        requestAnimationFrame(this.animateAsync.bind(this, timeout, animationProgress, shouldCalcRevert));
    }
    isLocked() {
        return engine_classPrivateFieldGet(this, _lock);
    }
    animateAsync(timeout, initialProgress, revert, timestamp) {
        if (!engine_classPrivateFieldGet(this, _animStartStamp)) {
            engine_classPrivateFieldSet(this, _animStartStamp, timestamp);
        }
        let pr = timestamp - engine_classPrivateFieldGet(this, _animStartStamp);
        let animationProgress = pr / timeout;
        let currProgress = 0;
        if (initialProgress === 0) {
            currProgress = animationProgress;
        }
        else {
            currProgress = revert ? initialProgress - (animationProgress * initialProgress) : initialProgress + (animationProgress * initialProgress);
        }
        this.callUpdate(revert ? Math.max(currProgress, 0) : Math.min(currProgress, 1), 1);
        if (pr < timeout && !engine_classPrivateFieldGet(this, _errorOccured)) {
            requestAnimationFrame(this.animateAsync.bind(this, timeout, initialProgress, revert));
        }
        else {
            this.endAnimation(revert);
        }
    }
    endAnimation(reverted) {
        if (engine_classPrivateFieldGet(this, _cleanOnFinish) && engine_classPrivateFieldGet(this, _element)) {
            engine_classPrivateFieldGet(this, _element).removeAttribute("style");
        }
        if (engine_classPrivateFieldGet(this, _onFinishCallback)) {
            engine_classPrivateFieldGet(this, _onFinishCallback).call(this, engine_classPrivateFieldGet(this, _element), reverted, engine_classPrivateFieldGet(this, _errorOccured));
        }
        engine_classPrivateFieldSet(this, _errorOccured, false);
        engine_classPrivateFieldSet(this, _animStartStamp, -1);
        engine_classPrivateFieldSet(this, _lock, false);
    }
    callUpdate(progress, factor) {
        try {
            engine_classPrivateFieldGet(this, _animators).forEach(animator => animator.perform(engine_classPrivateFieldGet(this, _element), progress, factor));
        }
        catch (e) {
            this.reportError(e);
            engine_classPrivateFieldSet(this, _errorOccured, true);
        }
    }
    reportError(e) {
        if (engine_classPrivateFieldGet(this, _onError_1)) {
            engine_classPrivateFieldGet(this, _onError_1).call(this, e);
        }
        else {
            console.error("An error occured in CuiAnimtionEngine");
            console.error(e);
        }
    }
}
_onFinishCallback = new WeakMap(), _animators = new WeakMap(), _lock = new WeakMap(), _animStartStamp = new WeakMap(), _element = new WeakMap(), _cleanOnFinish = new WeakMap(), _errorOccured = new WeakMap(), _factory_1 = new WeakMap(), _onError_1 = new WeakMap();
class engine_CuiSwipeAnimationEngine {
    constructor(shouldCleanOnFinish) {
        _element_1.set(this, void 0);
        _animators_1.set(this, void 0);
        _animationEngine.set(this, void 0);
        _factory_2.set(this, void 0);
        _onError_2.set(this, void 0);
        engine_classPrivateFieldSet(this, _element_1, undefined);
        engine_classPrivateFieldSet(this, _animators_1, []);
        engine_classPrivateFieldSet(this, _animationEngine, new engine_CuiAnimationEngine(shouldCleanOnFinish));
        engine_classPrivateFieldSet(this, _factory_2, new engine_AnimatorFactory());
        engine_classPrivateFieldSet(this, _onError_2, undefined);
    }
    setElement(element) {
        engine_classPrivateFieldSet(this, _element_1, element);
    }
    setOnFinish(callback) {
        engine_classPrivateFieldGet(this, _animationEngine).onFinish(callback);
    }
    setOnError(callback) {
        engine_classPrivateFieldSet(this, _onError_2, callback);
        engine_classPrivateFieldGet(this, _animationEngine).setOnError(callback);
    }
    setProps(props) {
        if (!Object(functions["w" /* is */])(props)) {
            return;
        }
        engine_classPrivateFieldSet(this, _animators_1, []);
        try {
            for (let prop in props) {
                let animator = engine_classPrivateFieldGet(this, _factory_2).get(prop);
                if (!animator)
                    return;
                animator.setProperty(props[prop]);
                engine_classPrivateFieldGet(this, _animators_1).push(animator);
            }
        }
        catch (e) {
            this.reportError(e);
        }
    }
    /**
     * Perform single update on animators
     * @param progress - progress value to be set to animators 0..1
     */
    update(progress) {
        if (!engine_classPrivateFieldGet(this, _element_1) || engine_classPrivateFieldGet(this, _animators_1).length === 0) {
            return;
        }
        engine_classPrivateFieldGet(this, _animators_1).forEach(animator => animator.perform(engine_classPrivateFieldGet(this, _element_1), Math.min(progress, 1), 1));
    }
    /**
     * Perform single update on animators in RAF
     * @param progress - progress value to be set to animators 0..1
     */
    updateAsync(progress) {
        requestAnimationFrame(this.update.bind(this, progress));
    }
    /**
     * Finish swipe animation using animation engine
     * @param progress - initial progress value 0..1
     * @param timeout - time for animation to perform
     * @param revert - whether animation should return back to 0 or progress to the end
     */
    finish(progress, timeout, revert) {
        if (engine_classPrivateFieldGet(this, _element_1))
            engine_classPrivateFieldGet(this, _animationEngine).setElement(engine_classPrivateFieldGet(this, _element_1));
        engine_classPrivateFieldGet(this, _animationEngine).setAnimators(engine_classPrivateFieldGet(this, _animators_1));
        engine_classPrivateFieldGet(this, _animationEngine).animate(timeout, progress, revert);
    }
    reportError(e) {
        if (engine_classPrivateFieldGet(this, _onError_2)) {
            engine_classPrivateFieldGet(this, _onError_2).call(this, e);
        }
        else {
            console.log(e);
        }
    }
}
_element_1 = new WeakMap(), _animators_1 = new WeakMap(), _animationEngine = new WeakMap(), _factory_2 = new WeakMap(), _onError_2 = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/banner/banner.js
var banner_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var banner_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var banner_defTimeout, banner_prefix, _prefix_1, _swipeEngine, _isTracking, _startX, _ratio, _swipeAnimation, _moveEventId;






const BANNER_OPEN_ANIMATION = ".{prefix}-animation-fade-in";
const BANNER_CLOSE_ANIMATION = ".{prefix}-animation-fade-out";
class banner_CuiBannerArgs {
    constructor(prefix, timeout) {
        banner_defTimeout.set(this, void 0);
        banner_prefix.set(this, void 0);
        banner_classPrivateFieldSet(this, banner_defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        banner_classPrivateFieldSet(this, banner_prefix, prefix);
        this.escClose = false;
        this.keyClose = "";
        this.timeout = banner_classPrivateFieldGet(this, banner_defTimeout);
        this.swipe = false;
        this.openAct = "";
        this.closeAct = "";
    }
    parse(args) {
        this.swipe = Object(functions["c" /* boolStringOrDefault */])(args.swipe, false);
        this.escClose = false;
        this.keyClose = "";
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, banner_classPrivateFieldGet(this, banner_defTimeout));
        this.openAct = Object(functions["t" /* getStringOrDefault */])(args.openAct, Object(functions["D" /* replacePrefix */])(BANNER_OPEN_ANIMATION, banner_classPrivateFieldGet(this, banner_prefix)));
        this.closeAct = Object(functions["t" /* getStringOrDefault */])(args.closeAct, Object(functions["D" /* replacePrefix */])(BANNER_CLOSE_ANIMATION, banner_classPrivateFieldGet(this, banner_prefix)));
    }
}
banner_defTimeout = new WeakMap(), banner_prefix = new WeakMap();
class CuiBanerComponent {
    constructor(prefix) {
        _prefix_1.set(this, void 0);
        banner_classPrivateFieldSet(this, _prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${banner_classPrivateFieldGet(this, _prefix_1)}-banner`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new banner_CuiBannerHandler(element, utils, this.attribute, banner_classPrivateFieldGet(this, _prefix_1));
    }
}
_prefix_1 = new WeakMap();
class banner_CuiBannerHandler extends base_CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiBannerHandler", element, attribute, new banner_CuiBannerArgs(prefix, utils.setup.animationTime), utils);
        _swipeEngine.set(this, void 0);
        _isTracking.set(this, void 0);
        _startX.set(this, void 0);
        _ratio.set(this, void 0);
        _swipeAnimation.set(this, void 0);
        _moveEventId.set(this, void 0);
        banner_classPrivateFieldSet(this, _swipeEngine, new engine_CuiSwipeAnimationEngine(true));
        banner_classPrivateFieldGet(this, _swipeEngine).setOnFinish(this.onSwipeFinish.bind(this));
        banner_classPrivateFieldGet(this, _swipeEngine).setElement(this.element);
        banner_classPrivateFieldSet(this, _startX, -1);
        banner_classPrivateFieldSet(this, _ratio, 0);
        banner_classPrivateFieldSet(this, _swipeAnimation, definitions["a" /* SWIPE_ANIMATIONS_DEFINITIONS */]["fade"]);
        banner_classPrivateFieldSet(this, _moveEventId, null);
        banner_classPrivateFieldSet(this, _isTracking, false);
    }
    onInit() {
        banner_classPrivateFieldSet(this, _moveEventId, this.onEvent(statics["i" /* EVENTS */].GLOBAL_MOVE, this.onMove.bind(this)));
        if (this.isActive()) {
            this.open();
        }
    }
    onUpdate() {
    }
    onDestroy() {
        this.detachEvent(statics["i" /* EVENTS */].GLOBAL_MOVE, banner_classPrivateFieldGet(this, _moveEventId));
    }
    onBeforeOpen() {
        return true;
    }
    onAfterOpen() {
        if (this.args.swipe) {
            banner_classPrivateFieldSet(this, _moveEventId, this.onEvent(statics["i" /* EVENTS */].GLOBAL_MOVE, this.onMove.bind(this)));
        }
    }
    onAfterClose() {
        this.detachEvent(statics["i" /* EVENTS */].GLOBAL_MOVE, banner_classPrivateFieldGet(this, _moveEventId));
    }
    onBeforeClose() {
        return true;
    }
    onMove(data) {
        if (this.isLocked) {
            return;
        }
        let current = this.element;
        switch (data.type) {
            case "down":
                if (banner_classPrivateFieldGet(this, _isTracking) || !current.contains(data.target)) {
                    return;
                }
                banner_classPrivateFieldSet(this, _isTracking, true);
                banner_classPrivateFieldSet(this, _startX, data.x);
                this.helper.setClassesAs(document.body, statics["a" /* CLASSES */].swipingOn);
                data.event.preventDefault();
                break;
            case "up":
                if (!banner_classPrivateFieldGet(this, _isTracking) && banner_classPrivateFieldGet(this, _ratio) == 0) {
                    break;
                }
                let absRatio = Math.abs(banner_classPrivateFieldGet(this, _ratio));
                let timeout = absRatio * this.args.timeout;
                let back = absRatio <= 0.4;
                // Lock component until animation is finished
                this.isLocked = true;
                banner_classPrivateFieldGet(this, _swipeEngine).finish(absRatio, timeout, back);
                this.helper.removeClassesAs(document.body, statics["a" /* CLASSES */].swipingOn);
                banner_classPrivateFieldSet(this, _isTracking, false);
                break;
            case "move":
                if (banner_classPrivateFieldGet(this, _isTracking)) {
                    let newRatio = (data.x - banner_classPrivateFieldGet(this, _startX)) / current.offsetWidth;
                    if (banner_classPrivateFieldGet(this, _ratio) >= 0 && newRatio <= 0 || banner_classPrivateFieldGet(this, _ratio) <= 0 && newRatio > 0) {
                        banner_classPrivateFieldGet(this, _swipeEngine).setProps(newRatio > 0 ? banner_classPrivateFieldGet(this, _swipeAnimation).current.right : banner_classPrivateFieldGet(this, _swipeAnimation).current.left);
                    }
                    banner_classPrivateFieldSet(this, _ratio, newRatio);
                    this.mutate(() => {
                        banner_classPrivateFieldGet(this, _swipeEngine).update(Math.abs(banner_classPrivateFieldGet(this, _ratio)));
                    });
                    data.event.preventDefault();
                }
                break;
            default:
                break;
        }
    }
    onSwipeFinish(element, reverted, error) {
        this.isLocked = false;
        if (!reverted) {
            this.helper.removeClass(this.activeClassName, this.element);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        }
        banner_classPrivateFieldSet(this, _ratio, 0);
        banner_classPrivateFieldSet(this, _startX, 0);
    }
}
_swipeEngine = new WeakMap(), _isTracking = new WeakMap(), _startX = new WeakMap(), _ratio = new WeakMap(), _swipeAnimation = new WeakMap(), _moveEventId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/builders/icon.js
var icon_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var icon_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var icon_element, _scale, _appender;

class icon_IconBuilder {
    constructor(svgString) {
        icon_element.set(this, void 0);
        _scale.set(this, void 0);
        _appender.set(this, void 0);
        icon_classPrivateFieldSet(this, icon_element, svgString);
        icon_classPrivateFieldSet(this, _scale, 1);
        icon_classPrivateFieldSet(this, _appender, new icon_IconScaleAppender());
    }
    setScale(scale) {
        icon_classPrivateFieldSet(this, _scale, scale);
        return this;
    }
    build() {
        let created = Object(functions["h" /* createElementFromString */])(icon_classPrivateFieldGet(this, icon_element));
        if (Object(functions["w" /* is */])(created) && icon_classPrivateFieldGet(this, _scale)) {
            // @ts-ignore created is checked already
            icon_classPrivateFieldGet(this, _appender).append(created, icon_classPrivateFieldGet(this, _scale));
        }
        return created;
    }
}
icon_element = new WeakMap(), _scale = new WeakMap(), _appender = new WeakMap();
class icon_IconScaleAppender {
    append(element, value) {
        let width = Object(functions["n" /* getIntOrDefault */])(element.getAttribute("width"), 20);
        let height = Object(functions["n" /* getIntOrDefault */])(element.getAttribute("height"), 20);
        element.setAttribute("width", (width * value).toString());
        element.setAttribute("height", (height * value).toString());
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/circle/circle.js
var circle_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var circle_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _factor, _full, _path, _attr, _progressEventId;




class circle_CuiCircleArgs {
    constructor() {
        this.progress = 0;
    }
    parse(val) {
        if (!Object(functions["w" /* is */])(val)) {
            this.progress = 0;
        }
        else if (Object(functions["y" /* isString */])(val)) {
            this.progress = Object(functions["n" /* getIntOrDefault */])(val, 0);
        }
        else {
            this.progress = Object(functions["n" /* getIntOrDefault */])(val.progress, 0);
        }
    }
}
class circle_CuiCircleComponent {
    constructor(prefix) {
        this.attribute = (prefix !== null && prefix !== void 0 ? prefix : 'cui') + '-circle-progress';
        statics["j" /* ICONS */]['special_circle_progress'] = "<svg xmlns=\"http://www.w3.org/2000/svg\"  class=\"circle-progress\" viewBox=\"0 0 100 100\" width=\"100\" height=\"100\"><path class=\"circle-progress-path\" d=\"M 50,5.3660047 A 44.867708,44.633994 0 0 1 94.867709,49.999997 44.867708,44.633994 0 0 1 50,94.633995 44.867708,44.633994 0 0 1 5.1322908,50.000001 44.867708,44.633994 0 0 1 50,5.3660047\"></path></svg>";
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new circle_CuiCircleHandler(element, utils, this.attribute);
    }
}
class circle_CuiCircleHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiCircleHandler", element, attribute, new circle_CuiCircleArgs(), utils);
        _factor.set(this, void 0);
        _full.set(this, void 0);
        _path.set(this, void 0);
        _attr.set(this, void 0);
        _progressEventId.set(this, void 0);
        circle_classPrivateFieldSet(this, _factor, circle_classPrivateFieldSet(this, _full, 0));
        circle_classPrivateFieldSet(this, _path, null);
        circle_classPrivateFieldSet(this, _attr, attribute);
        circle_classPrivateFieldSet(this, _progressEventId, null);
    }
    onInit() {
        const iconSvg = new icon_IconBuilder(statics["j" /* ICONS */]['special_circle_progress']).build();
        if (!Object(functions["w" /* is */])(iconSvg)) {
            this.logError("SVG circle was not created", "onInit");
            return;
        }
        const svg = this.element.querySelector('svg');
        if (Object(functions["w" /* is */])(svg)) {
            //@ts-ignore svg checked
            svg.remove();
        }
        //@ts-ignore iconSvg checked
        this.element.appendChild(iconSvg);
        circle_classPrivateFieldSet(this, _path, this.element.querySelector('.circle-progress-path'));
        circle_classPrivateFieldSet(this, _full, circle_classPrivateFieldGet(this, _path).getTotalLength());
        circle_classPrivateFieldSet(this, _factor, circle_classPrivateFieldGet(this, _full) / 100);
        this.fetch(this.readStyle);
        circle_classPrivateFieldSet(this, _progressEventId, this.onEvent(statics["i" /* EVENTS */].PROGRESS_CHANGE, this.onSetProgress.bind(this)));
    }
    onUpdate() {
        this.fetch(this.readStyle);
        this.emitEvent(statics["i" /* EVENTS */].PROGRESS_CHANGED, {
            timestamp: Date.now(),
            progress: this.args.progress
        });
    }
    onDestroy() {
        this.detachEvent(statics["i" /* EVENTS */].PROGRESS_CHANGE, circle_classPrivateFieldGet(this, _progressEventId));
    }
    onSetProgress(val) {
        if (Object(functions["w" /* is */])(val)) {
            this.element.setAttribute(circle_classPrivateFieldGet(this, _attr), val);
        }
    }
    updateStyle(value) {
        circle_classPrivateFieldGet(this, _path).style.strokeDashoffset = value;
    }
    readStyle() {
        if (this.prevArgs && this.args.progress === this.prevArgs.progress) {
            return;
        }
        const progress = Object(functions["r" /* getRangeValue */])(this.args.progress, 0, 100);
        this.mutate(this.updateStyle, circle_classPrivateFieldGet(this, _full) - circle_classPrivateFieldGet(this, _factor) * progress);
    }
}
_factor = new WeakMap(), _full = new WeakMap(), _path = new WeakMap(), _attr = new WeakMap(), _progressEventId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/close/close.js
var close_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var close_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var close_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var close_defTimeout, close_prefix, _eventId;




class close_CuiCloseArgs {
    constructor(timeout) {
        close_defTimeout.set(this, void 0);
        this.target = "";
        this.action = "";
        this.prevent = false;
        this.state = "";
        close_classPrivateFieldSet(this, close_defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        this.timeout = close_classPrivateFieldGet(this, close_defTimeout);
    }
    parse(args) {
        if (Object(functions["w" /* is */])(args) && Object(functions["y" /* isString */])(args)) {
            this.target = args;
            this.action = "";
            this.timeout = close_classPrivateFieldGet(this, close_defTimeout);
            this.prevent = false;
            this.state = "";
            return;
        }
        this.target = Object(functions["t" /* getStringOrDefault */])(args.target, "");
        this.action = args.action;
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, close_classPrivateFieldGet(this, close_defTimeout));
        this.prevent = args.prevent && Object(functions["z" /* isStringTrue */])(args.prevent);
        this.state = args.state;
    }
}
close_defTimeout = new WeakMap();
class CuiCloseComponent {
    constructor(prefix) {
        close_prefix.set(this, void 0);
        close_classPrivateFieldSet(this, close_prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${close_classPrivateFieldGet(this, close_prefix)}-close`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new close_CuiCloseHandler(element, utils, this.attribute, close_classPrivateFieldGet(this, close_prefix));
    }
}
close_prefix = new WeakMap();
class close_CuiCloseHandler extends CuiHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiCloseHandler", element, attribute, new close_CuiCloseArgs(utils.setup.animationTime), utils);
        _eventId.set(this, void 0);
        close_classPrivateFieldSet(this, _eventId, null);
        this.onClick = this.onClick.bind(this);
    }
    onInit() {
        this.element.addEventListener('click', this.onClick);
        close_classPrivateFieldSet(this, _eventId, this.onEvent(statics["i" /* EVENTS */].CLOSE, this.onClose.bind(this)));
    }
    onUpdate() {
        //
    }
    onDestroy() {
        this.element.removeEventListener('click', this.onClick);
        this.detachEvent(statics["i" /* EVENTS */].CLOSE, close_classPrivateFieldGet(this, _eventId));
    }
    onClick(ev) {
        this.onClose(ev);
        if (this.args.prevent)
            ev.preventDefault();
    }
    onClose(ev) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget();
        if (!Object(functions["w" /* is */])(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick');
            return;
        }
        this.isLocked = true;
        //@ts-ignore target is checked
        this.run(target).then((result) => {
            this.onActionFinish(ev, result);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        });
    }
    run(target) {
        return close_awaiter(this, void 0, void 0, function* () {
            let cuiId = target.$cuid;
            if (Object(functions["w" /* is */])(cuiId)) {
                yield this.utils.bus.emit(statics["i" /* EVENTS */].CLOSE, cuiId, this.args.state);
                return false;
            }
            else if (Object(functions["b" /* are */])(this.args.action, this.args.timeout)) {
                let actions = utils_actions["a" /* CuiActionsListFactory */].get(this.args.action);
                return this.actionsHelper.performActions(target, actions, this.args.timeout, () => {
                    this.removeActiveClass(target);
                });
            }
            else {
                this.removeActiveClassAsync(target);
                return true;
            }
        });
    }
    removeActiveClass(target) {
        if (Object(functions["w" /* is */])(target) && this.helper.hasClass(this.activeClassName, target)) {
            this.helper.removeClass(this.activeClassName, target);
        }
    }
    removeActiveClassAsync(target) {
        this.fetch(() => {
            if (Object(functions["w" /* is */])(target) && this.helper.hasClass(this.activeClassName, target)) {
                this.helper.removeClassesAs(target, this.activeClassName);
            }
        });
    }
    onActionFinish(ev, shouldEmit) {
        if (shouldEmit)
            this.emitClose(ev);
    }
    getTarget() {
        var _a;
        if (!Object(functions["w" /* is */])(this.args.target)) {
            return Object(functions["q" /* getParentCuiElement */])(this.element);
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : Object(functions["q" /* getParentCuiElement */])(this.element);
    }
    emitClose(ev) {
        this.emitEvent(statics["i" /* EVENTS */].CLOSED, {
            timestamp: Date.now(),
            state: this.args.state,
            event: ev
        });
    }
}
_eventId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/cover/cover.js
var cover_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var cover_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var cover_defTimeout, cover_prefix, cover_prefix_1, _bodyClass, _scrollY;



const COVER_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const COVER_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const bodyClass = '{prefix}-cover-open';
class cover_CuiCoverArgs {
    constructor(prefix, defTimeout) {
        cover_defTimeout.set(this, void 0);
        cover_prefix.set(this, void 0);
        cover_classPrivateFieldSet(this, cover_defTimeout, defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300);
        cover_classPrivateFieldSet(this, cover_prefix, prefix);
        this.escClose = false;
        this.timeout = cover_classPrivateFieldGet(this, cover_defTimeout);
        this.openAct = "";
        this.closeAct = "";
        this.keyClose = "";
    }
    parse(args) {
        this.escClose = Object(functions["z" /* isStringTrue */])(args.escClose);
        this.keyClose = args.keyClose;
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, cover_classPrivateFieldGet(this, cover_defTimeout));
        this.openAct = Object(functions["t" /* getStringOrDefault */])(args.openAct, Object(functions["D" /* replacePrefix */])(COVER_OPEN_ANIMATION_CLASS, cover_classPrivateFieldGet(this, cover_prefix)));
        this.closeAct = Object(functions["t" /* getStringOrDefault */])(args.closeAct, Object(functions["D" /* replacePrefix */])(COVER_CLOSE_ANIMATION_CLASS, cover_classPrivateFieldGet(this, cover_prefix)));
    }
}
cover_defTimeout = new WeakMap(), cover_prefix = new WeakMap();
class CuiCoverComponent {
    constructor(prefix) {
        cover_prefix_1.set(this, void 0);
        cover_classPrivateFieldSet(this, cover_prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${cover_classPrivateFieldGet(this, cover_prefix_1)}-cover`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new cover_CuiCoverHandler(element, utils, this.attribute, cover_classPrivateFieldGet(this, cover_prefix_1));
    }
}
cover_prefix_1 = new WeakMap();
class cover_CuiCoverHandler extends base_CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiDialogHandler", element, attribute, new cover_CuiCoverArgs(prefix, utils.setup.animationTimeLong), utils);
        _bodyClass.set(this, void 0);
        _scrollY.set(this, void 0);
        cover_classPrivateFieldSet(this, _bodyClass, Object(functions["D" /* replacePrefix */])(bodyClass, prefix));
        cover_classPrivateFieldSet(this, _scrollY, 0);
    }
    onInit() {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
    }
    onUpdate() {
    }
    onDestroy() {
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        cover_classPrivateFieldSet(this, _scrollY, window.pageYOffset);
        return true;
    }
    onAfterOpen() {
        this.helper.setClass(cover_classPrivateFieldGet(this, _bodyClass), document.body);
        document.body.style.top = `-${cover_classPrivateFieldGet(this, _scrollY)}px`;
        AriaAttributes.setAria(this.element, 'aria-hidden', "false");
    }
    onAfterClose() {
        document.body.style.top = '';
        window.scrollTo(0, (cover_classPrivateFieldGet(this, _scrollY) || 0) * -1);
        cover_classPrivateFieldSet(this, _scrollY, 0);
        this.helper.removeClass(cover_classPrivateFieldGet(this, _bodyClass), document.body);
        AriaAttributes.setAria(this.element, 'aria-hidden', "true");
    }
    onBeforeClose() {
        return true;
    }
    isAnyActive() {
        return this.helper.hasClass(cover_classPrivateFieldGet(this, _bodyClass), document.body);
    }
}
_bodyClass = new WeakMap(), _scrollY = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/dialog/dialog.js
var dialog_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var dialog_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var dialog_defTimeout, dialog_prefix, dialog_prefix_1, _prefix_2, dialog_bodyClass, dialog_scrollY, _windowClickEventId;




const DIALOG_OPEN_ANIMATION_CLASS = '.{prefix}-dialog-default-in';
const DIALOG_CLOSE_ANIMATION_CLASS = '.{prefix}-dialog-default-out';
const dialog_dialog_bodyClass = '{prefix}-dialog-open';
const CONTAINER = '.{prefix}-dialog-container';
class dialog_CuiDialogArgs {
    constructor(prefix, defTimeout) {
        dialog_defTimeout.set(this, void 0);
        dialog_prefix.set(this, void 0);
        dialog_classPrivateFieldSet(this, dialog_defTimeout, defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300);
        dialog_classPrivateFieldSet(this, dialog_prefix, prefix);
        this.escClose = false;
        this.outClose = false;
        this.timeout = dialog_classPrivateFieldGet(this, dialog_defTimeout);
        this.openAct = "";
        this.closeAct = "";
        this.keyClose = "";
    }
    parse(args) {
        this.escClose = Object(functions["z" /* isStringTrue */])(args.escClose);
        this.outClose = Object(functions["z" /* isStringTrue */])(args.outClose);
        this.keyClose = args.keyClose;
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, dialog_classPrivateFieldGet(this, dialog_defTimeout));
        this.openAct = Object(functions["t" /* getStringOrDefault */])(args.openAct, Object(functions["D" /* replacePrefix */])(DIALOG_OPEN_ANIMATION_CLASS, dialog_classPrivateFieldGet(this, dialog_prefix)));
        this.closeAct = Object(functions["t" /* getStringOrDefault */])(args.closeAct, Object(functions["D" /* replacePrefix */])(DIALOG_CLOSE_ANIMATION_CLASS, dialog_classPrivateFieldGet(this, dialog_prefix)));
    }
}
dialog_defTimeout = new WeakMap(), dialog_prefix = new WeakMap();
class CuiDialogComponent {
    constructor(prefix) {
        dialog_prefix_1.set(this, void 0);
        dialog_classPrivateFieldSet(this, dialog_prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${dialog_classPrivateFieldGet(this, dialog_prefix_1)}-dialog`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new dialog_CuiDialogHandler(element, utils, this.attribute, dialog_classPrivateFieldGet(this, dialog_prefix_1));
    }
}
dialog_prefix_1 = new WeakMap();
class dialog_CuiDialogHandler extends base_CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiDialogHandler", element, attribute, new dialog_CuiDialogArgs(prefix, utils.setup.animationTimeLong), utils);
        _prefix_2.set(this, void 0);
        dialog_bodyClass.set(this, void 0);
        dialog_scrollY.set(this, void 0);
        _windowClickEventId.set(this, void 0);
        dialog_classPrivateFieldSet(this, dialog_bodyClass, Object(functions["D" /* replacePrefix */])(dialog_dialog_bodyClass, prefix));
        dialog_classPrivateFieldSet(this, _prefix_2, prefix);
        dialog_classPrivateFieldSet(this, dialog_scrollY, 0);
        dialog_classPrivateFieldSet(this, _windowClickEventId, null);
    }
    onInit() {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
    }
    onUpdate() {
    }
    onDestroy() {
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        dialog_classPrivateFieldSet(this, dialog_scrollY, window.pageYOffset);
        return true;
    }
    onAfterOpen() {
        if (this.args.outClose) {
            dialog_classPrivateFieldSet(this, _windowClickEventId, this.onEvent(statics["i" /* EVENTS */].WINDOW_CLICK, this.onWindowClick.bind(this)));
        }
        this.helper.setClass(dialog_classPrivateFieldGet(this, dialog_bodyClass), document.body);
        document.body.style.top = `-${dialog_classPrivateFieldGet(this, dialog_scrollY)}px`;
    }
    onAfterClose() {
        document.body.style.top = '';
        window.scrollTo(0, (dialog_classPrivateFieldGet(this, dialog_scrollY) || 0) * -1);
        dialog_classPrivateFieldSet(this, dialog_scrollY, 0);
        this.helper.removeClass(dialog_classPrivateFieldGet(this, dialog_bodyClass), document.body);
        this.detachEvent(statics["i" /* EVENTS */].WINDOW_CLICK, dialog_classPrivateFieldGet(this, _windowClickEventId));
    }
    onBeforeClose() {
        return true;
    }
    isAnyActive() {
        return this.helper.hasClass(dialog_classPrivateFieldGet(this, dialog_bodyClass), document.body);
    }
    onWindowClick(ev) {
        let container = this.element.querySelector(Object(functions["D" /* replacePrefix */])(CONTAINER, dialog_classPrivateFieldGet(this, _prefix_2)));
        if (container && !container.contains(ev.target)) {
            this.close('out').then(() => {
                this._log.debug("Closed by click outside");
            });
        }
    }
}
_prefix_2 = new WeakMap(), dialog_bodyClass = new WeakMap(), dialog_scrollY = new WeakMap(), _windowClickEventId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/listeners/hover.js
var hover_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var hover_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _target, _callback, _inProgress, _isHovering, _isAttached, _onOverBound, _onMoveBound, _onOutBound;

class hover_CuiHoverListener {
    constructor(target) {
        _target.set(this, void 0);
        _callback.set(this, void 0);
        _inProgress.set(this, void 0);
        _isHovering.set(this, void 0);
        _isAttached.set(this, void 0);
        _onOverBound.set(this, void 0);
        _onMoveBound.set(this, void 0);
        _onOutBound.set(this, void 0);
        hover_classPrivateFieldSet(this, _target, target);
        hover_classPrivateFieldSet(this, _inProgress, false);
        hover_classPrivateFieldSet(this, _isHovering, false);
        hover_classPrivateFieldSet(this, _isAttached, false);
        hover_classPrivateFieldSet(this, _callback, undefined);
        hover_classPrivateFieldSet(this, _onMoveBound, this.onMouseMove.bind(this));
        hover_classPrivateFieldSet(this, _onOutBound, this.onMouseOut.bind(this));
        hover_classPrivateFieldSet(this, _onOverBound, this.onMouseOver.bind(this));
    }
    setCallback(callback) {
        hover_classPrivateFieldSet(this, _callback, callback);
    }
    isInProgress() {
        return hover_classPrivateFieldGet(this, _inProgress);
    }
    attach() {
        // @ts-ignore
        hover_classPrivateFieldGet(this, _target).addEventListener("mouseover", hover_classPrivateFieldGet(this, _onOverBound));
        // @ts-ignore
        hover_classPrivateFieldGet(this, _target).addEventListener("mousemove", hover_classPrivateFieldGet(this, _onMoveBound));
        // @ts-ignore
        hover_classPrivateFieldGet(this, _target).addEventListener("mouseout", hover_classPrivateFieldGet(this, _onOutBound));
        hover_classPrivateFieldSet(this, _isAttached, true);
    }
    detach() {
        // @ts-ignore
        hover_classPrivateFieldGet(this, _target).removeEventListener("mouseover", hover_classPrivateFieldGet(this, _onOverBound));
        // @ts-ignore
        hover_classPrivateFieldGet(this, _target).removeEventListener("mousemove", hover_classPrivateFieldGet(this, _onMoveBound));
        // @ts-ignore
        hover_classPrivateFieldGet(this, _target).removeEventListener("mouseout", hover_classPrivateFieldGet(this, _onOutBound));
        hover_classPrivateFieldSet(this, _isAttached, false);
    }
    emit(mouseEvent, force) {
        if (!Object(functions["b" /* are */])(hover_classPrivateFieldGet(this, _callback))) {
            return;
        }
        if (!force && hover_classPrivateFieldGet(this, _inProgress)) {
            return;
        }
        hover_classPrivateFieldSet(this, _inProgress, true);
        window.requestAnimationFrame(this.invoke.bind(this, {
            isHovering: hover_classPrivateFieldGet(this, _isHovering),
            event: mouseEvent,
            timestamp: Date.now()
        }));
    }
    isAttached() {
        return hover_classPrivateFieldGet(this, _isAttached);
    }
    invoke(ev) {
        if (hover_classPrivateFieldGet(this, _callback))
            hover_classPrivateFieldGet(this, _callback).call(this, ev);
        hover_classPrivateFieldSet(this, _inProgress, false);
    }
    onMouseOver(ev) {
        hover_classPrivateFieldSet(this, _isHovering, true);
        this.emit(ev, true);
    }
    onMouseOut(ev) {
        hover_classPrivateFieldSet(this, _isHovering, false);
        this.emit(ev, true);
    }
    onMouseMove(ev) {
        this.emit(ev, false);
    }
}
_target = new WeakMap(), _callback = new WeakMap(), _inProgress = new WeakMap(), _isHovering = new WeakMap(), _isAttached = new WeakMap(), _onOverBound = new WeakMap(), _onMoveBound = new WeakMap(), _onOutBound = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/position/evaluator.js
var evaluator_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var evaluator_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _box, _targetWidth, _targetHeight, _margin;


class evaluator_CuiBasePositionEvaluator {
    constructor() {
        _box.set(this, void 0);
        _targetWidth.set(this, void 0);
        _targetHeight.set(this, void 0);
        _margin.set(this, void 0);
        evaluator_classPrivateFieldSet(this, _targetHeight, -1);
        evaluator_classPrivateFieldSet(this, _targetWidth, -1);
        evaluator_classPrivateFieldSet(this, _box, undefined);
        evaluator_classPrivateFieldSet(this, _margin, 0);
    }
    setElementBox(box) {
        evaluator_classPrivateFieldSet(this, _box, box);
    }
    setTarget(width, height) {
        evaluator_classPrivateFieldSet(this, _targetWidth, width);
        evaluator_classPrivateFieldSet(this, _targetHeight, height);
    }
    setMargin(value) {
        evaluator_classPrivateFieldSet(this, _margin, value);
    }
    getVerticalPosition(value) {
        switch (value) {
            case 'top':
                return this.getTopPosition();
            case "bottom":
                return this.getBottomPosition();
            case "middle":
                return this.getMiddlePosition();
            default:
                return -1;
        }
    }
    getHorizontalPosition(value) {
        switch (value) {
            case 'left':
                return this.getLeftPosition();
            case "right":
                return this.getRightPosition();
            case "center":
                return this.getCenterPosition();
            default:
                return -1;
        }
    }
    getAutoVerticalPosition(initial) {
        let innerHeight = window.innerHeight;
        let number = this.getVerticalPosition(initial);
        if ((initial === 'top' || initial === "middle") && number < 0) {
            return [this.getVerticalPosition("bottom"), "bottom"];
        }
        else if ((initial === "bottom" || initial === "middle") && number + evaluator_classPrivateFieldGet(this, _targetHeight) > innerHeight) {
            return [this.getVerticalPosition("top"), "top"];
        }
        return [number, initial];
    }
    getAutoHorizontalPosition(initial) {
        let innerWidth = window.innerWidth;
        let number = this.getHorizontalPosition(initial);
        if ((initial === 'right' || initial === "center") && number < 0) {
            return [this.getHorizontalPosition("left"), "left"];
        }
        else if ((initial === 'left' || initial === "center") && number + evaluator_classPrivateFieldGet(this, _targetWidth) > innerWidth) {
            return [this.getHorizontalPosition("right"), "right"];
        }
        return [number, initial];
    }
    getTopPosition() {
        this.throwIfNotValid("getTopPosition");
        // @ts-ignore - already checked in validate
        return evaluator_classPrivateFieldGet(this, _box).top - evaluator_classPrivateFieldGet(this, _margin) - evaluator_classPrivateFieldGet(this, _targetHeight);
    }
    getBottomPosition() {
        this.throwIfNotValid("getBottomPosition");
        // @ts-ignore - already checked in validate
        return evaluator_classPrivateFieldGet(this, _box).top + evaluator_classPrivateFieldGet(this, _box).height + evaluator_classPrivateFieldGet(this, _margin);
    }
    getMiddlePosition() {
        this.throwIfNotValid("getMiddlePosition");
        // @ts-ignore - already checked in validate
        return (evaluator_classPrivateFieldGet(this, _box).top + evaluator_classPrivateFieldGet(this, _box).height / 2) - evaluator_classPrivateFieldGet(this, _targetHeight) / 2;
    }
    getLeftPosition() {
        this.throwIfNotValid("getLeftPosition");
        // @ts-ignore - already checked in validate
        return evaluator_classPrivateFieldGet(this, _box).left;
    }
    getRightPosition() {
        this.throwIfNotValid("getRightPosition");
        // @ts-ignore - already checked in validate
        return evaluator_classPrivateFieldGet(this, _box).left + evaluator_classPrivateFieldGet(this, _box).width - evaluator_classPrivateFieldGet(this, _targetWidth);
    }
    getCenterPosition() {
        this.throwIfNotValid("getCenterPosition");
        // @ts-ignore - already checked in validate
        return (evaluator_classPrivateFieldGet(this, _box).left + evaluator_classPrivateFieldGet(this, _box).width / 2) - evaluator_classPrivateFieldGet(this, _targetWidth) / 2;
    }
    validate() {
        return Object(functions["w" /* is */])(evaluator_classPrivateFieldGet(this, _box)) && evaluator_classPrivateFieldGet(this, _targetHeight) > 0 && evaluator_classPrivateFieldGet(this, _targetWidth) > 0;
    }
    throwIfNotValid(method) {
        if (!this.validate()) {
            throw new errors["f" /* CuiPositionError */](`[${method}] Position cannot be calculated: missing data [width: ${evaluator_classPrivateFieldGet(this, _targetWidth)}][height: ${evaluator_classPrivateFieldGet(this, _targetHeight)}]`);
        }
    }
}
_box = new WeakMap(), _targetWidth = new WeakMap(), _targetHeight = new WeakMap(), _margin = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/position/calculator.js
var calculator_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var calculator_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _static, _preferred, _evaluator, _log;



class calculator_CuiBasePositionCalculator {
    constructor(evaluator) {
        _static.set(this, void 0);
        _preferred.set(this, void 0);
        _evaluator.set(this, void 0);
        _log.set(this, void 0);
        calculator_classPrivateFieldSet(this, _preferred, "top-center");
        calculator_classPrivateFieldSet(this, _static, "");
        calculator_classPrivateFieldSet(this, _evaluator, evaluator !== null && evaluator !== void 0 ? evaluator : new evaluator_CuiBasePositionEvaluator());
        calculator_classPrivateFieldSet(this, _log, logger["a" /* CuiLoggerFactory */].get("CuiBasePositionCalculator"));
    }
    setMargin(value) {
        calculator_classPrivateFieldGet(this, _evaluator).setMargin(value);
    }
    setPreferred(position) {
        calculator_classPrivateFieldSet(this, _preferred, position);
    }
    setStatic(position) {
        calculator_classPrivateFieldSet(this, _static, position);
    }
    calculate(elementBox, targetWidth, targetHeight) {
        calculator_classPrivateFieldGet(this, _evaluator).setElementBox(elementBox);
        calculator_classPrivateFieldGet(this, _evaluator).setTarget(targetWidth, targetHeight);
        if (Object(functions["w" /* is */])(calculator_classPrivateFieldGet(this, _static))) {
            calculator_classPrivateFieldGet(this, _log).debug("Evaluating static position");
            const [vertical, horizontal] = this.parse(calculator_classPrivateFieldGet(this, _static));
            return [calculator_classPrivateFieldGet(this, _evaluator).getHorizontalPosition(horizontal), calculator_classPrivateFieldGet(this, _evaluator).getVerticalPosition(vertical), calculator_classPrivateFieldGet(this, _static)];
        }
        let [vertical, horizontal] = ["", ""];
        if (Object(functions["w" /* is */])(calculator_classPrivateFieldGet(this, _preferred))) {
            calculator_classPrivateFieldGet(this, _log).debug("Evaluating auto position");
            [vertical, horizontal] = this.parse(calculator_classPrivateFieldGet(this, _preferred));
        }
        vertical = vertical !== null && vertical !== void 0 ? vertical : "top";
        horizontal = horizontal !== null && horizontal !== void 0 ? horizontal : "center";
        const joined = [vertical, horizontal].join("-");
        calculator_classPrivateFieldGet(this, _log).debug("Calculating position: " + vertical + "-" + horizontal);
        const [outVNum, outVPos] = calculator_classPrivateFieldGet(this, _evaluator).getAutoVerticalPosition(vertical);
        const [outHNum, outHPos] = calculator_classPrivateFieldGet(this, _evaluator).getAutoHorizontalPosition(horizontal);
        calculator_classPrivateFieldGet(this, _log).debug("Calculated position: " + outVPos + "-" + outHPos);
        return [outHNum, outVNum, outVPos + "-" + outHPos];
    }
    parse(position) {
        return position.split("-");
    }
}
_static = new WeakMap(), _preferred = new WeakMap(), _evaluator = new WeakMap(), _log = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/utils/task.js
var task_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var task_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _taskId, _autoRenew, task_timeout, task_callback;

class task_CuiTaskRunner {
    constructor(timeout, autoRenew, callback) {
        _taskId.set(this, void 0);
        _autoRenew.set(this, void 0);
        task_timeout.set(this, void 0);
        task_callback.set(this, void 0);
        task_classPrivateFieldSet(this, _autoRenew, autoRenew);
        task_classPrivateFieldSet(this, task_timeout, timeout);
        task_classPrivateFieldSet(this, task_callback, callback);
    }
    start() {
        if (!this.canRun()) {
            return;
        }
        this.stop();
        task_classPrivateFieldSet(this, _taskId, setTimeout(() => {
            //@ts-ignore - already checked in canRun
            task_classPrivateFieldGet(this, task_callback).call(this);
            task_classPrivateFieldSet(this, _taskId, null);
            if (task_classPrivateFieldGet(this, _autoRenew)) {
                this.start();
            }
        }, task_classPrivateFieldGet(this, task_timeout)));
    }
    stop() {
        if (task_classPrivateFieldGet(this, _taskId)) {
            clearTimeout(task_classPrivateFieldGet(this, _taskId));
            task_classPrivateFieldSet(this, _taskId, null);
        }
    }
    getId() {
        return task_classPrivateFieldGet(this, _taskId);
    }
    canRun() {
        return Object(functions["w" /* is */])(task_classPrivateFieldGet(this, task_callback)) && task_classPrivateFieldGet(this, task_timeout) > 0;
    }
    setCallback(callback) {
        task_classPrivateFieldSet(this, task_callback, callback);
    }
    setTimeout(timeout) {
        task_classPrivateFieldSet(this, task_timeout, timeout);
    }
}
_taskId = new WeakMap(), _autoRenew = new WeakMap(), task_timeout = new WeakMap(), task_callback = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/drop/drop.js
var drop_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var drop_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var drop_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _defOpenAct, drop_prefix, drop_prefix_1, drop_bodyClass, drop_attribute, _triggerHoverListener, _hoverListener, _trigger, drop_windowClickEventId, drop_openEventId, drop_closeEventId, _positionCalculator, _posClass, _dropParentCls, _autoTask, _actions;








const drop_drop_bodyClass = '{prefix}-drop-open';
const DROP_POSITION = "{prefix}-drop-position-";
const DROP_TRIGGER = "{prefix}-drop-trigger";
const DROP_DEFAULT_TRIGGER = "> a, button";
class drop_CuiDropArgs {
    constructor(prefix) {
        _defOpenAct.set(this, void 0);
        drop_classPrivateFieldSet(this, _defOpenAct, Object(functions["D" /* replacePrefix */])('{prefix}-drop-animation-in', prefix));
        this.mode = "click";
        this.trigger = DROP_DEFAULT_TRIGGER;
        this.autoClose = false;
        this.outClose = false;
        this.prevent = false;
        this.pos = "";
        this.action = drop_classPrivateFieldGet(this, _defOpenAct);
        this.timeout = 3000;
        this.margin = 8;
    }
    parse(args) {
        this.mode = Object(functions["t" /* getStringOrDefault */])(args.mode, 'click').toLowerCase();
        this.trigger = statics["k" /* SCOPE_SELECTOR */] + Object(functions["t" /* getStringOrDefault */])(args.trigger, DROP_DEFAULT_TRIGGER);
        this.prevent = Object(functions["z" /* isStringTrue */])(args.prevent);
        this.autoClose = Object(functions["z" /* isStringTrue */])(args.autoClose);
        this.outClose = args.outClose ? Object(functions["z" /* isStringTrue */])(args.outClose) : true;
        this.pos = Object(functions["t" /* getStringOrDefault */])(args.pos, "");
        this.action = Object(functions["t" /* getStringOrDefault */])(args.action, drop_classPrivateFieldGet(this, _defOpenAct));
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, 3000);
        this.margin = Object(functions["n" /* getIntOrDefault */])(args.margin, 8);
    }
}
_defOpenAct = new WeakMap();
class CuiDropComponenet {
    constructor(prefix) {
        drop_prefix.set(this, void 0);
        drop_classPrivateFieldSet(this, drop_prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${drop_classPrivateFieldGet(this, drop_prefix)}-drop`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new drop_CuiDropHandler(element, utils, this.attribute, drop_classPrivateFieldGet(this, drop_prefix));
    }
}
drop_prefix = new WeakMap();
class drop_CuiDropHandler extends CuiHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuidropHandler", element, attribute, new drop_CuiDropArgs(prefix), utils);
        drop_prefix_1.set(this, void 0);
        drop_bodyClass.set(this, void 0);
        drop_attribute.set(this, void 0);
        _triggerHoverListener.set(this, void 0);
        _hoverListener.set(this, void 0);
        _trigger.set(this, void 0);
        drop_windowClickEventId.set(this, void 0);
        drop_openEventId.set(this, void 0);
        drop_closeEventId.set(this, void 0);
        _positionCalculator.set(this, void 0);
        _posClass.set(this, void 0);
        _dropParentCls.set(this, void 0);
        _autoTask.set(this, void 0);
        _actions.set(this, void 0);
        drop_classPrivateFieldSet(this, drop_attribute, attribute);
        drop_classPrivateFieldSet(this, drop_prefix_1, prefix);
        drop_classPrivateFieldSet(this, drop_bodyClass, Object(functions["D" /* replacePrefix */])(drop_drop_bodyClass, prefix));
        drop_classPrivateFieldSet(this, _hoverListener, new hover_CuiHoverListener(this.element));
        drop_classPrivateFieldGet(this, _hoverListener).setCallback(this.onElementHover.bind(this));
        drop_classPrivateFieldSet(this, drop_windowClickEventId, null);
        drop_classPrivateFieldSet(this, drop_openEventId, null);
        drop_classPrivateFieldSet(this, drop_closeEventId, null);
        this.onTriggerClick = this.onTriggerClick.bind(this);
        drop_classPrivateFieldSet(this, _positionCalculator, new calculator_CuiBasePositionCalculator());
        drop_classPrivateFieldGet(this, _positionCalculator).setMargin(8);
        drop_classPrivateFieldGet(this, _positionCalculator).setPreferred("bottom-left");
        drop_classPrivateFieldSet(this, _posClass, "");
        drop_classPrivateFieldSet(this, _dropParentCls, Object(functions["D" /* replacePrefix */])(DROP_TRIGGER, prefix));
        drop_classPrivateFieldSet(this, _triggerHoverListener, undefined);
        drop_classPrivateFieldSet(this, _trigger, this.element);
        drop_classPrivateFieldSet(this, _actions, []);
        drop_classPrivateFieldSet(this, _autoTask, new task_CuiTaskRunner(this.args.timeout, false, this.close.bind(this)));
        ;
    }
    onInit() {
        drop_classPrivateFieldSet(this, _trigger, this.acquireTrigger());
        drop_classPrivateFieldSet(this, _triggerHoverListener, new hover_CuiHoverListener(drop_classPrivateFieldGet(this, _trigger)));
        this.setTriggerEvent();
        drop_classPrivateFieldSet(this, drop_openEventId, this.onEvent(statics["i" /* EVENTS */].OPEN, this.open.bind(this)));
        drop_classPrivateFieldSet(this, drop_closeEventId, this.onEvent(statics["i" /* EVENTS */].CLOSE, this.close.bind(this)));
        drop_classPrivateFieldGet(this, _positionCalculator).setStatic(this.args.pos);
        drop_classPrivateFieldGet(this, _positionCalculator).setMargin(this.args.margin);
        drop_classPrivateFieldSet(this, _autoTask, new task_CuiTaskRunner(this.args.timeout, false, this.close.bind(this)));
        drop_classPrivateFieldSet(this, _actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
        this.mutate(() => {
            AriaAttributes.setAria(this.element, 'aria-dropdown', "");
            if (this.element.parentElement && !this.helper.hasClass(drop_classPrivateFieldGet(this, _dropParentCls), this.element.parentElement)) {
                this.helper.setClass(drop_classPrivateFieldGet(this, _dropParentCls), this.element.parentElement);
            }
        });
        this._log.debug("Initialized", "handle");
    }
    onUpdate() {
        if (drop_classPrivateFieldGet(this, _triggerHoverListener) && drop_classPrivateFieldGet(this, _triggerHoverListener).isAttached()) {
            drop_classPrivateFieldGet(this, _triggerHoverListener).detach();
        }
        else if (this.prevArgs && this.prevArgs.mode === 'click') {
            //@ts-ignore 
            drop_classPrivateFieldGet(this, _trigger).removeEventListener('click', this.onTriggerClick);
        }
        drop_classPrivateFieldSet(this, _trigger, this.acquireTrigger());
        drop_classPrivateFieldSet(this, _triggerHoverListener, new hover_CuiHoverListener(drop_classPrivateFieldGet(this, _trigger)));
        this.setTriggerEvent();
        drop_classPrivateFieldGet(this, _positionCalculator).setStatic(this.args.pos);
        drop_classPrivateFieldGet(this, _positionCalculator).setMargin(this.args.margin);
        drop_classPrivateFieldSet(this, _actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
        drop_classPrivateFieldGet(this, _autoTask).setTimeout(this.args.timeout);
    }
    onDestroy() {
        this.detachEvent(statics["i" /* EVENTS */].OPEN, drop_classPrivateFieldGet(this, drop_openEventId));
        this.detachEvent(statics["i" /* EVENTS */].CLOSE, drop_classPrivateFieldGet(this, drop_closeEventId));
        if (this.element.parentElement) {
            this.mutate(() => {
                //@ts-ignore
                this.helper.removeClass(drop_classPrivateFieldGet(this, _dropParentCls), this.element.parentElement);
            });
        }
    }
    /**
    * Api Method open
    */
    open() {
        return drop_awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn('open')) {
                return false;
            }
            if (this.isActive()) {
                return this.close();
            }
            if (this.isAnyActive()) {
                yield this.findAndCloseOpenedDrop();
            }
            this.isLocked = true;
            this._log.debug(`Drop ${this.cuid}`, 'open');
            this.onOpen();
            this.isLocked = false;
            return true;
        });
    }
    /**
     * Api Method close
     */
    close() {
        return drop_awaiter(this, void 0, void 0, function* () {
            if (this.checkLockAndWarn("close") || !this.isActive()) {
                return false;
            }
            this.isLocked = true;
            this._log.debug(`Drop ${this.cuid}`, 'close');
            this.onClose();
            this.detachEvent(statics["i" /* EVENTS */].WINDOW_CLICK, drop_classPrivateFieldGet(this, drop_windowClickEventId));
            this.emitEvent(statics["i" /* EVENTS */].CLOSED, {
                timestamp: Date.now()
            });
            drop_classPrivateFieldGet(this, _hoverListener).detach();
            this.isLocked = false;
            return true;
        });
    }
    onClose() {
        this.mutate(() => {
            this.helper.removeClass(this.activeClassName, this.element);
            this.helper.removeClass(drop_classPrivateFieldGet(this, drop_bodyClass), document.body);
            this.toggleActions();
            this.helper.removeClass(drop_classPrivateFieldGet(this, _posClass), this.element);
            AriaAttributes.setAria(this.element, 'aria-expanded', 'false');
        });
    }
    onOpen() {
        this.helper.setClass(this.activeClassName, this.element);
        this.mutate(() => {
            const box = drop_classPrivateFieldGet(this, _trigger).getBoundingClientRect();
            try {
                const [x, y, pos] = drop_classPrivateFieldGet(this, _positionCalculator).calculate(box, this.element.offsetWidth, this.element.offsetHeight);
                this.element.style.top = `${y - box.top}px`;
                this.element.style.left = `${x - box.left}px`;
                drop_classPrivateFieldSet(this, _posClass, Object(functions["D" /* replacePrefix */])(DROP_POSITION + pos, drop_classPrivateFieldGet(this, drop_prefix_1)));
                this.toggleActions();
                this.helper.setClass(drop_classPrivateFieldGet(this, _posClass), this.element);
                this.helper.setClass(drop_classPrivateFieldGet(this, drop_bodyClass), document.body);
                this.emitEvent(statics["i" /* EVENTS */].OPENED, {
                    timestamp: Date.now()
                });
                drop_classPrivateFieldGet(this, _hoverListener).attach();
                this.runAutoCloseTask();
                if (this.args.outClose) {
                    drop_classPrivateFieldSet(this, drop_windowClickEventId, this.onEvent(statics["i" /* EVENTS */].WINDOW_CLICK, this.onWindowClick.bind(this)));
                }
                AriaAttributes.setAria(this.element, 'aria-expanded', 'true');
            }
            catch (e) {
                this._log.exception(e);
            }
        });
    }
    /**
     * Event invoked when window is clicked
     * @param ev
     */
    onWindowClick(ev) {
        if (!this.element.contains(ev.target)) {
            this.close();
        }
    }
    isAnyActive() {
        return this.helper.hasClass(drop_classPrivateFieldGet(this, drop_bodyClass), document.body);
    }
    /**
     * Finds and opens other active drop element
     */
    findAndCloseOpenedDrop() {
        return drop_awaiter(this, void 0, void 0, function* () {
            const opened = document.querySelector(`[${drop_classPrivateFieldGet(this, drop_attribute)}].${this.activeClassName}`);
            if (!Object(functions["w" /* is */])(opened)) {
                this._log.warning("Opened drop was not found");
                return false;
            }
            //@ts-ignore opened checked
            const handler = opened.$handlers[drop_classPrivateFieldGet(this, drop_attribute)];
            if (!Object(functions["w" /* is */])(handler)) {
                this._log.warning("Drop handler was not found in the element");
                return false;
            }
            return handler.close();
        });
    }
    /**
     * Invoked when trigger button is clicked
     * @param ev
     */
    onTriggerClick(ev) {
        if (this.isActive()) {
            this.close();
        }
        else {
            this.open();
        }
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }
    /**
    * Invoked when trigger button is hovered on
    * @param ev
    */
    onHoverEvent(ev) {
        if (ev.isHovering && !this.isActive()) {
            this.open();
        }
        if (this.args.prevent) {
            ev.event.preventDefault();
        }
    }
    /**
     * Method triggered when opened element is hovered on
     * @param ev
     */
    onElementHover(ev) {
        if (ev.isHovering) {
            drop_classPrivateFieldGet(this, _autoTask).stop();
        }
        else if (!ev.isHovering && this.args.autoClose) {
            this.runAutoCloseTask();
        }
    }
    /**
     * Sets event on trigger button
     */
    setTriggerEvent() {
        if (this.args.mode === 'hover' && drop_classPrivateFieldGet(this, _triggerHoverListener)) {
            drop_classPrivateFieldGet(this, _triggerHoverListener).setCallback(this.onHoverEvent.bind(this));
            drop_classPrivateFieldGet(this, _triggerHoverListener).attach();
        }
        else {
            //@ts-ignore
            drop_classPrivateFieldGet(this, _trigger).addEventListener('click', this.onTriggerClick);
        }
    }
    /**
     * Runs auto-close task on opened element
     */
    runAutoCloseTask() {
        if (!this.args.autoClose) {
            return;
        }
        drop_classPrivateFieldGet(this, _autoTask).start();
    }
    toggleActions() {
        drop_classPrivateFieldGet(this, _actions).forEach(action => {
            action.toggle(this.element);
        });
    }
    acquireTrigger() {
        let ret = null;
        if (!this.element.parentElement) {
            ret = document.querySelector(this.args.trigger);
        }
        else
            ret = this.element.parentElement.querySelector(this.args.trigger);
        return ret !== null && ret !== void 0 ? ret : this.element;
    }
}
drop_prefix_1 = new WeakMap(), drop_bodyClass = new WeakMap(), drop_attribute = new WeakMap(), _triggerHoverListener = new WeakMap(), _hoverListener = new WeakMap(), _trigger = new WeakMap(), drop_windowClickEventId = new WeakMap(), drop_openEventId = new WeakMap(), drop_closeEventId = new WeakMap(), _positionCalculator = new WeakMap(), _posClass = new WeakMap(), _dropParentCls = new WeakMap(), _autoTask = new WeakMap(), _actions = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/listeners/move.js
var move = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/float/helpers.js
var helpers_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var helpers_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var helpers_element, helpers_element_1, _element_2;
class BasePositionCalculator {
    calculate(x, y, diffX, diffY) {
        return [x, y];
    }
}
class OptionalPositionCalculator {
    constructor(element) {
        helpers_element.set(this, void 0);
        helpers_classPrivateFieldSet(this, helpers_element, element);
    }
    calculate(x, y, diffX, diffY) {
        let newX = helpers_classPrivateFieldGet(this, helpers_element).offsetLeft + diffX;
        let newY = helpers_classPrivateFieldGet(this, helpers_element).offsetTop + diffY;
        return [newX, newY];
    }
}
helpers_element = new WeakMap();
class BaseResizeCalculator {
    constructor(element) {
        helpers_element_1.set(this, void 0);
        helpers_classPrivateFieldSet(this, helpers_element_1, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = x - helpers_classPrivateFieldGet(this, helpers_element_1).offsetLeft;
        let height = y - helpers_classPrivateFieldGet(this, helpers_element_1).offsetTop;
        return [width, height];
    }
}
helpers_element_1 = new WeakMap();
class OptionalResizeCalculator {
    constructor(element) {
        _element_2.set(this, void 0);
        helpers_classPrivateFieldSet(this, _element_2, element);
    }
    calculate(x, y, diffX, diffY) {
        let width = helpers_classPrivateFieldGet(this, _element_2).offsetWidth + diffX;
        let height = helpers_classPrivateFieldGet(this, _element_2).offsetHeight + diffY;
        return [width, height];
    }
}
_element_2 = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/float/float.js
var float_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var float_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var float_defTimeout, float_prefix, float_prefix_1, _isMoving, _isResizing, _prevX, _prevY, float_prefix_2, _moveListener, float_positionCalculator, _resizeCalculator, _resizeBtn, _moveBtn;






const FLOAT_OPEN_ANIMATION_CLASS = '.{prefix}-float-default-in';
const FLOAT_CLOSE_ANIMATION_CLASS = '.{prefix}-float-default-out';
const MOVE = '.{prefix}-float-move';
const RESIZE = '.{prefix}-float-resize';
class float_CuiFloatArgs {
    constructor(prefix, defTimeout) {
        float_defTimeout.set(this, void 0);
        float_prefix.set(this, void 0);
        float_classPrivateFieldSet(this, float_defTimeout, defTimeout !== null && defTimeout !== void 0 ? defTimeout : 300);
        float_classPrivateFieldSet(this, float_prefix, prefix);
        this.escClose = false;
        this.keyClose = "";
        this.openAct = "";
        this.closeAct = "";
        this.timeout = float_classPrivateFieldGet(this, float_defTimeout);
    }
    parse(args) {
        this.escClose = Object(functions["z" /* isStringTrue */])(args.escClose);
        this.keyClose = args.keyClose;
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, float_classPrivateFieldGet(this, float_defTimeout));
        this.openAct = Object(functions["t" /* getStringOrDefault */])(args.openAct, Object(functions["D" /* replacePrefix */])(FLOAT_OPEN_ANIMATION_CLASS, float_classPrivateFieldGet(this, float_prefix)));
        this.closeAct = Object(functions["t" /* getStringOrDefault */])(args.closeAct, Object(functions["D" /* replacePrefix */])(FLOAT_CLOSE_ANIMATION_CLASS, float_classPrivateFieldGet(this, float_prefix)));
    }
}
float_defTimeout = new WeakMap(), float_prefix = new WeakMap();
class CuiFloatComponent {
    constructor(prefix) {
        float_prefix_1.set(this, void 0);
        float_classPrivateFieldSet(this, float_prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${float_classPrivateFieldGet(this, float_prefix_1)}-float`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new float_CuiFloatHandler(element, utils, this.attribute, float_classPrivateFieldGet(this, float_prefix_1));
    }
}
float_prefix_1 = new WeakMap();
class float_CuiFloatHandler extends base_CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiFloatHandler", element, attribute, new float_CuiFloatArgs(prefix, utils.setup.animationTime), utils);
        _isMoving.set(this, void 0);
        _isResizing.set(this, void 0);
        _prevX.set(this, void 0);
        _prevY.set(this, void 0);
        float_prefix_2.set(this, void 0);
        _moveListener.set(this, void 0);
        float_positionCalculator.set(this, void 0);
        _resizeCalculator.set(this, void 0);
        _resizeBtn.set(this, void 0);
        _moveBtn.set(this, void 0);
        float_classPrivateFieldSet(this, _isMoving, false);
        float_classPrivateFieldSet(this, _isResizing, false);
        float_classPrivateFieldSet(this, _prevX, 0);
        float_classPrivateFieldSet(this, _prevY, 0);
        float_classPrivateFieldSet(this, _moveListener, new move["a" /* CuiMoveEventListener */]());
        float_classPrivateFieldGet(this, _moveListener).preventDefault(false);
        float_classPrivateFieldSet(this, float_positionCalculator, new BasePositionCalculator());
        float_classPrivateFieldSet(this, _resizeCalculator, new BaseResizeCalculator(element));
        float_classPrivateFieldSet(this, float_prefix_2, prefix);
        this.move = this.move.bind(this);
        this.resize = this.resize.bind(this);
        float_classPrivateFieldSet(this, _moveBtn, null);
        float_classPrivateFieldSet(this, _resizeBtn, null);
    }
    onInit() {
        AriaAttributes.setAria(this.element, 'aria-modal', "");
        float_classPrivateFieldSet(this, _moveBtn, this.element.querySelector(Object(functions["D" /* replacePrefix */])(MOVE, float_classPrivateFieldGet(this, float_prefix_2))));
        float_classPrivateFieldSet(this, _resizeBtn, this.element.querySelector(Object(functions["D" /* replacePrefix */])(RESIZE, float_classPrivateFieldGet(this, float_prefix_2))));
        float_classPrivateFieldGet(this, _moveListener).setCallback(this.onMove.bind(this));
    }
    onUpdate() {
    }
    onDestroy() {
    }
    onBeforeOpen() {
        return true;
    }
    onAfterOpen() {
        float_classPrivateFieldGet(this, _moveListener).attach();
    }
    onAfterClose() {
        float_classPrivateFieldGet(this, _moveListener).detach();
    }
    onBeforeClose() {
        return true;
    }
    onMove(ev) {
        switch (ev.type) {
            case 'down':
                this.onMouseDown(ev);
                break;
            case 'up':
                this.onMouseUp(ev);
                break;
            case 'move':
                this.onMouseMove(ev);
                break;
        }
    }
    onMouseDown(ev) {
        if (ev.target === float_classPrivateFieldGet(this, _moveBtn)) {
            float_classPrivateFieldSet(this, _isMoving, true);
            ev.event.preventDefault();
        }
        else if (ev.target === float_classPrivateFieldGet(this, _resizeBtn)) {
            float_classPrivateFieldSet(this, _isResizing, true);
            ev.event.preventDefault();
            //this.helper.setClass("cui-float-resize-shadow")
        }
        float_classPrivateFieldSet(this, _prevX, ev.x);
        float_classPrivateFieldSet(this, _prevY, ev.y);
        this.helper.setClassesAs(document.body, statics["a" /* CLASSES */].swipingOn);
        // Lock global move handler
        this.utils.bus.emit(statics["i" /* EVENTS */].MOVE_LOCK, null, true);
    }
    onMouseMove(ev) {
        if (float_classPrivateFieldGet(this, _isMoving)) {
            this.peform(ev, this.move);
        }
        else if (float_classPrivateFieldGet(this, _isResizing)) {
            this.peform(ev, this.resize);
        }
    }
    onMouseUp(ev) {
        float_classPrivateFieldSet(this, _isMoving, false);
        float_classPrivateFieldSet(this, _isResizing, false);
        this.helper.removeClassesAs(document.body, statics["a" /* CLASSES */].swipingOn);
        // Unlock global handler
        this.utils.bus.emit(statics["i" /* EVENTS */].MOVE_LOCK, null, false);
    }
    peform(ev, callback) {
        this.mutate(() => {
            if (Object(functions["w" /* is */])(callback))
                callback(this.element, ev.x, ev.y, (ev.x - float_classPrivateFieldGet(this, _prevX)), (ev.y - float_classPrivateFieldGet(this, _prevY)));
            float_classPrivateFieldSet(this, _prevX, ev.x);
            float_classPrivateFieldSet(this, _prevY, ev.y);
        });
        ev.event.preventDefault();
    }
    resize(element, x, y, diffX, diffY) {
        let [newWidth, newHeight] = float_classPrivateFieldGet(this, _resizeCalculator).calculate(x, y, diffX, diffY);
        if (this.fitsWindow(element.offsetTop, element.offsetLeft, newWidth, newHeight)) {
            this.mutate(() => {
                element.style.width = newWidth + "px";
                element.style.height = newHeight + "px";
            });
        }
    }
    move(element, x, y, diffX, diffY) {
        let [newX, newY] = float_classPrivateFieldGet(this, float_positionCalculator).calculate(x, y, diffX, diffY);
        if (this.fitsWindow(newY, newX, element.offsetWidth, element.offsetHeight)) {
            this.mutate(() => {
                element.style.left = newX + "px";
                element.style.top = newY + "px";
            });
        }
    }
    fitsWindow(top, left, width, height) {
        return (top + height < window.innerHeight - 10) &&
            (top > 10) && (left > 10) &&
            (left + width < window.innerWidth - 10);
    }
}
_isMoving = new WeakMap(), _isResizing = new WeakMap(), _prevX = new WeakMap(), _prevY = new WeakMap(), float_prefix_2 = new WeakMap(), _moveListener = new WeakMap(), float_positionCalculator = new WeakMap(), _resizeCalculator = new WeakMap(), _resizeBtn = new WeakMap(), _moveBtn = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/icon/icon.js
var icon_icon_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var icon_icon_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _currentIcon;




class icon_CuiIconArgs {
    constructor() {
        this.icon = "";
        this.scale = 1;
    }
    parse(val) {
        if (Object(functions["y" /* isString */])(val)) {
            this.icon = Object(functions["t" /* getStringOrDefault */])(val, "");
        }
        else {
            this.icon = Object(functions["t" /* getStringOrDefault */])(val.icon, "");
            this.scale = Object(functions["n" /* getIntOrDefault */])(val.scale, 1);
        }
    }
}
class CuiIconComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-icon`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new icon_CuiIconHandler(element, utils, this.attribute);
    }
}
class icon_CuiIconHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiIconHandler", element, attribute, new icon_CuiIconArgs(), utils);
        _currentIcon.set(this, void 0);
        icon_icon_classPrivateFieldSet(this, _currentIcon, null);
    }
    onInit() {
        if (icon_icon_classPrivateFieldGet(this, _currentIcon) !== null) {
            this._log.debug("Icon already initialized");
            return;
        }
        this.addIcon(this.args.icon);
        icon_icon_classPrivateFieldSet(this, _currentIcon, this.args.icon);
    }
    onUpdate() {
        if (this.args.icon === icon_icon_classPrivateFieldGet(this, _currentIcon)) {
            return;
        }
        this.addIcon(this.args.icon);
        icon_icon_classPrivateFieldSet(this, _currentIcon, this.args.icon);
    }
    onDestroy() {
        const svg = this.element.querySelector('svg');
        if (Object(functions["w" /* is */])(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        icon_icon_classPrivateFieldSet(this, _currentIcon, null);
    }
    addIcon(icon) {
        const iconStr = icon ? statics["j" /* ICONS */][icon] : null;
        if (!iconStr) {
            return;
        }
        const iconSvg = new icon_IconBuilder(iconStr).setScale(this.args.scale).build();
        const svg = this.element.querySelector('svg');
        if (Object(functions["w" /* is */])(svg)) {
            //@ts-ignore checked
            svg.remove();
        }
        if (this.element.childNodes.length > 0) {
            this.mutate(this.insertBefore, iconSvg);
        }
        else {
            this.mutate(this.appendChild, iconSvg);
        }
    }
    insertBefore(iconElement) {
        this.element.insertBefore(iconElement, this.element.firstChild);
    }
    appendChild(iconElement) {
        this.element.appendChild(iconElement);
    }
}
_currentIcon = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/observers/intersection.js
var intersection_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var intersection_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _observer, _root, _threshold, intersection_callback;
class CuiIntersectionEntry {
    constructor() {
        this.isInView = false;
        this.ratio = 0;
    }
}
/**
 * Creates a wrapper for intersection observer
 * Constructor gets a root element for observer and optional array of threshold values [0...1]
 */
class CuiIntersectionObserver {
    constructor(root, threshold) {
        _observer.set(this, void 0);
        _root.set(this, void 0);
        _threshold.set(this, void 0);
        intersection_callback.set(this, void 0);
        intersection_classPrivateFieldSet(this, _root, root);
        intersection_classPrivateFieldSet(this, _threshold, threshold !== null && threshold !== void 0 ? threshold : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
        intersection_classPrivateFieldSet(this, intersection_callback, undefined);
        intersection_classPrivateFieldSet(this, _observer, undefined);
    }
    setCallback(callback) {
        intersection_classPrivateFieldSet(this, intersection_callback, callback);
    }
    connect() {
        if (!intersection_classPrivateFieldGet(this, intersection_callback)) {
            return;
        }
        intersection_classPrivateFieldSet(this, _observer, new IntersectionObserver(intersection_classPrivateFieldGet(this, intersection_callback), {
            root: intersection_classPrivateFieldGet(this, _root),
            rootMargin: '0px',
            threshold: intersection_classPrivateFieldGet(this, _threshold)
        }));
    }
    observe(target) {
        if (intersection_classPrivateFieldGet(this, _observer))
            intersection_classPrivateFieldGet(this, _observer).observe(target);
    }
    unobserve(target) {
        if (intersection_classPrivateFieldGet(this, _observer))
            intersection_classPrivateFieldGet(this, _observer).unobserve(target);
    }
    disconnect() {
        if (intersection_classPrivateFieldGet(this, _observer))
            intersection_classPrivateFieldGet(this, _observer).disconnect();
    }
}
_observer = new WeakMap(), _root = new WeakMap(), _threshold = new WeakMap(), intersection_callback = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/intersection/intersection.js
var intersection_intersection_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var intersection_intersection_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var intersection_observer, intersection_targets, intersection_actions;





const DEFAULT_SELCTOR = "> *";
/**
 * Intersection
 * Toggles action in/out when target is intersecting with the screen
 *
 * Set this on scrollable element
 * target - children selector
 * offset - 0...1 - tells how much target must intersecting with the screen
 * action - action to trigger
 */
class intersection_CuiIntersectionAttributes {
    constructor() {
        this.target = "div";
        this.action = "";
        this.offset = 0;
        this.isRoot = false;
    }
    parse(args) {
        this.target = Object(functions["w" /* is */])(args.target) ? statics["k" /* SCOPE_SELECTOR */] + args.target : statics["k" /* SCOPE_SELECTOR */] + DEFAULT_SELCTOR;
        this.action = Object(functions["t" /* getStringOrDefault */])(args.action, "");
        this.offset = Object(functions["s" /* getRangeValueOrDefault */])(parseFloat(args.offset), 0, 1, 0);
        this.isRoot = Object(functions["z" /* isStringTrue */])(args.isRoot);
    }
}
class CuiIntersectionComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-intersection`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new intersection_CuiIntersectionHandler(element, utils, this.attribute);
    }
}
class intersection_CuiIntersectionHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiIntersectionHandler", element, attribute, new intersection_CuiIntersectionAttributes(), utils);
        intersection_observer.set(this, void 0);
        intersection_targets.set(this, void 0);
        intersection_actions.set(this, void 0);
        intersection_intersection_classPrivateFieldSet(this, intersection_observer, new CuiIntersectionObserver(this.element));
        intersection_intersection_classPrivateFieldSet(this, intersection_targets, []);
        intersection_intersection_classPrivateFieldSet(this, intersection_actions, []);
    }
    onInit() {
        this.parseArguments();
        intersection_intersection_classPrivateFieldGet(this, intersection_observer).setCallback(this.onIntersection.bind(this));
        intersection_intersection_classPrivateFieldGet(this, intersection_observer).connect();
        intersection_intersection_classPrivateFieldGet(this, intersection_targets).forEach(target => {
            intersection_intersection_classPrivateFieldGet(this, intersection_observer).observe(target);
        });
    }
    onUpdate() {
        this.parseArguments();
    }
    onDestroy() {
        intersection_intersection_classPrivateFieldGet(this, intersection_observer).disconnect();
    }
    parseArguments() {
        // @ts-ignore prevArgs is correct
        if (!Object(functions["w" /* is */])(this.prevArgs) || (this.prevArgs.target !== this.args.target)) {
            let el = this.args.isRoot ? document.body : this.element;
            intersection_intersection_classPrivateFieldSet(this, intersection_targets, [...el.querySelectorAll(this.args.target)]);
        }
        intersection_intersection_classPrivateFieldSet(this, intersection_actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
    }
    onIntersection(entries, observer) {
        if (!Object(functions["w" /* is */])(intersection_intersection_classPrivateFieldGet(this, intersection_targets))) {
            return;
        }
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= this.args.offset) {
                this.addActions(entry.target);
            }
            else {
                this.removeActions(entry.target);
            }
            this.emitIntersection(entry);
        });
    }
    emitIntersection(entry) {
        this.emitEvent(statics["i" /* EVENTS */].INTERSECTION, {
            entry: entry,
            offset: this.args.offset,
            timestamp: Date.now()
        });
    }
    addActions(element) {
        intersection_intersection_classPrivateFieldGet(this, intersection_actions).forEach(action => action.add(element));
    }
    removeActions(element) {
        intersection_intersection_classPrivateFieldGet(this, intersection_actions).forEach(action => action.remove(element));
    }
}
intersection_observer = new WeakMap(), intersection_targets = new WeakMap(), intersection_actions = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/offcanvas/offcanvas.js
var offcanvas_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var offcanvas_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var offcanvas_prefix, offcanvas_defTimeout, offcanvas_prefix_1, offcanvas_prefix_2, offcanvas_bodyClass, offcanvas_scrollY, offcanvas_windowClickEventId;




const OFFCANVAS_RIGHT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-right-in";
const OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-right-out";
const OFFCANVAS_LEFT_ANIM_DEFAULT_IN = ".{prefix}-offcanvas-default-left-in";
const OFFCANVAS_LEFT_ANIM_DEFAULT_OUT = ".{prefix}-offcanvas-default-left-out";
const OFFCANVAS_BODY = "{prefix}-off-canvas-open";
const OFFCANVAS_CONTAINER_CLS = '.{prefix}-off-canvas-container';
class offcanvas_CuiOffCanvasArgs {
    constructor(prefix, timeout) {
        offcanvas_prefix.set(this, void 0);
        offcanvas_defTimeout.set(this, void 0);
        offcanvas_classPrivateFieldSet(this, offcanvas_defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        offcanvas_classPrivateFieldSet(this, offcanvas_prefix, prefix);
        this.escClose = false;
        this.position = 'right';
        this.openAct = this.getDefaultOpenClass();
        this.closeAct = this.getDefaultCloseClass();
        this.timeout = offcanvas_classPrivateFieldGet(this, offcanvas_defTimeout);
        this.outClose = false;
        this.keyClose = "";
    }
    parse(args) {
        if (Object(functions["w" /* is */])(args)) {
            this.escClose = Object(functions["z" /* isStringTrue */])(args.escClose);
            this.outClose = Object(functions["z" /* isStringTrue */])(args.outClose);
            this.position = Object(functions["t" /* getStringOrDefault */])(args.position, 'right');
            this.openAct = Object(functions["t" /* getStringOrDefault */])(args.openAct, this.getDefaultOpenClass());
            this.closeAct = Object(functions["t" /* getStringOrDefault */])(args.closeAct, this.getDefaultCloseClass());
            this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, offcanvas_classPrivateFieldGet(this, offcanvas_defTimeout));
            this.keyClose = args.keyClose;
        }
    }
    getDefaultOpenClass() {
        return Object(functions["D" /* replacePrefix */])(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_IN : OFFCANVAS_LEFT_ANIM_DEFAULT_IN, offcanvas_classPrivateFieldGet(this, offcanvas_prefix));
    }
    getDefaultCloseClass() {
        return Object(functions["D" /* replacePrefix */])(this.position === 'right' ? OFFCANVAS_RIGHT_ANIM_DEFAULT_OUT : OFFCANVAS_LEFT_ANIM_DEFAULT_OUT, offcanvas_classPrivateFieldGet(this, offcanvas_prefix));
    }
}
offcanvas_prefix = new WeakMap(), offcanvas_defTimeout = new WeakMap();
class CuiOffCanvasComponent {
    constructor(prefix) {
        offcanvas_prefix_1.set(this, void 0);
        offcanvas_classPrivateFieldSet(this, offcanvas_prefix_1, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${offcanvas_classPrivateFieldGet(this, offcanvas_prefix_1)}-off-canvas`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new offcanvas_CuiOffCanvasHandler(element, utils, this.attribute, offcanvas_classPrivateFieldGet(this, offcanvas_prefix_1));
    }
}
offcanvas_prefix_1 = new WeakMap();
class offcanvas_CuiOffCanvasHandler extends base_CuiInteractableHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiOffCanvasHandler", element, attribute, new offcanvas_CuiOffCanvasArgs(prefix, utils.setup.animationTime), utils);
        offcanvas_prefix_2.set(this, void 0);
        offcanvas_bodyClass.set(this, void 0);
        offcanvas_scrollY.set(this, void 0);
        offcanvas_windowClickEventId.set(this, void 0);
        offcanvas_classPrivateFieldSet(this, offcanvas_prefix_2, prefix);
        offcanvas_classPrivateFieldSet(this, offcanvas_bodyClass, Object(functions["D" /* replacePrefix */])(OFFCANVAS_BODY, prefix));
        offcanvas_classPrivateFieldSet(this, offcanvas_windowClickEventId, null);
        offcanvas_classPrivateFieldSet(this, offcanvas_scrollY, 0);
    }
    onInit() {
        this.mutate(() => {
            this.setPositionLeft();
            AriaAttributes.setAria(this.element, 'aria-modal', "");
        });
    }
    onUpdate() {
        this.setPositionLeft();
    }
    onDestroy() {
    }
    onBeforeOpen() {
        if (this.isAnyActive()) {
            return false;
        }
        offcanvas_classPrivateFieldSet(this, offcanvas_scrollY, window.pageYOffset);
        return true;
    }
    onAfterOpen() {
        if (this.args.outClose) {
            offcanvas_classPrivateFieldSet(this, offcanvas_windowClickEventId, this.onEvent(statics["i" /* EVENTS */].WINDOW_CLICK, this.onWindowClick.bind(this)));
        }
        this.helper.setClass(offcanvas_classPrivateFieldGet(this, offcanvas_bodyClass), document.body);
        document.body.style.top = `-${scrollY}px`;
    }
    onAfterClose() {
        this.detachEvent(statics["i" /* EVENTS */].WINDOW_CLICK, offcanvas_classPrivateFieldGet(this, offcanvas_windowClickEventId));
        this.helper.removeClass(offcanvas_classPrivateFieldGet(this, offcanvas_bodyClass), document.body);
        document.body.style.top = '';
        window.scrollTo(0, offcanvas_classPrivateFieldGet(this, offcanvas_scrollY) * -1);
    }
    onBeforeClose() {
        return true;
    }
    onWindowClick(ev) {
        const container = this.element.querySelector(Object(functions["D" /* replacePrefix */])(OFFCANVAS_CONTAINER_CLS, offcanvas_classPrivateFieldGet(this, offcanvas_prefix_2)));
        if (container && !container.contains(ev.target)) {
            this.close();
        }
    }
    isAnyActive() {
        return this.helper.hasClass(offcanvas_classPrivateFieldGet(this, offcanvas_bodyClass), document.body);
    }
    setPositionLeft() {
        let cls = Object(functions["o" /* getName */])(offcanvas_classPrivateFieldGet(this, offcanvas_prefix_2), 'left');
        if (this.args.position === 'left' && !this.helper.hasClass(cls, this.element)) {
            this.helper.setClass(cls, this.element);
        }
        else if (this.args.position == 'right' && this.helper.hasClass(cls, this.element)) {
            this.helper.removeClass(cls, this.element);
        }
    }
}
offcanvas_prefix_2 = new WeakMap(), offcanvas_bodyClass = new WeakMap(), offcanvas_scrollY = new WeakMap(), offcanvas_windowClickEventId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/models/elements.js
var elements_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var elements_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var elements_box, elements_element, elements_element_1;
class CuiElementBoxFactory {
    static get(element) {
        if (element instanceof Window) {
            return new WindowElementBox();
        }
        else if (element instanceof HTMLElement) {
            return new HTMLElementBox(element);
        }
        return new ElementBox(element);
    }
}
class ElementBox {
    constructor(element) {
        elements_box.set(this, void 0);
        elements_element.set(this, void 0);
        elements_classPrivateFieldSet(this, elements_element, element);
        elements_classPrivateFieldSet(this, elements_box, element.getBoundingClientRect());
    }
    getHeight() {
        return elements_classPrivateFieldGet(this, elements_box).height;
    }
    getWidth() {
        return elements_classPrivateFieldGet(this, elements_box).width;
    }
    getTop() {
        return elements_classPrivateFieldGet(this, elements_box).top;
    }
    getLeft() {
        return elements_classPrivateFieldGet(this, elements_box).left;
    }
    getScrollHeight() {
        return elements_classPrivateFieldGet(this, elements_element).scrollHeight;
    }
    getScrollWidth() {
        return elements_classPrivateFieldGet(this, elements_element).scrollWidth;
    }
    getScrollTop() {
        return elements_classPrivateFieldGet(this, elements_element).scrollTop;
    }
    getScrollLeft() {
        return elements_classPrivateFieldGet(this, elements_element).scrollLeft;
    }
    queryAll(selector) {
        return [...elements_classPrivateFieldGet(this, elements_element).querySelectorAll(selector)];
    }
}
elements_box = new WeakMap(), elements_element = new WeakMap();
class HTMLElementBox {
    constructor(element) {
        elements_element_1.set(this, void 0);
        elements_classPrivateFieldSet(this, elements_element_1, element);
    }
    getHeight() {
        return elements_classPrivateFieldGet(this, elements_element_1).offsetHeight;
    }
    getWidth() {
        return elements_classPrivateFieldGet(this, elements_element_1).offsetWidth;
    }
    getTop() {
        return elements_classPrivateFieldGet(this, elements_element_1).offsetTop;
    }
    getLeft() {
        return elements_classPrivateFieldGet(this, elements_element_1).offsetLeft;
    }
    getScrollHeight() {
        return elements_classPrivateFieldGet(this, elements_element_1).scrollHeight;
    }
    getScrollWidth() {
        return elements_classPrivateFieldGet(this, elements_element_1).scrollWidth;
    }
    getScrollTop() {
        return elements_classPrivateFieldGet(this, elements_element_1).scrollTop;
    }
    getScrollLeft() {
        return elements_classPrivateFieldGet(this, elements_element_1).scrollLeft;
    }
    queryAll(selector) {
        return [...elements_classPrivateFieldGet(this, elements_element_1).querySelectorAll(selector)];
    }
}
elements_element_1 = new WeakMap();
class WindowElementBox {
    getHeight() {
        return window.innerHeight;
    }
    getWidth() {
        return window.innerWidth;
    }
    getTop() {
        return 0;
    }
    getLeft() {
        return 0;
    }
    getScrollHeight() {
        return window.innerHeight;
    }
    getScrollWidth() {
        return window.innerWidth;
    }
    getScrollTop() {
        return window.pageYOffset;
    }
    getScrollLeft() {
        return window.pageXOffset;
    }
    queryAll(selector) {
        return [...document.querySelectorAll(selector)];
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/listeners/scroll.js
var scroll_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var scroll_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var scroll_target, scroll_inProgress, scroll_threshold, scroll_prevX, scroll_prevY, scroll_callback, scroll_isAttached, scroll_box, _task, _listener;



const DEFAULT_SCROLL_END_TIMEOUT = 50;
class scroll_CuiScrollListener {
    constructor(target, threshold) {
        scroll_target.set(this, void 0);
        scroll_inProgress.set(this, void 0);
        scroll_threshold.set(this, void 0);
        scroll_prevX.set(this, void 0);
        scroll_prevY.set(this, void 0);
        scroll_callback.set(this, void 0);
        scroll_isAttached.set(this, void 0);
        scroll_box.set(this, void 0);
        _task.set(this, void 0);
        _listener.set(this, void 0);
        scroll_classPrivateFieldSet(this, scroll_target, target);
        scroll_classPrivateFieldSet(this, scroll_box, CuiElementBoxFactory.get(target));
        scroll_classPrivateFieldSet(this, scroll_inProgress, false);
        scroll_classPrivateFieldSet(this, scroll_threshold, Object(functions["s" /* getRangeValueOrDefault */])(threshold, 0, 100, 0));
        scroll_classPrivateFieldSet(this, scroll_prevX, scroll_classPrivateFieldSet(this, scroll_prevY, 0));
        scroll_classPrivateFieldSet(this, scroll_isAttached, false);
        scroll_classPrivateFieldSet(this, scroll_callback, undefined);
        scroll_classPrivateFieldSet(this, _task, new task_CuiTaskRunner(DEFAULT_SCROLL_END_TIMEOUT, false, this.onScrollFinish.bind(this)));
        scroll_classPrivateFieldSet(this, _listener, this.listener.bind(this));
    }
    setCallback(callback) {
        scroll_classPrivateFieldSet(this, scroll_callback, callback);
    }
    attach() {
        scroll_classPrivateFieldGet(this, scroll_target).addEventListener('scroll', scroll_classPrivateFieldGet(this, _listener));
        scroll_classPrivateFieldSet(this, scroll_isAttached, true);
        this.listener(undefined, true, "init");
    }
    detach() {
        scroll_classPrivateFieldGet(this, scroll_target).removeEventListener('scroll', scroll_classPrivateFieldGet(this, _listener));
        scroll_classPrivateFieldGet(this, _task).stop();
        scroll_classPrivateFieldSet(this, scroll_isAttached, false);
    }
    setTarget(target) {
        if (target !== scroll_classPrivateFieldGet(this, scroll_target)) {
            this.detach();
            scroll_classPrivateFieldSet(this, scroll_target, target);
            this.attach();
        }
    }
    setThreshold(threshold) {
        scroll_classPrivateFieldSet(this, scroll_threshold, Object(functions["s" /* getRangeValueOrDefault */])(threshold, 0, 100, 0));
    }
    isInProgress() {
        return scroll_classPrivateFieldGet(this, scroll_inProgress);
    }
    isAttached() {
        return scroll_classPrivateFieldGet(this, scroll_isAttached);
    }
    listener(ev, initial, source) {
        if (!Object(functions["w" /* is */])(scroll_classPrivateFieldGet(this, scroll_callback))) {
            return;
        }
        let left = scroll_classPrivateFieldGet(this, scroll_box).getScrollLeft();
        let top = scroll_classPrivateFieldGet(this, scroll_box).getScrollTop();
        scroll_classPrivateFieldSet(this, scroll_prevX, scroll_classPrivateFieldGet(this, scroll_prevX) + left);
        scroll_classPrivateFieldSet(this, scroll_prevY, scroll_classPrivateFieldGet(this, scroll_prevY) + top);
        if (scroll_classPrivateFieldGet(this, scroll_inProgress) || (!this.passedThreshold() && Object(functions["w" /* is */])(ev))) {
            return;
        }
        scroll_classPrivateFieldSet(this, scroll_inProgress, true);
        // @ts-ignore - callback already checked
        scroll_classPrivateFieldGet(this, scroll_callback).call(this, {
            base: ev,
            top: top,
            left: left,
            initial: initial !== null && initial !== void 0 ? initial : false,
            scrolling: Object(functions["w" /* is */])(ev),
            source: source !== null && source !== void 0 ? source : "event"
        });
        if (Object(functions["w" /* is */])(ev))
            scroll_classPrivateFieldGet(this, _task).start();
        scroll_classPrivateFieldSet(this, scroll_inProgress, false);
        scroll_classPrivateFieldSet(this, scroll_prevX, 0);
        scroll_classPrivateFieldSet(this, scroll_prevY, 0);
    }
    passedThreshold() {
        return scroll_classPrivateFieldGet(this, scroll_threshold) <= 0 || (scroll_classPrivateFieldGet(this, scroll_prevX) >= scroll_classPrivateFieldGet(this, scroll_threshold) || scroll_classPrivateFieldGet(this, scroll_prevY) >= scroll_classPrivateFieldGet(this, scroll_threshold));
    }
    onScrollFinish() {
        this.listener(undefined, false, "task");
    }
}
scroll_target = new WeakMap(), scroll_inProgress = new WeakMap(), scroll_threshold = new WeakMap(), scroll_prevX = new WeakMap(), scroll_prevY = new WeakMap(), scroll_callback = new WeakMap(), scroll_isAttached = new WeakMap(), scroll_box = new WeakMap(), _task = new WeakMap(), _listener = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/offset/modes.js
var modes_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var modes_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _pointLeft, _pointTop, _prevDiffY, _prevDiffX, _wasTriggeredX, _wasTriggeredY, modes_threshold;
class CuiOffsetStaticMode {
    matches(top, left, offsetX, offsetY) {
        return (offsetX > 0 && left >= offsetX) ||
            (offsetY > 0 && top >= offsetY);
    }
}
/**
 * Dynamically calculates whether to trigger or untrigger an action.
 * If current value exceedes offset and threshold action is triggered.
 * If action was triggered and current move is lower than threshold action is untriggered
 *
 * Example: If offsetY is 100, then first after 100 action is set on. It is kept when scrolling down.
 * If user decides to scroll up and difference between turning point and current is bigger than threshold then action is set off.
 *
 * Example usage is with navbar - it shall disappear after offset and return back when user scrolls up.
 */
class CuiOffsetDynamicMode {
    constructor() {
        _pointLeft.set(this, void 0);
        _pointTop.set(this, void 0);
        _prevDiffY.set(this, void 0);
        _prevDiffX.set(this, void 0);
        _wasTriggeredX.set(this, void 0);
        _wasTriggeredY.set(this, void 0);
        modes_threshold.set(this, void 0);
        modes_classPrivateFieldSet(this, _pointLeft, 0);
        modes_classPrivateFieldSet(this, _pointTop, 0);
        modes_classPrivateFieldSet(this, _prevDiffX, 0);
        modes_classPrivateFieldSet(this, _prevDiffY, 0);
        modes_classPrivateFieldSet(this, modes_threshold, 100);
        modes_classPrivateFieldSet(this, _wasTriggeredX, false);
        modes_classPrivateFieldSet(this, _wasTriggeredY, false);
    }
    matches(top, left, offsetX, offsetY) {
        return this.fitsOffsetY(top, offsetY) || this.fitsOffsetX(left, offsetX);
    }
    fitsOffsetX(left, offsetX) {
        if (offsetX <= 0)
            return false;
        let diffX = left - modes_classPrivateFieldGet(this, _pointLeft);
        if (left >= offsetX && diffX > modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredX, true);
        }
        else if (modes_classPrivateFieldGet(this, _wasTriggeredX) && diffX < -modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredX, false);
        }
        if (diffX < 0 && modes_classPrivateFieldGet(this, _prevDiffX) < diffX || diffX >= 0 && modes_classPrivateFieldGet(this, _prevDiffX) > diffX) {
            modes_classPrivateFieldSet(this, _pointLeft, left);
        }
        modes_classPrivateFieldSet(this, _prevDiffX, diffX);
        return modes_classPrivateFieldGet(this, _wasTriggeredX);
    }
    fitsOffsetY(top, offsetY) {
        if (offsetY <= 0) {
            return false;
        }
        let diffY = top - modes_classPrivateFieldGet(this, _pointTop);
        if (top >= offsetY && diffY > modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredY, true);
        }
        else if (modes_classPrivateFieldGet(this, _wasTriggeredY) && diffY < -modes_classPrivateFieldGet(this, modes_threshold)) {
            modes_classPrivateFieldSet(this, _wasTriggeredY, false);
        }
        if (diffY < 0 && modes_classPrivateFieldGet(this, _prevDiffY) < diffY || diffY >= 0 && modes_classPrivateFieldGet(this, _prevDiffY) > diffY) {
            modes_classPrivateFieldSet(this, _pointTop, top);
        }
        modes_classPrivateFieldSet(this, _prevDiffY, diffY);
        return modes_classPrivateFieldGet(this, _wasTriggeredY);
    }
}
_pointLeft = new WeakMap(), _pointTop = new WeakMap(), _prevDiffY = new WeakMap(), _prevDiffX = new WeakMap(), _wasTriggeredX = new WeakMap(), _wasTriggeredY = new WeakMap(), modes_threshold = new WeakMap();
class CuiOffsetModeFactory {
    static get(mode) {
        if (mode === 'dynamic') {
            return new CuiOffsetDynamicMode();
        }
        return new CuiOffsetStaticMode();
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/offset/offset.js
var offset_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var offset_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var offset_listener, offset_target, _utils, _matched, _action, offset_prevX, offset_prevY, offset_threshold, offset_root, _modeHandler;






class offset_CuiOffsetArgs {
    constructor() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.target = "";
        this.root = false;
        this.action = "";
        this.mode = 'static';
    }
    parse(args) {
        this.target = args.target;
        this.action = args.action;
        this.offsetX = Object(functions["n" /* getIntOrDefault */])(args.offsetX, -1);
        this.offsetY = Object(functions["n" /* getIntOrDefault */])(args.offsetY, -1);
        this.root = Object(functions["z" /* isStringTrue */])(args.root);
        this.mode = Object(functions["t" /* getStringOrDefault */])(args.mode, 'static');
    }
}
class CuiOffsetComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-offset`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new offset_CuiOffsetHandler(element, utils, this.attribute);
    }
}
class offset_CuiOffsetHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiOffsetHandler", element, attribute, new offset_CuiOffsetArgs(), utils);
        offset_listener.set(this, void 0);
        offset_target.set(this, void 0);
        _utils.set(this, void 0);
        _matched.set(this, void 0);
        _action.set(this, void 0);
        offset_prevX.set(this, void 0);
        offset_prevY.set(this, void 0);
        offset_threshold.set(this, void 0);
        offset_root.set(this, void 0);
        _modeHandler.set(this, void 0);
        this.element = element;
        offset_classPrivateFieldSet(this, offset_target, this.element);
        offset_classPrivateFieldSet(this, _utils, utils);
        offset_classPrivateFieldSet(this, _matched, false);
        offset_classPrivateFieldSet(this, _action, []);
        offset_classPrivateFieldSet(this, offset_prevX, 0);
        offset_classPrivateFieldSet(this, offset_prevY, 0);
        offset_classPrivateFieldSet(this, offset_threshold, 20);
        offset_classPrivateFieldSet(this, offset_root, this.element);
        offset_classPrivateFieldSet(this, _modeHandler, null);
        offset_classPrivateFieldSet(this, offset_listener, undefined);
    }
    onInit() {
        this.parseAttribute();
        offset_classPrivateFieldSet(this, offset_listener, new scroll_CuiScrollListener(this.args.root ? window : this.element, this.utils.setup.scrollThreshold));
        offset_classPrivateFieldGet(this, offset_listener).setCallback(this.onScroll.bind(this));
        offset_classPrivateFieldGet(this, offset_listener).attach();
    }
    onUpdate() {
        this.parseAttribute();
    }
    onDestroy() {
        if (offset_classPrivateFieldGet(this, offset_listener))
            offset_classPrivateFieldGet(this, offset_listener).detach();
    }
    onScroll(ev) {
        this.checkAndPerformActions(ev);
    }
    parseAttribute() {
        offset_classPrivateFieldSet(this, offset_root, this.getRoot());
        offset_classPrivateFieldSet(this, offset_target, this.getTarget());
        offset_classPrivateFieldSet(this, _action, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
        offset_classPrivateFieldSet(this, _modeHandler, CuiOffsetModeFactory.get(this.args.mode));
    }
    checkAndPerformActions(ev) {
        if (!Object(functions["w" /* is */])(offset_classPrivateFieldGet(this, _modeHandler))) {
            this.logError("Cannot perform - mode handler not initialized", "checkAndPerformActions");
        }
        // @ts-ignore modehandler
        let matchesOffset = offset_classPrivateFieldGet(this, _modeHandler).matches(ev.top, ev.left, this.args.offsetX, this.args.offsetY);
        /**
         * Act and emit event when offset has been reached
         */
        if (matchesOffset !== offset_classPrivateFieldGet(this, _matched)) {
            this.act(matchesOffset);
            offset_classPrivateFieldSet(this, _matched, matchesOffset);
            this.callEvent(offset_classPrivateFieldGet(this, _matched), ev.left, ev.top, ev.scrolling, ev.source, ...this.calcaRatio(ev.left, ev.top));
            return;
        }
        /**
         * Emit event periodically
         */
        if (this.exceededThreshold(ev.left, ev.top)) {
            this.callEvent(offset_classPrivateFieldGet(this, _matched), ev.left, ev.top, ev.scrolling, ev.source, ...this.calcaRatio(ev.left, ev.top));
            offset_classPrivateFieldSet(this, offset_prevX, ev.left);
            offset_classPrivateFieldSet(this, offset_prevY, ev.top);
        }
    }
    act(matching) {
        if (!Object(functions["b" /* are */])(offset_classPrivateFieldGet(this, _action), offset_classPrivateFieldGet(this, offset_target))) {
            return;
        }
        this.isLocked = true;
        offset_classPrivateFieldGet(this, _action).forEach(action => {
            if (matching) {
                action.add(offset_classPrivateFieldGet(this, offset_target), offset_classPrivateFieldGet(this, _utils));
            }
            else {
                action.remove(offset_classPrivateFieldGet(this, offset_target), offset_classPrivateFieldGet(this, _utils));
            }
        });
        this.isLocked = false;
    }
    callEvent(matches, x, y, scrolling, source, ratioX, ratioY) {
        this.emitEvent(statics["i" /* EVENTS */].OFFSET, {
            matches: offset_classPrivateFieldGet(this, _matched),
            offsetX: x,
            offsetY: y,
            ratioX: ratioX,
            ratioY: ratioY,
            scrolling: scrolling,
            source: source,
            timestamp: Date.now()
        });
    }
    getRoot() {
        return this.args.root ? document.body : this.element;
    }
    exceededThreshold(x, y) {
        return Math.abs(x - offset_classPrivateFieldGet(this, offset_prevX)) > offset_classPrivateFieldGet(this, offset_threshold) || Math.abs(y - offset_classPrivateFieldGet(this, offset_prevY)) > offset_classPrivateFieldGet(this, offset_threshold);
    }
    calcaRatio(x, y) {
        let ratY = parseFloat(((offset_classPrivateFieldGet(this, offset_root).clientHeight + y) / offset_classPrivateFieldGet(this, offset_root).scrollHeight).toFixed(2));
        let ratX = parseFloat(((offset_classPrivateFieldGet(this, offset_root).clientWidth + x) / offset_classPrivateFieldGet(this, offset_root).scrollWidth).toFixed(2));
        return [Object(functions["r" /* getRangeValue */])(ratX, 0, 1), Object(functions["r" /* getRangeValue */])(ratY, 0, 1)];
    }
    getTarget() {
        let target = this.args.target ? offset_classPrivateFieldGet(this, offset_root).querySelector(this.args.target) : null;
        return target !== null && target !== void 0 ? target : this.element;
    }
}
offset_listener = new WeakMap(), offset_target = new WeakMap(), _utils = new WeakMap(), _matched = new WeakMap(), _action = new WeakMap(), offset_prevX = new WeakMap(), offset_prevY = new WeakMap(), offset_threshold = new WeakMap(), offset_root = new WeakMap(), _modeHandler = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/open/open.js
var open_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var open_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var open_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var open_defTimeout, open_prefix, open_eventId;




class open_CuiOpenArgs {
    constructor(timeout) {
        open_defTimeout.set(this, void 0);
        open_classPrivateFieldSet(this, open_defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        this.target = "";
        this.action = "";
        this.timeout = 0;
        this.prevent = false;
        this.state = "";
    }
    parse(args) {
        if (Object(functions["w" /* is */])(args) && Object(functions["y" /* isString */])(args)) {
            this.target = args;
            this.action = "";
            this.timeout = open_classPrivateFieldGet(this, open_defTimeout);
            this.prevent = false;
            this.state = "";
            return;
        }
        this.target = Object(functions["t" /* getStringOrDefault */])(args.target, "");
        this.action = args.action;
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, open_classPrivateFieldGet(this, open_defTimeout));
        this.prevent = Object(functions["z" /* isStringTrue */])(args.prevent);
        this.state = args.state;
    }
}
open_defTimeout = new WeakMap();
class CuiOpenComponent {
    constructor(prefix) {
        open_prefix.set(this, void 0);
        open_classPrivateFieldSet(this, open_prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${open_classPrivateFieldGet(this, open_prefix)}-open`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new open_CuiOpenHandler(element, utils, this.attribute, open_classPrivateFieldGet(this, open_prefix));
    }
}
open_prefix = new WeakMap();
class open_CuiOpenHandler extends CuiHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiOpenHandler", element, attribute, new open_CuiOpenArgs(utils.setup.animationTime), utils);
        open_eventId.set(this, void 0);
        open_classPrivateFieldSet(this, open_eventId, null);
        this.onClick = this.onClick.bind(this);
    }
    onInit() {
        this.element.addEventListener('click', this.onClick);
        open_classPrivateFieldSet(this, open_eventId, this.onEvent(statics["i" /* EVENTS */].OPEN, this.onOpen.bind(this)));
    }
    onUpdate() {
        //
    }
    onDestroy() {
        this.element.removeEventListener('click', this.onClick);
        this.detachEvent(statics["i" /* EVENTS */].OPEN, open_classPrivateFieldGet(this, open_eventId));
    }
    onClick(ev) {
        this.onOpen(ev);
        if (this.args.prevent) {
            ev.preventDefault();
        }
    }
    onOpen(ev) {
        if (this.isLocked) {
            return;
        }
        const target = this.getTarget(this.args.target);
        if (!Object(functions["w" /* is */])(target)) {
            this._log.warning(`Target ${this.args.target} not found`, 'onClick');
            return;
        }
        this.isLocked = true;
        //@ts-ignore - target checked
        this.run(target).then((result) => {
            //@ts-ignore - target checked
            this.activateTarget(ev, target, result);
        }).catch((e) => {
            this._log.exception(e);
        }).finally(() => {
            this.isLocked = false;
        });
    }
    /**
     * Emits open event or performs an opening action
     * @param target target element
     * @returns whether event opened shall be emitted
     */
    run(target) {
        return open_awaiter(this, void 0, void 0, function* () {
            let cuiId = target.$cuid;
            if (Object(functions["w" /* is */])(cuiId)) {
                this._log.debug("Open cUI component");
                yield this.utils.bus.emit(statics["i" /* EVENTS */].OPEN, cuiId, this.args.state);
                return false;
            }
            else {
                this._log.debug("Open html component");
                if (Object(functions["b" /* are */])(this.args.timeout, this.args.action)) {
                    this._log.debug("Perfrom an action");
                    let actions = utils_actions["a" /* CuiActionsListFactory */].get(this.args.action);
                    yield this.actionsHelper.performActions(target, actions, this.args.timeout, () => {
                        this.setActiveClass(target);
                    });
                    return true;
                }
                this.setActiveClassAsync(target);
                return true;
            }
        });
    }
    setActiveClass(target) {
        if (Object(functions["w" /* is */])(target) && !this.helper.hasClass(this.activeClassName, target)) {
            this.helper.setClass(this.activeClassName, target);
        }
    }
    setActiveClassAsync(target) {
        this.fetch(() => {
            if (Object(functions["w" /* is */])(target) && !this.helper.hasClass(this.activeClassName, target)) {
                this.helper.setClassesAs(target, this.activeClassName);
            }
        });
    }
    activateTarget(ev, target, shouldEmit) {
        if (Object(functions["w" /* is */])(target) && !this.helper.hasClass(this.activeClassName, target)) {
            this.helper.setClassesAs(target, this.activeClassName);
        }
        if (shouldEmit)
            this.emitOpen(ev);
    }
    emitOpen(ev) {
        this.emitEvent(statics["i" /* EVENTS */].OPENED, {
            event: ev,
            state: this.args.state,
            timestamp: Date.now()
        });
    }
    getTarget(target) {
        if (Object(functions["w" /* is */])(target)) {
            //@ts-ignore - target checked
            return document.querySelector(target);
        }
        let parent = this.element.parentElement;
        //@ts-ignore - parent checked
        let result = Object(functions["w" /* is */])(parent) ? parent.querySelectorAll(`[${statics["h" /* CUID_ATTRIBUTE */]}]`) : undefined;
        if (!result || result.length < 2) {
            return undefined;
        }
        return Object(functions["m" /* getFirstMatching */])([...result], (el) => {
            return el !== this.element;
        });
    }
}
open_eventId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/scroll/scroll.js
var scroll_scroll_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var scroll_scroll_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _parent, scroll_scroll_target, _onClickBound;



/**
 * Component scrolls to specified target in the document
 * Arguments:
 * target - selector to target element where page should be scrolled to.
 * parent - set parent selector if parent should be different than html parent
 * behavior - auto/smooth - choose between step and smooth scrolling
 *
 */
class scroll_CuiScrollComponent {
    constructor(prefix) {
        this.attribute = Object(functions["w" /* is */])(prefix) ? prefix + 'scroll' : 'cui-scroll';
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new scroll_CuiScrollHandler(element, utils, this.attribute);
    }
}
class scroll_CuiScrollArgs {
    constructor() {
        this.target = "";
        this.parent = "";
        this.behavior = 'auto';
    }
    parse(val) {
        this.target = Object(functions["t" /* getStringOrDefault */])(val.target, "");
        this.parent = Object(functions["t" /* getStringOrDefault */])(val.parent, "");
        this.behavior = Object(functions["w" /* is */])(val.behavior) && val.behavior.toLowerCase() === 'smooth' ? 'smooth' : 'auto';
    }
}
class scroll_CuiScrollHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiScrollHandler", element, attribute, new scroll_CuiScrollArgs(), utils);
        _parent.set(this, void 0);
        scroll_scroll_target.set(this, void 0);
        _onClickBound.set(this, void 0);
        this.element = element;
        scroll_scroll_classPrivateFieldSet(this, _parent, null);
        scroll_scroll_classPrivateFieldSet(this, scroll_scroll_target, null);
        scroll_scroll_classPrivateFieldSet(this, _onClickBound, this.onClick.bind(this));
    }
    onInit() {
        this.element.addEventListener('click', scroll_scroll_classPrivateFieldGet(this, _onClickBound));
        this.setTargets();
    }
    onUpdate() {
        this.setTargets();
    }
    onDestroy() {
        this.element.removeEventListener('click', scroll_scroll_classPrivateFieldGet(this, _onClickBound));
    }
    onClick(ev) {
        if (!Object(functions["b" /* are */])(scroll_scroll_classPrivateFieldGet(this, scroll_scroll_target), scroll_scroll_classPrivateFieldGet(this, _parent))) {
            return;
        }
        //@ts-ignore
        let to = Object(functions["p" /* getOffsetTop */])(scroll_scroll_classPrivateFieldGet(this, scroll_scroll_target)) - scroll_scroll_classPrivateFieldGet(this, _parent).offsetTop;
        //@ts-ignore
        let from = scroll_scroll_classPrivateFieldGet(this, _parent).scrollTop;
        let by = to - from;
        //@ts-ignore
        scroll_scroll_classPrivateFieldGet(this, _parent).scrollBy({
            top: by,
            behavior: this.args.behavior
        });
        this.emitEvent(statics["i" /* EVENTS */].ON_SCROLL, {
            to: to,
            by: by,
            //@ts-ignore
            target: scroll_scroll_classPrivateFieldGet(this, scroll_scroll_target),
            //@ts-ignore
            parent: scroll_scroll_classPrivateFieldGet(this, _parent),
            timestamp: Date.now(),
        });
        ev.preventDefault();
    }
    setTargets() {
        scroll_scroll_classPrivateFieldSet(this, scroll_scroll_target, document.querySelector(this.args.target));
        if (Object(functions["w" /* is */])(scroll_scroll_classPrivateFieldGet(this, scroll_scroll_target))) {
            scroll_scroll_classPrivateFieldSet(this, _parent, Object(functions["w" /* is */])(this.args.parent) ? document.querySelector(this.args.parent) : scroll_scroll_classPrivateFieldGet(this, scroll_scroll_target).parentElement);
        }
    }
}
_parent = new WeakMap(), scroll_scroll_target = new WeakMap(), _onClickBound = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/intersection/intersection.js
var esm_intersection_intersection_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var esm_intersection_intersection_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _scrollListener, intersection_intersection_callback, _children, intersection_box;



const DEFAULT_OPTION_THRESHOLD = 0;
class intersection_CuiIntersectionListener {
    constructor(element, options) {
        var _a;
        _scrollListener.set(this, void 0);
        intersection_intersection_callback.set(this, void 0);
        _children.set(this, void 0);
        intersection_box.set(this, void 0);
        esm_intersection_intersection_classPrivateFieldSet(this, intersection_box, CuiElementBoxFactory.get(element));
        esm_intersection_intersection_classPrivateFieldSet(this, _scrollListener, new scroll_CuiScrollListener(element, (_a = options === null || options === void 0 ? void 0 : options.threshold) !== null && _a !== void 0 ? _a : DEFAULT_OPTION_THRESHOLD));
        esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener).setCallback(this.onScroll.bind(this));
        esm_intersection_intersection_classPrivateFieldSet(this, _children, []);
        esm_intersection_intersection_classPrivateFieldSet(this, intersection_intersection_callback, undefined);
    }
    /**
     * Sets child elements - ratio is calcutalated based on them
     * @param children
     */
    setChildren(children) {
        esm_intersection_intersection_classPrivateFieldSet(this, _children, children);
    }
    setThreshold(threshold) {
        esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener).setThreshold(threshold);
    }
    setCallback(callback) {
        esm_intersection_intersection_classPrivateFieldSet(this, intersection_intersection_callback, callback);
    }
    setParent(target) {
        esm_intersection_intersection_classPrivateFieldSet(this, intersection_box, CuiElementBoxFactory.get(target));
        esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener).setTarget(target);
    }
    isInProgress() {
        return esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener).isInProgress();
    }
    attach() {
        if (this.isAttached()) {
            return;
        }
        esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener).attach();
    }
    detach() {
        if (!this.isAttached()) {
            return;
        }
        esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener).detach();
    }
    isAttached() {
        return esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener) && esm_intersection_intersection_classPrivateFieldGet(this, _scrollListener).isAttached();
    }
    onScroll(ev) {
        if (!Object(functions["b" /* are */])(esm_intersection_intersection_classPrivateFieldGet(this, _children), esm_intersection_intersection_classPrivateFieldGet(this, intersection_intersection_callback))) {
            return;
        }
        if (esm_intersection_intersection_classPrivateFieldGet(this, intersection_intersection_callback))
            esm_intersection_intersection_classPrivateFieldGet(this, intersection_intersection_callback).call(this, this.prepareCallbackResult(ev));
    }
    calcChildVerticalRatio(child, currentTop, currentBottom) {
        let childBottom = child.offsetTop + child.offsetHeight;
        // Simulated top if view top is outside of parent then takes parent top
        let symTop = currentTop > child.offsetTop ? currentTop : child.offsetTop;
        // Simulated bottom if view bottom is outside of parent then takes parent bottom
        let symBottom = currentBottom < childBottom ? currentBottom : childBottom;
        // Calculates amount of pixels that are in view
        let diff = symBottom - symTop;
        // Calculates ratio - how much of a child is in parent view
        let ratio = diff / child.offsetHeight;
        return Object(functions["r" /* getRangeValue */])(ratio, 0, 1);
    }
    calcChildHorizontalRatio(child, currentLeft, currentRight) {
        let childRight = child.offsetLeft + child.offsetWidth;
        // Simulated top if view left is outside of parent then takes parent left
        let symLeft = currentLeft > child.offsetLeft ? currentLeft : child.offsetLeft;
        // Simulated bottom if view right is outside of parent then takes parent right
        let symRight = currentRight < childRight ? currentRight : childRight;
        // Calculates amount of pixels that are in view
        let diff = symRight - symLeft;
        // Calculates ratio - how much of a child is in parent view
        let ratio = diff / child.offsetWidth;
        return Object(functions["r" /* getRangeValue */])(ratio, 0, 1);
    }
    prepareCallbackResult(ev) {
        var _a, _b;
        let parentBottom = ev.top + esm_intersection_intersection_classPrivateFieldGet(this, intersection_box).getHeight();
        let parentRight = ev.left + esm_intersection_intersection_classPrivateFieldGet(this, intersection_box).getWidth();
        let result = {
            ev: ev.base,
            top: ev.top,
            left: ev.left,
            scrolling: (_a = ev.scrolling) !== null && _a !== void 0 ? _a : false,
            initial: (_b = ev.initial) !== null && _b !== void 0 ? _b : false,
            source: ev.source,
            items: esm_intersection_intersection_classPrivateFieldGet(this, _children).map((child, index) => {
                let verticalRatio = this.calcChildVerticalRatio(child, ev.top, parentBottom);
                let horizontalRatio = this.calcChildHorizontalRatio(child, ev.left, parentRight);
                return {
                    verticalRatio: verticalRatio,
                    horizontalRatio: horizontalRatio,
                    element: child
                };
            })
        };
        return result;
    }
}
_scrollListener = new WeakMap(), intersection_intersection_callback = new WeakMap(), _children = new WeakMap(), intersection_box = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/scrollspy/mode.js

class CuiScrollSpyModeHandlerFactory {
    static get(mode) {
        if (mode === "multi") {
            return new mode_CuiMultiModeHandler();
        }
        return new mode_CuiSingleModeHandler();
    }
}
class mode_CuiModeHandlerBase {
    constructor(init) {
        this.previous = init;
    }
    getMatching(ratio, items) {
        return items.reduce((result, item, index) => {
            if (item.verticalRatio > ratio) {
                result.push(index);
            }
            return result;
        }, []);
    }
    addActions(actions, ...elements) {
        this.forEachAction(actions, elements, (action, element) => {
            action.add(element);
        });
    }
    removeActions(actions, ...elements) {
        this.forEachAction(actions, elements, (action, element) => {
            action.remove(element);
        });
    }
    forEachAction(actions, elements, callback) {
        if (!Object(functions["b" /* are */])(actions, elements, callback)) {
            return;
        }
        actions.forEach(action => {
            elements.forEach(element => {
                if (Object(functions["w" /* is */])(element))
                    callback(action, element);
            });
        });
    }
}
class mode_CuiSingleModeHandler extends mode_CuiModeHandlerBase {
    constructor() {
        super(-1);
    }
    update(items, ratio, actions, links, linksActions) {
        let matching = this.getMatching(ratio, items);
        let len = matching.length;
        let last = len > 0 ? matching[len - 1] : -1;
        let result = {
            changed: false
        };
        if (!this.matches(last)) {
            if (this.previous > -1)
                this.removeActions(actions, items[this.previous].element);
            if (last > -1) {
                let lastElement = items[last].element;
                result.intersecting = [lastElement];
                this.addActions(actions, lastElement);
            }
            if (Object(functions["b" /* are */])(links, linksActions)) {
                if (this.previous > -1)
                    this.removeActions(linksActions, links[this.previous]);
                if (last > -1)
                    this.addActions(linksActions, links[last]);
            }
            this.previous = last;
            result.changed = true;
            result.intersecting = [];
            return result;
        }
        return result;
    }
    matches(item) {
        return item === this.previous;
    }
}
class mode_CuiMultiModeHandler extends mode_CuiModeHandlerBase {
    constructor() {
        super([]);
    }
    update(items, ratio, actions, links, linksActions) {
        let matching = this.getMatching(ratio, items);
        let result = {
            changed: false
        };
        if (!this.matches(matching)) {
            let intersecting = matching.map(idx => { return items[idx].element; });
            this.removeActions(actions, ...this.previous.map(idx => { return items[idx].element; }));
            this.addActions(actions, ...intersecting);
            result.intersecting = intersecting;
            if (Object(functions["b" /* are */])(links, linksActions)) {
                this.removeActions(linksActions, ...this.previous.map(idx => { return links[idx]; }));
                this.addActions(linksActions, ...matching.map(idx => { return links[idx]; }));
            }
            this.previous = matching;
            result.changed = true;
            return result;
        }
        return result;
    }
    matches(item) {
        let len = item.length;
        if (len !== this.previous.length) {
            return false;
        }
        let i = 0;
        for (i = 0; i < len; i++) {
            if (!this.previous.includes(item[i])) {
                return false;
            }
        }
        return true;
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/scrollspy/scrollspy.js
var scrollspy_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var scrollspy_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var scrollspy_listener, _links, scrollspy_actions, _linkActions, scrollspy_root, _rootBox, scrollspy_modeHandler;







const DEFAULT_SELECTOR = "> *";
class scrollspy_CuiScrollSpyArgs {
    constructor() {
        this.ratio = 0;
        this.mode = "single";
        this.threshold = -1;
        this.selector = "";
        this.action = "";
        this.isRoot = false;
        this.link = "";
        this.linkAction = "";
    }
    parse(args) {
        var _a;
        this.selector = `${statics["k" /* SCOPE_SELECTOR */]}${(_a = args.selector) !== null && _a !== void 0 ? _a : DEFAULT_SELECTOR}`;
        this.action = Object(functions["t" /* getStringOrDefault */])(args.action, "");
        this.link = Object(functions["t" /* getStringOrDefault */])(args.link, "");
        this.linkAction = Object(functions["t" /* getStringOrDefault */])(args.linkAction, "");
        this.ratio = Object(functions["s" /* getRangeValueOrDefault */])(parseFloat(args.ratio), 0, 1, 0);
        this.isRoot = Object(functions["z" /* isStringTrue */])(args.isRoot);
        this.mode = (args === null || args === void 0 ? void 0 : args.mode) === 'multi' ? "multi" : "single";
        this.threshold = Object(functions["n" /* getIntOrDefault */])(args.threshold, -1);
    }
}
class CuiScrollspyComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-scrollspy`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new scrollspy_CuiScrollspyHandler(element, utils, this.attribute);
    }
}
class scrollspy_CuiScrollspyHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiScrollspyHandler", element, attribute, new scrollspy_CuiScrollSpyArgs(), utils);
        scrollspy_listener.set(this, void 0);
        _links.set(this, void 0);
        scrollspy_actions.set(this, void 0);
        _linkActions.set(this, void 0);
        scrollspy_root.set(this, void 0);
        _rootBox.set(this, void 0);
        scrollspy_modeHandler.set(this, void 0);
        this.element = element;
        scrollspy_classPrivateFieldSet(this, scrollspy_listener, new intersection_CuiIntersectionListener(this.element, { threshold: this.utils.setup.scrollThreshold }));
        scrollspy_classPrivateFieldSet(this, _links, []);
        scrollspy_classPrivateFieldSet(this, scrollspy_actions, []);
        scrollspy_classPrivateFieldSet(this, _linkActions, []);
        scrollspy_classPrivateFieldSet(this, scrollspy_root, undefined);
        scrollspy_classPrivateFieldSet(this, _rootBox, undefined);
        scrollspy_classPrivateFieldSet(this, scrollspy_modeHandler, undefined);
    }
    onInit() {
        this.parseAttribute();
        scrollspy_classPrivateFieldGet(this, scrollspy_listener).setCallback(this.onIntersection.bind(this));
        scrollspy_classPrivateFieldGet(this, scrollspy_listener).attach();
    }
    onUpdate() {
        this.updateAttributes();
    }
    onDestroy() {
        scrollspy_classPrivateFieldGet(this, scrollspy_listener).detach();
    }
    onIntersection(ev) {
        if (!scrollspy_classPrivateFieldGet(this, scrollspy_modeHandler)) {
            this.logError("Cannot perform - mode handler not initialized", "OnIntersection");
            return;
        }
        let timestamp = Date.now();
        this.mutate(() => {
            //@ts-ignore - modeHandler checked
            let updateResult = scrollspy_classPrivateFieldGet(this, scrollspy_modeHandler).update(ev.items, this.args.ratio, scrollspy_classPrivateFieldGet(this, scrollspy_actions), scrollspy_classPrivateFieldGet(this, _links), scrollspy_classPrivateFieldGet(this, _linkActions));
            if (updateResult.changed) {
                this.emitEvent(statics["i" /* EVENTS */].TARGET_CHANGE, {
                    intersecting: updateResult.intersecting,
                    timestamp: timestamp
                });
            }
        });
        this.emitEvent(statics["i" /* EVENTS */].ON_SCROLL, {
            top: ev.top,
            left: ev.left,
            scrolling: ev.scrolling,
            initial: ev.initial,
            source: ev.source,
            timestamp: timestamp,
        });
    }
    parseAttribute() {
        scrollspy_classPrivateFieldSet(this, scrollspy_root, this.args.isRoot ? window : this.element);
        scrollspy_classPrivateFieldSet(this, _rootBox, CuiElementBoxFactory.get(scrollspy_classPrivateFieldGet(this, scrollspy_root)));
        let targets = this.args.selector ? scrollspy_classPrivateFieldGet(this, _rootBox).queryAll(this.args.selector) : [];
        scrollspy_classPrivateFieldGet(this, scrollspy_listener).setChildren(targets);
        scrollspy_classPrivateFieldGet(this, scrollspy_listener).setThreshold(this.args.threshold);
        scrollspy_classPrivateFieldSet(this, _links, this.args.link ? [...document.querySelectorAll(this.args.link)] : []);
        scrollspy_classPrivateFieldSet(this, scrollspy_actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
        scrollspy_classPrivateFieldSet(this, _linkActions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.linkAction));
        scrollspy_classPrivateFieldSet(this, scrollspy_modeHandler, CuiScrollSpyModeHandlerFactory.get(this.args.mode));
    }
    updateAttributes() {
        if (this.prevArgs && this.args.isRoot !== this.prevArgs.isRoot) {
            scrollspy_classPrivateFieldSet(this, scrollspy_root, this.args.isRoot ? window : this.element);
            scrollspy_classPrivateFieldSet(this, _rootBox, CuiElementBoxFactory.get(scrollspy_classPrivateFieldGet(this, scrollspy_root)));
            scrollspy_classPrivateFieldGet(this, scrollspy_listener).setParent(scrollspy_classPrivateFieldGet(this, scrollspy_root));
        }
        if (this.prevArgs && scrollspy_classPrivateFieldGet(this, _rootBox) && this.args.selector !== this.prevArgs.selector) {
            let targets = this.args.selector ? scrollspy_classPrivateFieldGet(this, _rootBox).queryAll(this.args.selector) : [];
            scrollspy_classPrivateFieldGet(this, scrollspy_listener).setChildren(targets);
        }
        scrollspy_classPrivateFieldGet(this, scrollspy_listener).setThreshold(this.args.threshold);
        scrollspy_classPrivateFieldSet(this, _links, this.args.link ? [...document.querySelectorAll(this.args.link)] : []);
        scrollspy_classPrivateFieldSet(this, scrollspy_actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
        scrollspy_classPrivateFieldSet(this, _linkActions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.linkAction));
        scrollspy_classPrivateFieldSet(this, scrollspy_modeHandler, CuiScrollSpyModeHandlerFactory.get(this.args.mode));
    }
}
scrollspy_listener = new WeakMap(), _links = new WeakMap(), scrollspy_actions = new WeakMap(), _linkActions = new WeakMap(), scrollspy_root = new WeakMap(), _rootBox = new WeakMap(), scrollspy_modeHandler = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/builders/element.js
var builders_element = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/handlers/drag/detectors.js
var detectors_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var detectors_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _elements, _count, detectors_threshold;

class detectors_CuiSimpleDragOverDetector {
    constructor() {
        _elements.set(this, void 0);
        _count.set(this, void 0);
        detectors_threshold.set(this, void 0);
        detectors_classPrivateFieldSet(this, _elements, []);
        detectors_classPrivateFieldSet(this, _count, 0);
        detectors_classPrivateFieldSet(this, detectors_threshold, 5);
    }
    setElements(elements) {
        detectors_classPrivateFieldSet(this, _elements, elements);
        detectors_classPrivateFieldSet(this, _count, detectors_classPrivateFieldGet(this, _elements).length);
    }
    setThreshold(value) {
        detectors_classPrivateFieldSet(this, detectors_threshold, value);
    }
    detect(x, y) {
        if (!Object(functions["w" /* is */])(detectors_classPrivateFieldGet(this, _elements))) {
            return [-1, undefined];
        }
        let idx = -1;
        let found = undefined;
        for (let i = 0; i < detectors_classPrivateFieldGet(this, _count); i++) {
            if (this.isInBounds(detectors_classPrivateFieldGet(this, _elements)[i], x, y)) {
                if (i === 0) {
                    idx = i;
                    found = detectors_classPrivateFieldGet(this, _elements)[i];
                    //break;
                }
                else if (i < detectors_classPrivateFieldGet(this, _count) - 1) {
                    idx = i + 1;
                    found = detectors_classPrivateFieldGet(this, _elements)[i + 1];
                    //break;
                }
                break;
            }
        }
        return [idx, found];
    }
    isInBounds(element, x, y) {
        const box = element.getBoundingClientRect();
        if (box.width === 0) {
            console.log(element);
        }
        return x > box.left - detectors_classPrivateFieldGet(this, detectors_threshold) && x < box.left + box.width + detectors_classPrivateFieldGet(this, detectors_threshold) &&
            y > box.top - detectors_classPrivateFieldGet(this, detectors_threshold) && y < box.top + box.height + detectors_classPrivateFieldGet(this, detectors_threshold);
    }
}
_elements = new WeakMap(), _count = new WeakMap(), detectors_threshold = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/handlers/drag/drag.js
var drag_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var drag_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var drag_root, _moveHandler, _onDragStart, _onDragOver, _onDragEnd, drag_timeout, drag_isTracking, _timeoutId;

class drag_CuiDragHandler {
    constructor(root) {
        drag_root.set(this, void 0);
        _moveHandler.set(this, void 0);
        _onDragStart.set(this, void 0);
        _onDragOver.set(this, void 0);
        _onDragEnd.set(this, void 0);
        drag_timeout.set(this, void 0);
        drag_isTracking.set(this, void 0);
        _timeoutId.set(this, void 0);
        drag_classPrivateFieldSet(this, drag_root, root);
        drag_classPrivateFieldSet(this, _moveHandler, new move["a" /* CuiMoveEventListener */]());
        drag_classPrivateFieldSet(this, drag_timeout, 150);
        drag_classPrivateFieldSet(this, drag_isTracking, false);
        drag_classPrivateFieldSet(this, _timeoutId, undefined);
        drag_classPrivateFieldGet(this, _moveHandler).setTarget(drag_classPrivateFieldGet(this, drag_root));
        drag_classPrivateFieldGet(this, _moveHandler).preventDefault(false);
        drag_classPrivateFieldGet(this, _moveHandler).setCallback(this.onMove.bind(this));
        drag_classPrivateFieldSet(this, _onDragStart, undefined);
        drag_classPrivateFieldSet(this, _onDragOver, undefined);
        drag_classPrivateFieldSet(this, _onDragEnd, undefined);
    }
    setLongPressTimeout(timeout) {
        drag_classPrivateFieldSet(this, drag_timeout, timeout);
    }
    onDragStart(callback) {
        drag_classPrivateFieldSet(this, _onDragStart, callback);
    }
    onDragOver(callback) {
        drag_classPrivateFieldSet(this, _onDragOver, callback);
    }
    onDragEnd(callback) {
        drag_classPrivateFieldSet(this, _onDragEnd, callback);
    }
    attach() {
        drag_classPrivateFieldGet(this, _moveHandler).attach();
    }
    detach() {
        drag_classPrivateFieldGet(this, _moveHandler).detach();
    }
    onMove(data) {
        switch (data.type) {
            case "down":
                if (drag_classPrivateFieldGet(this, drag_isTracking)) {
                    return;
                }
                drag_classPrivateFieldSet(this, _timeoutId, setTimeout(() => {
                    if (drag_classPrivateFieldGet(this, _onDragStart) && drag_classPrivateFieldGet(this, _onDragStart).call(this, data)) {
                        drag_classPrivateFieldSet(this, drag_isTracking, true);
                    }
                }, drag_classPrivateFieldGet(this, drag_timeout)));
                break;
            case "move":
                this.cancelTimeout();
                if (!drag_classPrivateFieldGet(this, drag_isTracking)) {
                    return;
                }
                if (drag_classPrivateFieldGet(this, _onDragOver)) {
                    drag_classPrivateFieldGet(this, _onDragOver).call(this, data);
                }
                break;
            case "up":
                this.cancelTimeout();
                if (!drag_classPrivateFieldGet(this, drag_isTracking)) {
                    return;
                }
                if (drag_classPrivateFieldGet(this, _onDragEnd)) {
                    drag_classPrivateFieldGet(this, _onDragEnd).call(this, data);
                }
                drag_classPrivateFieldSet(this, drag_isTracking, false);
                break;
        }
    }
    cancelTimeout() {
        if (drag_classPrivateFieldGet(this, _timeoutId)) {
            clearTimeout(drag_classPrivateFieldGet(this, _timeoutId));
            drag_classPrivateFieldSet(this, _timeoutId, undefined);
        }
    }
}
drag_root = new WeakMap(), _moveHandler = new WeakMap(), _onDragStart = new WeakMap(), _onDragOver = new WeakMap(), _onDragEnd = new WeakMap(), drag_timeout = new WeakMap(), drag_isTracking = new WeakMap(), _timeoutId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/sortable/sortable.js
var sortable_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var sortable_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var sortable_prefix, _dragHandler, _triggers, sortable_targets, _currentTarget, _currentIdx, _preview, _movingCls, _detector, _currentBefore, _animation, _previewCls;







const SORTABLE_IS_MOVING = "{prefix}-moving";
const sortable_DEFAULT_SELECTOR = " > *";
const SORTABLE_PREVIEW_CLS = "{prefix}-sortable-preview";
class sortable_CuiSortableArgs {
    constructor() {
        this.target = statics["k" /* SCOPE_SELECTOR */] + sortable_DEFAULT_SELECTOR;
        ;
        this.trigger = statics["k" /* SCOPE_SELECTOR */] + sortable_DEFAULT_SELECTOR;
        this.timeout = 150;
        this.threshold = 5;
    }
    parse(val) {
        this.target = val.target ? statics["k" /* SCOPE_SELECTOR */] + " " + val.target : statics["k" /* SCOPE_SELECTOR */] + sortable_DEFAULT_SELECTOR;
        this.trigger = val.trigger ? statics["k" /* SCOPE_SELECTOR */] + " " + val.trigger : statics["k" /* SCOPE_SELECTOR */] + sortable_DEFAULT_SELECTOR;
        this.timeout = Object(functions["n" /* getIntOrDefault */])(val.timeout, 150);
        this.threshold = Object(functions["n" /* getIntOrDefault */])(val.threshold, 5);
    }
}
class CuiSortableComponent {
    constructor(prefix) {
        sortable_prefix.set(this, void 0);
        sortable_classPrivateFieldSet(this, sortable_prefix, prefix !== null && prefix !== void 0 ? prefix : "cui");
        this.attribute = sortable_classPrivateFieldGet(this, sortable_prefix) + "-sortable";
    }
    getStyle() {
        return null;
    }
    get(element, sutils) {
        return new sortable_CuiSortableHandler(element, this.attribute, sutils, sortable_classPrivateFieldGet(this, sortable_prefix));
    }
}
sortable_prefix = new WeakMap();
class sortable_CuiSortableHandler extends CuiHandler {
    constructor(element, attribute, utils, prefix) {
        super("CuiSortableHandler", element, attribute, new sortable_CuiSortableArgs(), utils);
        _dragHandler.set(this, void 0);
        _triggers.set(this, void 0);
        sortable_targets.set(this, void 0);
        _currentTarget.set(this, void 0);
        _currentIdx.set(this, void 0);
        _preview.set(this, void 0);
        _movingCls.set(this, void 0);
        _detector.set(this, void 0);
        _currentBefore.set(this, void 0);
        _animation.set(this, void 0);
        _previewCls.set(this, void 0);
        sortable_classPrivateFieldSet(this, sortable_targets, []);
        sortable_classPrivateFieldSet(this, _triggers, []);
        sortable_classPrivateFieldSet(this, _currentIdx, -1);
        sortable_classPrivateFieldSet(this, _currentTarget, null);
        sortable_classPrivateFieldSet(this, _currentBefore, null);
        sortable_classPrivateFieldSet(this, _preview, null);
        sortable_classPrivateFieldSet(this, _dragHandler, new drag_CuiDragHandler(element));
        sortable_classPrivateFieldGet(this, _dragHandler).onDragStart(this.onDragStart.bind(this));
        sortable_classPrivateFieldGet(this, _dragHandler).onDragOver(this.onDragOver.bind(this));
        sortable_classPrivateFieldGet(this, _dragHandler).onDragEnd(this.onDragEnd.bind(this));
        sortable_classPrivateFieldSet(this, _movingCls, Object(functions["D" /* replacePrefix */])(SORTABLE_IS_MOVING, prefix));
        sortable_classPrivateFieldSet(this, _previewCls, Object(functions["D" /* replacePrefix */])(SORTABLE_PREVIEW_CLS, prefix));
        sortable_classPrivateFieldSet(this, _detector, new detectors_CuiSimpleDragOverDetector());
        sortable_classPrivateFieldSet(this, _animation, new engine_CuiSwipeAnimationEngine());
        sortable_classPrivateFieldGet(this, _animation).setOnFinish(() => {
            let item = sortable_classPrivateFieldGet(this, _currentTarget);
            let idx = sortable_classPrivateFieldGet(this, _currentIdx);
            this.stopMovementPrep();
            this.utils.bus.emit(statics["i" /* EVENTS */].MOVE_LOCK, null, false);
            this.emitEvent(statics["i" /* EVENTS */].SORTED, {
                item: item,
                index: idx,
                timestamp: new Date()
            });
        });
    }
    onInit() {
        sortable_classPrivateFieldGet(this, _dragHandler).attach();
        this.getTargetsAndTrggers();
        sortable_classPrivateFieldGet(this, _detector).setThreshold(this.args.threshold);
    }
    onUpdate() {
        if (this.prevArgs && (this.args.target !== this.prevArgs.target ||
            this.args.trigger !== this.prevArgs.trigger)) {
            this.getTargetsAndTrggers();
        }
        sortable_classPrivateFieldGet(this, _dragHandler).setLongPressTimeout(this.args.timeout);
    }
    onDestroy() {
        sortable_classPrivateFieldGet(this, _dragHandler).detach();
    }
    /**
     * queries targets and triggers from the element
     * If exception - lists are cleared
     */
    getTargetsAndTrggers() {
        try {
            sortable_classPrivateFieldSet(this, sortable_targets, [...this.element.querySelectorAll(this.args.target)]);
            sortable_classPrivateFieldSet(this, _triggers, [...this.element.querySelectorAll(this.args.trigger)]);
            if (sortable_classPrivateFieldGet(this, _triggers).length !== sortable_classPrivateFieldGet(this, sortable_targets).length) {
                throw new Error(`Triggers (count ${sortable_classPrivateFieldGet(this, _triggers).length}) and targets (count ${sortable_classPrivateFieldGet(this, sortable_targets).length}) selector are not correct`);
            }
            sortable_classPrivateFieldGet(this, _detector).setElements(sortable_classPrivateFieldGet(this, sortable_targets));
        }
        catch (e) {
            this._log.error("Incorrect trigger or target selector");
            this._log.exception(e, "getTargetsAndTrggers");
            sortable_classPrivateFieldSet(this, sortable_targets, []);
            sortable_classPrivateFieldSet(this, _triggers, []);
        }
    }
    onDragStart(data) {
        sortable_classPrivateFieldSet(this, _currentIdx, this.getPressedElementIdx(data.target));
        sortable_classPrivateFieldSet(this, _currentTarget, sortable_classPrivateFieldGet(this, _currentIdx) > -1 ? sortable_classPrivateFieldGet(this, sortable_targets)[sortable_classPrivateFieldGet(this, _currentIdx)] : null);
        if (!Object(functions["w" /* is */])(sortable_classPrivateFieldGet(this, _currentTarget))) {
            return false;
        }
        this.utils.bus.emit(statics["i" /* EVENTS */].MOVE_LOCK, null, true);
        this.startMovementPrep(data);
        this.emitEvent(statics["i" /* EVENTS */].SORT_START, {
            item: sortable_classPrivateFieldGet(this, _currentTarget),
            index: sortable_classPrivateFieldGet(this, _currentIdx),
            timestamp: new Date()
        });
        return true;
    }
    onDragOver(data) {
        this.move(data);
        data.event.preventDefault();
    }
    onDragEnd(data) {
        if (!Object(functions["w" /* is */])(sortable_classPrivateFieldGet(this, _preview))) {
            return;
        }
        //@ts-ignore preview
        sortable_classPrivateFieldGet(this, _animation).setElement(sortable_classPrivateFieldGet(this, _preview));
        sortable_classPrivateFieldGet(this, _animation).setProps(this.getFinishAnimation());
        sortable_classPrivateFieldGet(this, _animation).finish(0, 100, false);
    }
    getPressedElementIdx(target) {
        return sortable_classPrivateFieldGet(this, _triggers).findIndex((trigger) => {
            return trigger.contains(target);
        });
    }
    startMovementPrep(data) {
        this.mutate(() => {
            this.createPreview();
            if (Object(functions["w" /* is */])(sortable_classPrivateFieldGet(this, _currentTarget)))
                //@ts-ignore currentTarget
                this.helper.setClass(sortable_classPrivateFieldGet(this, _movingCls), sortable_classPrivateFieldGet(this, _currentTarget));
            this.helper.setClass("cui-locked", this.element);
            this.helper.setClass(statics["a" /* CLASSES */].swipingOn, document.body);
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    stopMovementPrep() {
        this.mutate(() => {
            if (Object(functions["w" /* is */])(sortable_classPrivateFieldGet(this, _currentTarget)))
                //@ts-ignore currentTarget
                this.helper.removeClass(sortable_classPrivateFieldGet(this, _movingCls), sortable_classPrivateFieldGet(this, _currentTarget));
            this.helper.removeClass(statics["a" /* CLASSES */].swipingOn, document.body);
            this.helper.removeClass("cui-locked", this.element);
            this.removePreview();
            sortable_classPrivateFieldSet(this, _currentTarget, null);
            sortable_classPrivateFieldSet(this, _currentBefore, null);
            this.getTargetsAndTrggers();
        });
    }
    move(data) {
        this.mutate(() => {
            this.setPreviewPosition(data);
            this.setCurrentPosition(data);
        });
    }
    createPreview() {
        if (!Object(functions["w" /* is */])(sortable_classPrivateFieldGet(this, _currentTarget))) {
            this.logError("Cannot create preview - current target does not exist", "createPreview");
            return;
        }
        sortable_classPrivateFieldSet(this, _preview, new builders_element["a" /* ElementBuilder */]("div").setClasses(sortable_classPrivateFieldGet(this, _previewCls)).build());
        //@ts-ignore currentTarget
        sortable_classPrivateFieldGet(this, _preview).style.width = `${sortable_classPrivateFieldGet(this, _currentTarget).offsetWidth}px`;
        //@ts-ignore currentTarget
        sortable_classPrivateFieldGet(this, _preview).style.height = `${sortable_classPrivateFieldGet(this, _currentTarget).offsetHeight}px`;
        document.body.appendChild(sortable_classPrivateFieldGet(this, _preview));
    }
    removePreview() {
        if (Object(functions["w" /* is */])(sortable_classPrivateFieldGet(this, _preview))) {
            //@ts-ignore currentTarget
            sortable_classPrivateFieldGet(this, _preview).remove();
            sortable_classPrivateFieldSet(this, _preview, null);
        }
    }
    setPreviewPosition(data) {
        if (!Object(functions["w" /* is */])(sortable_classPrivateFieldGet(this, _preview))) {
            return;
        }
        //@ts-ignore preview
        sortable_classPrivateFieldGet(this, _preview).style.top = `${data.y}px`;
        //@ts-ignore preview
        sortable_classPrivateFieldGet(this, _preview).style.left = `${data.x}px`;
    }
    setCurrentPosition(data) {
        if (!sortable_classPrivateFieldGet(this, _currentTarget)) {
            return;
        }
        let [idx, detected] = sortable_classPrivateFieldGet(this, _detector).detect(data.x, data.y);
        if ((idx !== sortable_classPrivateFieldGet(this, _currentIdx)) && detected && sortable_classPrivateFieldGet(this, _currentBefore) !== detected) {
            let el = detected;
            this.insertElement(sortable_classPrivateFieldGet(this, _currentTarget), el);
            sortable_classPrivateFieldSet(this, _currentBefore, el);
            this.getTargetsAndTrggers();
            sortable_classPrivateFieldSet(this, _currentIdx, idx);
        }
    }
    insertElement(source, destination) {
        if (Object(functions["w" /* is */])(destination)) {
            this.element.insertBefore(source, destination);
        }
        else {
            this.element.appendChild(source);
        }
    }
    getFinishAnimation() {
        if (!Object(functions["b" /* are */])(sortable_classPrivateFieldGet(this, _currentTarget), sortable_classPrivateFieldGet(this, _preview))) {
            return {
                opacity: {
                    from: 1,
                    to: 0,
                }
            };
        }
        //@ts-ignore currentTarget
        const box = sortable_classPrivateFieldGet(this, _currentTarget).getBoundingClientRect();
        return {
            opacity: {
                from: 1,
                to: 0,
            },
            top: {
                //@ts-ignore preview
                from: sortable_classPrivateFieldGet(this, _preview).offsetTop,
                //@ts-ignore preview
                to: box.top > 0 ? box.top : sortable_classPrivateFieldGet(this, _preview).offsetTop,
                unit: "px"
            },
            left: {
                //@ts-ignore preview
                from: sortable_classPrivateFieldGet(this, _preview).offsetLeft,
                //@ts-ignore preview
                to: box.left > 0 ? box.left : sortable_classPrivateFieldGet(this, _preview).offsetLeft,
                unit: "px"
            }
        };
    }
}
_dragHandler = new WeakMap(), _triggers = new WeakMap(), sortable_targets = new WeakMap(), _currentTarget = new WeakMap(), _currentIdx = new WeakMap(), _preview = new WeakMap(), _movingCls = new WeakMap(), _detector = new WeakMap(), _currentBefore = new WeakMap(), _animation = new WeakMap(), _previewCls = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/spinner/spinner.js
var spinner_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var spinner_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var spinner_prefix, _pauseEventId, _animationPauseClass;




class spinner_CuiSpinnerArgs {
    constructor() {
        this.spinner = "circle";
        this.scale = 1;
    }
    parse(args) {
        if (Object(functions["y" /* isString */])(args)) {
            this.spinner = Object(functions["t" /* getStringOrDefault */])(args, "circle");
        }
        else {
            this.spinner = Object(functions["t" /* getStringOrDefault */])(args.spinner, "circle");
            this.scale = Object(functions["n" /* getIntOrDefault */])(args.scale, 1);
        }
    }
}
class spinner_CuiSpinnerComponent {
    constructor(prefix) {
        spinner_prefix.set(this, void 0);
        spinner_classPrivateFieldSet(this, spinner_prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${spinner_classPrivateFieldGet(this, spinner_prefix)}-spinner`;
        statics["j" /* ICONS */]['spinner_circle'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 7.800378,1.7908996 A 8.4986862,8.4986862 0 0 1 18.2091,7.8003784 8.4986862,8.4986862 0 0 1 12.199621,18.209101 8.4986862,8.4986862 0 0 1 1.7908995,12.199622 8.4986862,8.4986862 0 0 1 7.800378,1.7908996 Z\"></path></svg>";
        statics["j" /* ICONS */]['spinner_circle_double'] = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"20\" height=\"20\"><path d=\"M 10,1.5000006 A 8.4999997,8.4999997 0 0 1 18.5,10 8.4999997,8.4999997 0 0 1 10,18.499999 8.4999997,8.4999997 0 0 1 1.5000005,10 8.4999997,8.4999997 0 0 1 10,1.5000006 Z\"></path><path d=\"M 10,3.4999997 A 6.5000002,6.5000002 0 0 1 16.5,10 6.5000002,6.5000002 0 0 1 10,16.5 6.5000002,6.5000002 0 0 1 3.5,9.9999993 6.5000002,6.5000002 0 0 1 10,3.4999997 Z\"></path></svg>";
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new spinner_CuiSpinnerHandler(element, utils, this.attribute, spinner_classPrivateFieldGet(this, spinner_prefix));
    }
}
spinner_prefix = new WeakMap();
class spinner_CuiSpinnerHandler extends CuiHandler {
    constructor(element, utils, attribute, prefix) {
        super("CuiSpinnerHandler", element, attribute, new spinner_CuiSpinnerArgs(), utils);
        _pauseEventId.set(this, void 0);
        _animationPauseClass.set(this, void 0);
        spinner_classPrivateFieldSet(this, _pauseEventId, null);
        spinner_classPrivateFieldSet(this, _animationPauseClass, Object(functions["D" /* replacePrefix */])("{prefix}-animation-pause", prefix));
    }
    onInit() {
        spinner_classPrivateFieldSet(this, _pauseEventId, this.onEvent(statics["i" /* EVENTS */].PAUSE, this.onPause.bind(this)));
        this.add();
    }
    onUpdate() {
        if (this.prevArgs && this.args.spinner !== this.prevArgs.spinner) {
            this.add();
        }
    }
    onDestroy() {
        this.removeIfAnyExisists();
        this.detachEvent(statics["i" /* EVENTS */].PAUSE, spinner_classPrivateFieldGet(this, _pauseEventId));
    }
    addSpinner(iconElement, name) {
        this.element.appendChild(iconElement);
        this.element.classList.add(`animation-spinner-${name}`);
    }
    add() {
        const svgIcon = Object(functions["w" /* is */])(this.args.spinner) ? statics["j" /* ICONS */][`spinner_${this.args.spinner}`] : null;
        if (!Object(functions["w" /* is */])(svgIcon)) {
            this._log.warning("Incorrect spinner name: " + this.args.spinner);
            return;
        }
        this.removeIfAnyExisists();
        const iconElement = new icon_IconBuilder(svgIcon).setScale(this.args.scale).build();
        this.mutate(this.addSpinner, iconElement, this.args.spinner);
    }
    removeIfAnyExisists() {
        let existing = this.element.querySelector("svg");
        if (existing) {
            existing.remove();
        }
    }
    onPause(flag) {
        this.fetch(() => {
            if (flag && !this.helper.hasClass(spinner_classPrivateFieldGet(this, _animationPauseClass), this.element)) {
                this.helper.setClassesAs(this.element, spinner_classPrivateFieldGet(this, _animationPauseClass));
            }
            else {
                this.helper.removeClassesAs(this.element, spinner_classPrivateFieldGet(this, _animationPauseClass));
            }
        });
        this.emitEvent(statics["i" /* EVENTS */].PAUSED, flag);
    }
}
_pauseEventId = new WeakMap(), _animationPauseClass = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/switch/slider.js
var slider_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var slider_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var slider_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var slider_prefix, slider_defTimeout, slider_targets, slider_currentIdx, slider_links, slider_task, slider_switchEventId, slider_isTracking, slider_startX, _swipeRatio, _nextIdx, _nextElement, _ratioThreshold, _currSlider, _nextSlider, _animationDef, _targetsCount, slider_moveEventId;






/**
 *
 *   targets: string - slider elements
 *   timeout: number - animation timeout
 *   links: string; - link to switcher (indicator, tab, etc)
 *   autoTimeout: number - if defined, slider will switch item automatically
 *   height: 'auto' | string - element height
 *   animation: string - animation name
 *   loop: boolean - allows to slide elements in loop
 */
const SWITCH_DEFAULT_TARGETS = "> li";
class slider_CuiSliderArgs {
    constructor(prefix, timeout) {
        slider_prefix.set(this, void 0);
        slider_defTimeout.set(this, void 0);
        slider_classPrivateFieldSet(this, slider_prefix, prefix);
        slider_classPrivateFieldSet(this, slider_defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        this.targets = SWITCH_DEFAULT_TARGETS;
        this.timeout = slider_classPrivateFieldGet(this, slider_defTimeout);
        this.links = "";
        this.autoTimeout = -1;
        this.height = "";
        this.animation = "";
        this.loop = false;
    }
    parse(args) {
        this.targets = statics["k" /* SCOPE_SELECTOR */] + Object(functions["t" /* getStringOrDefault */])(args.targets, SWITCH_DEFAULT_TARGETS);
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, slider_classPrivateFieldGet(this, slider_defTimeout));
        this.links = args.links;
        this.autoTimeout = Object(functions["n" /* getIntOrDefault */])(args.autoTimeout, -1);
        this.height = Object(functions["t" /* getStringOrDefault */])(args.height, 'auto');
        this.animation = Object(functions["t" /* getStringOrDefault */])(args.animation, 'slide');
        this.loop = Object(functions["c" /* boolStringOrDefault */])(args.loop, false);
    }
}
slider_prefix = new WeakMap(), slider_defTimeout = new WeakMap();
class CuiSliderComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-slider`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new slider_CuiSliderHandler(element, utils, this.attribute);
    }
}
class slider_CuiSliderHandler extends base_CuiMutableHandler {
    constructor(element, utils, attribute) {
        super("CuiSliderHandler", element, attribute, new slider_CuiSliderArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        slider_targets.set(this, void 0);
        slider_currentIdx.set(this, void 0);
        slider_links.set(this, void 0);
        slider_task.set(this, void 0);
        slider_switchEventId.set(this, void 0);
        //  #moveListener: CuiMoveEventListener;
        slider_isTracking.set(this, void 0);
        slider_startX.set(this, void 0);
        _swipeRatio.set(this, void 0);
        _nextIdx.set(this, void 0);
        _nextElement.set(this, void 0);
        _ratioThreshold.set(this, void 0);
        _currSlider.set(this, void 0);
        _nextSlider.set(this, void 0);
        _animationDef.set(this, void 0);
        _targetsCount.set(this, void 0);
        slider_moveEventId.set(this, void 0);
        slider_classPrivateFieldSet(this, slider_targets, []);
        slider_classPrivateFieldSet(this, slider_currentIdx, -1);
        slider_classPrivateFieldSet(this, _nextIdx, -1);
        slider_classPrivateFieldSet(this, slider_links, []);
        slider_classPrivateFieldSet(this, slider_switchEventId, null);
        slider_classPrivateFieldSet(this, slider_moveEventId, null);
        slider_classPrivateFieldSet(this, slider_isTracking, false);
        slider_classPrivateFieldSet(this, slider_startX, -1);
        slider_classPrivateFieldSet(this, _swipeRatio, 0);
        slider_classPrivateFieldSet(this, _nextElement, null);
        slider_classPrivateFieldSet(this, _ratioThreshold, 0.5);
        slider_classPrivateFieldSet(this, _currSlider, new engine_CuiSwipeAnimationEngine());
        slider_classPrivateFieldSet(this, _nextSlider, new engine_CuiSwipeAnimationEngine());
        slider_classPrivateFieldGet(this, _currSlider).setOnFinish(this.onAnimationFinish.bind(this));
        slider_classPrivateFieldSet(this, _targetsCount, 0);
        slider_classPrivateFieldSet(this, slider_task, new task_CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
        slider_classPrivateFieldSet(this, _animationDef, definitions["a" /* SWIPE_ANIMATIONS_DEFINITIONS */][this.args.animation]);
    }
    onInit() {
        slider_classPrivateFieldSet(this, slider_switchEventId, this.onEvent(statics["i" /* EVENTS */].SWITCH, this.onPushSwitch.bind(this)));
        slider_classPrivateFieldSet(this, slider_moveEventId, this.onEvent(statics["i" /* EVENTS */].GLOBAL_MOVE, this.onMove.bind(this)));
        this.getTargets();
        this.getLinks();
        this.getActiveIndex();
        this.setLinkActive(-1, slider_classPrivateFieldGet(this, slider_currentIdx));
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(slider_classPrivateFieldGet(this, slider_targets)[slider_classPrivateFieldGet(this, slider_currentIdx)]));
        });
        slider_classPrivateFieldSet(this, slider_task, new task_CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
        slider_classPrivateFieldSet(this, _animationDef, definitions["a" /* SWIPE_ANIMATIONS_DEFINITIONS */][this.args.animation]);
        this.startTask();
    }
    onUpdate() {
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(slider_classPrivateFieldGet(this, slider_targets)[slider_classPrivateFieldGet(this, slider_currentIdx)]));
        });
        slider_classPrivateFieldSet(this, _animationDef, definitions["a" /* SWIPE_ANIMATIONS_DEFINITIONS */][this.args.animation]);
        this.startTask();
    }
    onDestroy() {
        slider_classPrivateFieldGet(this, slider_task).stop();
        this.detachEvent(statics["i" /* EVENTS */].SWITCH, slider_classPrivateFieldGet(this, slider_switchEventId));
        this.detachEvent(statics["i" /* EVENTS */].GLOBAL_MOVE, slider_classPrivateFieldGet(this, slider_moveEventId));
    }
    onMutation(record) {
    }
    /**
     * Move listener callback
     * @param data move listener data
     */
    onMove(data) {
        if (this.isLocked || !slider_classPrivateFieldGet(this, _animationDef)) {
            return;
        }
        let current = slider_classPrivateFieldGet(this, slider_targets)[slider_classPrivateFieldGet(this, slider_currentIdx)];
        switch (data.type) {
            case "down":
                if (slider_classPrivateFieldGet(this, slider_isTracking) || !current.contains(data.target)) {
                    return;
                }
                slider_classPrivateFieldSet(this, slider_isTracking, true);
                slider_classPrivateFieldSet(this, slider_startX, data.x);
                slider_classPrivateFieldGet(this, _currSlider).setElement(current);
                this.helper.setClassesAs(document.body, statics["a" /* CLASSES */].swipingOn);
                if (data.event.cancelable)
                    data.event.preventDefault();
                break;
            case "up":
                if (!slider_classPrivateFieldGet(this, slider_isTracking)) {
                    break;
                }
                // Lock component until animation is finished
                this.isLocked = true;
                let absRatio = Math.abs(slider_classPrivateFieldGet(this, _swipeRatio));
                let timeout = absRatio * this.args.timeout;
                let back = absRatio <= slider_classPrivateFieldGet(this, _ratioThreshold);
                slider_classPrivateFieldGet(this, _currSlider).finish(absRatio, timeout, back);
                slider_classPrivateFieldGet(this, _nextSlider).finish(absRatio, timeout, back);
                this.helper.removeClassesAs(document.body, statics["a" /* CLASSES */].swipingOn);
                slider_classPrivateFieldSet(this, slider_isTracking, false);
                break;
            case "move":
                if (!slider_classPrivateFieldGet(this, slider_isTracking)) {
                    break;
                }
                let newRatio = (data.x - slider_classPrivateFieldGet(this, slider_startX)) / current.offsetWidth;
                if (Math.abs(newRatio - slider_classPrivateFieldGet(this, _swipeRatio)) < 0.02) {
                    break;
                }
                let nextIdx = Object(functions["e" /* calculateNextIndex */])(slider_classPrivateFieldGet(this, _swipeRatio) > 0 ? "next" : "prev", slider_classPrivateFieldGet(this, slider_currentIdx), slider_classPrivateFieldGet(this, _targetsCount));
                slider_classPrivateFieldSet(this, _swipeRatio, this.adjustMoveRatio(newRatio));
                if (nextIdx !== slider_classPrivateFieldGet(this, _nextIdx)) {
                    slider_classPrivateFieldGet(this, _nextElement) && this.helper.removeClass(statics["a" /* CLASSES */].animProgress, slider_classPrivateFieldGet(this, _nextElement));
                    slider_classPrivateFieldSet(this, _nextElement, slider_classPrivateFieldGet(this, slider_targets)[nextIdx]);
                    slider_classPrivateFieldSet(this, _nextIdx, nextIdx);
                    slider_classPrivateFieldGet(this, _nextSlider).setElement(slider_classPrivateFieldGet(this, _nextElement));
                    slider_classPrivateFieldGet(this, _nextSlider).setProps(slider_classPrivateFieldGet(this, _swipeRatio) > 0 ? slider_classPrivateFieldGet(this, _animationDef).previous.right : slider_classPrivateFieldGet(this, _animationDef).previous.left);
                    slider_classPrivateFieldGet(this, _currSlider).setProps(slider_classPrivateFieldGet(this, _swipeRatio) > 0 ? slider_classPrivateFieldGet(this, _animationDef).current.right : slider_classPrivateFieldGet(this, _animationDef).current.left);
                    this.mutate(() => {
                        slider_classPrivateFieldGet(this, _nextElement) && this.helper.setClass(statics["a" /* CLASSES */].animProgress, slider_classPrivateFieldGet(this, _nextElement));
                    });
                }
                this.mutate(() => {
                    slider_classPrivateFieldGet(this, _currSlider).update(Math.abs(slider_classPrivateFieldGet(this, _swipeRatio)));
                    slider_classPrivateFieldGet(this, _nextSlider).update(Math.abs(slider_classPrivateFieldGet(this, _swipeRatio)));
                });
                if (data.event.cancelable)
                    data.event.preventDefault();
                break;
            default:
                break;
        }
    }
    adjustMoveRatio(ratio) {
        if (this.args.loop) {
            return ratio;
        }
        if (slider_classPrivateFieldGet(this, slider_currentIdx) === slider_classPrivateFieldGet(this, _targetsCount) - 1 && ratio > 0) {
            return 0;
        }
        if (slider_classPrivateFieldGet(this, slider_currentIdx) === 0 && ratio < 0) {
            return 0;
        }
        return ratio;
    }
    /**
     * Api method to switch childrens
     * @param index - index to switch to
     */
    switch(index) {
        return slider_awaiter(this, void 0, void 0, function* () {
            if (this.isLocked) {
                return false;
            }
            this.onPushSwitch(index);
            return true;
        });
    }
    /**
     *
     * @param element element this animation was perfromed on
     * @param reverted - flag inidicating whether animation was performed to the end or reverted back to start
     * @param errorOccured - tells whether animation was finished with error
     */
    onAnimationFinish(element, reverted, errorOccured) {
        this.isLocked = false;
        // If not go back or from push then switch, else was go back
        let next = slider_classPrivateFieldGet(this, slider_targets)[slider_classPrivateFieldGet(this, _nextIdx)];
        let current = slider_classPrivateFieldGet(this, slider_targets)[slider_classPrivateFieldGet(this, slider_currentIdx)];
        if (!reverted) {
            if (slider_classPrivateFieldGet(this, _nextIdx) > -1) {
                this.mutate(() => {
                    this.helper.removeClass(statics["a" /* CLASSES */].animProgress, next);
                    this.helper.setClass(this.activeClassName, next);
                    this.helper.removeClass(this.activeClassName, current);
                    this.helper.removeAttribute("style", current);
                    this.helper.removeAttribute("style", next);
                    this.setLinkActive(slider_classPrivateFieldGet(this, slider_currentIdx), slider_classPrivateFieldGet(this, _nextIdx));
                    this.emitEvent(statics["i" /* EVENTS */].SWITCHED, {
                        timestamp: Date.now(),
                        index: slider_classPrivateFieldGet(this, _nextIdx)
                    });
                    slider_classPrivateFieldSet(this, slider_currentIdx, slider_classPrivateFieldGet(this, _nextIdx));
                    slider_classPrivateFieldSet(this, _nextIdx, -1);
                    slider_classPrivateFieldSet(this, _nextElement, null);
                    slider_classPrivateFieldSet(this, slider_startX, -1);
                    slider_classPrivateFieldSet(this, _swipeRatio, 0);
                });
            }
        }
        else {
            if (!Object(functions["w" /* is */])(slider_classPrivateFieldGet(this, _nextElement))) {
                //@ts-ignore
                this.helper.removeClass(statics["a" /* CLASSES */].animProgress, slider_classPrivateFieldGet(this, _nextElement));
                //@ts-ignore
                this.helper.removeAttribute("style", slider_classPrivateFieldGet(this, _nextElement));
            }
            this.helper.removeAttribute("style", current);
            slider_classPrivateFieldSet(this, _nextIdx, -1);
            slider_classPrivateFieldSet(this, _nextElement, null);
            slider_classPrivateFieldSet(this, slider_startX, -1);
            slider_classPrivateFieldSet(this, _swipeRatio, 0);
        }
        this.startTask();
    }
    onPushSwitch(index) {
        if (!Object(functions["w" /* is */])(index) ||
            this.isLocked ||
            !slider_classPrivateFieldGet(this, _animationDef) ||
            (!this.args.loop && slider_classPrivateFieldGet(this, slider_currentIdx) === 0 && index === 'prev') ||
            (!this.args.loop && slider_classPrivateFieldGet(this, slider_currentIdx) === slider_classPrivateFieldGet(this, _targetsCount) - 1 && index === 'next')) {
            return;
        }
        this.isLocked = true;
        let nextIdx = Object(functions["e" /* calculateNextIndex */])(index, slider_classPrivateFieldGet(this, slider_currentIdx), slider_classPrivateFieldGet(this, _targetsCount));
        if (nextIdx == slider_classPrivateFieldGet(this, slider_currentIdx) || nextIdx < 0 || nextIdx >= slider_classPrivateFieldGet(this, slider_targets).length) {
            this._log.warning(`Index ${index} is not within the suitable range`);
            return false;
        }
        slider_classPrivateFieldSet(this, _nextIdx, nextIdx);
        let current = slider_classPrivateFieldGet(this, slider_targets)[slider_classPrivateFieldGet(this, slider_currentIdx)];
        let next = slider_classPrivateFieldGet(this, slider_targets)[slider_classPrivateFieldGet(this, _nextIdx)];
        slider_classPrivateFieldGet(this, _currSlider).setElement(current);
        slider_classPrivateFieldGet(this, _nextSlider).setElement(next);
        slider_classPrivateFieldGet(this, _currSlider).setProps(index === 'prev' ? slider_classPrivateFieldGet(this, _animationDef).current.left : slider_classPrivateFieldGet(this, _animationDef).current.right);
        slider_classPrivateFieldGet(this, _nextSlider).setProps(index === 'prev' ? slider_classPrivateFieldGet(this, _animationDef).previous.left : slider_classPrivateFieldGet(this, _animationDef).previous.right);
        this.mutate(() => {
            slider_classPrivateFieldGet(this, _currSlider).finish(0, this.args.timeout, false);
            slider_classPrivateFieldGet(this, _nextSlider).finish(0, this.args.timeout, false);
            this.helper.setClass(statics["a" /* CLASSES */].animProgress, next);
        });
    }
    getActiveIndex() {
        slider_classPrivateFieldSet(this, slider_currentIdx, Object(functions["w" /* is */])(slider_classPrivateFieldGet(this, slider_targets)) ? slider_classPrivateFieldGet(this, slider_targets).findIndex(target => this.helper.hasClass(this.activeClassName, target)) : -1);
    }
    getElementHeight(current) {
        if (!Object(functions["w" /* is */])(this.args.height) || this.args.height === 'auto') {
            return Object(functions["l" /* getChildrenHeight */])(current) + "px";
        }
        else {
            return this.args.height;
        }
    }
    /**
     * Queries targets
     */
    getTargets() {
        let t = this.element.querySelectorAll(this.args.targets);
        slider_classPrivateFieldSet(this, slider_targets, t.length > 0 ? [...t] : []);
        slider_classPrivateFieldSet(this, _targetsCount, slider_classPrivateFieldGet(this, slider_targets).length);
    }
    /**
     * Get linked switcher elements
     */
    getLinks() {
        slider_classPrivateFieldSet(this, slider_links, Object(functions["w" /* is */])(this.args.links) ? [...document.querySelectorAll(this.args.links)] : []);
    }
    /**
     * Set active class on linked switcher if set
     * @param current - current index (to remove active from)
     * @param next - next index (to set action on)
     */
    setLinkActive(current, next) {
        if (!Object(functions["w" /* is */])(slider_classPrivateFieldGet(this, slider_links))) {
            return;
        }
        this.mutate(() => {
            if (Object(functions["x" /* isInRange */])(current, 0, slider_classPrivateFieldGet(this, slider_links).length - 1)) {
                this.helper.removeClass(this.activeClassName, slider_classPrivateFieldGet(this, slider_links)[current]);
            }
            if (Object(functions["x" /* isInRange */])(next, 0, slider_classPrivateFieldGet(this, slider_links).length - 1)) {
                this.helper.setClass(this.activeClassName, slider_classPrivateFieldGet(this, slider_links)[next]);
            }
        });
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        slider_classPrivateFieldGet(this, slider_task).stop();
        if (this.args.autoTimeout) {
            slider_classPrivateFieldGet(this, slider_task).start();
        }
    }
}
slider_targets = new WeakMap(), slider_currentIdx = new WeakMap(), slider_links = new WeakMap(), slider_task = new WeakMap(), slider_switchEventId = new WeakMap(), slider_isTracking = new WeakMap(), slider_startX = new WeakMap(), _swipeRatio = new WeakMap(), _nextIdx = new WeakMap(), _nextElement = new WeakMap(), _ratioThreshold = new WeakMap(), _currSlider = new WeakMap(), _nextSlider = new WeakMap(), _animationDef = new WeakMap(), _targetsCount = new WeakMap(), slider_moveEventId = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/switch/switch.js
var switch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var switch_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var switch_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var switch_prefix, switch_defTimeout, switch_targets, switch_currentIdx, switch_links, _switches, switch_task, switch_switchEventId, _actionsIn, _actionsOut;





const SWITCH_DEFAULT_ACTION_IN = ".{prefix}-switch-animation-default-in";
const SWITCH_DEFAULT_ACTION_OUT = ".{prefix}-switch-animation-default-out";
const switch_SWITCH_DEFAULT_TARGETS = " > *";
class switch_CuiSwitchArgs {
    constructor(prefix, timeout) {
        switch_prefix.set(this, void 0);
        switch_defTimeout.set(this, void 0);
        switch_classPrivateFieldSet(this, switch_prefix, prefix);
        switch_classPrivateFieldSet(this, switch_defTimeout, timeout !== null && timeout !== void 0 ? timeout : 300);
        this.targets = "";
        this.in = "";
        this.out = "";
        this.timeout = switch_classPrivateFieldGet(this, switch_defTimeout);
        this.links = "";
        this.switch = "";
        this.autoTimeout = -1;
        this.height = "";
        this.loop = false;
    }
    parse(args) {
        this.targets = Object(functions["w" /* is */])(args.targets) ? statics["k" /* SCOPE_SELECTOR */] + args.targets : statics["k" /* SCOPE_SELECTOR */] + switch_SWITCH_DEFAULT_TARGETS;
        this.in = Object(functions["t" /* getStringOrDefault */])(args.in, Object(functions["D" /* replacePrefix */])(SWITCH_DEFAULT_ACTION_IN, switch_classPrivateFieldGet(this, switch_prefix)));
        this.out = Object(functions["t" /* getStringOrDefault */])(args.out, Object(functions["D" /* replacePrefix */])(SWITCH_DEFAULT_ACTION_OUT, switch_classPrivateFieldGet(this, switch_prefix)));
        this.timeout = Object(functions["n" /* getIntOrDefault */])(args.timeout, switch_classPrivateFieldGet(this, switch_defTimeout));
        this.links = Object(functions["t" /* getStringOrDefault */])(args.links, "");
        this.switch = Object(functions["t" /* getStringOrDefault */])(args.switch, "");
        this.autoTimeout = Object(functions["n" /* getIntOrDefault */])(args.autoTimeout, -1);
        this.height = Object(functions["t" /* getStringOrDefault */])(args.height, 'auto');
        this.loop = Object(functions["z" /* isStringTrue */])(args.loop);
    }
}
switch_prefix = new WeakMap(), switch_defTimeout = new WeakMap();
class CuiSwitchComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-switch`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new switch_CuiSwitchHandler(element, utils, this.attribute);
    }
}
class switch_CuiSwitchHandler extends base_CuiMutableHandler {
    constructor(element, utils, attribute) {
        super("CuiSwitchHandler", element, attribute, new switch_CuiSwitchArgs(utils.setup.prefix, utils.setup.animationTime), utils);
        switch_targets.set(this, void 0);
        switch_currentIdx.set(this, void 0);
        switch_links.set(this, void 0);
        _switches.set(this, void 0);
        switch_task.set(this, void 0);
        switch_switchEventId.set(this, void 0);
        _actionsIn.set(this, void 0);
        _actionsOut.set(this, void 0);
        switch_classPrivateFieldSet(this, switch_targets, []);
        switch_classPrivateFieldSet(this, switch_currentIdx, -1);
        switch_classPrivateFieldSet(this, switch_links, []);
        switch_classPrivateFieldSet(this, _switches, []);
        switch_classPrivateFieldSet(this, switch_switchEventId, null);
        switch_classPrivateFieldSet(this, _actionsIn, switch_classPrivateFieldSet(this, _actionsOut, []));
        switch_classPrivateFieldSet(this, switch_task, new task_CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
    }
    onInit() {
        switch_classPrivateFieldSet(this, switch_switchEventId, this.onEvent(statics["i" /* EVENTS */].SWITCH, this.onPushSwitch.bind(this)));
        this.parseArguments();
        this.getTargets();
        this.getActiveIndex();
        this.getSwitches();
        this.setSwitchesActive(switch_classPrivateFieldGet(this, switch_currentIdx));
        this.setLinkActive(-1, switch_classPrivateFieldGet(this, switch_currentIdx));
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(switch_classPrivateFieldGet(this, switch_targets)[switch_classPrivateFieldGet(this, switch_currentIdx)]));
        });
        switch_classPrivateFieldSet(this, switch_task, new task_CuiTaskRunner(this.args.autoTimeout, true, this.switch.bind(this, 'next')));
        this.startTask();
    }
    onUpdate() {
        this.parseArguments();
        this.getTargets();
        this.getSwitches();
        this.setSwitchesActive(switch_classPrivateFieldGet(this, switch_currentIdx));
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(switch_classPrivateFieldGet(this, switch_targets)[switch_classPrivateFieldGet(this, switch_currentIdx)]));
        });
        this.startTask();
    }
    onDestroy() {
        switch_classPrivateFieldGet(this, switch_task).stop();
        this.detachEvent(statics["i" /* EVENTS */].SWITCH, switch_classPrivateFieldGet(this, switch_switchEventId));
    }
    onMutation(record) {
        this.getTargets();
        this.mutate(() => {
            this.helper.setStyle(this.element, 'height', this.getElementHeight(switch_classPrivateFieldGet(this, switch_targets)[switch_classPrivateFieldGet(this, switch_currentIdx)]));
        });
    }
    switch(index) {
        return switch_awaiter(this, void 0, void 0, function* () {
            if (this.isLocked) {
                return false;
            }
            this.getSwitches();
            this.getActiveIndex();
            let nextIdx = Object(functions["e" /* calculateNextIndex */])(index, switch_classPrivateFieldGet(this, switch_currentIdx), switch_classPrivateFieldGet(this, switch_targets).length);
            if (!this.args.loop && ((index === "next" && nextIdx === 0) || (index === 'prev' && switch_classPrivateFieldGet(this, switch_currentIdx) === 0))) {
                this.logInfo("Switch blocked by loop settings", "switch");
                return false;
            }
            if (nextIdx == switch_classPrivateFieldGet(this, switch_currentIdx) || nextIdx < 0 || nextIdx >= switch_classPrivateFieldGet(this, switch_targets).length) {
                this.logWarning(`Index ${index} is not within the suitable range`, "switch");
                return false;
            }
            this.isLocked = true;
            this.setSwitchesActive(nextIdx);
            let nextItem = switch_classPrivateFieldGet(this, switch_targets)[nextIdx];
            yield this.actionsHelper.performSwitchAction(nextItem, switch_classPrivateFieldGet(this, switch_currentIdx) > -1 ? switch_classPrivateFieldGet(this, switch_targets)[switch_classPrivateFieldGet(this, switch_currentIdx)] : null, switch_classPrivateFieldGet(this, _actionsIn), switch_classPrivateFieldGet(this, _actionsOut), () => {
                // Set next element active
                nextItem.classList.add(this.activeClassName);
                // Remove active from current element (if current exists)
                if (switch_classPrivateFieldGet(this, switch_currentIdx) > -1)
                    switch_classPrivateFieldGet(this, switch_targets)[switch_classPrivateFieldGet(this, switch_currentIdx)].classList.remove(this.activeClassName);
                // Update linked items
                this.setLinkActive(switch_classPrivateFieldGet(this, switch_currentIdx), nextIdx);
                // Update element height - it must be done a parent get height based on current child
                this.helper.setStyle(this.element, 'height', this.getElementHeight(nextItem));
                this.startTask();
                this.isLocked = false;
            }, this.args.timeout);
            this.emitEvent(statics["i" /* EVENTS */].SWITCHED, {
                timestamp: Date.now(),
                index: nextIdx
            });
            return true;
        });
    }
    onPushSwitch(index) {
        this.switch(index);
    }
    getActiveIndex() {
        switch_classPrivateFieldSet(this, switch_currentIdx, Object(functions["w" /* is */])(switch_classPrivateFieldGet(this, switch_targets)) ? switch_classPrivateFieldGet(this, switch_targets).findIndex(target => this.helper.hasClass(this.activeClassName, target)) : -1);
    }
    getElementHeight(current) {
        if (!Object(functions["w" /* is */])(this.args.height) || this.args.height === 'auto') {
            return Object(functions["l" /* getChildrenHeight */])(current) + "px";
        }
        else {
            return this.args.height;
        }
    }
    /**
     * Gets attributes value and prepares properties
     */
    parseArguments() {
        switch_classPrivateFieldSet(this, _actionsIn, utils_actions["a" /* CuiActionsListFactory */].get(this.args.in));
        switch_classPrivateFieldSet(this, _actionsOut, utils_actions["a" /* CuiActionsListFactory */].get(this.args.out));
        switch_classPrivateFieldSet(this, switch_links, Object(functions["w" /* is */])(this.args.links) ? [...document.querySelectorAll(this.args.links)] : []);
    }
    /**
     * Query target elements
     */
    getTargets() {
        console.log(this.args.targets);
        let t = this.element.querySelectorAll(this.args.targets);
        switch_classPrivateFieldSet(this, switch_targets, t.length > 0 ? [...t] : []);
    }
    getSwitches() {
        let switches = Object(functions["w" /* is */])(this.args.switch) ? document.querySelectorAll(this.args.switch) : null;
        switch_classPrivateFieldSet(this, _switches, []);
        if (switches) {
            switches.forEach(sw => {
                switch_classPrivateFieldGet(this, _switches).push(sw);
            });
        }
    }
    setLinkActive(current, next) {
        if (!Object(functions["w" /* is */])(switch_classPrivateFieldGet(this, switch_links))) {
            return;
        }
        if (Object(functions["x" /* isInRange */])(current, 0, switch_classPrivateFieldGet(this, switch_links).length - 1)) {
            this.helper.removeClass(this.activeClassName, switch_classPrivateFieldGet(this, switch_links)[current]);
        }
        if (Object(functions["x" /* isInRange */])(next, 0, switch_classPrivateFieldGet(this, switch_links).length - 1)) {
            this.helper.setClass(this.activeClassName, switch_classPrivateFieldGet(this, switch_links)[next]);
        }
    }
    /**
     * Sets propers active state on attached switches
     * @param index
     */
    setSwitchesActive(index) {
        switch_classPrivateFieldGet(this, _switches).forEach(sw => {
            this.emitLinkSwitch(sw.$cuid, index);
        });
    }
    /**
     * Emits push event to attached switch to set proper index
     * @param id - cuid of element
     * @param index - index to be set on element
     */
    emitLinkSwitch(id, index) {
        if (Object(functions["w" /* is */])(id))
            this.utils.bus.emit(statics["i" /* EVENTS */].SWITCH, id, index);
    }
    /**
     * Runs task if arguments setup allows for it - auto flag must be set to true
     */
    startTask() {
        switch_classPrivateFieldGet(this, switch_task).stop();
        if (this.args.autoTimeout) {
            switch_classPrivateFieldGet(this, switch_task).start();
        }
    }
}
switch_targets = new WeakMap(), switch_currentIdx = new WeakMap(), switch_links = new WeakMap(), _switches = new WeakMap(), switch_task = new WeakMap(), switch_switchEventId = new WeakMap(), _actionsIn = new WeakMap(), _actionsOut = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/switch/switcher.js
var switcher_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var switcher_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _targetId, _isList, _listeners;



const SWITCHER_LIST_ITEM_SELECTOR = "li > a";
class switcher_CuiSwitcherArgs {
    constructor() {
        this.index = "";
        this.target = "";
    }
    parse(args) {
        if (!Object(functions["w" /* is */])(args)) {
            return;
        }
        this.target = args.target;
        this.index = args.index;
    }
}
class CuiSwitcherComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : 'cui'}-switcher`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new switcher_CuiSwitcherHandler(element, utils, this.attribute);
    }
}
class switcher_CuiSwitcherHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiSwitcherHandler", element, attribute, new switcher_CuiSwitcherArgs(), utils);
        _targetId.set(this, void 0);
        _isList.set(this, void 0);
        _listeners.set(this, void 0);
        switcher_classPrivateFieldSet(this, _targetId, null);
        switcher_classPrivateFieldSet(this, _isList, element.tagName === 'UL');
        this.onClickEvent = this.onClickEvent.bind(this);
        switcher_classPrivateFieldSet(this, _listeners, []);
    }
    onInit() {
        this.setEvents();
        this.getTarget();
    }
    onUpdate() {
        this.getTarget();
    }
    onDestroy() {
        this.removeEvents();
    }
    getTarget() {
        if (!Object(functions["w" /* is */])(this.args.target)) {
            switcher_classPrivateFieldSet(this, _targetId, null);
        }
        let target = document.querySelector(this.args.target);
        if (Object(functions["w" /* is */])(target)) {
            switcher_classPrivateFieldSet(this, _targetId, target.$cuid);
        }
    }
    setEvents() {
        if (switcher_classPrivateFieldGet(this, _isList)) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el, index) => {
                let list = this.onListItemClick.bind(this, index);
                switcher_classPrivateFieldGet(this, _listeners).push(list);
                //@ts-ignore
                el.addEventListener('click', list);
            });
        }
        else {
            this.element.addEventListener('click', this.onClickEvent);
        }
    }
    removeEvents() {
        if (switcher_classPrivateFieldGet(this, _isList)) {
            let elements = this.element.querySelectorAll(SWITCHER_LIST_ITEM_SELECTOR);
            elements.forEach((el, index) => {
                if (switcher_classPrivateFieldGet(this, _listeners).length > index)
                    //@ts-ignore
                    el.removeEventListener('click', switcher_classPrivateFieldGet(this, _listeners)[index]);
            });
            switcher_classPrivateFieldSet(this, _listeners, []);
        }
        else {
            this.element.removeEventListener('click', this.onClickEvent);
        }
    }
    onClickEvent(ev) {
        this.getTarget();
        if (!Object(functions["w" /* is */])(this.args.index)) {
            return;
        }
        this.onClick(this.args.index.trim());
    }
    onListItemClick(index, ev) {
        this.getTarget();
        this.onClick(index);
    }
    onClick(index) {
        if (!Object(functions["w" /* is */])(switcher_classPrivateFieldGet(this, _targetId))) {
            return;
        }
        //@ts-ignore  targetId checked already
        this.utils.bus.emit(statics["i" /* EVENTS */].SWITCH, switcher_classPrivateFieldGet(this, _targetId), index);
    }
}
_targetId = new WeakMap(), _isList = new WeakMap(), _listeners = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/toggle/toggle.js
var toggle_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var toggle_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var toggle_target, toggle_utils, _toggleEventId, toggle_actions;




class toggle_CuiToggleArgs {
    constructor() {
        this.action = "";
        this.target = "";
    }
    parse(args) {
        if (Object(functions["w" /* is */])(args) && Object(functions["y" /* isString */])(args)) {
            this.action = args;
        }
        else {
            this.target = Object(functions["t" /* getStringOrDefault */])(args.target, "");
            this.action = args.action;
        }
    }
}
class CuiToggleComponent {
    constructor(prefix) {
        this.attribute = `${prefix !== null && prefix !== void 0 ? prefix : "cui"}-toggle`;
    }
    getStyle() {
        return null;
    }
    get(element, utils) {
        return new toggle_CuiToggleHandler(element, utils, this.attribute);
    }
}
class toggle_CuiToggleHandler extends CuiHandler {
    constructor(element, utils, attribute) {
        super("CuiToggleHandler", element, attribute, new toggle_CuiToggleArgs(), utils);
        toggle_target.set(this, void 0);
        toggle_utils.set(this, void 0);
        _toggleEventId.set(this, void 0);
        toggle_actions.set(this, void 0);
        toggle_classPrivateFieldSet(this, toggle_target, this.element);
        toggle_classPrivateFieldSet(this, toggle_utils, utils);
        toggle_classPrivateFieldSet(this, _toggleEventId, null);
        toggle_classPrivateFieldSet(this, toggle_actions, []);
        this.onClick = this.onClick.bind(this);
    }
    onInit() {
        toggle_classPrivateFieldSet(this, toggle_target, this.getTarget());
        toggle_classPrivateFieldSet(this, toggle_actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
        this.element.addEventListener('click', this.onClick);
        toggle_classPrivateFieldSet(this, _toggleEventId, this.onEvent(statics["i" /* EVENTS */].TOGGLE, this.toggle.bind(this)));
    }
    onUpdate() {
        toggle_classPrivateFieldSet(this, toggle_target, this.getTarget());
        toggle_classPrivateFieldSet(this, toggle_actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
    }
    onDestroy() {
        this.element.removeEventListener('click', this.onClick);
        this.detachEvent(statics["i" /* EVENTS */].TOGGLE, toggle_classPrivateFieldGet(this, _toggleEventId));
    }
    toggle() {
        if (!toggle_classPrivateFieldGet(this, toggle_target)) {
            this.logError("Target in not provided", "toggle");
            return;
        }
        toggle_classPrivateFieldGet(this, toggle_actions).forEach(action => action.toggle(toggle_classPrivateFieldGet(this, toggle_target), toggle_classPrivateFieldGet(this, toggle_utils)));
        this.emitEvent(statics["i" /* EVENTS */].TOGGLED, {
            action: this.args.action,
            target: toggle_classPrivateFieldGet(this, toggle_target),
            timestamp: Date.now()
        });
    }
    onClick(ev) {
        this.toggle();
        ev.preventDefault();
    }
    getTarget() {
        var _a;
        if (!this.args.target) {
            return this.element;
        }
        return (_a = document.querySelector(this.args.target)) !== null && _a !== void 0 ? _a : this.element;
    }
}
toggle_target = new WeakMap(), toggle_utils = new WeakMap(), _toggleEventId = new WeakMap(), toggle_actions = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/tooltip/tooltip.js
var tooltip_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var tooltip_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _defAct, tooltip_prefix, tooltip_hoverListener, _tooltip, tooltip_margin, tooltip_positionCalculator, _tooltipDataCls, tooltip_actions, tooltip_task;







const TOOLTIP_ACTION = ".{prefix}-animation-tooltip-in";
const TOOLTIP_DATA = "{prefix}-tooltip-data";
class tooltip_CuiTooltipArgs {
    constructor(prefix) {
        _defAct.set(this, void 0);
        tooltip_classPrivateFieldSet(this, _defAct, Object(functions["D" /* replacePrefix */])(TOOLTIP_ACTION, prefix));
        this.content = "";
        this.width = 150;
        this.margin = 8;
        this.timeout = 3000;
        this.pos = "";
        this.action = tooltip_classPrivateFieldGet(this, _defAct);
    }
    parse(val) {
        if (Object(functions["y" /* isString */])(val)) {
            this.content = Object(functions["t" /* getStringOrDefault */])(val, "");
            return;
        }
        this.content = Object(functions["t" /* getStringOrDefault */])(val.content, "");
        this.width = Object(functions["n" /* getIntOrDefault */])(val.width, 150);
        this.margin = Object(functions["n" /* getIntOrDefault */])(val.margin, 8);
        this.pos = Object(functions["t" /* getStringOrDefault */])(val.pos, "");
        this.action = Object(functions["t" /* getStringOrDefault */])(val.action, tooltip_classPrivateFieldGet(this, _defAct));
        this.timeout = Object(functions["n" /* getIntOrDefault */])(val.timeout, 3000);
    }
}
_defAct = new WeakMap();
class CuiTooltipComponent {
    constructor(prefix) {
        tooltip_prefix.set(this, void 0);
        tooltip_classPrivateFieldSet(this, tooltip_prefix, prefix !== null && prefix !== void 0 ? prefix : 'cui');
        this.attribute = `${tooltip_classPrivateFieldGet(this, tooltip_prefix)}-tooltip`;
    }
    getStyle() {
        return null;
    }
    get(element, sutils) {
        return new tooltip_CuiTooltipHandler(element, this.attribute, sutils, tooltip_classPrivateFieldGet(this, tooltip_prefix));
    }
}
tooltip_prefix = new WeakMap();
class tooltip_CuiTooltipHandler extends CuiHandler {
    constructor(element, attribute, utils, prefix) {
        super("CuiTooltipHandler", element, attribute, new tooltip_CuiTooltipArgs(prefix), utils);
        tooltip_hoverListener.set(this, void 0);
        _tooltip.set(this, void 0);
        tooltip_margin.set(this, void 0);
        tooltip_positionCalculator.set(this, void 0);
        _tooltipDataCls.set(this, void 0);
        tooltip_actions.set(this, void 0);
        tooltip_task.set(this, void 0);
        tooltip_classPrivateFieldSet(this, _tooltip, undefined);
        tooltip_classPrivateFieldSet(this, tooltip_actions, []);
        tooltip_classPrivateFieldSet(this, tooltip_task, undefined);
        tooltip_classPrivateFieldSet(this, _tooltipDataCls, Object(functions["D" /* replacePrefix */])(TOOLTIP_DATA, prefix));
        tooltip_classPrivateFieldSet(this, tooltip_hoverListener, new hover_CuiHoverListener(element));
        tooltip_classPrivateFieldGet(this, tooltip_hoverListener).setCallback(this.onHover.bind(this));
        tooltip_classPrivateFieldSet(this, tooltip_margin, 8);
        tooltip_classPrivateFieldSet(this, tooltip_positionCalculator, new calculator_CuiBasePositionCalculator());
        tooltip_classPrivateFieldGet(this, tooltip_positionCalculator).setPreferred("top-center");
    }
    onInit() {
        tooltip_classPrivateFieldGet(this, tooltip_hoverListener).attach();
        this.getDataFromArgs();
        tooltip_classPrivateFieldSet(this, tooltip_task, new task_CuiTaskRunner(this.args.timeout, false, this.removeTooltip.bind(this)));
    }
    onUpdate() {
        this.getDataFromArgs();
        if (tooltip_classPrivateFieldGet(this, tooltip_task))
            tooltip_classPrivateFieldGet(this, tooltip_task).setTimeout(this.args.timeout);
    }
    onDestroy() {
        tooltip_classPrivateFieldGet(this, tooltip_hoverListener).detach();
    }
    onHover(ev) {
        if (ev.isHovering) {
            this.createTooltip();
        }
        else {
            this.removeTooltip();
        }
    }
    createTooltip() {
        if (Object(functions["w" /* is */])(tooltip_classPrivateFieldGet(this, _tooltip)) || !Object(functions["w" /* is */])(this.args.content)) {
            return;
        }
        const box = this.element.getBoundingClientRect();
        tooltip_classPrivateFieldSet(this, _tooltip, new builders_element["a" /* ElementBuilder */]("div").setClasses(tooltip_classPrivateFieldGet(this, _tooltipDataCls)).build());
        tooltip_classPrivateFieldGet(this, _tooltip).textContent = this.args.content;
        tooltip_classPrivateFieldGet(this, _tooltip).style.maxWidth = `${this.args.width}px`;
        document.body.appendChild(tooltip_classPrivateFieldGet(this, _tooltip));
        this.mutate(() => {
            if (!tooltip_classPrivateFieldGet(this, _tooltip)) {
                return;
            }
            const toolbox = tooltip_classPrivateFieldGet(this, _tooltip).getBoundingClientRect();
            tooltip_classPrivateFieldGet(this, tooltip_positionCalculator).setMargin(tooltip_classPrivateFieldGet(this, tooltip_margin));
            try {
                let [x, y] = tooltip_classPrivateFieldGet(this, tooltip_positionCalculator).calculate(box, toolbox.width, toolbox.height);
                tooltip_classPrivateFieldGet(this, _tooltip).style.top = `${y}px`;
                tooltip_classPrivateFieldGet(this, _tooltip).style.left = `${x}px`;
                this.toggleActions();
                if (tooltip_classPrivateFieldGet(this, tooltip_task))
                    tooltip_classPrivateFieldGet(this, tooltip_task).start();
            }
            catch (e) {
                this._log.exception(e);
            }
        });
    }
    removeTooltip() {
        if (!Object(functions["w" /* is */])(tooltip_classPrivateFieldGet(this, _tooltip))) {
            return;
        }
        if (tooltip_classPrivateFieldGet(this, tooltip_task))
            tooltip_classPrivateFieldGet(this, tooltip_task).stop();
        this.mutate(() => {
            //@ts-ignore already checkded
            tooltip_classPrivateFieldGet(this, _tooltip).remove();
            tooltip_classPrivateFieldSet(this, _tooltip, undefined);
        });
    }
    getDataFromArgs() {
        tooltip_classPrivateFieldGet(this, tooltip_positionCalculator).setMargin(this.args.margin);
        tooltip_classPrivateFieldGet(this, tooltip_positionCalculator).setStatic(this.args.pos);
        tooltip_classPrivateFieldSet(this, tooltip_actions, utils_actions["a" /* CuiActionsListFactory */].get(this.args.action));
    }
    toggleActions() {
        if (!tooltip_classPrivateFieldGet(this, _tooltip)) {
            return;
        }
        tooltip_classPrivateFieldGet(this, tooltip_actions).forEach(action => {
            // @ts-ignore
            action.toggle(tooltip_classPrivateFieldGet(this, _tooltip));
        });
    }
}
tooltip_hoverListener = new WeakMap(), _tooltip = new WeakMap(), tooltip_margin = new WeakMap(), tooltip_positionCalculator = new WeakMap(), _tooltipDataCls = new WeakMap(), tooltip_actions = new WeakMap(), tooltip_task = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-components/dist/esm/module.js






















/**
 * Function that initializes and returns all components available in package
 * @param attributes - object holding data needed for components initialization
 */
function GetComponents(attributes) {
    let prefix = attributes === null || attributes === void 0 ? void 0 : attributes.prefix;
    return [
        new CuiIconComponent(prefix),
        new CuiTooltipComponent(prefix),
        new circle_CuiCircleComponent(prefix),
        new spinner_CuiSpinnerComponent(prefix),
        new scroll_CuiScrollComponent(prefix),
        new CuiScrollspyComponent(prefix),
        new CuiIntersectionComponent(prefix),
        new CuiOpenComponent(prefix),
        new CuiCloseComponent(prefix),
        new CuiToggleComponent(prefix),
        new CuiDialogComponent(prefix),
        new CuiOffCanvasComponent(prefix),
        new CuiAccordionComponent(prefix),
        new CuiDropComponenet(prefix),
        new CuiOffsetComponent(prefix),
        new CuiSwitchComponent(prefix),
        new CuiSwitcherComponent(prefix),
        new CuiFloatComponent(prefix),
        new CuiSliderComponent(prefix),
        new CuiBanerComponent(prefix),
        new CuiCoverComponent(prefix),
        new CuiSortableComponent(prefix),
    ];
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ GetPlugins; });

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/statics.js
var statics = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/click/click.js
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _bus, _boundClick;

class click_CuiWindowClickPlugin {
    constructor() {
        this.name = 'click-plugin';
        _bus.set(this, void 0);
        _boundClick.set(this, void 0);
        this.description = "CuiWindowClickPlugin";
        __classPrivateFieldSet(this, _bus, undefined);
        __classPrivateFieldSet(this, _boundClick, this.onWindowClick.bind(this));
    }
    init(utils) {
        __classPrivateFieldSet(this, _bus, utils.bus);
        window.addEventListener('click', __classPrivateFieldGet(this, _boundClick));
    }
    destroy() {
        window.removeEventListener('click', __classPrivateFieldGet(this, _boundClick));
    }
    onWindowClick(ev) {
        if (__classPrivateFieldGet(this, _bus))
            __classPrivateFieldGet(this, _bus).emit(statics["i" /* EVENTS */].WINDOW_CLICK, null, ev);
    }
}
_bus = new WeakMap(), _boundClick = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/functions.js
var functions = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/listeners/keys.js
var keys_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var keys_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _callback, _keys, _inProgress, _singleEmit, _isAttached, _onKeyDownBound, _onKeyUpBound;

class keys_CuiKeyPressListener {
    constructor(singleEmit, keys) {
        _callback.set(this, void 0);
        _keys.set(this, void 0);
        _inProgress.set(this, void 0);
        _singleEmit.set(this, void 0);
        _isAttached.set(this, void 0);
        _onKeyDownBound.set(this, void 0);
        _onKeyUpBound.set(this, void 0);
        keys_classPrivateFieldSet(this, _inProgress, false);
        keys_classPrivateFieldSet(this, _singleEmit, true);
        keys_classPrivateFieldSet(this, _isAttached, false);
        keys_classPrivateFieldSet(this, _callback, undefined);
        keys_classPrivateFieldSet(this, _keys, keys !== null && keys !== void 0 ? keys : []);
        keys_classPrivateFieldSet(this, _onKeyDownBound, this.onKeyDown.bind(this));
        keys_classPrivateFieldSet(this, _onKeyUpBound, this.onKeyUp.bind(this));
    }
    setCallback(callback) {
        keys_classPrivateFieldSet(this, _callback, callback);
    }
    isInProgress() {
        return keys_classPrivateFieldGet(this, _inProgress);
    }
    attach() {
        document.addEventListener('keydown', keys_classPrivateFieldGet(this, _onKeyDownBound));
        if (keys_classPrivateFieldGet(this, _singleEmit)) {
            document.addEventListener('keyup', keys_classPrivateFieldGet(this, _onKeyUpBound));
        }
        keys_classPrivateFieldSet(this, _isAttached, true);
    }
    detach() {
        document.removeEventListener('keydown', keys_classPrivateFieldGet(this, _onKeyDownBound));
        if (keys_classPrivateFieldGet(this, _singleEmit)) {
            document.addEventListener('keyup', keys_classPrivateFieldGet(this, _onKeyUpBound));
        }
        keys_classPrivateFieldSet(this, _isAttached, false);
    }
    isAttached() {
        return keys_classPrivateFieldGet(this, _isAttached);
    }
    onKeyDown(ev) {
        if (keys_classPrivateFieldGet(this, _inProgress)) {
            return;
        }
        keys_classPrivateFieldSet(this, _inProgress, true);
        try {
            if ((!Object(functions["w" /* is */])(keys_classPrivateFieldGet(this, _keys)) || keys_classPrivateFieldGet(this, _keys).includes(ev.code)) && keys_classPrivateFieldGet(this, _callback)) {
                keys_classPrivateFieldGet(this, _callback).call(this, ev);
            }
        }
        catch (e) {
            console.error(e);
        }
        finally {
            if (!keys_classPrivateFieldGet(this, _singleEmit))
                keys_classPrivateFieldSet(this, _inProgress, false);
        }
    }
    onKeyUp(ev) {
        keys_classPrivateFieldSet(this, _inProgress, false);
    }
}
_callback = new WeakMap(), _keys = new WeakMap(), _inProgress = new WeakMap(), _singleEmit = new WeakMap(), _isAttached = new WeakMap(), _onKeyDownBound = new WeakMap(), _onKeyUpBound = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/keys/observer.js
var observer_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var observer_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _listener, observer_bus;


class observer_CuiKeysObserver {
    constructor(bus) {
        _listener.set(this, void 0);
        observer_bus.set(this, void 0);
        observer_classPrivateFieldSet(this, observer_bus, bus);
        observer_classPrivateFieldSet(this, _listener, new keys_CuiKeyPressListener(true));
        observer_classPrivateFieldGet(this, _listener).setCallback(this.onKeyDown.bind(this));
    }
    connect() {
        observer_classPrivateFieldGet(this, _listener).attach();
    }
    disconnect() {
        observer_classPrivateFieldGet(this, _listener).detach();
    }
    onKeyDown(ev) {
        observer_classPrivateFieldGet(this, observer_bus).emit(statics["i" /* EVENTS */].KEYDOWN, null, {
            timestamp: Date.now(),
            event: ev
        });
    }
}
_listener = new WeakMap(), observer_bus = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/keys/keys.js
var keys_keys_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var keys_keys_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _keysObserver;

class keys_CuiKeysObserverPlugin {
    constructor(keySetup) {
        this.name = 'keys-observer';
        _keysObserver.set(this, void 0);
        this.description = "CuiKeysObserverPlugin";
        this.setup = keySetup;
        keys_keys_classPrivateFieldSet(this, _keysObserver, undefined);
    }
    init(utils) {
        keys_keys_classPrivateFieldSet(this, _keysObserver, new observer_CuiKeysObserver(utils.bus));
        keys_keys_classPrivateFieldGet(this, _keysObserver).connect();
    }
    destroy() {
        if (keys_keys_classPrivateFieldGet(this, _keysObserver))
            keys_keys_classPrivateFieldGet(this, _keysObserver).disconnect();
    }
}
_keysObserver = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/listeners/media.js
var media_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var media_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _mediaQuery, media_callback, _isInitialized, media_inProgress, _onEventBound;
class CuiMediaQueryListener {
    constructor(mediaQuery) {
        _mediaQuery.set(this, void 0);
        media_callback.set(this, void 0);
        _isInitialized.set(this, void 0);
        media_inProgress.set(this, void 0);
        _onEventBound.set(this, void 0);
        media_classPrivateFieldSet(this, _mediaQuery, mediaQuery);
        media_classPrivateFieldSet(this, _isInitialized, false);
        media_classPrivateFieldSet(this, media_callback, undefined);
        media_classPrivateFieldSet(this, media_inProgress, false);
        media_classPrivateFieldSet(this, _onEventBound, this.event.bind(this));
    }
    setCallback(callback) {
        media_classPrivateFieldSet(this, media_callback, callback);
    }
    isInProgress() {
        return media_classPrivateFieldGet(this, media_inProgress);
    }
    attach() {
        if (!window.matchMedia || media_classPrivateFieldGet(this, _isInitialized) || !media_classPrivateFieldGet(this, _mediaQuery)) {
            return;
        }
        window.matchMedia(media_classPrivateFieldGet(this, _mediaQuery))
            .addEventListener('change', media_classPrivateFieldGet(this, _onEventBound));
        media_classPrivateFieldSet(this, _isInitialized, true);
    }
    detach() {
        if (media_classPrivateFieldGet(this, _isInitialized)) {
            window.matchMedia(media_classPrivateFieldGet(this, _mediaQuery)).removeEventListener('change', media_classPrivateFieldGet(this, _onEventBound));
            media_classPrivateFieldSet(this, _isInitialized, false);
        }
    }
    isAttached() {
        return media_classPrivateFieldGet(this, _isInitialized);
    }
    event(ev) {
        if (media_classPrivateFieldGet(this, media_inProgress) || !media_classPrivateFieldGet(this, media_callback)) {
            return;
        }
        media_classPrivateFieldSet(this, media_inProgress, true);
        try {
            media_classPrivateFieldGet(this, media_callback).call(this, ev);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            media_classPrivateFieldSet(this, media_inProgress, false);
        }
    }
}
_mediaQuery = new WeakMap(), media_callback = new WeakMap(), _isInitialized = new WeakMap(), media_inProgress = new WeakMap(), _onEventBound = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/light/light.js
var light_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var light_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var light_listener, _utils;


class light_CuiAutoLightModePlugin {
    constructor(autoLightInit) {
        this.description = 'Dark vs Light mode auto switcher';
        this.name = 'auto-light';
        light_listener.set(this, void 0);
        _utils.set(this, void 0);
        this.description = "CuiAutoLightModePlugin";
        this.setup = autoLightInit;
        light_classPrivateFieldSet(this, _utils, undefined);
        light_classPrivateFieldSet(this, light_listener, undefined);
    }
    init(utils) {
        light_classPrivateFieldSet(this, _utils, utils);
        if (this.setup.autoLight && Object(functions["u" /* getSystemLightMode */])() === 'dark') {
            light_classPrivateFieldGet(this, _utils).setLightMode('dark');
        }
        light_classPrivateFieldSet(this, light_listener, new CuiMediaQueryListener('(prefers-color-scheme: dark)'));
        light_classPrivateFieldGet(this, light_listener).setCallback(this.onChange.bind(this));
        light_classPrivateFieldGet(this, light_listener).attach();
    }
    destroy() {
        if (light_classPrivateFieldGet(this, light_listener))
            light_classPrivateFieldGet(this, light_listener).detach();
    }
    onChange(ev) {
        var _a;
        if (!light_classPrivateFieldGet(this, _utils)) {
            return;
        }
        let autoLightSetup = light_classPrivateFieldGet(this, _utils).setup.plugins[this.description];
        let autoLight = (_a = autoLightSetup === null || autoLightSetup === void 0 ? void 0 : autoLightSetup.autoLight) !== null && _a !== void 0 ? _a : false;
        if (autoLight) {
            if (ev.matches) {
                light_classPrivateFieldGet(this, _utils).setLightMode('dark');
            }
            else {
                light_classPrivateFieldGet(this, _utils).setLightMode('light');
            }
        }
    }
}
light_listener = new WeakMap(), _utils = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/print/print.js
var print_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var print_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var print_listener, print_utils;


class print_CuiAutoPrintModePlugin {
    constructor(autoPrintInit) {
        this.description = 'Auto print mode';
        this.name = 'auto-print';
        print_listener.set(this, void 0);
        print_utils.set(this, void 0);
        this.description = "CuiAutoPrintModePlugin";
        this.setup = autoPrintInit;
        print_classPrivateFieldSet(this, print_listener, undefined);
        print_classPrivateFieldSet(this, print_utils, undefined);
    }
    init(utils) {
        print_classPrivateFieldSet(this, print_utils, utils);
        if (this.setup.autoPrint && Object(functions["v" /* getSystemPrintMode */])()) {
            print_classPrivateFieldGet(this, print_utils).setPrintMode(true);
        }
        print_classPrivateFieldSet(this, print_listener, new CuiMediaQueryListener('print'));
        print_classPrivateFieldGet(this, print_listener).setCallback(this.onChange.bind(this));
        print_classPrivateFieldGet(this, print_listener).attach();
    }
    destroy() {
        if (print_classPrivateFieldGet(this, print_listener))
            print_classPrivateFieldGet(this, print_listener).detach();
    }
    onChange(ev) {
        var _a, _b;
        if (!print_classPrivateFieldGet(this, print_utils)) {
            return;
        }
        this.setup = print_classPrivateFieldGet(this, print_utils).setup.plugins[this.description];
        let autoPrint = (_b = (_a = this.setup) === null || _a === void 0 ? void 0 : _a.autoPrint) !== null && _b !== void 0 ? _b : false;
        if (autoPrint) {
            if (ev.matches) {
                print_classPrivateFieldGet(this, print_utils).setPrintMode(true);
            }
            else {
                print_classPrivateFieldGet(this, print_utils).setPrintMode(false);
            }
        }
    }
}
print_listener = new WeakMap(), print_utils = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/models/errors.js
var errors = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/models/colors.js
var colors_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var colors_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _red, _green, _blue, _alpha, _colorStr, _colorStr_1;


class colors_CuiColor {
    constructor(red, green, blue, alpha) {
        _red.set(this, void 0);
        _green.set(this, void 0);
        _blue.set(this, void 0);
        _alpha.set(this, void 0);
        colors_classPrivateFieldSet(this, _red, 0);
        colors_classPrivateFieldSet(this, _blue, 0);
        colors_classPrivateFieldSet(this, _green, 0);
        colors_classPrivateFieldSet(this, _alpha, 0);
        this.set(red, green, blue, alpha);
    }
    static create(colorStr) {
        if (!Object(functions["w" /* is */])(colorStr)) {
            throw new errors["d" /* CuiColorError */](`Given color value is not in a valid format`);
        }
        let parser;
        if (colorStr.startsWith("#")) {
            parser = new colors_HexColorParser(colorStr);
        }
        else if (colorStr.startsWith("rgb")) {
            parser = new colors_RgbColorParser(colorStr);
        }
        else {
            throw new errors["d" /* CuiColorError */]("Unknown color string format");
        }
        let res = parser.parse();
        if (!res) {
            throw new errors["d" /* CuiColorError */]("Color was not parsed");
        }
        return res;
    }
    set(red, green, blue, alpha) {
        colors_classPrivateFieldSet(this, _alpha, Object(functions["r" /* getRangeValue */])(alpha !== null && alpha !== void 0 ? alpha : 1, 0, 1));
        colors_classPrivateFieldSet(this, _blue, Object(functions["r" /* getRangeValue */])(blue, 0, 255));
        colors_classPrivateFieldSet(this, _red, Object(functions["r" /* getRangeValue */])(red, 0, 255));
        colors_classPrivateFieldSet(this, _green, Object(functions["r" /* getRangeValue */])(green, 0, 255));
    }
    setRed(red) {
        colors_classPrivateFieldSet(this, _red, Object(functions["r" /* getRangeValue */])(red, 0, 255));
    }
    setGreen(green) {
        colors_classPrivateFieldSet(this, _green, Object(functions["r" /* getRangeValue */])(green, 0, 255));
    }
    setBlue(blue) {
        colors_classPrivateFieldSet(this, _blue, Object(functions["r" /* getRangeValue */])(blue, 0, 255));
    }
    opacity(val) {
        colors_classPrivateFieldSet(this, _alpha, Object(functions["r" /* getRangeValue */])(val, 0, 1));
        return this;
    }
    lighten(amount) {
        this.shade(amount);
        return this;
    }
    darken(amount) {
        this.shade(-amount);
        return this;
    }
    invert() {
        colors_classPrivateFieldSet(this, _blue, 255 - colors_classPrivateFieldGet(this, _blue));
        colors_classPrivateFieldSet(this, _red, 255 - colors_classPrivateFieldGet(this, _red));
        colors_classPrivateFieldSet(this, _green, 255 - colors_classPrivateFieldGet(this, _green));
        return this;
    }
    getColorValue(type) {
        const t = type ? type.toLowerCase() : '#';
        switch (type) {
            case 'red':
                return colors_classPrivateFieldGet(this, _red);
            case 'green':
                return colors_classPrivateFieldGet(this, _green);
            case 'blue':
                return colors_classPrivateFieldGet(this, _blue);
            case 'alpha':
                return colors_classPrivateFieldGet(this, _alpha);
        }
        return -1;
    }
    toCssString() {
        return `rgba(${colors_classPrivateFieldGet(this, _red)}, ${colors_classPrivateFieldGet(this, _green)}, ${colors_classPrivateFieldGet(this, _blue)}, ${colors_classPrivateFieldGet(this, _alpha)})`;
    }
    shade(percent, self = true) {
        colors_classPrivateFieldSet(this, _red, this.shadeSingle(colors_classPrivateFieldGet(this, _red), percent, self));
        colors_classPrivateFieldSet(this, _green, this.shadeSingle(colors_classPrivateFieldGet(this, _green), percent, self));
        colors_classPrivateFieldSet(this, _blue, this.shadeSingle(colors_classPrivateFieldGet(this, _blue), percent, self));
    }
    shadeSingle(val, percent, self = true) {
        let rel = self ? val : 255;
        let prop = (rel * percent) / 100;
        let newVal = val + Math.round(prop);
        return Object(functions["r" /* getRangeValue */])(newVal, 0, 255);
    }
    clone() {
        return new colors_CuiColor(colors_classPrivateFieldGet(this, _red), colors_classPrivateFieldGet(this, _green), colors_classPrivateFieldGet(this, _blue), colors_classPrivateFieldGet(this, _alpha));
    }
}
_red = new WeakMap(), _green = new WeakMap(), _blue = new WeakMap(), _alpha = new WeakMap();
class colors_HexColorParser {
    constructor(colorStr) {
        _colorStr.set(this, void 0);
        colors_classPrivateFieldSet(this, _colorStr, colorStr);
    }
    trim() {
        colors_classPrivateFieldSet(this, _colorStr, colors_classPrivateFieldGet(this, _colorStr) ? colors_classPrivateFieldGet(this, _colorStr).trim() : "");
        return;
    }
    isValid() {
        return Object(functions["w" /* is */])(colors_classPrivateFieldGet(this, _colorStr)) && colors_classPrivateFieldGet(this, _colorStr).startsWith("#");
    }
    parse() {
        let red = 0;
        let blue = 0;
        let green = 0;
        let alpha = 1;
        let length = colors_classPrivateFieldGet(this, _colorStr).length;
        if (colors_classPrivateFieldGet(this, _colorStr).length === 4) {
            red = parseInt(colors_classPrivateFieldGet(this, _colorStr)[1] + colors_classPrivateFieldGet(this, _colorStr)[1], 16);
            green = parseInt(colors_classPrivateFieldGet(this, _colorStr)[2] + colors_classPrivateFieldGet(this, _colorStr)[2], 16);
            blue = parseInt(colors_classPrivateFieldGet(this, _colorStr)[3] + colors_classPrivateFieldGet(this, _colorStr)[3], 16);
        }
        else {
            red = parseInt(colors_classPrivateFieldGet(this, _colorStr)[1] + colors_classPrivateFieldGet(this, _colorStr)[2], 16);
            green = parseInt(colors_classPrivateFieldGet(this, _colorStr)[3] + colors_classPrivateFieldGet(this, _colorStr)[4], 16);
            blue = parseInt(colors_classPrivateFieldGet(this, _colorStr)[5] + colors_classPrivateFieldGet(this, _colorStr)[6], 16);
            if (length > 7) {
                let alphaHex = parseInt(colors_classPrivateFieldGet(this, _colorStr)[7] + colors_classPrivateFieldGet(this, _colorStr)[8], 16);
                alpha = parseFloat((alphaHex / 255).toFixed(2));
            }
        }
        return new colors_CuiColor(red, green, blue, alpha);
    }
}
_colorStr = new WeakMap();
class colors_RgbColorParser {
    constructor(colorStr) {
        _colorStr_1.set(this, void 0);
        colors_classPrivateFieldSet(this, _colorStr_1, colorStr);
    }
    trim() {
        colors_classPrivateFieldSet(this, _colorStr_1, Object(functions["w" /* is */])(colors_classPrivateFieldGet(this, _colorStr_1)) ? colors_classPrivateFieldGet(this, _colorStr_1).trim() : "");
    }
    isValid() {
        return Object(functions["w" /* is */])(colors_classPrivateFieldGet(this, _colorStr_1)) && colors_classPrivateFieldGet(this, _colorStr_1).startsWith("rgb");
    }
    parse() {
        let len = colors_classPrivateFieldGet(this, _colorStr_1).length;
        let str = colors_classPrivateFieldGet(this, _colorStr_1).startsWith("rgba") ? colors_classPrivateFieldGet(this, _colorStr_1).substring(5, len - 1) : colors_classPrivateFieldGet(this, _colorStr_1).substring(4, len - 1);
        let split = str.split(",");
        if (!Object(functions["x" /* isInRange */])(split.length, 3, 4)) {
            return undefined;
        }
        let red = parseInt(split[0]);
        let green = parseInt(split[1]);
        let blue = parseInt(split[2]);
        let alpha = split.length === 4 ? parseFloat(split[3]) : 1;
        return new colors_CuiColor(red, green, blue, alpha);
    }
}
_colorStr_1 = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/factories/logger.js + 1 modules
var logger = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/properties/colors.js
var properties_colors_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var properties_colors_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _set, _setter, _setter_1, _set_1;

const baseColorSets = {
    "light": {
        background: statics["g" /* CSS_VARIABLES */].colorLightBackground,
        base: statics["g" /* CSS_VARIABLES */].colorLightBase,
        active: statics["g" /* CSS_VARIABLES */].colorLightActive,
        muted: statics["g" /* CSS_VARIABLES */].colorLightMuted,
    },
    "dark": {
        background: statics["g" /* CSS_VARIABLES */].colorDarkBackground,
        base: statics["g" /* CSS_VARIABLES */].colorDarkBase,
        active: statics["g" /* CSS_VARIABLES */].colorDarkActive,
        muted: statics["g" /* CSS_VARIABLES */].colorDarkMuted,
    }
};
const themeColors = {
    'accent': {
        base: statics["g" /* CSS_VARIABLES */].colorAccent,
        muted: statics["g" /* CSS_VARIABLES */].colorAccentMuted,
        active: statics["g" /* CSS_VARIABLES */].colorAccentActive,
        shade: statics["g" /* CSS_VARIABLES */].colorAccentShade,
        shadeDark: statics["g" /* CSS_VARIABLES */].colorAccentShadeDark
    },
    'secondary': {
        base: statics["g" /* CSS_VARIABLES */].colorSecondary,
        muted: statics["g" /* CSS_VARIABLES */].colorSecondaryMuted,
        active: statics["g" /* CSS_VARIABLES */].colorSecondaryActive,
        shade: statics["g" /* CSS_VARIABLES */].colorSecondaryShade,
        shadeDark: statics["g" /* CSS_VARIABLES */].colorSecondaryShadeDark
    },
    'error': {
        base: statics["g" /* CSS_VARIABLES */].colorError,
        muted: statics["g" /* CSS_VARIABLES */].colorErrorMuted,
        active: statics["g" /* CSS_VARIABLES */].colorErrorActive,
        shade: statics["g" /* CSS_VARIABLES */].colorErrorShade,
        shadeDark: statics["g" /* CSS_VARIABLES */].colorErrorShadeDark
    },
    'warning': {
        base: statics["g" /* CSS_VARIABLES */].colorWarning,
        muted: statics["g" /* CSS_VARIABLES */].colorWarningMuted,
        active: statics["g" /* CSS_VARIABLES */].colorWarningActive,
        shade: statics["g" /* CSS_VARIABLES */].colorWarningShade,
        shadeDark: statics["g" /* CSS_VARIABLES */].colorWarningShadeDark
    },
    'success': {
        base: statics["g" /* CSS_VARIABLES */].colorSuccess,
        muted: statics["g" /* CSS_VARIABLES */].colorSuccessMuted,
        active: statics["g" /* CSS_VARIABLES */].colorSuccessActive,
        shade: statics["g" /* CSS_VARIABLES */].colorSuccessShade,
        shadeDark: statics["g" /* CSS_VARIABLES */].colorSuccessShadeDark
    }
};
class CuiBaseColorsSetter {
    constructor(colorSet, setter) {
        _set.set(this, void 0);
        _setter.set(this, void 0);
        properties_colors_classPrivateFieldSet(this, _set, baseColorSets[colorSet]);
        properties_colors_classPrivateFieldSet(this, _setter, setter);
    }
    setBackgroundColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set).background, color);
    }
    setBaseColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set).base, color);
    }
    setActiveColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set).active, color);
    }
    setMutedColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set).muted, color);
    }
    setBaseColors(colors) {
        if (!properties_colors_classPrivateFieldGet(this, _set)) {
            return;
        }
        let set = {};
        set[properties_colors_classPrivateFieldGet(this, _set).background] = colors.background ? colors.background.toCssString() : "";
        set[properties_colors_classPrivateFieldGet(this, _set).active] = colors.active ? colors.active.toCssString() : "";
        set[properties_colors_classPrivateFieldGet(this, _set).muted] = colors.muted ? colors.muted.toCssString() : "";
        set[properties_colors_classPrivateFieldGet(this, _set).base] = colors.base ? colors.base.toCssString() : "";
        properties_colors_classPrivateFieldGet(this, _setter).setProperties(set);
    }
    setColor(color, value) {
        properties_colors_classPrivateFieldGet(this, _setter).setProperty(color, value.toCssString());
    }
}
_set = new WeakMap(), _setter = new WeakMap();
class CuiThemeColorsSetter {
    constructor(set, setter) {
        _setter_1.set(this, void 0);
        _set_1.set(this, void 0);
        properties_colors_classPrivateFieldSet(this, _setter_1, setter);
        properties_colors_classPrivateFieldSet(this, _set_1, themeColors[set]);
    }
    setBaseColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set_1).base, color);
    }
    setMutedColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set_1).muted, color);
    }
    setActiveColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set_1).active, color);
    }
    setShadeColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set_1).shade, color);
    }
    setShadeDarkColor(color) {
        this.setColor(properties_colors_classPrivateFieldGet(this, _set_1).shadeDark, color);
    }
    setColors(colors) {
        if (!properties_colors_classPrivateFieldGet(this, _set_1)) {
            return;
        }
        let set = {};
        set[properties_colors_classPrivateFieldGet(this, _set_1).shade] = colors.shade ? colors.shade.toCssString() : "";
        set[properties_colors_classPrivateFieldGet(this, _set_1).shadeDark] = colors.shadeDark ? colors.shadeDark.toCssString() : "";
        set[properties_colors_classPrivateFieldGet(this, _set_1).active] = colors.active ? colors.active.toCssString() : "";
        set[properties_colors_classPrivateFieldGet(this, _set_1).muted] = colors.muted ? colors.muted.toCssString() : "";
        set[properties_colors_classPrivateFieldGet(this, _set_1).base] = colors.base ? colors.base.toCssString() : "";
        properties_colors_classPrivateFieldGet(this, _setter_1).setProperties(set);
    }
    setAutoColors(base) {
        let set = {};
        set[properties_colors_classPrivateFieldGet(this, _set_1).base] = base.toCssString();
        set[properties_colors_classPrivateFieldGet(this, _set_1).shade] = base.lighten(30).toCssString();
        set[properties_colors_classPrivateFieldGet(this, _set_1).shadeDark] = base.darken(30).toCssString();
        set[properties_colors_classPrivateFieldGet(this, _set_1).active] = base.darken(10).toCssString();
        set[properties_colors_classPrivateFieldGet(this, _set_1).muted] = base.lighten(10).toCssString();
        properties_colors_classPrivateFieldGet(this, _setter_1).setProperties(set);
    }
    setColor(color, value) {
        properties_colors_classPrivateFieldGet(this, _setter_1).setProperty(color, value.toCssString());
    }
}
_setter_1 = new WeakMap(), _set_1 = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/properties/setter.js
var setter_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var setter_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var setter_utils;

class setter_PropertySetter {
    constructor(utils) {
        setter_utils.set(this, void 0);
        setter_classPrivateFieldSet(this, setter_utils, utils);
    }
    setProperty(property, value) {
        if (!Object(functions["b" /* are */])(property, value)) {
            return;
        }
        setter_classPrivateFieldGet(this, setter_utils).interactions.mutate(() => {
            setter_classPrivateFieldGet(this, setter_utils).setProperty(property, value);
        }, null);
    }
    setProperties(set) {
        if (!Object(functions["w" /* is */])(set)) {
            return;
        }
        setter_classPrivateFieldGet(this, setter_utils).interactions.mutate(() => {
            for (let property in set) {
                if (Object(functions["w" /* is */])(set[property]))
                    setter_classPrivateFieldGet(this, setter_utils).setProperty(property, set[property]);
            }
        }, null);
    }
}
setter_utils = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/properties/handler.js
var handler_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var handler_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var handler_setter;




class handler_CuiPropertiesHandler {
    constructor(utils) {
        handler_setter.set(this, void 0);
        handler_classPrivateFieldSet(this, handler_setter, new setter_PropertySetter(utils));
    }
    /**
     * Sets main font size
     * @param {number} value numeric value
     * @param {string} unit optional - size unit, px if not provided
     */
    setBaseFontSize(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].fontSize, value, unit);
    }
    /**
     * Sets base animation time
     * @param {number} value - time value
     * @param {string} unit  - optional - ms is passed when no provided
     */
    setAnimationTime(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].animationTime, value, unit !== null && unit !== void 0 ? unit : 'ms');
    }
    /**
    * Sets long animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeLong(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].setAnimationTimeLong, value, unit !== null && unit !== void 0 ? unit : 'ms');
    }
    /**
    * Sets short animation time
    * @param {number} value - time value
    * @param {string} unit  - optional - ms is passed when no provided
    */
    setAnimationTimeShort(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].setAnimationTimeShort, value, unit !== null && unit !== void 0 ? unit : 'ms');
    }
    /**
    * Sets main line size
    * @param {number} value numeric value
    * @param {string} unit optional - size unit, px if not provided
    */
    setBaseLineHeight(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].lineHeight, value, unit);
    }
    /**
     * Sets base margin value
     * @param {number} value - margin value
     * @param {string} unit - optional - margin unit (px default)
     */
    setBaseMargin(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].margin, value, unit);
    }
    /**
    * Sets base padding value
    * @param {number} value - padding value
    * @param {string} unit - optional - padding unit (px default)
    */
    setBasePadding(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].padding, value, unit);
    }
    /**
    * Sets base border radius
    * @param {number} value - border value
    * @param {string} unit - optional - border unit (px default)
    */
    setBaseBorderRadius(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].borderRadius, value, unit);
    }
    /**
   * Sets component space
   * @param {number} value - space value
   * @param {string} unit - optional - space unit (px default)
   */
    setComponentSpace(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].componentSpace, value, unit);
    }
    /**
     * Sets new accordion chevron icon
     * @param value A SVG formatted to be replaced default value
     */
    setAccordionIcon(value) {
        if (!Object(functions["w" /* is */])(value)) {
            return;
        }
        this.setCSSVariable(statics["g" /* CSS_VARIABLES */].accordionIcon, value);
    }
    /**
    * Sets a scrollbar width
    * @param value A SVG formatted to be replaced default value
    */
    setScrollbarWidth(value, unit) {
        this.setBaseUnitValue(statics["g" /* CSS_VARIABLES */].scrollbarWidth, value, unit);
    }
    /**
     * Sets app viewport light background color
     * @param color color to be set
     */
    setAppBackgroundColor(color) {
        if (!Object(functions["w" /* is */])(color)) {
            return;
        }
        this.setCSSVariable(statics["g" /* CSS_VARIABLES */].colorLightAppBackground, color.toCssString());
    }
    /**
    * Sets app viewport dark background color
    * @param color color to be set
    */
    setDarkAppBackgroundColor(color) {
        if (!Object(functions["w" /* is */])(color)) {
            return;
        }
        this.setCSSVariable(statics["g" /* CSS_VARIABLES */].colorDarkAppBackground, color.toCssString());
    }
    getBaseColorsSetter() {
        return new CuiBaseColorsSetter("light", handler_classPrivateFieldGet(this, handler_setter));
    }
    getDarkBaseColorsSetter() {
        return new CuiBaseColorsSetter("dark", handler_classPrivateFieldGet(this, handler_setter));
    }
    getAccentThemeColorsSetter() {
        return new CuiThemeColorsSetter("accent", handler_classPrivateFieldGet(this, handler_setter));
    }
    getSecondaryThemeColorsSetter() {
        return new CuiThemeColorsSetter("secondary", handler_classPrivateFieldGet(this, handler_setter));
    }
    getErrorThemeColorsSetter() {
        return new CuiThemeColorsSetter("error", handler_classPrivateFieldGet(this, handler_setter));
    }
    getWarningThemeColorsSetter() {
        return new CuiThemeColorsSetter("warning", handler_classPrivateFieldGet(this, handler_setter));
    }
    getSuccessThemeColorsSetter() {
        return new CuiThemeColorsSetter("success", handler_classPrivateFieldGet(this, handler_setter));
    }
    /**
     * Sets property in interactive way
     * @param {string} name property name - value of {prefix} is replaced by current prefix
     * @param {string} value - property value
     */
    setCSSVariable(name, value) {
        handler_classPrivateFieldGet(this, handler_setter).setProperty(name, value);
    }
    /**
     * Sets unit type CSS variable property
     * @param name Variable name
     * @param value numeric value
     * @param unit unit - optional - px is default value
     */
    setBaseUnitValue(name, value, unit) {
        if (!Object(functions["w" /* is */])(value)) {
            return;
        }
        let strVal = `${value}${unit !== null && unit !== void 0 ? unit : "px"}`;
        this.setCSSVariable(name, strVal);
    }
}
handler_setter = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/properties/properties.js
var properties_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var properties_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _log;




class properties_CuiCSSVariablesPlugin {
    constructor(keySetup) {
        this.name = 'css-variables-plugin';
        _log.set(this, void 0);
        this.description = "CuiCSSVariablesPlugin";
        this.setup = keySetup;
        properties_classPrivateFieldSet(this, _log, logger["a" /* CuiLoggerFactory */].get("CuiCSSVariablesPlugin"));
        this.handler = undefined;
    }
    init(utils) {
        this.handler = new handler_CuiPropertiesHandler(utils);
        utils.bus.on("csschange", this.onCssChange.bind(this));
    }
    destroy() {
    }
    onCssChange(event) {
        if (!this.handler) {
            return;
        }
        let setter = null;
        let accentSetter = null;
        switch (event.method) {
            case "baseFontSize":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseFontSize(event.arg.value, event.arg.unit);
                break;
            case "baseLineHeight":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseLineHeight(event.arg.value, event.arg.unit);
                break;
            case "animationTime":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setAnimationTime(event.arg.value, event.arg.unit);
                break;
            case "animationTimeLong":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setAnimationTimeLong(event.arg.value, event.arg.unit);
                break;
            case "animationTimeShort":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setAnimationTimeShort(event.arg.value, event.arg.unit);
                break;
            case "margin":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseMargin(event.arg.value, event.arg.unit);
                break;
            case "padding":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBasePadding(event.arg.value, event.arg.unit);
                break;
            case "borderRadius":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setBaseBorderRadius(event.arg.value, event.arg.unit);
                break;
            case "componentSpace":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setComponentSpace(event.arg.value, event.arg.unit);
                break;
            case "scrollbarWidth":
                if (!this.isArgNumber(event.arg))
                    return;
                this.handler.setScrollbarWidth(event.arg.value, event.arg.unit);
                break;
            case "accordionIcon":
                if (!Object(functions["w" /* is */])(event.arg))
                    return;
                this.handler.setAccordionIcon(event.arg);
                break;
            case "appLightBackground":
                if (!Object(functions["w" /* is */])(event.arg))
                    return;
                this.handler.setAppBackgroundColor(colors_CuiColor.create(event.arg));
                break;
            case "appDarkBackground":
                if (!Object(functions["w" /* is */])(event.arg))
                    return;
                this.handler.setDarkAppBackgroundColor(colors_CuiColor.create(event.arg));
                break;
            case "appDarkBackground":
                if (!Object(functions["w" /* is */])(event.arg))
                    return;
                this.handler.setDarkAppBackgroundColor(colors_CuiColor.create(event.arg));
                break;
            case "mainColorBackground":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setBackgroundColor(colors_CuiColor.create(event.arg.color));
                break;
            case "mainColor":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setBaseColor(colors_CuiColor.create(event.arg.color));
                break;
            case "mainColorMuted":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setMutedColor(colors_CuiColor.create(event.arg.color));
                break;
            case "mainColorActive":
                if (!this.isArgColor(event.arg))
                    return;
                setter = this.getBaseColorSetter(event.arg.palette);
                if (setter)
                    setter.setActiveColor(colors_CuiColor.create(event.arg.color));
                break;
            case "themeAutoColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setAutoColors(colors_CuiColor.create(event.arg.color));
            case "themeBaseColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setAutoColors(colors_CuiColor.create(event.arg.color));
            case "themeMutedColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setMutedColor(colors_CuiColor.create(event.arg.color));
            case "themeActiveColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setActiveColor(colors_CuiColor.create(event.arg.color));
            case "themeShadeColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setShadeColor(colors_CuiColor.create(event.arg.color));
            case "themeShadeDarkColor":
                if (!this.isArgColor(event.arg))
                    return;
                accentSetter = this.getAccentColorSetter(event.arg.palette);
                if (accentSetter)
                    accentSetter.setShadeDarkColor(colors_CuiColor.create(event.arg.color));
            default:
                properties_classPrivateFieldGet(this, _log).warning("Unknown event method", "onCssChange");
        }
    }
    isArgNumber(arg) {
        return Object(functions["w" /* is */])(arg) && Object(functions["w" /* is */])(arg.value);
    }
    isArgColor(arg) {
        return Object(functions["w" /* is */])(arg) && Object(functions["w" /* is */])(arg.palette) && Object(functions["w" /* is */])(arg.color);
    }
    getBaseColorSetter(pallete) {
        if (!this.handler) {
            return undefined;
        }
        let prerp = pallete.trim().toLowerCase();
        switch (prerp) {
            case "light":
                return this.handler.getBaseColorsSetter();
            case "dark":
                return this.handler.getDarkBaseColorsSetter();
        }
    }
    getAccentColorSetter(pallete) {
        if (!this.handler) {
            return undefined;
        }
        let prerp = pallete.trim().toLowerCase();
        switch (prerp) {
            case "accent":
                return this.handler.getAccentThemeColorsSetter();
            case "secondary":
                return this.handler.getSecondaryThemeColorsSetter();
            case "error":
                return this.handler.getErrorThemeColorsSetter();
            case "warning":
                return this.handler.getWarningThemeColorsSetter();
            case "success":
                return this.handler.getSuccessThemeColorsSetter();
            default:
                return undefined;
        }
    }
}
_log = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-plugins/dist/esm/module.js





function GetPlugins(init) {
    let light = init ? init.autoLight : true;
    let print = init ? init.autoPrint : true;
    return [
        new light_CuiAutoLightModePlugin({ autoLight: light }),
        new print_CuiAutoPrintModePlugin({ autoPrint: print }),
        new keys_CuiKeysObserverPlugin({}),
        new click_CuiWindowClickPlugin(),
        new properties_CuiCSSVariablesPlugin({})
    ];
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ utils_CuiUtils; });

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/models/setup.js
var models_setup = __webpack_require__(8);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/utils/interactions.js
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _limit;
class FastDom {
    constructor() {
        this.isScheduled = false;
        _limit.set(this, void 0);
        this.raf = window.requestAnimationFrame.bind(window);
        this.writes = [];
        this.reads = [];
        __classPrivateFieldSet(this, _limit, 5);
    }
    mutate(callback, ctx, ...args) {
        this.reads.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    fetch(callback, ctx, ...args) {
        this.writes.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    createTask(callback, ctx, ...args) {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }
    run(tasks) {
        let task = null;
        while (task = tasks.shift()) {
            task();
        }
    }
    schedule(recursion) {
        if (!this.isScheduled) {
            this.isScheduled = true;
            if (recursion && recursion >= __classPrivateFieldGet(this, _limit)) {
                throw new Error("Fast Dom limit reached");
            }
            else {
                this.raf(this.flush.bind(this, recursion));
            }
        }
    }
    flush(recursion) {
        let rec = recursion !== null && recursion !== void 0 ? recursion : 0;
        let error = null;
        let writes = this.writes;
        let reads = this.reads;
        try {
            this.run(reads);
            this.run(writes);
        }
        catch (e) {
            error = e;
            console.error(e);
        }
        this.isScheduled = false;
        if (error) {
            this.schedule(rec + 1);
        }
        if (this.writes.length || this.reads.length) {
            this.schedule(rec + 1);
        }
    }
}
_limit = new WeakMap();
class SyncInteractions {
    constructor() {
        this.isRunning = false;
        this.tasks = [];
        this.raf = window.requestAnimationFrame.bind(window);
    }
    mutate(callback, ctx, ...args) {
        this.tasks.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    fetch(callback, ctx, ...args) {
        this.tasks.push(this.createTask(callback, ctx, ...args));
        this.schedule();
    }
    schedule() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.raf(this.flush.bind(this));
        }
    }
    flush() {
        let task = null;
        while (task = this.tasks.shift()) {
            try {
                task();
            }
            catch (e) {
            }
        }
        this.isRunning = false;
    }
    createTask(callback, ctx, ...args) {
        return ctx || args ? callback.bind(ctx, ...args) : callback;
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/factories/interactions.js

class interactions_CuiInteractionsFactory {
    /**
     * Gets new instance of component focused logger
     * @param type - Interactions type
     */
    static get(type) {
        const interactionType = type;
        switch (interactionType) {
            case 'async':
                return new FastDom();
            default:
                return new SyncInteractions();
        }
    }
}

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/models/errors.js
var errors = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/functions.js
var functions = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/utils/dictionary.js
var dictionary_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var dictionary_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _keys, _values;


class dictionary_CuiDictionary {
    constructor(init) {
        _keys.set(this, void 0);
        _values.set(this, void 0);
        dictionary_classPrivateFieldSet(this, _keys, []);
        dictionary_classPrivateFieldSet(this, _values, []);
        if (init) {
            init.forEach(x => {
                if (!Object(functions["w" /* is */])(x.key)) {
                    dictionary_classPrivateFieldSet(this, _keys, []);
                    dictionary_classPrivateFieldSet(this, _values, []);
                    throw new errors["b" /* ArgumentError */]("Key is empty");
                }
                this.add(x.key, x.value);
            });
        }
    }
    add(key, value) {
        this.throwOnEmptyKey(key);
        if (this.containsKey(key))
            throw new Error("Key already exists");
        dictionary_classPrivateFieldGet(this, _keys).push(key);
        dictionary_classPrivateFieldGet(this, _values).push(value);
    }
    remove(key) {
        if (!Object(functions["w" /* is */])(key)) {
            return;
        }
        let index = dictionary_classPrivateFieldGet(this, _keys).indexOf(key);
        if (index >= 0) {
            dictionary_classPrivateFieldGet(this, _keys).splice(index, 1);
            dictionary_classPrivateFieldGet(this, _values).splice(index, 1);
        }
    }
    get(key) {
        this.throwOnEmptyKey(key);
        let index = this.indexOf(key);
        if (index < 0) {
            return undefined;
        }
        return dictionary_classPrivateFieldGet(this, _values)[index];
    }
    containsKey(key) {
        return Object(functions["w" /* is */])(key) && this.indexOf(key) >= 0;
    }
    keys() {
        return dictionary_classPrivateFieldGet(this, _keys);
    }
    values() {
        return dictionary_classPrivateFieldGet(this, _values);
    }
    indexOf(key) {
        return Object(functions["w" /* is */])(key) ? dictionary_classPrivateFieldGet(this, _keys).indexOf(key) : -1;
    }
    update(key, value) {
        this.throwOnEmptyKey(key);
        let index = this.indexOf(key);
        if (index < 0) {
            throw new errors["g" /* ItemNotFoundError */](`Item with key [${key}] not found`);
        }
        dictionary_classPrivateFieldGet(this, _values)[index] = value;
    }
    clear() {
        dictionary_classPrivateFieldSet(this, _values, []);
        dictionary_classPrivateFieldSet(this, _keys, []);
    }
    throwOnEmptyKey(key) {
        if (!Object(functions["w" /* is */])(key)) {
            throw new errors["b" /* ArgumentError */]("Key is empty");
        }
    }
}
_keys = new WeakMap(), _values = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/managers/cache.js
var cache_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var cache_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _cache, _maxSize;


class cache_CuiCacheManager {
    constructor(maxSize) {
        _cache.set(this, void 0);
        _maxSize.set(this, void 0);
        cache_classPrivateFieldSet(this, _cache, new dictionary_CuiDictionary());
        cache_classPrivateFieldSet(this, _maxSize, maxSize !== null && maxSize !== void 0 ? maxSize : 500);
    }
    put(key, element) {
        if (!Object(functions["w" /* is */])(key))
            return;
        if (this.has(key)) {
            cache_classPrivateFieldGet(this, _cache).update(key, element);
            return;
        }
        this.clean();
        cache_classPrivateFieldGet(this, _cache).add(key, element);
    }
    get(key) {
        if (!this.has(key))
            return undefined;
        let item = cache_classPrivateFieldGet(this, _cache).get(key);
        if (item && item.refresh()) {
            return item;
        }
        cache_classPrivateFieldGet(this, _cache).remove(key);
        return undefined;
    }
    has(key) {
        return Object(functions["w" /* is */])(key) ? cache_classPrivateFieldGet(this, _cache).containsKey(key) : false;
    }
    remove(key) {
        if (!Object(functions["w" /* is */])(key))
            return false;
        if (this.has(key)) {
            cache_classPrivateFieldGet(this, _cache).remove(key);
            return true;
        }
        return false;
    }
    clear() {
        cache_classPrivateFieldGet(this, _cache).clear();
    }
    clean() {
        if (cache_classPrivateFieldGet(this, _cache).keys().length >= cache_classPrivateFieldGet(this, _maxSize)) {
            cache_classPrivateFieldGet(this, _cache).remove(cache_classPrivateFieldGet(this, _cache).keys()[0]);
        }
    }
}
_cache = new WeakMap(), _maxSize = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/factories/logger.js + 1 modules
var logger = __webpack_require__(4);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/bus/handlers.js
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var handlers_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var handlers_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _log, _executor, _executor_1;


class handlers_EmitHandlerBase {
    constructor() {
        this.queue = [];
        this.isBusy = false;
    }
    idMatches(emitId, handleId) {
        return !Object(functions["w" /* is */])(emitId) || (Object(functions["w" /* is */])(emitId) && emitId == handleId);
    }
}
class handlers_SimpleEventEmitHandler extends handlers_EmitHandlerBase {
    constructor(executor) {
        super();
        _log.set(this, void 0);
        _executor.set(this, void 0);
        handlers_classPrivateFieldSet(this, _executor, executor);
        handlers_classPrivateFieldSet(this, _log, logger["a" /* CuiLoggerFactory */].get("SimpleEventEmitHandler"));
    }
    handle(events, cuid, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(events)) {
                handlers_classPrivateFieldGet(this, _log).warning("No events provided");
                return;
            }
            this.queue.push({
                events: events,
                cuid: cuid,
                args: args
            });
            if (!this.isBusy) {
                if (!this.isBusy) {
                    this.isBusy = true;
                    this.perform();
                    if (this.queue.length > 0) {
                        yield this.perform();
                    }
                    this.isBusy = false;
                }
            }
            return;
        });
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            let task = this.queue.shift();
            if (!task) {
                return;
            }
            for (let id in task.events) {
                let event = task.events[id];
                try {
                    if (this.idMatches(task.cuid, event.$cuid))
                        yield handlers_classPrivateFieldGet(this, _executor).execute(event.callback, task.args);
                }
                catch (e) {
                    handlers_classPrivateFieldGet(this, _log).error(e);
                }
            }
        });
    }
}
_log = new WeakMap(), _executor = new WeakMap();
class handlers_TaskedEventEmitHandler extends handlers_EmitHandlerBase {
    constructor(executor) {
        super();
        _executor_1.set(this, void 0);
        handlers_classPrivateFieldSet(this, _executor_1, executor);
    }
    handle(events, cuid, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(events)) {
                return;
            }
            this.queue.push({
                events: events,
                cuid: cuid,
                args: args
            });
            if (!this.isBusy) {
                this.isBusy = true;
                this.perform();
                if (this.queue.length > 0) {
                    this.perform();
                }
                this.isBusy = false;
            }
            return;
        });
    }
    perform() {
        return __awaiter(this, void 0, void 0, function* () {
            let task = this.queue.shift();
            let promises = [];
            if (!task) {
                return Promise.all(promises);
            }
            for (let id in task.events) {
                let event = task.events[id];
                if (this.idMatches(task.cuid, event.$cuid))
                    promises.push(handlers_classPrivateFieldGet(this, _executor_1).execute(event.callback, task.args));
            }
            return Promise.all(promises);
        });
    }
}
_executor_1 = new WeakMap();
class CuiEventEmitHandlerFactory {
    static get(name, executor) {
        switch (name) {
            case "tasked":
                return new handlers_TaskedEventEmitHandler(executor);
            default:
                return new handlers_SimpleEventEmitHandler(executor);
        }
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/bus/executors.js
var executors_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CuiCallbackExecutor {
    execute(callback, args) {
        return executors_awaiter(this, void 0, void 0, function* () {
            args = args !== null && args !== void 0 ? args : [];
            callback(...args);
            return;
        });
    }
}

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/bus/bus.js
var bus_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var bus_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var bus_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _events, bus_log, _eventHandler, _name, _events_1, _log_1, _buses, _last, _isOn, _statistics;





class bus_CuiEventBus {
    constructor(emitHandler, name) {
        _events.set(this, void 0);
        bus_log.set(this, void 0);
        _eventHandler.set(this, void 0);
        _name.set(this, void 0);
        bus_classPrivateFieldSet(this, _events, {});
        bus_classPrivateFieldSet(this, _eventHandler, emitHandler);
        bus_classPrivateFieldSet(this, _name, name !== null && name !== void 0 ? name : "CuiEventBus");
        bus_classPrivateFieldSet(this, bus_log, logger["a" /* CuiLoggerFactory */].get(bus_classPrivateFieldGet(this, _name)));
    }
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to
     */
    on(name, callback, cui) {
        if (!Object(functions["b" /* are */])(name, callback)) {
            throw new errors["b" /* ArgumentError */]("Missing argument");
        }
        // When context is not provided (e.g. anonymous function) then generate random
        let id = bus_classPrivateFieldGet(this, _name) + "-" + Object(functions["j" /* generateRandomString */])();
        if (!bus_classPrivateFieldGet(this, _events)[name]) {
            bus_classPrivateFieldGet(this, _events)[name] = {};
        }
        if (this.isAttached(bus_classPrivateFieldGet(this, _events)[name], id, cui)) {
            return null;
        }
        bus_classPrivateFieldGet(this, bus_log).debug(`Attaching new event: [${name}] for: [${id}]`);
        bus_classPrivateFieldGet(this, _events)[name][id] = { callback: callback, $cuid: this.getCuid(cui) };
        return id;
    }
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name, id) {
        if (!Object(functions["b" /* are */])(name, id)) {
            throw new errors["b" /* ArgumentError */]("Missing argument");
        }
        let ev = bus_classPrivateFieldGet(this, _events)[name];
        bus_classPrivateFieldGet(this, bus_log).debug(`Detaching item: [${id}] from [${name}]`);
        if (this.isAttached(ev, id)) {
            delete ev[id];
        }
    }
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name) {
        if (Object(functions["w" /* is */])(name) && bus_classPrivateFieldGet(this, _events)[name]) {
            delete bus_classPrivateFieldGet(this, _events)[name];
        }
        else {
            bus_classPrivateFieldGet(this, bus_log).error(`Event name is missing or incorrect`, "detachAll");
        }
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, cuid, ...args) {
        return bus_awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(event)) {
                throw new errors["b" /* ArgumentError */]("Event name is incorrect");
            }
            let callbacks = bus_classPrivateFieldGet(this, _events)[event];
            if (Object(functions["w" /* is */])(callbacks)) {
                bus_classPrivateFieldGet(this, bus_log).debug(`Emit: [${event}]`);
                yield bus_classPrivateFieldGet(this, _eventHandler).handle(bus_classPrivateFieldGet(this, _events)[event], cuid, args);
            }
            return true;
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name, id, cui) {
        let ev = bus_classPrivateFieldGet(this, _events)[name];
        return this.isAttached(ev, id, cui);
    }
    /**
     * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
     * @param {string} event - event name
     * @param {string} cuid - cuid of the component
     */
    detachByCuid(event, cuid) {
        if (!Object(functions["b" /* are */])(event, cuid)) {
            return;
        }
        let ev = bus_classPrivateFieldGet(this, _events)[event];
        if (!Object(functions["w" /* is */])(ev)) {
            return;
        }
        Object(functions["i" /* enumerateObject */])(Object.assign({}, ev), (evId, evValue) => {
            if (evValue.$cuid === cuid) {
                delete ev[evId];
            }
        });
    }
    isAttached(ev, id, cui) {
        if (Object(functions["w" /* is */])(cui)) {
            // @ts-ignore
            return Object(functions["w" /* is */])(ev) && Object(functions["w" /* is */])(id) && Object(functions["w" /* is */])(ev[id]) && ev[id].$cuid == cui.$cuid;
        }
        return Object(functions["w" /* is */])(ev) && Object(functions["w" /* is */])(id) && Object(functions["w" /* is */])(ev[id]);
    }
    getCuid(cui) {
        // @ts-ignore
        return Object(functions["w" /* is */])(cui) ? cui.$cuid : null;
    }
}
_events = new WeakMap(), bus_log = new WeakMap(), _eventHandler = new WeakMap(), _name = new WeakMap();
class bus_CuiEventExtBus {
    constructor(setup) {
        _events_1.set(this, void 0);
        _log_1.set(this, void 0);
        _buses.set(this, void 0);
        _last.set(this, void 0);
        bus_classPrivateFieldSet(this, _log_1, logger["a" /* CuiLoggerFactory */].get("CuiEventBus"));
        bus_classPrivateFieldSet(this, _buses, []);
        bus_classPrivateFieldSet(this, _events_1, {});
        bus_classPrivateFieldSet(this, _last, 0);
        if (Object(functions["w" /* is */])(setup)) {
            bus_classPrivateFieldGet(this, _log_1).debug("Initiating buses");
            let sorted = setup.length === 1 ? setup : setup.sort((first, second) => {
                return first.priority - second.priority;
            });
            sorted.forEach((item, index) => {
                bus_classPrivateFieldGet(this, _buses).push(this.initBusInstance(item.name, item.handler));
                bus_classPrivateFieldSet(this, _events_1, Object.assign(Object.assign({}, bus_classPrivateFieldGet(this, _events_1)), this.mapEvents(item.eventsDef, index)));
                bus_classPrivateFieldGet(this, _log_1).debug(`Bus ${item.name} has been initialized with number: ${index}`);
            });
            bus_classPrivateFieldGet(this, _buses).push(this.initBusInstance("DefaultEventBus", 'tasked'));
            bus_classPrivateFieldSet(this, _last, bus_classPrivateFieldGet(this, _buses).length - 1);
            bus_classPrivateFieldGet(this, _log_1).debug(`Bus initialization finished`);
        }
    }
    /**
     * Attaches event to event bus
     *
     * @param {string} name - Event name
     * @param {any} callback - callback function
     * @param {CuiContext} ctx - callback context with id
     * @param {CuiElement} cui - optional - cui element which event shall be attached to
     */
    on(name, callback, cui) {
        if (!Object(functions["b" /* are */])(name, callback)) {
            throw new errors["b" /* ArgumentError */]("Missing argument");
        }
        return this.get(name).on(name, callback, cui);
    }
    /**
    * Detaches specific event from event bus
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    detach(name, id, cui) {
        if (!Object(functions["b" /* are */])(name, id)) {
            throw new errors["b" /* ArgumentError */]("Missing argument");
        }
        this.get(name).detach(name, id, cui);
    }
    /**
    * Detaches all callbacks from event
    *
    * @param {string} name - Event name
    */
    detachAll(name) {
        this.get(name).detachAll(name);
    }
    /**
    * Emits event call to event bus
    *
    * @param {string} name - Event name
    * @param {string} cuid - id of component which emits the event
    * @param {any[]} args  - event arguments
    */
    emit(event, cuid, ...args) {
        return bus_awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(event)) {
                throw new errors["b" /* ArgumentError */]("Event name is incorrect");
            }
            return this.get(event).emit(event, cuid, ...args);
        });
    }
    /**
    * Checks whether given context is already attached to specific event
    *
    * @param {string} name - Event name
    * @param {CuiContext} ctx - callback context with id
    * @param {CuiElement} cui - optional - cui element which event shall be attached to
    */
    isSubscribing(name, id, cui) {
        return this.get(name).isSubscribing(name, id, cui);
    }
    /**
    * Detaches callbacks by component cuid - this is used to clean up attachments on component deletion
    * @param {string} event - event name
    * @param {string} cuid - cuid of the component
    */
    detachByCuid(event, cuid) {
        if (!Object(functions["b" /* are */])(event, cuid)) {
            return;
        }
        this.get(event).detachByCuid(event, cuid);
    }
    /**
     * Creates and initializes event bus instance
     * @param busName Event bus name for logger
     * @param handlerName handler name to create proper handler instance
     */
    initBusInstance(busName, handlerName) {
        if (!Object(functions["b" /* are */])(busName, handlerName)) {
            throw new errors["b" /* ArgumentError */]("Bus name or handler name is incorrect");
        }
        let executor = new CuiCallbackExecutor();
        let handler = CuiEventEmitHandlerFactory.get(handlerName, executor);
        return new bus_CuiEventBus(handler, busName);
    }
    /**
     * Creates mapping object from events array
     * @param events events array
     * @param index queue number
     */
    mapEvents(events, index) {
        return events.reduce((result, current) => {
            if (!result[current]) {
                return Object.assign(Object.assign({}, result), { [current]: index });
            }
            return result;
        }, {});
    }
    /**
     * Retrives porper event bus based on event name
     * @param event
     */
    get(event) {
        let idx = bus_classPrivateFieldGet(this, _events_1)[event];
        return bus_classPrivateFieldGet(this, _buses)[idx !== null && idx !== void 0 ? idx : bus_classPrivateFieldGet(this, _last)];
    }
}
_events_1 = new WeakMap(), _log_1 = new WeakMap(), _buses = new WeakMap(), _last = new WeakMap();
class bus_CuiEventBusFactory {
    static get(setup) {
        //@ts-ignore - setup is underfined check is perfromed
        return Object(functions["w" /* is */])(setup) ? new bus_CuiEventExtBus(setup) : new bus_CuiEventBus(new handlers_TaskedEventEmitHandler(new CuiCallbackExecutor));
    }
}
class CuiBusExtStatisticsHandler {
    constructor(gather, queueCount) {
        _isOn.set(this, void 0);
        _statistics.set(this, void 0);
        bus_classPrivateFieldSet(this, _isOn, gather);
        bus_classPrivateFieldSet(this, _statistics, {
            queueCount: queueCount,
            events: {}
        });
    }
    addEvent(event, queueNumber, emitCount) {
        bus_classPrivateFieldGet(this, _statistics).events[event] = {
            name: event,
            queueNumber: queueNumber,
            emits: emitCount !== null && emitCount !== void 0 ? emitCount : 0
        };
    }
    addQueue() {
        bus_classPrivateFieldGet(this, _statistics).queueCount += 1;
    }
    addEmit(event, queueNumber) {
        if (!bus_classPrivateFieldGet(this, _isOn)) {
            return;
        }
        if (bus_classPrivateFieldGet(this, _statistics).events[event]) {
            bus_classPrivateFieldGet(this, _statistics).events[event].emits += 1;
        }
        else {
            this.addEvent(event, queueNumber !== null && queueNumber !== void 0 ? queueNumber : -1, 1);
        }
    }
    getStatistics() {
        return bus_classPrivateFieldGet(this, _statistics);
    }
}
_isOn = new WeakMap(), _statistics = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/statics.js
var statics = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/styles/appender.js
var appender_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _interactions;

class appender_CuiDocumentStyleAppender {
    constructor(interactions) {
        _interactions.set(this, void 0);
        appender_classPrivateFieldSet(this, _interactions, interactions);
    }
    append(style) {
        if (Object(functions["w" /* is */])(style)) {
            const head = document.head || document.getElementsByTagName('head')[0];
            const node = document.createElement('style');
            const text = document.createTextNode(style);
            node.type = 'text/css';
            node.appendChild(text);
            head.appendChild(node);
        }
        return true;
    }
}
_interactions = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/handlers/colors.js
var colors_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var colors_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _root, colors_interactions, _LIGHTEN_FACTOR, _DARKEN_FACTOR;


class colors_CuiInstanceColorHandler {
    constructor(interactions) {
        _root.set(this, void 0);
        colors_interactions.set(this, void 0);
        _LIGHTEN_FACTOR.set(this, 15);
        _DARKEN_FACTOR.set(this, 15);
        colors_classPrivateFieldSet(this, _root, document.documentElement);
        colors_classPrivateFieldSet(this, colors_interactions, interactions);
    }
    setAppBackground(light, dark) {
        this.setPropertyIn(statics["c" /* CSS_APP_BACKGROUND_COLORS */].light, light.toCssString());
        this.setPropertyIn(statics["c" /* CSS_APP_BACKGROUND_COLORS */].dark, dark.toCssString());
    }
    setComponentBackground(light, dark) {
        this.setPropertyIn(statics["d" /* CSS_COMPONENT_BACKGROUND_COLORS */].light, light.toCssString());
        this.setPropertyIn(statics["d" /* CSS_COMPONENT_BACKGROUND_COLORS */].dark, dark.toCssString());
    }
    setBordersColors(light, dark) {
        this.setPropertyIn(statics["e" /* CSS_COMPONENT_BORDER_COLORS */].light, light.toCssString());
        this.setPropertyIn(statics["e" /* CSS_COMPONENT_BORDER_COLORS */].dark, dark.toCssString());
    }
    setColor(type, set) {
        var _a, _b;
        const colors = statics["f" /* CSS_THEMES */][type];
        const baseColor = set.base;
        if (!Object(functions["w" /* is */])(colors) || !Object(functions["w" /* is */])(baseColor)) {
            return;
        }
        const mutedColor = (_a = set.muted) !== null && _a !== void 0 ? _a : baseColor.clone().lighten(colors_classPrivateFieldGet(this, _LIGHTEN_FACTOR));
        const activeColor = (_b = set.active) !== null && _b !== void 0 ? _b : baseColor.clone().darken(colors_classPrivateFieldGet(this, _DARKEN_FACTOR));
        colors_classPrivateFieldGet(this, colors_interactions).mutate(() => {
            this.setProperty(colors.base, baseColor.toCssString());
            this.setProperty(colors.active, activeColor.toCssString());
            this.setProperty(colors.muted, mutedColor.toCssString());
        }, this);
    }
    setLightenFactor(factor) {
        colors_classPrivateFieldSet(this, _LIGHTEN_FACTOR, Object(functions["r" /* getRangeValue */])(factor, 0, 100));
    }
    setDarkenFactor(factor) {
        colors_classPrivateFieldSet(this, _DARKEN_FACTOR, Object(functions["r" /* getRangeValue */])(factor, 0, 100));
    }
    setProperty(propertyName, value) {
        colors_classPrivateFieldGet(this, _root).style.setProperty(propertyName, value);
    }
    setPropertyIn(propertyName, value) {
        if (!Object(functions["b" /* are */])(value, propertyName)) {
            return;
        }
        colors_classPrivateFieldGet(this, colors_interactions).mutate(this.setProperty, this, propertyName, value);
    }
}
_root = new WeakMap(), colors_interactions = new WeakMap(), _LIGHTEN_FACTOR = new WeakMap(), _DARKEN_FACTOR = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/observers/resize.js
var resize_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var resize_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _items, _promises, _prevYValue, _inProgress, _previousSize, _threshold, _bus;


class resize_CuiResizeObserver {
    constructor(bus, threshold) {
        _items.set(this, void 0);
        _promises.set(this, void 0);
        _prevYValue.set(this, void 0);
        _inProgress.set(this, void 0);
        _previousSize.set(this, void 0);
        _threshold.set(this, void 0);
        _bus.set(this, void 0);
        resize_classPrivateFieldSet(this, _items, []);
        resize_classPrivateFieldSet(this, _promises, []);
        resize_classPrivateFieldSet(this, _prevYValue, window.innerWidth);
        resize_classPrivateFieldSet(this, _inProgress, false);
        resize_classPrivateFieldSet(this, _previousSize, Object(functions["d" /* calcWindowSize */])(window.innerWidth));
        resize_classPrivateFieldSet(this, _threshold, threshold !== null && threshold !== void 0 ? threshold : 0);
        resize_classPrivateFieldSet(this, _bus, bus);
    }
    observe(target) {
        let idx = resize_classPrivateFieldGet(this, _items).findIndex(x => x === target);
        if (idx < 0) {
            resize_classPrivateFieldGet(this, _items).push(target);
        }
    }
    unobserve(target) {
        let idx = resize_classPrivateFieldGet(this, _items).findIndex(x => x === target);
        if (idx >= 0) {
            resize_classPrivateFieldGet(this, _items).splice(idx, 1);
        }
    }
    connect() {
        window.addEventListener('resize', this.listener.bind(this));
    }
    disconnect() {
        window.removeEventListener('resize', this.listener.bind(this));
    }
    listener(ev) {
        if (resize_classPrivateFieldGet(this, _inProgress)) {
            return;
        }
        resize_classPrivateFieldSet(this, _inProgress, true);
        const diff = window.innerWidth - resize_classPrivateFieldGet(this, _prevYValue);
        if (Math.abs(diff) >= resize_classPrivateFieldGet(this, _threshold)) {
            const currentSize = Object(functions["d" /* calcWindowSize */])(window.innerWidth);
            if (currentSize !== resize_classPrivateFieldGet(this, _previousSize)) {
                const resizeData = {
                    current: currentSize,
                    previous: resize_classPrivateFieldGet(this, _previousSize),
                    width: window.innerWidth,
                    height: window.innerHeight,
                    timestamp: Date.now()
                };
                resize_classPrivateFieldGet(this, _bus).emit(statics["i" /* EVENTS */].RESIZE, "", resizeData);
                if (resize_classPrivateFieldGet(this, _items).length > 0) {
                    resize_classPrivateFieldSet(this, _promises, []);
                    resize_classPrivateFieldGet(this, _items).forEach(x => {
                        resize_classPrivateFieldGet(this, _promises).push(x.resize(resizeData));
                    });
                    Promise.all(resize_classPrivateFieldGet(this, _promises));
                    resize_classPrivateFieldSet(this, _promises, []);
                }
                resize_classPrivateFieldSet(this, _previousSize, currentSize);
            }
        }
        resize_classPrivateFieldSet(this, _inProgress, false);
    }
}
_items = new WeakMap(), _promises = new WeakMap(), _prevYValue = new WeakMap(), _inProgress = new WeakMap(), _previousSize = new WeakMap(), _threshold = new WeakMap(), _bus = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/managers/development.js
var development_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var development_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _tool;

class development_CuiDevelopmentToolManager {
    constructor(tool) {
        _tool.set(this, void 0);
        development_classPrivateFieldSet(this, _tool, tool);
    }
    pushState(cuid, component, type, message, functionName) {
        if (!Object(functions["w" /* is */])(development_classPrivateFieldGet(this, _tool))) {
            return;
        }
        // @ts-ignore - tool already checked
        development_classPrivateFieldGet(this, _tool).pushState(cuid, component, type, message, functionName);
    }
    registerElement(element, cuid, component) {
        if (!Object(functions["w" /* is */])(development_classPrivateFieldGet(this, _tool))) {
            return;
        }
        // @ts-ignore - tool already checked
        development_classPrivateFieldGet(this, _tool).registerElement(element, cuid, component);
    }
    unregisterElement(cuid, component) {
        if (!Object(functions["w" /* is */])(development_classPrivateFieldGet(this, _tool))) {
            return;
        }
        // @ts-ignore - tool already checked
        development_classPrivateFieldGet(this, _tool).unregisterElement(cuid, component);
    }
    setProperty(cuid, component, name, t) {
        if (!Object(functions["w" /* is */])(development_classPrivateFieldGet(this, _tool))) {
            return;
        }
        // @ts-ignore - tool already checked
        development_classPrivateFieldGet(this, _tool).setProperty(cuid, component, name, t);
    }
}
_tool = new WeakMap();

// CONCATENATED MODULE: ./node_modules/cui-light-core/dist/esm/models/utils.js
var utils_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var utils_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _resizeObserver;











class utils_CuiUtils {
    constructor(initialSetup) {
        _resizeObserver.set(this, void 0);
        this.setup = new models_setup["a" /* CuiSetup */]().fromInit(initialSetup);
        this.interactions = interactions_CuiInteractionsFactory.get(initialSetup.interaction);
        this.cache = new cache_CuiCacheManager(this.setup.cacheSize);
        this.bus = bus_CuiEventBusFactory.get(initialSetup.busSetup);
        this.colors = new colors_CuiInstanceColorHandler(this.interactions);
        this.development = new development_CuiDevelopmentToolManager(initialSetup.development);
        this.styleAppender = new appender_CuiDocumentStyleAppender(this.interactions);
        utils_classPrivateFieldSet(this, _resizeObserver, new resize_CuiResizeObserver(this.bus, this.setup.resizeThreshold));
        utils_classPrivateFieldGet(this, _resizeObserver).connect();
    }
    setLightMode(mode) {
        const name = Object(functions["o" /* getName */])(this.setup.prefix, statics["a" /* CLASSES */].dark);
        const classes = document.body.classList;
        if (mode === 'dark' && !classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.add(name);
            }, this);
        }
        else if (mode === 'light' && classes.contains(name)) {
            this.interactions.mutate(() => {
                classes.remove(name);
            }, this);
        }
    }
    getLightMode() {
        const name = Object(functions["o" /* getName */])(this.setup.prefix, statics["a" /* CLASSES */].dark);
        return document.body.classList.contains(name) ? 'dark' : 'light';
    }
    setPrintMode(flag) {
        const name = Object(functions["o" /* getName */])(this.setup.prefix, statics["a" /* CLASSES */].print);
        const classes = document.body.classList;
        if (flag && !classes.contains(name)) {
            classes.add(name);
        }
        else if (!flag && classes.contains(name)) {
            classes.remove(name);
        }
    }
    isPrintMode() {
        const name = Object(functions["o" /* getName */])(this.setup.prefix, statics["a" /* CLASSES */].print);
        return document.body.classList.contains(name);
    }
    setProperty(name, value) {
        if (!Object(functions["b" /* are */])(name, value)) {
            throw new errors["c" /* CSSVariableError */]("Property or value was not provided");
        }
        let prop = Object(functions["D" /* replacePrefix */])(name, this.setup.prefix);
        document.documentElement.style.setProperty(prop, value);
    }
}
_resizeObserver = new WeakMap();


/***/ })
]]);
//# sourceMappingURL=vendors~index.js.map