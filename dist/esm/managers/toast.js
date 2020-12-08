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
var _interactions, _selector, _className, _activeCls, _animationTime, _lock, _animClsIn, _animClsOut;
import { is, sleep } from "cui-light-core/dist/esm/utils/functions";
import { CLASSES } from "cui-light-core/dist/esm/utils/statics";
export class CuiToastHandler {
    constructor(interaction, prefix, animationTime) {
        _interactions.set(this, void 0);
        _selector.set(this, void 0);
        _className.set(this, void 0);
        _activeCls.set(this, void 0);
        _animationTime.set(this, void 0);
        _lock.set(this, void 0);
        _animClsIn.set(this, void 0);
        _animClsOut.set(this, void 0);
        __classPrivateFieldSet(this, _interactions, interaction);
        __classPrivateFieldSet(this, _selector, `.${prefix}-toast`);
        __classPrivateFieldSet(this, _className, `${prefix}-toast`);
        __classPrivateFieldSet(this, _activeCls, `${prefix}-active`);
        __classPrivateFieldSet(this, _animationTime, animationTime);
        __classPrivateFieldSet(this, _lock, false);
        __classPrivateFieldSet(this, _animClsIn, `${prefix}-toast-animation-in`);
        __classPrivateFieldSet(this, _animClsOut, `${prefix}-toast-animation-out`);
    }
    show(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _lock)) {
                return false;
            }
            __classPrivateFieldSet(this, _lock, true);
            let toastElement = document.querySelector(__classPrivateFieldGet(this, _selector));
            if (!is(toastElement)) {
                toastElement = document.createElement('div');
                toastElement.classList.add(__classPrivateFieldGet(this, _className));
                document.body.appendChild(toastElement);
                yield sleep(10);
            }
            __classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.textContent = message;
                //@ts-ignore
                toastElement.classList.add(CLASSES.animProgress);
                //@ts-ignore
                toastElement.classList.add(__classPrivateFieldGet(this, _animClsIn));
            }, this);
            yield sleep(__classPrivateFieldGet(this, _animationTime));
            __classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.classList.remove(CLASSES.animProgress);
                //@ts-ignore
                toastElement.classList.remove(__classPrivateFieldGet(this, _animClsIn));
                //@ts-ignore
                toastElement.classList.add(__classPrivateFieldGet(this, _activeCls));
            }, this);
            yield sleep(3000);
            __classPrivateFieldGet(this, _interactions).mutate(() => {
                //@ts-ignore
                toastElement.classList.add(CLASSES.animProgress);
                //@ts-ignore
                toastElement.classList.add(__classPrivateFieldGet(this, _animClsOut));
            }, this);
            setTimeout(() => {
                __classPrivateFieldGet(this, _interactions).mutate(() => {
                    //@ts-ignore
                    toastElement.classList.remove(CLASSES.animProgress);
                    //@ts-ignore
                    toastElement.classList.remove(__classPrivateFieldGet(this, _animClsOut));
                    //@ts-ignore
                    toastElement.classList.remove(__classPrivateFieldGet(this, _activeCls));
                }, this);
                __classPrivateFieldSet(this, _lock, false);
            }, __classPrivateFieldGet(this, _animationTime));
            return true;
        });
    }
}
_interactions = new WeakMap(), _selector = new WeakMap(), _className = new WeakMap(), _activeCls = new WeakMap(), _animationTime = new WeakMap(), _lock = new WeakMap(), _animClsIn = new WeakMap(), _animClsOut = new WeakMap();
