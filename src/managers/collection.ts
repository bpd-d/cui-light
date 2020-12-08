import { IUIInteractionProvider, ICuiLogger, CuiCachable } from "cui-light-core/dist/esm/models/interfaces";
import { CuiLoggerFactory } from "cui-light-core/dist/esm/factories/logger";
import { CollectionManagerHelper } from "../helpers/collection";

export class CollectionManager implements CuiCachable {
    #log: ICuiLogger;
    #cDt: number;
    #helper: CollectionManagerHelper;

    constructor(elements: Element[], interactions: IUIInteractionProvider) {
        this.#log = CuiLoggerFactory.get('CollectionManager');
        this.#helper = new CollectionManagerHelper(interactions);
        this.#helper.setElements(elements);
        this.#cDt = Date.now();
    }

    setToggle(className: string) {
        this.#helper.setToggle(className)
    }

    setElements(elements: Element[]) {
        this.#helper.setElements(elements);
    }

    click(callback: (element: Element, index: number) => void): void {
        this.#helper.elements().forEach((element, index) => {
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
        if (!this.#helper.check()) {
            return false;
        }
        let newIdx = this.#helper.getCurrentIndex() + 1;
        return this.set(newIdx >= this.length() ? 0 : newIdx);
    }

    async previous(): Promise<boolean> {
        if (!this.#helper.check()) {
            return false;
        }
        let newIdx = this.#helper.getCurrentIndex() - 1;
        return this.set(newIdx < 0 ? this.length() - 1 : newIdx)
    }

    async set(index: number): Promise<boolean> {
        let current = this.#helper.getCurrentIndex();
        if (!this.#helper.check() || !this.#helper.verifyIndex(index, current, this.length())) {
            return false;
        }
        return this.#helper.setCurrent(index, current)
    }

    async setWithAnimation(index: number, animClassIn: string, animClassOut: string, duration: number): Promise<boolean> {
        let current = this.#helper.getCurrentIndex();
        if (!this.#helper.check() || !this.#helper.verifyIndex(index, current, this.length())) {
            return false;
        }
        return this.#helper.setCurrentWithAnimation(index, animClassIn, animClassOut, duration, current)
    }

    getCurrentIndex(): number {
        return this.#helper.getCurrentIndex();
    }

    length() {
        return this.#helper.count();
    }

    refresh(): boolean {
        return this.length() > 0 && Date.now() - this.#cDt > 360000;
    }
}