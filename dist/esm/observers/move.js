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
var _bus, _moveListener, _isLocked, _eventId, _firstEvent;
import { CuiMoveEventListener } from "cui-light-core/dist/esm/listeners/move";
import { EVENTS } from "cui-light-core/dist/esm/utils/statics";
export class CuiMoveObserver {
    constructor(bus) {
        _bus.set(this, void 0);
        _moveListener.set(this, void 0);
        _isLocked.set(this, void 0);
        _eventId.set(this, void 0);
        _firstEvent.set(this, void 0);
        __classPrivateFieldSet(this, _bus, bus);
        __classPrivateFieldSet(this, _moveListener, new CuiMoveEventListener());
        __classPrivateFieldGet(this, _moveListener).setCallback(this.onMove.bind(this));
        __classPrivateFieldSet(this, _firstEvent, undefined);
        __classPrivateFieldSet(this, _isLocked, false);
        __classPrivateFieldSet(this, _eventId, null);
    }
    attach() {
        if (!__classPrivateFieldGet(this, _moveListener).isAttached()) {
            __classPrivateFieldGet(this, _moveListener).attach();
            __classPrivateFieldSet(this, _eventId, __classPrivateFieldGet(this, _bus).on(EVENTS.MOVE_LOCK, this.onMoveLock.bind(this)));
        }
    }
    detach() {
        if (__classPrivateFieldGet(this, _moveListener).isAttached()) {
            __classPrivateFieldGet(this, _moveListener).detach();
            __classPrivateFieldGet(this, _eventId) != null && __classPrivateFieldGet(this, _bus).detach(EVENTS.MOVE_LOCK, __classPrivateFieldGet(this, _eventId));
        }
    }
    isAttached() {
        return __classPrivateFieldGet(this, _moveListener).isAttached();
    }
    onMove(data) {
        if (__classPrivateFieldGet(this, _isLocked)) {
            return;
        }
        switch (data.type) {
            case "down":
                __classPrivateFieldSet(this, _firstEvent, data);
                break;
            case "move":
                if (__classPrivateFieldGet(this, _firstEvent)) {
                    __classPrivateFieldGet(this, _bus).emit(EVENTS.GLOBAL_MOVE, null, __classPrivateFieldGet(this, _firstEvent));
                    __classPrivateFieldSet(this, _firstEvent, undefined);
                }
                __classPrivateFieldGet(this, _bus).emit(EVENTS.GLOBAL_MOVE, null, data);
                break;
            case "up":
                if (__classPrivateFieldGet(this, _firstEvent)) {
                    __classPrivateFieldSet(this, _firstEvent, undefined);
                    return;
                }
                __classPrivateFieldGet(this, _bus).emit(EVENTS.GLOBAL_MOVE, null, data);
                break;
        }
    }
    onMoveLock(flag) {
        __classPrivateFieldSet(this, _isLocked, flag);
    }
}
_bus = new WeakMap(), _moveListener = new WeakMap(), _isLocked = new WeakMap(), _eventId = new WeakMap(), _firstEvent = new WeakMap();
