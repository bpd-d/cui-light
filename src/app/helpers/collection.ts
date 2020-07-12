import { CLASSES } from "../../core/utils/statics";
import { ICuiLogger, IUIInteractionProvider } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is } from "../../core/utils/functions";

export class CollectionManagerHelper {
    #elements: Element[];
    #log: ICuiLogger;
    #isLocked: boolean;
    #toggleClass: string;
    #interactions: IUIInteractionProvider;
    constructor(interactions: IUIInteractionProvider) {
        this.#interactions = interactions;
        this.#log = CuiLoggerFactory.get('CollectionManager');
    }

    setElements(elements: Element[]) {
        this.#elements = elements;
    }

    setToggle(className: string) {
        this.#toggleClass = className;
    }

    addAnimationClass(currentElement: Element, nextElement: Element, animIn: string, animOut: string,): void {
        nextElement.classList.add(CLASSES.animProgress);
        currentElement.classList.add(animOut);
        nextElement.classList.add(animIn);
    }

    setFinalClasses(currentElement: Element, nextElement: Element, animIn: string, animOut: string): void {
        nextElement.classList.remove(CLASSES.animProgress);
        currentElement.classList.remove(animOut);
        nextElement.classList.remove(animIn);
        currentElement.classList.remove(this.#toggleClass);
        nextElement.classList.add(this.#toggleClass);
    }

    verifyIndex(index: number, current: number, count: number): boolean {
        return index >= 0 && index !== current && index < count
    }

    async setCurrent(newIndex: number, current: number): Promise<boolean> {
        this.lock();
        this.#log.debug(`Switching index from: ${current} to ${newIndex}`)
        if (current > -1)
            this.#elements[current].classList.remove(this.#toggleClass);
        this.#elements[newIndex].classList.add(this.#toggleClass);
        this.unlock();
        return true;
    }

    async setCurrentWithAnimation(newIndex: number, animClassIn: string, animClassOut: string, duration: number, current: number): Promise<boolean> {
        this.lock()
        this.#log.debug(`Switching index from: ${current} to ${newIndex}`)

        const currentElement = this.#elements[current];
        const nextElement = this.#elements[newIndex];
        this.#interactions.mutate(this.addAnimationClass, this, currentElement, nextElement, animClassIn, animClassOut);
        setTimeout(() => {
            this.#interactions.mutate(this.setFinalClasses, this, currentElement, nextElement, animClassIn, animClassOut)
            this.unlock();
        }, duration)
        return true;
    }

    getCurrentIndex(): number {
        if (!is(this.#toggleClass)) {
            return -1;
        }
        let len = this.count();
        for (let i = 0; i < len; i++) {
            if (this.#elements[i].classList.contains(this.#toggleClass)) {
                return i;
            }
        }
        return -1;
    }

    elements(): Element[] {
        return this.#elements;
    }

    check(): boolean {
        if (this.#isLocked) {
            this.#log.warning("Object locked. Operation in progress", "Check");
            return false;
        } else if (!is(this.#toggleClass)) {
            this.#log.warning("Toggle is not set. Call setToggleClass", "Check");
            return false;
        } else if (this.count() <= 0) {
            this.#log.warning("Elements list is empty", "Check");
            return false;
        }
        return true;
    }

    count(): number {
        return this.#elements ? this.#elements.length : -1;
    }

    lock() {
        this.#isLocked = true;
    }

    unlock() {
        this.#isLocked = false
    }


}