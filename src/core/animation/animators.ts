import { AnimatorError } from "../models/errors";
import { is } from "../utils/functions";
import { ICuiPropertyAnimator, AnimatorPropertyValue, TransformAnimatorProperty } from "./interfaces";

/**
 * Changes the opacity of the element from 0 to 1
 */
export class OpacityAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    length: number;
    from: number;
    to: number;
    rtl: boolean;
    constructor() {
        this.length = this.to = this.from = -1;
        this.rtl = false;
    }

    setProperty(prop: AnimatorPropertyValue): void {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[OpacityAnimator] Property has incorrect format");
        }
        this.from = prop.from;
        this.to = prop.to;
        this.length = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
    }

    perform(element: any, progress: number, factor: number) {
        if (this.to < 0) {
            return;
        }
        let current = this.length * progress
        if (element["style"]) {
            element.style.opacity = this.rtl ? Math.max(this.from - current, 0) : Math.min(this.from + current, 1);
        }

    }
}

/**
 * Changes any style property of the element
 */
export class PropertyAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    length: number;
    from: number;
    to: number;
    rtl: boolean;
    property: string;
    #unit: string;
    constructor(property: string) {
        if (!is(property)) {
            throw new AnimatorError("[PropertyAnimator] Valid property is required");
        }
        this.property = property;
        this.length = this.to = this.from = -1;
        this.rtl = false;
        this.#unit = "";
    }

    setProperty(prop: AnimatorPropertyValue) {
        if (!prop || !is(prop.from) || !is(prop.to)) {
            throw new AnimatorError("[PropertyAnimator] Property has incorrect format");
        }
        this.from = prop.from;
        this.to = prop.to;
        this.length = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
        this.#unit = prop.unit;
    }

    perform(element: any, progress: number, factor: number) {
        if (!this.property) {
            return;
        }
        let current = this.length * progress
        if (element["style"]) {
            element.style[this.property] = this.createValue(this.rtl ? this.from - current : this.from + current, this.#unit);
        }
    }

    private createValue(value: number, unit: string) {
        return `${value}${unit ?? ""}`;
    }
}

/**
 * Changes transform property of the element. Supports mulitple properties at the time
 */
export class TransformAnimator implements ICuiPropertyAnimator<TransformAnimatorProperty> {
    prop: TransformAnimatorProperty;
    constructor() {
        this.prop = undefined;
    }

    setProperty(prop: TransformAnimatorProperty) {
        if (!prop) {
            throw new AnimatorError("[TransformAnimator] Property has incorrect format");
        }
        this.prop = prop;
    }

    build(progress: number) {
        let props: string[] = [];
        for (let name in this.prop) {
            let cur = this.prop[name];
            let diff = Math.abs(cur.to - cur.from);
            let rtl = cur.from > cur.to;
            let val = rtl ? cur.from - (diff * progress) : cur.from + (diff * progress)
            props.push(this.buildSingle(name, val, cur.unit))
        }

        return props.join(" ");
    }

    buildSingle(name: string, value: number, unit: string) {
        return `${name}(${value}${unit})`;
    }

    perform(element: any, progress: number, factor: number) {
        if (!this.prop) {
            return;
        }
        if (element["style"]) {
            element.style.transform = this.build(progress);
        }

    }
}
