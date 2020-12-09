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
var _plugins, _mutated, _log;
import { CuiLoggerFactory } from "cui-light-core/dist/esm/factories/logger";
import { is } from "cui-light-core/dist/esm/utils/functions";
export class CuiPluginManager {
    constructor(plugins) {
        _plugins.set(this, void 0);
        _mutated.set(this, void 0);
        _log.set(this, void 0);
        __classPrivateFieldSet(this, _plugins, plugins !== null && plugins !== void 0 ? plugins : []);
        __classPrivateFieldSet(this, _log, CuiLoggerFactory.get("CuiPluginManager"));
        __classPrivateFieldSet(this, _mutated, []);
    }
    init(utils) {
        __classPrivateFieldGet(this, _log).debug("Plugins initialization started: " + __classPrivateFieldGet(this, _plugins).length);
        __classPrivateFieldSet(this, _mutated, __classPrivateFieldGet(this, _plugins).filter((plugin) => {
            return is(plugin.mutation);
        }));
        __classPrivateFieldGet(this, _plugins).forEach(plugin => {
            plugin.init(utils);
            utils.setup.plugins[plugin.description] = plugin.setup;
        });
        __classPrivateFieldGet(this, _log).debug("Plugins have been initialized");
    }
    get(name) {
        if (!is(name)) {
            return undefined;
        }
        return __classPrivateFieldGet(this, _plugins).find(p => p.name === name);
    }
    onMutation(mutation) {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = [];
            __classPrivateFieldGet(this, _mutated).forEach((plugin) => {
                tasks.push(plugin.mutation(mutation));
            });
            let result = yield Promise.all(tasks);
            return result.find(val => {
                val === false;
            }) ? false : true;
        });
    }
}
_plugins = new WeakMap(), _mutated = new WeakMap(), _log = new WeakMap();
