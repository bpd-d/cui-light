import { IUIInteractionProvider, ICuiLogger } from "../../core/models/interfaces";
import { CuiLogLevel } from "../../core/utlis/types";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { is } from "../../core/utlis/functions";

export class ListManager {
    #elements: Element[];
    #interactions: IUIInteractionProvider;
    #log: ICuiLogger;
    #toggleClass: string;
    #isRunning: boolean;
    #current: number;
    #count: number;
    constructor(elements: Element[], interactions: IUIInteractionProvider, logLevel?: CuiLogLevel) {
        this.#elements = elements;
        this.#interactions = interactions;
        this.#log = CuiLoggerFactory.get('ListManager', logLevel);
        this.#toggleClass = null;
        this.#isRunning = false;
        this.#count = this.length();
        this.#current = this.getCurrentIndex();
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

    async setCurrent(newIndex: number): Promise<boolean> {
        this.#log.debug(`Switching index from: ${this.#current} to ${newIndex}`)
        this.#elements[this.#current].classList.remove(this.#toggleClass);
        this.#elements[newIndex].classList.add(this.#toggleClass);
        this.#current = newIndex
        return true;
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


}