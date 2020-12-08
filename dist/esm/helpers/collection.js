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
var _elements, _log, _isLocked, _toggleClass, _interactions;
import { CLASSES } from "cui-light-core/dist/esm/utils/statics";
import { CuiLoggerFactory } from "cui-light-core/dist/esm/factories/logger";
import { is } from "cui-light-core/dist/esm/utils/functions";
export class CollectionManagerHelper {
    constructor(interactions) {
        _elements.set(this, void 0);
        _log.set(this, void 0);
        _isLocked.set(this, void 0);
        _toggleClass.set(this, void 0);
        _interactions.set(this, void 0);
        __classPrivateFieldSet(this, _interactions, interactions);
        __classPrivateFieldSet(this, _log, CuiLoggerFactory.get('CollectionManager'));
        __classPrivateFieldSet(this, _elements, []);
        __classPrivateFieldSet(this, _isLocked, false);
        __classPrivateFieldSet(this, _toggleClass, "");
    }
    setElements(elements) {
        __classPrivateFieldSet(this, _elements, elements);
    }
    setToggle(className) {
        __classPrivateFieldSet(this, _toggleClass, className);
    }
    addAnimationClass(currentElement, nextElement, animIn, animOut) {
        nextElement.classList.add(CLASSES.animProgress);
        currentElement.classList.add(animOut);
        nextElement.classList.add(animIn);
    }
    setFinalClasses(currentElement, nextElement, animIn, animOut) {
        nextElement.classList.remove(CLASSES.animProgress);
        currentElement.classList.remove(animOut);
        nextElement.classList.remove(animIn);
        currentElement.classList.remove(__classPrivateFieldGet(this, _toggleClass));
        nextElement.classList.add(__classPrivateFieldGet(this, _toggleClass));
    }
    verifyIndex(index, current, count) {
        return index >= 0 && index !== current && index < count;
    }
    setCurrent(newIndex, current) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lock();
            __classPrivateFieldGet(this, _log).debug(`Switching index from: ${current} to ${newIndex}`);
            if (current > -1)
                __classPrivateFieldGet(this, _elements)[current].classList.remove(__classPrivateFieldGet(this, _toggleClass));
            __classPrivateFieldGet(this, _elements)[newIndex].classList.add(__classPrivateFieldGet(this, _toggleClass));
            this.unlock();
            return true;
        });
    }
    setCurrentWithAnimation(newIndex, animClassIn, animClassOut, duration, current) {
        return __awaiter(this, void 0, void 0, function* () {
            this.lock();
            __classPrivateFieldGet(this, _log).debug(`Switching index from: ${current} to ${newIndex}`);
            const currentElement = __classPrivateFieldGet(this, _elements)[current];
            const nextElement = __classPrivateFieldGet(this, _elements)[newIndex];
            __classPrivateFieldGet(this, _interactions).mutate(this.addAnimationClass, this, currentElement, nextElement, animClassIn, animClassOut);
            setTimeout(() => {
                __classPrivateFieldGet(this, _interactions).mutate(this.setFinalClasses, this, currentElement, nextElement, animClassIn, animClassOut);
                this.unlock();
            }, duration);
            return true;
        });
    }
    getCurrentIndex() {
        if (!is(__classPrivateFieldGet(this, _toggleClass))) {
            return -1;
        }
        let len = this.count();
        for (let i = 0; i < len; i++) {
            if (__classPrivateFieldGet(this, _elements)[i].classList.contains(__classPrivateFieldGet(this, _toggleClass))) {
                return i;
            }
        }
        return -1;
    }
    elements() {
        return __classPrivateFieldGet(this, _elements);
    }
    check() {
        if (__classPrivateFieldGet(this, _isLocked)) {
            __classPrivateFieldGet(this, _log).warning("Object locked. Operation in progress", "Check");
            return false;
        }
        else if (!is(__classPrivateFieldGet(this, _toggleClass))) {
            __classPrivateFieldGet(this, _log).warning("Toggle is not set. Call setToggleClass", "Check");
            return false;
        }
        else if (this.count() <= 0) {
            __classPrivateFieldGet(this, _log).warning("Elements list is empty", "Check");
            return false;
        }
        return true;
    }
    count() {
        return __classPrivateFieldGet(this, _elements) ? __classPrivateFieldGet(this, _elements).length : -1;
    }
    lock() {
        __classPrivateFieldSet(this, _isLocked, true);
    }
    unlock() {
        __classPrivateFieldSet(this, _isLocked, false);
    }
}
_elements = new WeakMap(), _log = new WeakMap(), _isLocked = new WeakMap(), _toggleClass = new WeakMap(), _interactions = new WeakMap();
