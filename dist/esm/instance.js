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
var _log, _mutationObserver, _toastManager, _utils, _plugins, _components, _rootElement, _moveObserver, _mutatedAttributes;
import { is, joinAttributesForQuery, are, registerCuiElement, addCuiArgument } from "cui-light-core/dist/esm/utils/functions";
import { STATICS, EVENTS, CSS_VARIABLES } from "cui-light-core/dist/esm/utils/statics";
import { CuiMutationObserver } from "cui-light-core/dist/esm/observers/mutations";
import { CuiLoggerFactory } from "cui-light-core/dist/esm/factories/logger";
import { CuiUtils } from "cui-light-core/dist/esm/models/utils";
import { CuiInstanceInitError } from "cui-light-core/dist/esm/models/errors";
import { CuiAlertFactory } from "./handlers/alert";
import { CuiMoveObserver } from "./observers/move";
import { ElementManager } from "./managers/element";
import { CuiToastHandler } from "./managers/toast";
import { CollectionManager } from "./managers/collection";
import { CuiPluginManager } from "./managers/plugins";
export class CuiInstance {
    constructor(setup, plugins, components) {
        _log.set(this, void 0);
        _mutationObserver.set(this, void 0);
        _toastManager.set(this, void 0);
        _utils.set(this, void 0);
        _plugins.set(this, void 0);
        _components.set(this, void 0);
        _rootElement.set(this, void 0);
        _moveObserver.set(this, void 0);
        _mutatedAttributes.set(this, void 0);
        STATICS.prefix = setup.prefix;
        STATICS.logLevel = setup.logLevel;
        __classPrivateFieldSet(this, _plugins, new CuiPluginManager(plugins));
        __classPrivateFieldSet(this, _components, components !== null && components !== void 0 ? components : []);
        __classPrivateFieldSet(this, _utils, new CuiUtils(setup));
        __classPrivateFieldSet(this, _log, CuiLoggerFactory.get('CuiInstance'));
        __classPrivateFieldSet(this, _rootElement, setup.root);
        __classPrivateFieldSet(this, _moveObserver, new CuiMoveObserver(__classPrivateFieldGet(this, _utils).bus));
        __classPrivateFieldSet(this, _mutationObserver, undefined);
        __classPrivateFieldSet(this, _toastManager, undefined);
        __classPrivateFieldSet(this, _mutatedAttributes, []);
    }
    init() {
        var _a;
        __classPrivateFieldGet(this, _log).debug("Instance started", "init");
        // Init elements
        if (!is(window.MutationObserver)) {
            throw new CuiInstanceInitError("Mutation observer does not exists");
        }
        __classPrivateFieldSet(this, _toastManager, new CuiToastHandler(__classPrivateFieldGet(this, _utils).interactions, __classPrivateFieldGet(this, _utils).setup.prefix, (_a = __classPrivateFieldGet(this, _utils).setup.animationTimeLong) !== null && _a !== void 0 ? _a : 0));
        __classPrivateFieldSet(this, _mutatedAttributes, __classPrivateFieldGet(this, _components).map(x => { return x.attribute; })); // MUTATED_ATTRIBUTES; 
        const initElements = is(__classPrivateFieldGet(this, _mutatedAttributes)) ? __classPrivateFieldGet(this, _rootElement).querySelectorAll(joinAttributesForQuery(__classPrivateFieldGet(this, _mutatedAttributes))) : null;
        if (is(initElements)) {
            //@ts-ignore initElements already checked
            __classPrivateFieldGet(this, _log).debug(`Initiating ${initElements.length} elements`);
            try {
                //@ts-ignore initElements already checked
                initElements.forEach((item) => {
                    registerCuiElement(item, __classPrivateFieldGet(this, _components), __classPrivateFieldGet(this, _mutatedAttributes), __classPrivateFieldGet(this, _utils));
                });
            }
            catch (e) {
                __classPrivateFieldGet(this, _log).exception(e);
            }
        }
        __classPrivateFieldGet(this, _log).debug("Init plugins", "init");
        // Init plugins
        __classPrivateFieldGet(this, _plugins).init(__classPrivateFieldGet(this, _utils));
        if (are(__classPrivateFieldGet(this, _components), __classPrivateFieldGet(this, _mutatedAttributes))) {
            __classPrivateFieldGet(this, _log).debug("Init mutation observer", "init");
            __classPrivateFieldSet(this, _mutationObserver, new CuiMutationObserver(__classPrivateFieldGet(this, _rootElement), __classPrivateFieldGet(this, _utils)));
            __classPrivateFieldGet(this, _mutationObserver).setComponents(__classPrivateFieldGet(this, _components)).setAttributes(__classPrivateFieldGet(this, _mutatedAttributes));
            __classPrivateFieldGet(this, _mutationObserver).setPlugins(__classPrivateFieldGet(this, _plugins));
            __classPrivateFieldGet(this, _mutationObserver).start();
        }
        __classPrivateFieldGet(this, _log).debug("Setting CSS globals", 'init');
        __classPrivateFieldGet(this, _utils).interactions.mutate(() => {
            __classPrivateFieldGet(this, _utils).setProperty(CSS_VARIABLES.animationTimeLong, `${__classPrivateFieldGet(this, _utils).setup.animationTimeLong}ms`);
            __classPrivateFieldGet(this, _utils).setProperty(CSS_VARIABLES.animationTime, `${__classPrivateFieldGet(this, _utils).setup.animationTime}ms`);
            __classPrivateFieldGet(this, _utils).setProperty(CSS_VARIABLES.animationTimeShort, `${__classPrivateFieldGet(this, _utils).setup.animationTimeShort}ms`);
        }, null);
        __classPrivateFieldGet(this, _moveObserver).attach();
        __classPrivateFieldGet(this, _utils).bus.emit(EVENTS.INSTANCE_INITIALIZED, null);
        return this;
    }
    finish() {
        if (__classPrivateFieldGet(this, _mutationObserver))
            __classPrivateFieldGet(this, _mutationObserver).stop();
        __classPrivateFieldGet(this, _moveObserver).detach();
        __classPrivateFieldGet(this, _utils).bus.emit(EVENTS.INSTANCE_FINISHED, null);
    }
    get(selector) {
        const elements = this.all(selector);
        if (!elements) {
            return undefined;
        }
        const newElement = new ElementManager(elements, __classPrivateFieldGet(this, _utils));
        return newElement;
    }
    collection(selector) {
        const elements = this.all(selector);
        if (!is(elements)) {
            return undefined;
        }
        // @ts-ignore already checked
        let manager = new CollectionManager(elements, __classPrivateFieldGet(this, _utils).interactions);
        return manager;
    }
    toast(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!are(message, __classPrivateFieldGet(this, _toastManager))) {
                return false;
            }
            //@ts-ignore toast manager exists
            return __classPrivateFieldGet(this, _toastManager).show(message);
        });
    }
    select(selector) {
        return document.querySelector(selector);
    }
    all(selector) {
        const nodes = document.querySelectorAll(selector);
        if (!is(nodes)) {
            return undefined;
        }
        return [...nodes];
    }
    getUtils() {
        return __classPrivateFieldGet(this, _utils);
    }
    on(event, callback, element) {
        if (!are(event, callback)) {
            __classPrivateFieldGet(this, _log).error("Incorrect arguments", "on");
        }
        __classPrivateFieldGet(this, _utils).bus.on(event, callback, element);
    }
    detach(event, id) {
        if (!are(event, id)) {
            __classPrivateFieldGet(this, _log).error("Incorrect arguments", "detach");
        }
        __classPrivateFieldGet(this, _utils).bus.detach(event, id);
    }
    detachAll(event) {
        if (!is(event)) {
            __classPrivateFieldGet(this, _log).error("Incorrect arguments", "detachAll");
        }
        __classPrivateFieldGet(this, _utils).bus.detachAll(event);
    }
    emit(event, element, ...args) {
        if (!are(event, element)) {
            __classPrivateFieldGet(this, _log).warning("Not enough data to emit event", "emit");
            return;
        }
        let el = typeof element === 'string' ? document.querySelector(element) : element;
        let cuid = el.$cuid;
        if (!is(cuid)) {
            __classPrivateFieldGet(this, _log).warning("Element is not a cUI element", "emit");
            return;
        }
        __classPrivateFieldGet(this, _utils).bus.emit(event, cuid, ...args);
    }
    alert(id, type, data) {
        let popup = CuiAlertFactory.get(id, type, data, __classPrivateFieldGet(this, _utils));
        if (!popup) {
            __classPrivateFieldGet(this, _log).error("Possibly incorrect alert type");
            return;
        }
        popup.show(__classPrivateFieldGet(this, _rootElement));
    }
    getPlugin(name) {
        return __classPrivateFieldGet(this, _plugins).get(name);
    }
    createCuiElement(element, arg, data) {
        if (!is(arg) || !__classPrivateFieldGet(this, _mutatedAttributes).includes(arg)) {
            __classPrivateFieldGet(this, _log).error("Element cannot be created: Unknown attribute");
            return false;
        }
        if (!addCuiArgument(element, arg, data)) {
            __classPrivateFieldGet(this, _log).error("Element cannot be created: Missing data");
            return false;
        }
        return true;
    }
}
_log = new WeakMap(), _mutationObserver = new WeakMap(), _toastManager = new WeakMap(), _utils = new WeakMap(), _plugins = new WeakMap(), _components = new WeakMap(), _rootElement = new WeakMap(), _moveObserver = new WeakMap(), _mutatedAttributes = new WeakMap();
