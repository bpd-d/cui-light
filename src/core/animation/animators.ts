import { ICuiPropertyAnimator, AnimatorPropertyValue, TransformAnimatorProperty } from "./interfaces";

export class OpacityAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    lenght: number;
    from: number;
    to: number;
    rtl: boolean;
    constructor() {
        this.lenght = this.to = this.from = -1;
        this.rtl = false;
    }

    setProperty(prop: AnimatorPropertyValue): void {
        this.from = prop.from;
        this.to = prop.to;
        this.lenght = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
    }

    perform(element: any, progress: number, factor: number) {
        let current = this.lenght * progress
        if (element["style"]) {
            element.style.opacity = this.rtl ? this.from - current : this.from + current;
        }

    }
}

export class PropertyAnimator implements ICuiPropertyAnimator<AnimatorPropertyValue> {
    lenght: number;
    from: number;
    to: number;
    rtl: boolean;
    property: string;
    #unit: string;
    constructor(property: string) {
        this.property = property;
        this.lenght = this.to = this.from = -1;
        this.rtl = false;
        this.#unit = "";
    }

    setProperty(prop: AnimatorPropertyValue) {
        this.from = prop.from;
        this.to = prop.to;
        this.lenght = Math.abs(this.to - this.from);
        this.rtl = this.from > this.to;
        this.#unit = prop.unit;
    }

    perform(element: any, progress: number, factor: number) {
        let current = this.lenght * progress
        if (element["style"]) {
            element.style[this.property] = this.createValue(this.rtl ? this.from - current : this.from + current, this.#unit);
        }
    }

    private createValue(value: number, unit: string) {
        return `${value}${unit ?? ""}`;
    }
}

export class TransformAnimator implements ICuiPropertyAnimator<TransformAnimatorProperty> {
    prop: TransformAnimatorProperty;
    constructor() {
        this.prop = undefined;
    }

    setProperty(prop: TransformAnimatorProperty) {
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
        if (element["style"]) {
            element.style.transform = this.build(progress);
        }

    }
}
