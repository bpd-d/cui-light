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
var _isInitialized;
import { is } from "cui-light-core/dist/esm/utils/functions";
import { CuiInitializer } from "./initializer";
import { GetComponents } from "cui-light-components/dist/esm/module";
import { GetPlugins } from "cui-light-plugins/dist/esm/module";
export class CuiInit {
    constructor() {
        _isInitialized.set(this, void 0);
        __classPrivateFieldSet(this, _isInitialized, false);
    }
    init(data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _isInitialized)) {
                console.log("Module is already initialized");
                return false;
            }
            const initializer = new CuiInitializer();
            const pluginList = GetPlugins({
                autoLight: true,
                autoPrint: true
            });
            const componentList = GetComponents({
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
                components: is(data.components) ? [...componentList, ...data.components] : componentList,
                swipeAnimations: data.swipeAnimations
            });
            if (result.result) {
                __classPrivateFieldSet(this, _isInitialized, true);
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
