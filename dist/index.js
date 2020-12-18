(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cui-light", [], factory);
	else if(typeof exports === 'object')
		exports["cui-light"] = factory();
	else
		root["cui-light"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonpcui_light"] = window["webpackJsonpcui_light"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([17,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "CUI_LIGHT_VERSION", function() { return /* binding */ CUI_LIGHT_VERSION; });
__webpack_require__.d(__webpack_exports__, "CUI_LIGHT_CORE_VER", function() { return /* binding */ CUI_LIGHT_CORE_VER; });
__webpack_require__.d(__webpack_exports__, "CUI_LIGHT_COMPONENTS_VER", function() { return /* binding */ CUI_LIGHT_COMPONENTS_VER; });
__webpack_require__.d(__webpack_exports__, "CUI_LIGHT_PLUGINS_VER", function() { return /* binding */ CUI_LIGHT_PLUGINS_VER; });
__webpack_require__.d(__webpack_exports__, "CuiInstance", function() { return /* reexport */ instance_CuiInstance; });

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/functions.js
var functions = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/models/setup.js
var models_setup = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/statics.js
var statics = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/observers/mutations.js
var mutations = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/factories/logger.js + 1 modules
var logger = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/models/utils.js + 11 modules
var models_utils = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/models/errors.js
var errors = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/helpers/helpers.js
var helpers = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/utils/actions.js
var actions = __webpack_require__(2);

// CONCATENATED MODULE: ./src/managers/element.ts
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
var _elements, _isLocked, _logger, _cDt, _utils, _actionsHelper;





class element_ElementManager {
    constructor(elements, utils) {
        _elements.set(this, void 0);
        _isLocked.set(this, void 0);
        _logger.set(this, void 0);
        _cDt.set(this, void 0);
        _utils.set(this, void 0);
        _actionsHelper.set(this, void 0);
        __classPrivateFieldSet(this, _elements, elements);
        __classPrivateFieldSet(this, _isLocked, false);
        __classPrivateFieldSet(this, _logger, logger["a" /* CuiLoggerFactory */].get("ElementManager"));
        __classPrivateFieldSet(this, _utils, utils);
        __classPrivateFieldSet(this, _cDt, Date.now());
        __classPrivateFieldSet(this, _actionsHelper, new helpers["a" /* CuiActionsHelper */](utils.interactions));
    }
    toggleClass(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(className)) {
                return false;
            }
            return this.call((element) => {
                if (!element.classList.contains(className)) {
                    element.classList.add(className);
                }
                else {
                    element.classList.remove(className);
                }
            }, 'toggleClass');
        });
    }
    toggleClassAs(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(className)) {
                return false;
            }
            return this.call((element) => {
                let classes = element.classList;
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (!classes.contains(className)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.add, classes, className);
                    }
                    else {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.remove, classes, className);
                    }
                }, this);
            }, 'toggleClassAs');
        });
    }
    setClass(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(className)) {
                return false;
            }
            return this.call((element) => {
                if (!element.classList.contains(className)) {
                    element.classList.add(className);
                }
            }, 'setClass');
        });
    }
    setClassAs(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(className)) {
                return false;
            }
            return this.call((element) => {
                let classes = element.classList;
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (!classes.contains(className)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.add, classes, className);
                    }
                }, this);
            }, 'setClassAs');
        });
    }
    removeClass(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(className)) {
                return false;
            }
            return this.call((element) => {
                if (element.classList.contains(className)) {
                    element.classList.remove(className);
                }
            }, 'removeClass');
        });
    }
    removeClassAs(className) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(className)) {
                return false;
            }
            return this.call((element) => {
                let classes = element.classList;
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (classes.contains(className)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(classes.remove, classes, className);
                    }
                }, this);
            }, 'removeClass');
        });
    }
    getAttribute(attributeName) {
        if (!Object(functions["w" /* is */])(attributeName)) {
            return [];
        }
        return __classPrivateFieldGet(this, _elements).reduce((val, current) => {
            let attr = current.getAttribute(attributeName);
            if (attr != null) {
                val.push(attr);
            }
            return val;
        }, []);
    }
    setAttribute(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(attributeName)) {
                return false;
            }
            return this.call((element) => {
                element.setAttribute(attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
            }, 'setAttribute');
        });
    }
    setAttributeAs(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(attributeName)) {
                return false;
            }
            return this.call((element) => {
                __classPrivateFieldGet(this, _utils).interactions.mutate(element.setAttribute, element, attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
            }, 'setAttributeAs');
        });
    }
    removeAttribute(attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(attributeName)) {
                return false;
            }
            return this.call((element) => {
                element.removeAttribute(attributeName);
            }, 'removeAttribute');
        });
    }
    removeAttributeAs(attributeName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(attributeName)) {
                return false;
            }
            return this.call((element) => {
                __classPrivateFieldGet(this, _utils).interactions.mutate(element.removeAttribute, element, attributeName);
            }, 'removeAttributeAs');
        });
    }
    toggleAttribute(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(attributeName)) {
                return false;
            }
            return this.call((element) => {
                if (element.hasAttribute(attributeName)) {
                    element.removeAttribute(attributeName);
                }
                else {
                    element.setAttribute(attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
                }
            }, 'toggleAttribute');
        });
    }
    toggleAttributeAs(attributeName, attributeValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(attributeName)) {
                return false;
            }
            return this.call((element) => {
                __classPrivateFieldGet(this, _utils).interactions.fetch(() => {
                    if (element.hasAttribute(attributeName)) {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(element.removeAttribute, element, attributeName);
                    }
                    else {
                        __classPrivateFieldGet(this, _utils).interactions.mutate(element.setAttribute, element, attributeName, attributeValue !== null && attributeValue !== void 0 ? attributeValue : "");
                    }
                }, this);
            }, 'toggleAttributeAs');
        });
    }
    click(onClick) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(onClick)) {
                return false;
            }
            return this.call((element) => {
                //@ts-ignore
                element.addEventListener('click', onClick);
            }, 'click');
        });
    }
    event(eventName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(eventName) || !Object(functions["w" /* is */])(callback)) {
                return false;
            }
            return this.call((element) => {
                element.addEventListener(eventName, callback);
            }, 'event');
        });
    }
    call(callback, functionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _isLocked)) {
                __classPrivateFieldGet(this, _logger).error("Element is locked", functionName);
            }
            this.lock();
            __classPrivateFieldGet(this, _elements).forEach((element, index) => {
                callback(element, index);
            });
            this.unlock();
            return true;
        });
    }
    animate(className, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["w" /* is */])(className)) {
                return false;
            }
            const delay = timeout !== null && timeout !== void 0 ? timeout : __classPrivateFieldGet(this, _utils).setup.animationTime;
            return this.call((element) => {
                this.change(() => {
                    element.classList.add(className);
                    element.classList.add(statics["a" /* CLASSES */].animProgress);
                    setTimeout(() => {
                        this.change(() => {
                            element.classList.remove(className);
                            element.classList.remove(statics["a" /* CLASSES */].animProgress);
                        });
                    }, delay);
                });
            });
        });
    }
    open(openClass, animationClass, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["b" /* are */])(openClass, animationClass)) {
                return false;
            }
            const delay = timeout !== null && timeout !== void 0 ? timeout : __classPrivateFieldGet(this, _utils).setup.animationTime;
            const action = new actions["b" /* CuiClassAction */](animationClass);
            return this.call((element) => {
                __classPrivateFieldGet(this, _actionsHelper).performAction(element, action, delay !== null && delay !== void 0 ? delay : 0).then(() => {
                    element.classList.add(openClass);
                });
            });
        });
    }
    close(closeClass, animationClass, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["b" /* are */])(closeClass, animationClass)) {
                return false;
            }
            const delay = timeout !== null && timeout !== void 0 ? timeout : __classPrivateFieldGet(this, _utils).setup.animationTime;
            const action = new actions["b" /* CuiClassAction */](animationClass);
            return this.call((element) => {
                __classPrivateFieldGet(this, _actionsHelper).performAction(element, action, delay !== null && delay !== void 0 ? delay : 0).then(() => {
                    element.classList.remove(closeClass);
                });
            });
        });
    }
    emit(event, ...args) {
        if (!Object(functions["w" /* is */])(event)) {
            __classPrivateFieldGet(this, _logger).warning("Not enough data to emit event", "emit");
            return;
        }
        this.call((element) => {
            let cuid = element.$cuid;
            if (Object(functions["w" /* is */])(cuid)) {
                __classPrivateFieldGet(this, _logger).debug(`Emitting event ${event} to ${cuid}`);
                __classPrivateFieldGet(this, _utils).bus.emit(event, cuid, ...args);
            }
        }, "emit");
    }
    on(event, callback) {
        let ids = [];
        if (!Object(functions["b" /* are */])(event, callback)) {
            __classPrivateFieldGet(this, _logger).error("Incorrect arguments", "on");
            return ids;
        }
        this.call((element) => {
            let cuiElement = element;
            if (Object(functions["w" /* is */])(cuiElement)) {
                let disposeId = __classPrivateFieldGet(this, _utils).bus.on(event, callback, cuiElement);
                if (disposeId != null)
                    ids.push(disposeId);
            }
        }, "on");
        return ids;
    }
    detach(event, id) {
        if (!Object(functions["b" /* are */])(event, id)) {
            __classPrivateFieldGet(this, _logger).error("Incorrect arguments", "detach");
        }
        this.call((element) => {
            let cuiElement = element;
            if (Object(functions["w" /* is */])(cuiElement)) {
                __classPrivateFieldGet(this, _utils).bus.detach(event, id, cuiElement);
            }
        }, "detach");
    }
    read(callback, ...args) {
        __classPrivateFieldGet(this, _utils).interactions.fetch(callback, this, ...args);
    }
    change(callback, ...args) {
        __classPrivateFieldGet(this, _utils).interactions.mutate(callback, this, ...args);
    }
    elements() {
        return __classPrivateFieldGet(this, _elements);
    }
    count() {
        return __classPrivateFieldGet(this, _elements).length;
    }
    lock() {
        __classPrivateFieldSet(this, _isLocked, true);
    }
    unlock() {
        __classPrivateFieldSet(this, _isLocked, false);
    }
    isLocked() {
        return __classPrivateFieldGet(this, _isLocked);
    }
    refresh() {
        return (Date.now() - __classPrivateFieldGet(this, _cDt)) < 360000;
    }
}
_elements = new WeakMap(), _isLocked = new WeakMap(), _logger = new WeakMap(), _cDt = new WeakMap(), _utils = new WeakMap(), _actionsHelper = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/builders/element.js
var builders_element = __webpack_require__(5);

// CONCATENATED MODULE: ./src/builders/dialog.ts
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
var _header, _body, _footer, _prefix, _switches, _reverse;


class dialog_DialogBuilder {
    constructor(prefix, reverse, switches) {
        _header.set(this, void 0);
        _body.set(this, void 0);
        _footer.set(this, void 0);
        _prefix.set(this, void 0);
        _switches.set(this, void 0);
        _reverse.set(this, void 0);
        dialog_classPrivateFieldSet(this, _prefix, prefix);
        dialog_classPrivateFieldSet(this, _header, dialog_classPrivateFieldSet(this, _footer, dialog_classPrivateFieldSet(this, _body, undefined)));
        dialog_classPrivateFieldSet(this, _switches, switches !== null && switches !== void 0 ? switches : "");
        dialog_classPrivateFieldSet(this, _reverse, reverse);
    }
    createHeader(title, classes, elements) {
        if (!Object(functions["w" /* is */])(classes)) {
            classes = [];
        }
        if (!Object(functions["w" /* is */])(elements)) {
            elements = [];
        }
        let headerBuilder = new builders_element["a" /* ElementBuilder */]('div');
        headerBuilder.setClasses(`${dialog_classPrivateFieldGet(this, _prefix)}-dialog-header`, ...classes);
        dialog_classPrivateFieldSet(this, _header, headerBuilder.build());
        let titleElement = new builders_element["a" /* ElementBuilder */]('span').setClasses(this.getPrefixedString("-dialog-title")).build(title);
        dialog_classPrivateFieldGet(this, _header).appendChild(titleElement);
        // @ts-ignore
        this.appendChildrens(dialog_classPrivateFieldGet(this, _header), ...elements);
    }
    createFooter(classes, elements) {
        if (!Object(functions["w" /* is */])(classes)) {
            classes = [];
        }
        if (!Object(functions["w" /* is */])(elements)) {
            elements = [];
        }
        dialog_classPrivateFieldSet(this, _footer, new builders_element["a" /* ElementBuilder */]('div').setClasses(this.getPrefixedString("-dialog-footer"), ...classes).build());
        // @ts-ignore
        this.appendChildrens(dialog_classPrivateFieldGet(this, _footer), ...elements);
    }
    createBody(classes, elements) {
        if (!Object(functions["w" /* is */])(classes)) {
            classes = [];
        }
        if (!Object(functions["w" /* is */])(elements)) {
            elements = [];
        }
        dialog_classPrivateFieldSet(this, _body, new builders_element["a" /* ElementBuilder */]('div').setClasses(this.getPrefixedString("-dialog-body"), ...classes).build());
        // @ts-ignore
        this.appendChildrens(dialog_classPrivateFieldGet(this, _body), ...elements);
    }
    build(id) {
        let classes = [this.getPrefixedString("-dialog")];
        if (dialog_classPrivateFieldGet(this, _reverse)) {
            classes.push(this.getPrefixedString('-reverse-auto'));
        }
        let dialog = new builders_element["a" /* ElementBuilder */]('div').setId(id).setClasses(...classes).setAttributes({
            [this.getPrefixedString('-dialog')]: dialog_classPrivateFieldGet(this, _switches)
        }).build();
        let container = new builders_element["a" /* ElementBuilder */]('div').setClasses(this.getPrefixedString("-dialog-container")).build();
        if (dialog_classPrivateFieldGet(this, _header))
            container.appendChild(dialog_classPrivateFieldGet(this, _header));
        if (dialog_classPrivateFieldGet(this, _body))
            container.appendChild(dialog_classPrivateFieldGet(this, _body));
        if (dialog_classPrivateFieldGet(this, _footer))
            container.appendChild(dialog_classPrivateFieldGet(this, _footer));
        dialog.appendChild(container);
        return dialog;
    }
    appendChildrens(parent, ...elements) {
        if (Object(functions["w" /* is */])(elements)) {
            elements.forEach((element) => parent.appendChild(element));
        }
    }
    getPrefixedString(str) {
        return dialog_classPrivateFieldGet(this, _prefix) + str;
    }
}
_header = new WeakMap(), _body = new WeakMap(), _footer = new WeakMap(), _prefix = new WeakMap(), _switches = new WeakMap(), _reverse = new WeakMap();

// CONCATENATED MODULE: ./src/handlers/alert.ts
var alert_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var alert_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _callbacks, alert_utils, _id, _manager, _attid, _id_1, _id_2, _id_3;




class alert_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        _callbacks.set(this, void 0);
        alert_utils.set(this, void 0);
        _id.set(this, void 0);
        _manager.set(this, void 0);
        _attid.set(this, void 0);
        alert_classPrivateFieldSet(this, _callbacks, {
            "yes": data.onYes,
            "no": data.onNo,
            "cancel": data.onCancel,
            "ok": data.onOk
        });
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        alert_classPrivateFieldSet(this, alert_utils, setup);
        alert_classPrivateFieldSet(this, _id, id);
        this.reverse = false;
        alert_classPrivateFieldSet(this, _attid, null);
        this.closeStr = `${alert_classPrivateFieldGet(this, alert_utils).setup.prefix}-close`;
        this.iconStr = `${alert_classPrivateFieldGet(this, alert_utils).setup.prefix}-icon`;
        alert_classPrivateFieldSet(this, _manager, undefined);
    }
    getId() {
        return alert_classPrivateFieldGet(this, _id);
    }
    show(root) {
        let element = document.getElementById(alert_classPrivateFieldGet(this, _id));
        if (!Object(functions["w" /* is */])(element)) {
            element = this.createElement();
            root.appendChild(element);
        }
        else {
            // @ts-ignore - already checked
            this.updateElement(element);
        }
        setTimeout(() => {
            // @ts-ignore - already checked
            alert_classPrivateFieldSet(this, _manager, new element_ElementManager([element], alert_classPrivateFieldGet(this, alert_utils)));
            let ids = alert_classPrivateFieldGet(this, _manager).on('closed', this.onClose.bind(this));
            alert_classPrivateFieldSet(this, _attid, ids.length > 0 ? ids[0] : null);
            alert_classPrivateFieldGet(this, _manager).emit("open");
        }, 100);
    }
    updateElement(element) {
        let title = element.querySelector(`.${this.prefix}-dialog-title`);
        let content = element.querySelector(`.${this.prefix}-dialog-body>p`);
        alert_classPrivateFieldGet(this, alert_utils).interactions.mutate(() => {
            if (title) {
                title.innerHTML = this.title;
            }
            if (content) {
                content.innerHTML = this.content;
            }
        }, null);
    }
    onClose(arg) {
        try {
            if (Object(functions["w" /* is */])(arg) && arg.state && alert_classPrivateFieldGet(this, _callbacks)) {
                if (Object(functions["w" /* is */])(alert_classPrivateFieldGet(this, _callbacks)[arg.state])) {
                    let callback = alert_classPrivateFieldGet(this, _callbacks)[arg.state];
                    if (callback) {
                        callback();
                    }
                }
            }
        }
        finally {
            if (alert_classPrivateFieldGet(this, _attid) != null) {
                if (alert_classPrivateFieldGet(this, _manager))
                    alert_classPrivateFieldGet(this, _manager).detach('closed', alert_classPrivateFieldGet(this, _attid));
                alert_classPrivateFieldSet(this, _attid, null);
            }
            alert_classPrivateFieldSet(this, _manager, undefined);
        }
    }
}
_callbacks = new WeakMap(), alert_utils = new WeakMap(), _id = new WeakMap(), _manager = new WeakMap(), _attid = new WeakMap();
class alert_CuiAlertHandler extends alert_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_1.set(this, void 0);
        alert_classPrivateFieldSet(this, _id_1, id);
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new dialog_DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, [], [
            new builders_element["a" /* ElementBuilder */]('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new builders_element["a" /* ElementBuilder */]('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new builders_element["a" /* ElementBuilder */]('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: cancel" }).build("Cancel"),
            new builders_element["a" /* ElementBuilder */]('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ]);
        return dialogBuilder.build(alert_classPrivateFieldGet(this, _id_1));
    }
}
_id_1 = new WeakMap();
class alert_CuiInfoAlertUpHandler extends alert_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_2.set(this, void 0);
        alert_classPrivateFieldSet(this, _id_2, id);
        this.content = data.message;
        ;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new dialog_DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, []);
        dialogBuilder.createBody([], [
            new builders_element["a" /* ElementBuilder */]('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new builders_element["a" /* ElementBuilder */]('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ]);
        return dialogBuilder.build(alert_classPrivateFieldGet(this, _id_2));
    }
}
_id_2 = new WeakMap();
class alert_CuiYesNoPopUpHandler extends alert_CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_3.set(this, void 0);
        alert_classPrivateFieldSet(this, _id_3, id);
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new dialog_DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, [], [
            new builders_element["a" /* ElementBuilder */]('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new builders_element["a" /* ElementBuilder */]('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new builders_element["a" /* ElementBuilder */]('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: no" }).build("No"),
            new builders_element["a" /* ElementBuilder */]('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: yes" }).build("Yes")
        ]);
        return dialogBuilder.build(alert_classPrivateFieldGet(this, _id_3));
    }
}
_id_3 = new WeakMap();
class CuiAlertFactory {
    static get(id, type, data, utils) {
        if (type === "Info") {
            return new alert_CuiInfoAlertUpHandler(utils, id, data);
        }
        else if (type === 'YesNoCancel') {
            return new alert_CuiYesNoPopUpHandler(utils, id, data);
        }
        else if (type === 'OkCancel') {
            return new alert_CuiAlertHandler(utils, id, data);
        }
        return undefined;
    }
}

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/listeners/move.js
var move = __webpack_require__(7);

// CONCATENATED MODULE: ./src/observers/move.ts
var move_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var move_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _bus, _moveListener, move_isLocked, _eventId, _firstEvent;


class move_CuiMoveObserver {
    constructor(bus) {
        _bus.set(this, void 0);
        _moveListener.set(this, void 0);
        move_isLocked.set(this, void 0);
        _eventId.set(this, void 0);
        _firstEvent.set(this, void 0);
        move_classPrivateFieldSet(this, _bus, bus);
        move_classPrivateFieldSet(this, _moveListener, new move["a" /* CuiMoveEventListener */]());
        move_classPrivateFieldGet(this, _moveListener).setCallback(this.onMove.bind(this));
        move_classPrivateFieldSet(this, _firstEvent, undefined);
        move_classPrivateFieldSet(this, move_isLocked, false);
        move_classPrivateFieldSet(this, _eventId, null);
    }
    attach() {
        if (!move_classPrivateFieldGet(this, _moveListener).isAttached()) {
            move_classPrivateFieldGet(this, _moveListener).attach();
            move_classPrivateFieldSet(this, _eventId, move_classPrivateFieldGet(this, _bus).on(statics["i" /* EVENTS */].MOVE_LOCK, this.onMoveLock.bind(this)));
        }
    }
    detach() {
        if (move_classPrivateFieldGet(this, _moveListener).isAttached()) {
            move_classPrivateFieldGet(this, _moveListener).detach();
            move_classPrivateFieldGet(this, _eventId) != null && move_classPrivateFieldGet(this, _bus).detach(statics["i" /* EVENTS */].MOVE_LOCK, move_classPrivateFieldGet(this, _eventId));
        }
    }
    isAttached() {
        return move_classPrivateFieldGet(this, _moveListener).isAttached();
    }
    onMove(data) {
        if (move_classPrivateFieldGet(this, move_isLocked)) {
            return;
        }
        switch (data.type) {
            case "down":
                move_classPrivateFieldSet(this, _firstEvent, data);
                break;
            case "move":
                if (move_classPrivateFieldGet(this, _firstEvent)) {
                    move_classPrivateFieldGet(this, _bus).emit(statics["i" /* EVENTS */].GLOBAL_MOVE, null, move_classPrivateFieldGet(this, _firstEvent));
                    move_classPrivateFieldSet(this, _firstEvent, undefined);
                }
                move_classPrivateFieldGet(this, _bus).emit(statics["i" /* EVENTS */].GLOBAL_MOVE, null, data);
                break;
            case "up":
                if (move_classPrivateFieldGet(this, _firstEvent)) {
                    move_classPrivateFieldSet(this, _firstEvent, undefined);
                    return;
                }
                move_classPrivateFieldGet(this, _bus).emit(statics["i" /* EVENTS */].GLOBAL_MOVE, null, data);
                break;
        }
    }
    onMoveLock(flag) {
        move_classPrivateFieldSet(this, move_isLocked, flag);
    }
}
_bus = new WeakMap(), _moveListener = new WeakMap(), move_isLocked = new WeakMap(), _eventId = new WeakMap(), _firstEvent = new WeakMap();

// CONCATENATED MODULE: ./src/managers/toast.ts
var toast_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var toast_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var toast_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _interactions, _selector, _className, _activeCls, _animationTime, _lock, _animClsIn, _animClsOut;


class toast_CuiToastHandler {
    constructor(interaction, prefix, animationTime) {
        _interactions.set(this, void 0);
        _selector.set(this, void 0);
        _className.set(this, void 0);
        _activeCls.set(this, void 0);
        _animationTime.set(this, void 0);
        _lock.set(this, void 0);
        _animClsIn.set(this, void 0);
        _animClsOut.set(this, void 0);
        toast_classPrivateFieldSet(this, _interactions, interaction);
        toast_classPrivateFieldSet(this, _selector, `.${prefix}-toast`);
        toast_classPrivateFieldSet(this, _className, `${prefix}-toast`);
        toast_classPrivateFieldSet(this, _activeCls, `${prefix}-active`);
        toast_classPrivateFieldSet(this, _animationTime, animationTime);
        toast_classPrivateFieldSet(this, _lock, false);
        toast_classPrivateFieldSet(this, _animClsIn, `${prefix}-toast-animation-in`);
        toast_classPrivateFieldSet(this, _animClsOut, `${prefix}-toast-animation-out`);
    }
    show(message) {
        return toast_awaiter(this, void 0, void 0, function* () {
            if (toast_classPrivateFieldGet(this, _lock)) {
                return false;
            }
            toast_classPrivateFieldSet(this, _lock, true);
            let toastElement = document.querySelector(toast_classPrivateFieldGet(this, _selector));
            if (!Object(functions["w" /* is */])(toastElement)) {
                toastElement = document.createElement('div');
                toastElement.classList.add(toast_classPrivateFieldGet(this, _className));
                document.body.appendChild(toastElement);
                yield Object(functions["E" /* sleep */])(10);
            }
            toast_classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.textContent = message;
                //@ts-ignore
                toastElement.classList.add(statics["a" /* CLASSES */].animProgress);
                //@ts-ignore
                toastElement.classList.add(toast_classPrivateFieldGet(this, _animClsIn));
            }, this);
            yield Object(functions["E" /* sleep */])(toast_classPrivateFieldGet(this, _animationTime));
            toast_classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.classList.remove(statics["a" /* CLASSES */].animProgress);
                //@ts-ignore
                toastElement.classList.remove(toast_classPrivateFieldGet(this, _animClsIn));
                //@ts-ignore
                toastElement.classList.add(toast_classPrivateFieldGet(this, _activeCls));
            }, this);
            yield Object(functions["E" /* sleep */])(3000);
            toast_classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.classList.add(statics["a" /* CLASSES */].animProgress);
                //@ts-ignore
                toastElement.classList.add(toast_classPrivateFieldGet(this, _animClsOut));
            }, this);
            setTimeout(() => {
                toast_classPrivateFieldGet(this, _interactions).mutate(() => {
                    //@ts-ignore
                    toastElement.classList.remove(statics["a" /* CLASSES */].animProgress);
                    //@ts-ignore
                    toastElement.classList.remove(toast_classPrivateFieldGet(this, _animClsOut));
                    //@ts-ignore
                    toastElement.classList.remove(toast_classPrivateFieldGet(this, _activeCls));
                }, this);
                toast_classPrivateFieldSet(this, _lock, false);
            }, toast_classPrivateFieldGet(this, _animationTime));
            return true;
        });
    }
}
_interactions = new WeakMap(), _selector = new WeakMap(), _className = new WeakMap(), _activeCls = new WeakMap(), _animationTime = new WeakMap(), _lock = new WeakMap(), _animClsIn = new WeakMap(), _animClsOut = new WeakMap();

// CONCATENATED MODULE: ./src/helpers/collection.ts
var collection_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var collection_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var collection_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var collection_elements, _log, collection_isLocked, _toggleClass, collection_interactions;



class collection_CollectionManagerHelper {
    constructor(interactions) {
        collection_elements.set(this, void 0);
        _log.set(this, void 0);
        collection_isLocked.set(this, void 0);
        _toggleClass.set(this, void 0);
        collection_interactions.set(this, void 0);
        collection_classPrivateFieldSet(this, collection_interactions, interactions);
        collection_classPrivateFieldSet(this, _log, logger["a" /* CuiLoggerFactory */].get('CollectionManager'));
        collection_classPrivateFieldSet(this, collection_elements, []);
        collection_classPrivateFieldSet(this, collection_isLocked, false);
        collection_classPrivateFieldSet(this, _toggleClass, "");
    }
    setElements(elements) {
        collection_classPrivateFieldSet(this, collection_elements, elements);
    }
    setToggle(className) {
        collection_classPrivateFieldSet(this, _toggleClass, className);
    }
    addAnimationClass(currentElement, nextElement, animIn, animOut) {
        nextElement.classList.add(statics["a" /* CLASSES */].animProgress);
        currentElement.classList.add(animOut);
        nextElement.classList.add(animIn);
    }
    setFinalClasses(currentElement, nextElement, animIn, animOut) {
        nextElement.classList.remove(statics["a" /* CLASSES */].animProgress);
        currentElement.classList.remove(animOut);
        nextElement.classList.remove(animIn);
        currentElement.classList.remove(collection_classPrivateFieldGet(this, _toggleClass));
        nextElement.classList.add(collection_classPrivateFieldGet(this, _toggleClass));
    }
    verifyIndex(index, current, count) {
        return index >= 0 && index !== current && index < count;
    }
    setCurrent(newIndex, current) {
        return collection_awaiter(this, void 0, void 0, function* () {
            this.lock();
            collection_classPrivateFieldGet(this, _log).debug(`Switching index from: ${current} to ${newIndex}`);
            if (current > -1)
                collection_classPrivateFieldGet(this, collection_elements)[current].classList.remove(collection_classPrivateFieldGet(this, _toggleClass));
            collection_classPrivateFieldGet(this, collection_elements)[newIndex].classList.add(collection_classPrivateFieldGet(this, _toggleClass));
            this.unlock();
            return true;
        });
    }
    setCurrentWithAnimation(newIndex, animClassIn, animClassOut, duration, current) {
        return collection_awaiter(this, void 0, void 0, function* () {
            this.lock();
            collection_classPrivateFieldGet(this, _log).debug(`Switching index from: ${current} to ${newIndex}`);
            const currentElement = collection_classPrivateFieldGet(this, collection_elements)[current];
            const nextElement = collection_classPrivateFieldGet(this, collection_elements)[newIndex];
            collection_classPrivateFieldGet(this, collection_interactions).mutate(this.addAnimationClass, this, currentElement, nextElement, animClassIn, animClassOut);
            setTimeout(() => {
                collection_classPrivateFieldGet(this, collection_interactions).mutate(this.setFinalClasses, this, currentElement, nextElement, animClassIn, animClassOut);
                this.unlock();
            }, duration);
            return true;
        });
    }
    getCurrentIndex() {
        if (!Object(functions["w" /* is */])(collection_classPrivateFieldGet(this, _toggleClass))) {
            return -1;
        }
        let len = this.count();
        for (let i = 0; i < len; i++) {
            if (collection_classPrivateFieldGet(this, collection_elements)[i].classList.contains(collection_classPrivateFieldGet(this, _toggleClass))) {
                return i;
            }
        }
        return -1;
    }
    elements() {
        return collection_classPrivateFieldGet(this, collection_elements);
    }
    check() {
        if (collection_classPrivateFieldGet(this, collection_isLocked)) {
            collection_classPrivateFieldGet(this, _log).warning("Object locked. Operation in progress", "Check");
            return false;
        }
        else if (!Object(functions["w" /* is */])(collection_classPrivateFieldGet(this, _toggleClass))) {
            collection_classPrivateFieldGet(this, _log).warning("Toggle is not set. Call setToggleClass", "Check");
            return false;
        }
        else if (this.count() <= 0) {
            collection_classPrivateFieldGet(this, _log).warning("Elements list is empty", "Check");
            return false;
        }
        return true;
    }
    count() {
        return collection_classPrivateFieldGet(this, collection_elements) ? collection_classPrivateFieldGet(this, collection_elements).length : -1;
    }
    lock() {
        collection_classPrivateFieldSet(this, collection_isLocked, true);
    }
    unlock() {
        collection_classPrivateFieldSet(this, collection_isLocked, false);
    }
}
collection_elements = new WeakMap(), _log = new WeakMap(), collection_isLocked = new WeakMap(), _toggleClass = new WeakMap(), collection_interactions = new WeakMap();

// CONCATENATED MODULE: ./src/managers/collection.ts
var managers_collection_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var managers_collection_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var managers_collection_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var collection_log, collection_cDt, _helper;


class collection_CollectionManager {
    constructor(elements, interactions) {
        collection_log.set(this, void 0);
        collection_cDt.set(this, void 0);
        _helper.set(this, void 0);
        managers_collection_classPrivateFieldSet(this, collection_log, logger["a" /* CuiLoggerFactory */].get('CollectionManager'));
        managers_collection_classPrivateFieldSet(this, _helper, new collection_CollectionManagerHelper(interactions));
        managers_collection_classPrivateFieldGet(this, _helper).setElements(elements);
        managers_collection_classPrivateFieldSet(this, collection_cDt, Date.now());
    }
    setToggle(className) {
        managers_collection_classPrivateFieldGet(this, _helper).setToggle(className);
    }
    setElements(elements) {
        managers_collection_classPrivateFieldGet(this, _helper).setElements(elements);
    }
    click(callback) {
        managers_collection_classPrivateFieldGet(this, _helper).elements().forEach((element, index) => {
            element.addEventListener('click', () => {
                this.set(index).then(() => {
                    if (callback) {
                        callback(element, index);
                    }
                });
            });
        });
    }
    next() {
        return managers_collection_awaiter(this, void 0, void 0, function* () {
            if (!managers_collection_classPrivateFieldGet(this, _helper).check()) {
                return false;
            }
            let newIdx = managers_collection_classPrivateFieldGet(this, _helper).getCurrentIndex() + 1;
            return this.set(newIdx >= this.length() ? 0 : newIdx);
        });
    }
    previous() {
        return managers_collection_awaiter(this, void 0, void 0, function* () {
            if (!managers_collection_classPrivateFieldGet(this, _helper).check()) {
                return false;
            }
            let newIdx = managers_collection_classPrivateFieldGet(this, _helper).getCurrentIndex() - 1;
            return this.set(newIdx < 0 ? this.length() - 1 : newIdx);
        });
    }
    set(index) {
        return managers_collection_awaiter(this, void 0, void 0, function* () {
            let current = managers_collection_classPrivateFieldGet(this, _helper).getCurrentIndex();
            if (!managers_collection_classPrivateFieldGet(this, _helper).check() || !managers_collection_classPrivateFieldGet(this, _helper).verifyIndex(index, current, this.length())) {
                return false;
            }
            return managers_collection_classPrivateFieldGet(this, _helper).setCurrent(index, current);
        });
    }
    setWithAnimation(index, animClassIn, animClassOut, duration) {
        return managers_collection_awaiter(this, void 0, void 0, function* () {
            let current = managers_collection_classPrivateFieldGet(this, _helper).getCurrentIndex();
            if (!managers_collection_classPrivateFieldGet(this, _helper).check() || !managers_collection_classPrivateFieldGet(this, _helper).verifyIndex(index, current, this.length())) {
                return false;
            }
            return managers_collection_classPrivateFieldGet(this, _helper).setCurrentWithAnimation(index, animClassIn, animClassOut, duration, current);
        });
    }
    getCurrentIndex() {
        return managers_collection_classPrivateFieldGet(this, _helper).getCurrentIndex();
    }
    length() {
        return managers_collection_classPrivateFieldGet(this, _helper).count();
    }
    refresh() {
        return this.length() > 0 && Date.now() - managers_collection_classPrivateFieldGet(this, collection_cDt) > 360000;
    }
}
collection_log = new WeakMap(), collection_cDt = new WeakMap(), _helper = new WeakMap();

// CONCATENATED MODULE: ./src/managers/plugins.ts
var plugins_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var plugins_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var plugins_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _plugins, _mutated, plugins_log;


class plugins_CuiPluginManager {
    constructor(plugins) {
        _plugins.set(this, void 0);
        _mutated.set(this, void 0);
        plugins_log.set(this, void 0);
        plugins_classPrivateFieldSet(this, _plugins, plugins !== null && plugins !== void 0 ? plugins : []);
        plugins_classPrivateFieldSet(this, plugins_log, logger["a" /* CuiLoggerFactory */].get("CuiPluginManager"));
        plugins_classPrivateFieldSet(this, _mutated, []);
    }
    init(utils) {
        plugins_classPrivateFieldGet(this, plugins_log).debug("Plugins initialization started: " + plugins_classPrivateFieldGet(this, _plugins).length);
        plugins_classPrivateFieldSet(this, _mutated, plugins_classPrivateFieldGet(this, _plugins).filter((plugin) => {
            return Object(functions["w" /* is */])(plugin.mutation);
        }));
        plugins_classPrivateFieldGet(this, _plugins).forEach(plugin => {
            plugin.init(utils);
            utils.setup.plugins[plugin.description] = plugin.setup;
        });
        plugins_classPrivateFieldGet(this, plugins_log).debug("Plugins have been initialized");
    }
    get(name) {
        if (!Object(functions["w" /* is */])(name)) {
            return undefined;
        }
        return plugins_classPrivateFieldGet(this, _plugins).find(p => p.name === name);
    }
    onMutation(mutation) {
        return plugins_awaiter(this, void 0, void 0, function* () {
            let tasks = [];
            plugins_classPrivateFieldGet(this, _mutated).forEach((plugin) => {
                tasks.push(plugin.mutation(mutation));
            });
            let result = yield Promise.all(tasks);
            return result.find(val => {
                val === false;
            }) ? false : true;
        });
    }
}
_plugins = new WeakMap(), _mutated = new WeakMap(), plugins_log = new WeakMap();

// CONCATENATED MODULE: ./src/instance.ts
var instance_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var instance_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var instance_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var instance_log, _mutationObserver, _toastManager, instance_utils, instance_plugins, _components, _rootElement, _moveObserver, _mutatedAttributes;












class instance_CuiInstance {
    constructor(setup, plugins, components) {
        instance_log.set(this, void 0);
        _mutationObserver.set(this, void 0);
        _toastManager.set(this, void 0);
        instance_utils.set(this, void 0);
        instance_plugins.set(this, void 0);
        _components.set(this, void 0);
        _rootElement.set(this, void 0);
        _moveObserver.set(this, void 0);
        _mutatedAttributes.set(this, void 0);
        statics["l" /* STATICS */].prefix = setup.prefix;
        statics["l" /* STATICS */].logLevel = setup.logLevel;
        instance_classPrivateFieldSet(this, instance_plugins, new plugins_CuiPluginManager(plugins));
        instance_classPrivateFieldSet(this, _components, components !== null && components !== void 0 ? components : []);
        instance_classPrivateFieldSet(this, instance_utils, new models_utils["a" /* CuiUtils */](setup));
        instance_classPrivateFieldSet(this, instance_log, logger["a" /* CuiLoggerFactory */].get('CuiInstance'));
        instance_classPrivateFieldSet(this, _rootElement, setup.root);
        instance_classPrivateFieldSet(this, _moveObserver, new move_CuiMoveObserver(instance_classPrivateFieldGet(this, instance_utils).bus));
        instance_classPrivateFieldSet(this, _mutationObserver, undefined);
        instance_classPrivateFieldSet(this, _toastManager, undefined);
        instance_classPrivateFieldSet(this, _mutatedAttributes, []);
    }
    init() {
        var _a;
        instance_classPrivateFieldGet(this, instance_log).debug("Instance started", "init");
        // Init elements
        if (!Object(functions["w" /* is */])(window.MutationObserver)) {
            throw new errors["e" /* CuiInstanceInitError */]("Mutation observer does not exists");
        }
        instance_classPrivateFieldSet(this, _toastManager, new toast_CuiToastHandler(instance_classPrivateFieldGet(this, instance_utils).interactions, instance_classPrivateFieldGet(this, instance_utils).setup.prefix, (_a = instance_classPrivateFieldGet(this, instance_utils).setup.animationTimeLong) !== null && _a !== void 0 ? _a : 0));
        instance_classPrivateFieldSet(this, _mutatedAttributes, instance_classPrivateFieldGet(this, _components).map(x => { return x.attribute; })); // MUTATED_ATTRIBUTES; 
        const initElements = Object(functions["w" /* is */])(instance_classPrivateFieldGet(this, _mutatedAttributes)) ? instance_classPrivateFieldGet(this, _rootElement).querySelectorAll(Object(functions["A" /* joinAttributesForQuery */])(instance_classPrivateFieldGet(this, _mutatedAttributes))) : null;
        if (Object(functions["w" /* is */])(initElements)) {
            //@ts-ignore initElements already checked
            instance_classPrivateFieldGet(this, instance_log).debug(`Initiating ${initElements.length} elements`);
            try {
                //@ts-ignore initElements already checked
                initElements.forEach((item) => {
                    Object(functions["C" /* registerCuiElement */])(item, instance_classPrivateFieldGet(this, _components), instance_classPrivateFieldGet(this, _mutatedAttributes), instance_classPrivateFieldGet(this, instance_utils));
                });
            }
            catch (e) {
                instance_classPrivateFieldGet(this, instance_log).exception(e);
            }
        }
        instance_classPrivateFieldGet(this, instance_log).debug("Init plugins", "init");
        // Init plugins
        instance_classPrivateFieldGet(this, instance_plugins).init(instance_classPrivateFieldGet(this, instance_utils));
        if (Object(functions["b" /* are */])(instance_classPrivateFieldGet(this, _components), instance_classPrivateFieldGet(this, _mutatedAttributes))) {
            instance_classPrivateFieldGet(this, instance_log).debug("Init mutation observer", "init");
            instance_classPrivateFieldSet(this, _mutationObserver, new mutations["b" /* CuiMutationObserver */](instance_classPrivateFieldGet(this, _rootElement), instance_classPrivateFieldGet(this, instance_utils)));
            instance_classPrivateFieldGet(this, _mutationObserver).setComponents(instance_classPrivateFieldGet(this, _components)).setAttributes(instance_classPrivateFieldGet(this, _mutatedAttributes));
            instance_classPrivateFieldGet(this, _mutationObserver).setPlugins(instance_classPrivateFieldGet(this, instance_plugins));
            instance_classPrivateFieldGet(this, _mutationObserver).start();
        }
        instance_classPrivateFieldGet(this, instance_log).debug("Setting CSS globals", 'init');
        instance_classPrivateFieldGet(this, instance_utils).interactions.mutate(() => {
            instance_classPrivateFieldGet(this, instance_utils).setProperty(statics["g" /* CSS_VARIABLES */].animationTimeLong, `${instance_classPrivateFieldGet(this, instance_utils).setup.animationTimeLong}ms`);
            instance_classPrivateFieldGet(this, instance_utils).setProperty(statics["g" /* CSS_VARIABLES */].animationTime, `${instance_classPrivateFieldGet(this, instance_utils).setup.animationTime}ms`);
            instance_classPrivateFieldGet(this, instance_utils).setProperty(statics["g" /* CSS_VARIABLES */].animationTimeShort, `${instance_classPrivateFieldGet(this, instance_utils).setup.animationTimeShort}ms`);
        }, null);
        instance_classPrivateFieldGet(this, _moveObserver).attach();
        instance_classPrivateFieldGet(this, instance_utils).bus.emit(statics["i" /* EVENTS */].INSTANCE_INITIALIZED, null);
        return this;
    }
    finish() {
        if (instance_classPrivateFieldGet(this, _mutationObserver))
            instance_classPrivateFieldGet(this, _mutationObserver).stop();
        instance_classPrivateFieldGet(this, _moveObserver).detach();
        instance_classPrivateFieldGet(this, instance_utils).bus.emit(statics["i" /* EVENTS */].INSTANCE_FINISHED, null);
    }
    get(selector) {
        const elements = this.all(selector);
        if (!elements) {
            return undefined;
        }
        const newElement = new element_ElementManager(elements, instance_classPrivateFieldGet(this, instance_utils));
        return newElement;
    }
    collection(selector) {
        const elements = this.all(selector);
        if (!Object(functions["w" /* is */])(elements)) {
            return undefined;
        }
        // @ts-ignore already checked
        let manager = new collection_CollectionManager(elements, instance_classPrivateFieldGet(this, instance_utils).interactions);
        return manager;
    }
    toast(message) {
        return instance_awaiter(this, void 0, void 0, function* () {
            if (!Object(functions["b" /* are */])(message, instance_classPrivateFieldGet(this, _toastManager))) {
                return false;
            }
            //@ts-ignore toast manager exists
            return instance_classPrivateFieldGet(this, _toastManager).show(message);
        });
    }
    select(selector) {
        return document.querySelector(selector);
    }
    all(selector) {
        const nodes = document.querySelectorAll(selector);
        if (!Object(functions["w" /* is */])(nodes)) {
            return undefined;
        }
        return [...nodes];
    }
    getUtils() {
        return instance_classPrivateFieldGet(this, instance_utils);
    }
    on(event, callback, element) {
        if (!Object(functions["b" /* are */])(event, callback)) {
            instance_classPrivateFieldGet(this, instance_log).error("Incorrect arguments", "on");
        }
        instance_classPrivateFieldGet(this, instance_utils).bus.on(event, callback, element);
    }
    detach(event, id) {
        if (!Object(functions["b" /* are */])(event, id)) {
            instance_classPrivateFieldGet(this, instance_log).error("Incorrect arguments", "detach");
        }
        instance_classPrivateFieldGet(this, instance_utils).bus.detach(event, id);
    }
    detachAll(event) {
        if (!Object(functions["w" /* is */])(event)) {
            instance_classPrivateFieldGet(this, instance_log).error("Incorrect arguments", "detachAll");
        }
        instance_classPrivateFieldGet(this, instance_utils).bus.detachAll(event);
    }
    emit(event, element, ...args) {
        if (!Object(functions["b" /* are */])(event, element)) {
            instance_classPrivateFieldGet(this, instance_log).warning("Not enough data to emit event", "emit");
            return;
        }
        let el = typeof element === 'string' ? document.querySelector(element) : element;
        let cuid = el.$cuid;
        if (!Object(functions["w" /* is */])(cuid)) {
            instance_classPrivateFieldGet(this, instance_log).warning("Element is not a cUI element", "emit");
            return;
        }
        instance_classPrivateFieldGet(this, instance_utils).bus.emit(event, cuid, ...args);
    }
    alert(id, type, data) {
        let popup = CuiAlertFactory.get(id, type, data, instance_classPrivateFieldGet(this, instance_utils));
        if (!popup) {
            instance_classPrivateFieldGet(this, instance_log).error("Possibly incorrect alert type");
            return;
        }
        popup.show(instance_classPrivateFieldGet(this, _rootElement));
    }
    getPlugin(name) {
        return instance_classPrivateFieldGet(this, instance_plugins).get(name);
    }
    createCuiElement(element, arg, data) {
        if (!Object(functions["w" /* is */])(arg) || !instance_classPrivateFieldGet(this, _mutatedAttributes).includes(arg)) {
            instance_classPrivateFieldGet(this, instance_log).error("Element cannot be created: Unknown attribute");
            return false;
        }
        if (!Object(functions["a" /* addCuiArgument */])(element, arg, data)) {
            instance_classPrivateFieldGet(this, instance_log).error("Element cannot be created: Missing data");
            return false;
        }
        return true;
    }
}
instance_log = new WeakMap(), _mutationObserver = new WeakMap(), _toastManager = new WeakMap(), instance_utils = new WeakMap(), instance_plugins = new WeakMap(), _components = new WeakMap(), _rootElement = new WeakMap(), _moveObserver = new WeakMap(), _mutatedAttributes = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/animation/definitions.js
var definitions = __webpack_require__(6);

// CONCATENATED MODULE: ./src/initializer.ts
var initializer_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var initializer_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var initializer_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _window;





class initializer_CuiInitializer {
    constructor() {
        _window.set(this, void 0);
        initializer_classPrivateFieldSet(this, _window, window);
    }
    init(setup) {
        var _a, _b;
        return initializer_awaiter(this, void 0, void 0, function* () {
            let settings = Object.assign(Object.assign({}, new models_setup["b" /* CuiSetupInit */]()), setup.setup);
            const appPrefix = settings.app;
            const result = {
                result: false
            };
            if (Object(functions["w" /* is */])(initializer_classPrivateFieldGet(this, _window)[appPrefix])) {
                result.message = "Instance is already initialized";
                return result;
            }
            if (Object(functions["w" /* is */])(setup.icons)) {
                for (let icon in setup.icons) {
                    statics["j" /* ICONS */][icon] = setup.icons[icon];
                }
            }
            if (Object(functions["w" /* is */])(setup.swipeAnimations)) {
                for (let animation in setup.swipeAnimations) {
                    definitions["a" /* SWIPE_ANIMATIONS_DEFINITIONS */][animation] = setup.swipeAnimations[animation];
                }
            }
            try {
                initializer_classPrivateFieldGet(this, _window)[appPrefix] = new instance_CuiInstance(settings, (_a = setup.plugins) !== null && _a !== void 0 ? _a : [], (_b = setup.components) !== null && _b !== void 0 ? _b : []);
                initializer_classPrivateFieldGet(this, _window)[appPrefix].init();
            }
            catch (e) {
                console.error(e);
                result.message = "An error occured during initialization";
                return result;
            }
            result.result = true;
            return result;
        });
    }
}
_window = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-components/dist/esm/module.js + 40 modules
var esm_module = __webpack_require__(14);

// EXTERNAL MODULE: ./node_modules/cui-light-plugins/dist/esm/module.js + 12 modules
var dist_esm_module = __webpack_require__(15);

// CONCATENATED MODULE: ./src/init.ts
var init_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var init_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var init_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _isInitialized;




class init_CuiInit {
    constructor() {
        _isInitialized.set(this, void 0);
        init_classPrivateFieldSet(this, _isInitialized, false);
    }
    init(data) {
        var _a, _b;
        return init_awaiter(this, void 0, void 0, function* () {
            if (init_classPrivateFieldGet(this, _isInitialized)) {
                console.log("Module is already initialized");
                return false;
            }
            const initializer = new initializer_CuiInitializer();
            const pluginList = Object(dist_esm_module["a" /* GetPlugins */])({
                autoLight: true,
                autoPrint: true
            });
            const componentList = Object(esm_module["a" /* GetComponents */])({
                prefix: (_a = data.setup) === null || _a === void 0 ? void 0 : _a.prefix
            });
            let appPlugins = pluginList;
            if (data.plugins) {
                appPlugins = Object.assign(Object.assign({}, pluginList), data.plugins);
            }
            let result = yield initializer.init({
                setup: data.setup,
                icons: data.icons,
                plugins: appPlugins,
                // @ts-ignore already checked
                components: Object(functions["w" /* is */])(data.components) ? [...componentList, ...data.components] : componentList,
                swipeAnimations: data.swipeAnimations
            });
            if (result.result) {
                init_classPrivateFieldSet(this, _isInitialized, true);
                return true;
            }
            else {
                console.error(`A cUI instance failed to initialize: [${(_b = result.message) !== null && _b !== void 0 ? _b : "#"}]`);
            }
            console.log("Cui Light failed to init");
            return false;
        });
    }
}
_isInitialized = new WeakMap();

// EXTERNAL MODULE: ./node_modules/cui-light-components/dist/esm/index.js
var esm = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/cui-light-plugins/dist/esm/index.js
var dist_esm = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/cui-light-core/dist/esm/index.js
var cui_light_core_dist_esm = __webpack_require__(13);

// CONCATENATED MODULE: ./src/index.ts




const CUI_LIGHT_VERSION = "0.2.2";
const CUI_LIGHT_CORE_VER = cui_light_core_dist_esm["a" /* CUI_CORE_VERSION */];
const CUI_LIGHT_COMPONENTS_VER = esm["a" /* CUI_LIGHT_COMPONENTS_VERSION */];
const CUI_LIGHT_PLUGINS_VER = dist_esm["a" /* CUI_LIGHT_PLUGINS_VERSION */];

window.cuiInit = new init_CuiInit();


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map