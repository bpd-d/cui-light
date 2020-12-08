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
var _log, _cDt, _helper;
import { CuiLoggerFactory } from "cui-light-core/dist/esm/factories/logger";
import { CollectionManagerHelper } from "../helpers/collection";
export class CollectionManager {
    constructor(elements, interactions) {
        _log.set(this, void 0);
        _cDt.set(this, void 0);
        _helper.set(this, void 0);
        __classPrivateFieldSet(this, _log, CuiLoggerFactory.get('CollectionManager'));
        __classPrivateFieldSet(this, _helper, new CollectionManagerHelper(interactions));
        __classPrivateFieldGet(this, _helper).setElements(elements);
        __classPrivateFieldSet(this, _cDt, Date.now());
    }
    setToggle(className) {
        __classPrivateFieldGet(this, _helper).setToggle(className);
    }
    setElements(elements) {
        __classPrivateFieldGet(this, _helper).setElements(elements);
    }
    click(callback) {
        __classPrivateFieldGet(this, _helper).elements().forEach((element, index) => {
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
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _helper).check()) {
                return false;
            }
            let newIdx = __classPrivateFieldGet(this, _helper).getCurrentIndex() + 1;
            return this.set(newIdx >= this.length() ? 0 : newIdx);
        });
    }
    previous() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _helper).check()) {
                return false;
            }
            let newIdx = __classPrivateFieldGet(this, _helper).getCurrentIndex() - 1;
            return this.set(newIdx < 0 ? this.length() - 1 : newIdx);
        });
    }
    set(index) {
        return __awaiter(this, void 0, void 0, function* () {
            let current = __classPrivateFieldGet(this, _helper).getCurrentIndex();
            if (!__classPrivateFieldGet(this, _helper).check() || !__classPrivateFieldGet(this, _helper).verifyIndex(index, current, this.length())) {
                return false;
            }
            return __classPrivateFieldGet(this, _helper).setCurrent(index, current);
        });
    }
    setWithAnimation(index, animClassIn, animClassOut, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            let current = __classPrivateFieldGet(this, _helper).getCurrentIndex();
            if (!__classPrivateFieldGet(this, _helper).check() || !__classPrivateFieldGet(this, _helper).verifyIndex(index, current, this.length())) {
                return false;
            }
            return __classPrivateFieldGet(this, _helper).setCurrentWithAnimation(index, animClassIn, animClassOut, duration, current);
        });
    }
    getCurrentIndex() {
        return __classPrivateFieldGet(this, _helper).getCurrentIndex();
    }
    length() {
        return __classPrivateFieldGet(this, _helper).count();
    }
    refresh() {
        return this.length() > 0 && Date.now() - __classPrivateFieldGet(this, _cDt) > 360000;
    }
}
_log = new WeakMap(), _cDt = new WeakMap(), _helper = new WeakMap();
