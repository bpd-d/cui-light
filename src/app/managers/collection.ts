import { IUIInteractionProvider, ICuiLogger, CuiCachable } from "../../core/models/interfaces";
import { CuiLogLevel } from "../../core/utlis/types";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is } from "../../core/utlis/functions";
import { CLASSES } from "../../core/utlis/statics";

export class CollectionManager implements CuiCachable {
    #elements: Element[];
    #interactions: IUIInteractionProvider;
    #log: ICuiLogger;
    #toggleClass: string;
    #isRunning: boolean;
    #current: number;
    #count: number;
    #cDt: number;

    constructor(elements: Element[], interactions: IUIInteractionProvider) {
        this.#elements = elements;
        this.#interactions = interactions;
        this.#log = CuiLoggerFactory.get('ListManager');
        this.#toggleClass = null;
        this.#isRunning = false;
        this.#count = this.length();
        this.#current = this.getCurrentIndex();
        this.#cDt = Date.now();
    }

    setToggleClass(className: string) {
        this.#toggleClass = className;
        this.#current = this.getCurrentIndex();
    }

    setElements(elements: Element[]) {
        this.#elements = elements;
        this.#count = this.length();
        this.#current = this.getCurrentIndex();
    }

    click(callback: (element: Element, index: number) => void): void {
        this.#elements.forEach((element, index) => {
            element.addEventListener('click', () => {
                this.set(index).then(() => {
                    if (callback) {
                        callback(element, index)
                    }
                })
            })
        })
    }

    async next(): Promise<boolean> {
        if (!this.check()) {
            return false;
        }
        let newIdx = this.#current + 1;
        return this.set(newIdx >= this.#count ? 0 : newIdx);
    }

    async previous(): Promise<boolean> {
        if (!this.check()) {
            return false;
        }
        let newIdx = this.#current - 1;
        return this.set(newIdx < 0 ? this.#count - 1 : newIdx)
    }

    async set(index: number): Promise<boolean> {
        if (!this.check() || index < 0 || index === this.#current || index >= this.#count) {
            return false;
        }
        return this.setCurrent(index)
    }

    async setWithAnimation(index: number, animClassIn: string, animClassOut: string, duration: number): Promise<boolean> {
        if (!this.check() || index < 0 || index === this.#current || index >= this.#count) {
            return false;
        }
        return this.setCurrentWithAnimation(index, animClassIn, animClassOut, duration)
    }

    async setCurrent(newIndex: number): Promise<boolean> {
        this.setRunning(true)
        this.#log.debug(`Switching index from: ${this.#current} to ${newIndex}`)
        this.#elements[this.#current].classList.remove(this.#toggleClass);
        this.#elements[newIndex].classList.add(this.#toggleClass);
        this.#current = newIndex
        this.setRunning(false);
        return true;
    }

    async setCurrentWithAnimation(newIndex: number, animClassIn: string, animClassOut: string, duration: number): Promise<boolean> {
        this.setRunning(true)
        this.#log.debug(`Switching index from: ${this.#current} to ${newIndex}`)
        const currentElement = this.#elements[this.#current];
        const nextElement = this.#elements[newIndex];
        this.#interactions.mutate(this.addAnimationClass, this, currentElement, nextElement, animClassIn, animClassOut);
        setTimeout(() => {
            this.#interactions.mutate(this.setFinalClasses, this, currentElement, nextElement, animClassIn, animClassOut)
            this.#current = newIndex
            this.setRunning(false)
        }, duration)
        return true;
    }

    private addAnimationClass(currentElement: Element, nextElement: Element, animIn: string, animOut: string): void {
        nextElement.classList.add(CLASSES.animProgress);
        currentElement.classList.add(animOut);
        nextElement.classList.add(animIn);
    }

    private setFinalClasses(currentElement: Element, nextElement: Element, animIn: string, animOut: string): void {
        nextElement.classList.remove(CLASSES.animProgress);
        currentElement.classList.remove(animOut);
        nextElement.classList.remove(animIn);
        currentElement.classList.remove(this.#toggleClass);
        nextElement.classList.add(this.#toggleClass);
    }

    length() {
        return this.#elements ? this.#elements.length : -1;
    }

    getCurrentIndex(): number {
        if (!is(this.#toggleClass)) {
            return -1;
        }
        for (let i = 0; i < this.#count; i++) {
            if (this.#elements[i].classList.contains(this.#toggleClass)) {
                return i;
            }
        }
        return -1;
    }



    check(): boolean {
        if (this.#isRunning) {
            this.#log.warning("Object locked. Operation in progress", "Check");
            return false;
        } else if (!is(this.#toggleClass)) {
            this.#log.warning("Toggle is not set. Call setToggleClass", "Check");
            return false;
        } else if (this.#count <= 0) {
            this.#log.warning("Elements list is empty", "Check");
            return false;
        }
        return true;
    }

    refresh(): boolean {
        return this.length() > 0 && Date.now() - this.#cDt > 360000;
    }

    setRunning(flag: boolean) {
        this.#isRunning = flag;
    }

}