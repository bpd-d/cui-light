var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _window;
import { CuiSetupInit } from "cui-light-core/dist/esm/models/setup";
import { is } from "cui-light-core/dist/esm/utils/functions";
import { CuiInstance } from "./instance";
import { ICONS } from "cui-light-core/dist/esm/utils/statics";
import { SWIPE_ANIMATIONS_DEFINITIONS } from "cui-light-core/dist/esm/animation/definitions";
export class CuiInitializer {
    constructor() {
        _window.set(this, void 0);
        __classPrivateFieldSet(this, _window, window);
    }
    init(setup) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let settings = Object.assign(Object.assign({}, new CuiSetupInit()), setup.setup);
            const appPrefix = settings.app;
            const result = {
                result: false
            };
            if (is(__classPrivateFieldGet(this, _window)[appPrefix])) {
                result.message = "Instance is already initialized";
                return result;
            }
            if (is(setup.icons)) {
                for (let icon in setup.icons) {
                    ICONS[icon] = setup.icons[icon];
                }
            }
            if (is(setup.swipeAnimations)) {
                for (let animation in setup.swipeAnimations) {
                    SWIPE_ANIMATIONS_DEFINITIONS[animation] = setup.swipeAnimations[animation];
                }
            }
            try {
                __classPrivateFieldGet(this, _window)[appPrefix] = new CuiInstance(settings, (_a = setup.plugins) !== null && _a !== void 0 ? _a : [], (_b = setup.components) !== null && _b !== void 0 ? _b : []);
                __classPrivateFieldGet(this, _window)[appPrefix].init();
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
