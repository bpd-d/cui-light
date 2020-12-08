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
var _header, _body, _footer, _prefix, _switches, _reverse;
import { ElementBuilder } from "cui-light-core/dist/esm/builders/element";
import { is } from "cui-light-core/dist/esm/utils/functions";
export class DialogBuilder {
    constructor(prefix, reverse, switches) {
        _header.set(this, void 0);
        _body.set(this, void 0);
        _footer.set(this, void 0);
        _prefix.set(this, void 0);
        _switches.set(this, void 0);
        _reverse.set(this, void 0);
        __classPrivateFieldSet(this, _prefix, prefix);
        __classPrivateFieldSet(this, _header, __classPrivateFieldSet(this, _footer, __classPrivateFieldSet(this, _body, undefined)));
        __classPrivateFieldSet(this, _switches, switches !== null && switches !== void 0 ? switches : "");
        __classPrivateFieldSet(this, _reverse, reverse);
    }
    createHeader(title, classes, elements) {
        if (!is(classes)) {
            classes = [];
        }
        if (!is(elements)) {
            elements = [];
        }
        let headerBuilder = new ElementBuilder('div');
        headerBuilder.setClasses(`${__classPrivateFieldGet(this, _prefix)}-dialog-header`, ...classes);
        __classPrivateFieldSet(this, _header, headerBuilder.build());
        let titleElement = new ElementBuilder('span').setClasses(this.getPrefixedString("-dialog-title")).build(title);
        __classPrivateFieldGet(this, _header).appendChild(titleElement);
        // @ts-ignore
        this.appendChildrens(__classPrivateFieldGet(this, _header), ...elements);
    }
    createFooter(classes, elements) {
        if (!is(classes)) {
            classes = [];
        }
        if (!is(elements)) {
            elements = [];
        }
        __classPrivateFieldSet(this, _footer, new ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-footer"), ...classes).build());
        // @ts-ignore
        this.appendChildrens(__classPrivateFieldGet(this, _footer), ...elements);
    }
    createBody(classes, elements) {
        if (!is(classes)) {
            classes = [];
        }
        if (!is(elements)) {
            elements = [];
        }
        __classPrivateFieldSet(this, _body, new ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-body"), ...classes).build());
        // @ts-ignore
        this.appendChildrens(__classPrivateFieldGet(this, _body), ...elements);
    }
    build(id) {
        let classes = [this.getPrefixedString("-dialog")];
        if (__classPrivateFieldGet(this, _reverse)) {
            classes.push(this.getPrefixedString('-reverse-auto'));
        }
        let dialog = new ElementBuilder('div').setId(id).setClasses(...classes).setAttributes({
            [this.getPrefixedString('-dialog')]: __classPrivateFieldGet(this, _switches)
        }).build();
        let container = new ElementBuilder('div').setClasses(this.getPrefixedString("-dialog-container")).build();
        if (__classPrivateFieldGet(this, _header))
            container.appendChild(__classPrivateFieldGet(this, _header));
        if (__classPrivateFieldGet(this, _body))
            container.appendChild(__classPrivateFieldGet(this, _body));
        if (__classPrivateFieldGet(this, _footer))
            container.appendChild(__classPrivateFieldGet(this, _footer));
        dialog.appendChild(container);
        return dialog;
    }
    appendChildrens(parent, ...elements) {
        if (is(elements)) {
            elements.forEach((element) => parent.appendChild(element));
        }
    }
    getPrefixedString(str) {
        return __classPrivateFieldGet(this, _prefix) + str;
    }
}
_header = new WeakMap(), _body = new WeakMap(), _footer = new WeakMap(), _prefix = new WeakMap(), _switches = new WeakMap(), _reverse = new WeakMap();
