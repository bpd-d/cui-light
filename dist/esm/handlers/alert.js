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
var _callbacks, _utils, _id, _manager, _attid, _id_1, _id_2, _id_3;
import { ElementManager } from "../managers/element";
import { DialogBuilder } from "../builders/dialog";
import { ElementBuilder } from "cui-light-core/dist/esm/builders/element";
import { is } from "cui-light-core/dist/esm/utils/functions";
class CuiAlertHandlerBase {
    constructor(setup, id, data) {
        _callbacks.set(this, void 0);
        _utils.set(this, void 0);
        _id.set(this, void 0);
        _manager.set(this, void 0);
        _attid.set(this, void 0);
        __classPrivateFieldSet(this, _callbacks, {
            "yes": data.onYes,
            "no": data.onNo,
            "cancel": data.onCancel,
            "ok": data.onOk
        });
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        __classPrivateFieldSet(this, _utils, setup);
        __classPrivateFieldSet(this, _id, id);
        this.reverse = false;
        __classPrivateFieldSet(this, _attid, null);
        this.closeStr = `${__classPrivateFieldGet(this, _utils).setup.prefix}-close`;
        this.iconStr = `${__classPrivateFieldGet(this, _utils).setup.prefix}-icon`;
        __classPrivateFieldSet(this, _manager, undefined);
    }
    getId() {
        return __classPrivateFieldGet(this, _id);
    }
    show(root) {
        let element = document.getElementById(__classPrivateFieldGet(this, _id));
        if (!is(element)) {
            element = this.createElement();
            root.appendChild(element);
        }
        else {
            // @ts-ignore - already checked
            this.updateElement(element);
        }
        setTimeout(() => {
            // @ts-ignore - already checked
            __classPrivateFieldSet(this, _manager, new ElementManager([element], __classPrivateFieldGet(this, _utils)));
            let ids = __classPrivateFieldGet(this, _manager).on('closed', this.onClose.bind(this));
            __classPrivateFieldSet(this, _attid, ids.length > 0 ? ids[0] : null);
            __classPrivateFieldGet(this, _manager).emit("open");
        }, 100);
    }
    updateElement(element) {
        let title = element.querySelector(`.${this.prefix}-dialog-title`);
        let content = element.querySelector(`.${this.prefix}-dialog-body>p`);
        __classPrivateFieldGet(this, _utils).interactions.mutate(() => {
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
            if (is(arg) && arg.state && __classPrivateFieldGet(this, _callbacks)) {
                if (is(__classPrivateFieldGet(this, _callbacks)[arg.state])) {
                    let callback = __classPrivateFieldGet(this, _callbacks)[arg.state];
                    if (callback) {
                        callback();
                    }
                }
            }
        }
        finally {
            if (__classPrivateFieldGet(this, _attid) != null) {
                if (__classPrivateFieldGet(this, _manager))
                    __classPrivateFieldGet(this, _manager).detach('closed', __classPrivateFieldGet(this, _attid));
                __classPrivateFieldSet(this, _attid, null);
            }
            __classPrivateFieldSet(this, _manager, undefined);
        }
    }
}
_callbacks = new WeakMap(), _utils = new WeakMap(), _id = new WeakMap(), _manager = new WeakMap(), _attid = new WeakMap();
export class CuiAlertHandler extends CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_1.set(this, void 0);
        __classPrivateFieldSet(this, _id_1, id);
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, [], [
            new ElementBuilder('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: cancel" }).build("Cancel"),
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ]);
        return dialogBuilder.build(__classPrivateFieldGet(this, _id_1));
    }
}
_id_1 = new WeakMap();
export class CuiInfoAlertUpHandler extends CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_2.set(this, void 0);
        __classPrivateFieldSet(this, _id_2, id);
        this.content = data.message;
        ;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, []);
        dialogBuilder.createBody([], [
            new ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: ok" }).build("Ok")
        ]);
        return dialogBuilder.build(__classPrivateFieldGet(this, _id_2));
    }
}
_id_2 = new WeakMap();
export class CuiYesNoPopUpHandler extends CuiAlertHandlerBase {
    constructor(setup, id, data) {
        var _a;
        super(setup, id, data);
        _id_3.set(this, void 0);
        __classPrivateFieldSet(this, _id_3, id);
        this.content = data.message;
        this.title = data.title;
        this.prefix = setup.setup.prefix;
        this.reverse = (_a = data.reverse) !== null && _a !== void 0 ? _a : false;
    }
    createElement() {
        let dialogBuilder = new DialogBuilder(this.prefix, this.reverse);
        dialogBuilder.createHeader(this.title, [], [
            new ElementBuilder('a').setClasses(`${this.prefix}-icon`).setAttributes({
                [this.closeStr]: "state: cancel",
                [this.iconStr]: "close"
            }).build()
        ]);
        dialogBuilder.createBody([], [
            new ElementBuilder('p').build(this.content)
        ]);
        dialogBuilder.createFooter([`${this.prefix}-flex`, `${this.prefix}-right`], [
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-margin-small-right`).setAttributes({ [this.closeStr]: "state: no" }).build("No"),
            new ElementBuilder('button').setClasses(`${this.prefix}-button`, `${this.prefix}-accent`).setAttributes({ [this.closeStr]: "state: yes" }).build("Yes")
        ]);
        return dialogBuilder.build(__classPrivateFieldGet(this, _id_3));
    }
}
_id_3 = new WeakMap();
export class CuiAlertFactory {
    static get(id, type, data, utils) {
        if (type === "Info") {
            return new CuiInfoAlertUpHandler(utils, id, data);
        }
        else if (type === 'YesNoCancel') {
            return new CuiYesNoPopUpHandler(utils, id, data);
        }
        else if (type === 'OkCancel') {
            return new CuiAlertHandler(utils, id, data);
        }
        return undefined;
    }
}
