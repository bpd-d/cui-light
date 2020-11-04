import { CuiPositionError } from "../models/errors";
import { is } from "../utils/functions";
import { ElementBox, ICuiPositionEvaluator } from "./interfaces";

export class CuiBasePositionEvaluator implements ICuiPositionEvaluator {
    #box: ElementBox;
    #targetWidth: number;
    #targetHeight: number;
    #margin: number;
    constructor() {
        this.#targetHeight = -1;
        this.#targetWidth = -1;
        this.#box = null;
        this.#margin = 0;
    }


    setElementBox(box: ElementBox): void {
        this.#box = box;
    }

    setTarget(width: number, height: number): void {
        this.#targetWidth = width;
        this.#targetHeight = height;
    }

    setMargin(value: number) {
        this.#margin = value;
    }

    getVerticalPosition(value: string): number {
        switch (value) {
            case 'top':
                return this.getTopPosition();
            case "bottom":
                return this.getBottomPosition();
            case "middle":
                return this.getMiddlePosition();
            default:
                return -1;
        }
    }

    getHorizontalPosition(value: string): number {
        switch (value) {
            case 'left':
                return this.getLeftPosition();
            case "right":
                return this.getRightPosition();
            case "center":
                return this.getCenterPosition();
            default:
                return -1;
        }
    }

    getAutoVerticalPosition(initial: string): [number, string] {
        let innerHeight = window.innerHeight;
        let number = this.getVerticalPosition(initial);

        if ((initial === 'top' || initial === "middle") && number < 0) {
            return [this.getVerticalPosition("bottom"), "bottom"]
        } else if ((initial === "bottom" || initial === "middle") && number + this.#targetHeight > innerHeight) {
            return [this.getVerticalPosition("top"), "top"]
        }
        return [number, initial];
    }

    getAutoHorizontalPosition(initial: string): [number, string] {
        let innerWidth = window.innerWidth;
        let number = this.getHorizontalPosition(initial);

        if ((initial === 'right' || initial === "center") && number < 0) {
            return [this.getHorizontalPosition("left"), "left"]
        } else if ((initial === 'left' || initial === "center") && number + this.#targetWidth > innerWidth) {
            return [this.getHorizontalPosition("right"), "right"]
        }
        return [number, initial];
    }

    private getTopPosition(): number {
        this.throwIfNotValid("getTopPosition");
        return this.#box.top - this.#margin - this.#targetHeight;
    }

    private getBottomPosition(): number {
        this.throwIfNotValid("getBottomPosition");
        return this.#box.top + this.#box.height + this.#margin;
    }

    private getMiddlePosition(): number {
        this.throwIfNotValid("getMiddlePosition");
        return (this.#box.top + this.#box.height / 2) - this.#targetHeight / 2;
    }

    private getLeftPosition(): number {
        this.throwIfNotValid("getLeftPosition");
        return this.#box.left;
    }

    private getRightPosition(): number {
        this.throwIfNotValid("getRightPosition");
        return this.#box.left + this.#box.width - this.#targetWidth;
    }

    private getCenterPosition(): number {
        this.throwIfNotValid("getCenterPosition");
        return (this.#box.left + this.#box.width / 2) - this.#targetWidth / 2;
    }



    private validate(): boolean {
        return is(this.#box) && this.#targetHeight > 0 && this.#targetWidth > 0;
    }



    private throwIfNotValid(method: string): void {
        if (!this.validate()) {
            throw new CuiPositionError(`[${method}] Position cannot be calculated: missing data [width: ${this.#targetWidth}][height: ${this.#targetHeight}]`)
        }
    }
}