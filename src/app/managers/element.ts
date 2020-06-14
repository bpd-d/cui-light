import { is } from "../../core/utlis/functions";
import { ICuiLogger, IUIInteractionProvider, CuiCachable } from "../../core/models/interfaces";
import { CuiLoggerFactory } from "../../core/factories/logger";
import { CLASSES } from "../../core/utlis/statics";
import { CuiUtils } from "../../core/models/utils";

export class ElementManager implements CuiCachable {
    #elements: Element[];
    #isLocked: boolean;
    #logger: ICuiLogger;
    #cDt: number;
    #utils: CuiUtils;
    constructor(elements: Element[], utils: CuiUtils) {
        this.#elements = elements;
        this.#isLocked = false;
        this.#logger = CuiLoggerFactory.get("ElementManager");
        this.#utils = utils;
        this.#cDt = Date.now();
    }

    async toggleClass(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            if (!element.classList.contains(className)) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        }, 'toggleClass');
    }

    async setClass(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            if (!element.classList.contains(className)) {
                element.classList.add(className)
            }
        }, 'setClass');
    }

    async removeClass(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            if (element.classList.contains(className)) {
                element.classList.remove(className)
            }
        }, 'removeClass');
    }

    getAttribute(attributeName: string): string {
        if (!is(attributeName)) {
            return null;
        }
        return this.#elements[0].getAttribute(attributeName)
    }

    async setAttribute(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            element.setAttribute(attributeName, attributeValue ?? "")
        }, 'setAttribute');
    }

    async removeAttribute(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            element.removeAttribute(attributeName)
        }, 'removeAttribute');
    }

    async toggleAttribute(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            if (element.hasAttribute(attributeName)) {
                element.removeAttribute(attributeName)
            } else {
                element.setAttribute(attributeName, attributeValue ?? "")
            }
        }, 'toggleAttribute');
    }

    async click(onClick: (ev: MouseEvent) => void): Promise<boolean> {
        if (!is(onClick)) {
            return false;
        }
        return this.call((element) => {
            element.addEventListener('click', onClick);
        }, 'click');
    }

    async event(eventName: string, callback: any): Promise<boolean> {
        if (!is(eventName) || !is(callback)) {
            return false;
        }
        return this.call((element) => {
            element.addEventListener(eventName, callback);
        }, 'event');
    }

    async call(callback: (element: Element, index: Number) => void, functionName?: string): Promise<boolean> {
        if (this.#isLocked) {
            this.#logger.error("Element is locked", functionName)
        }
        this.lock();
        this.#elements.forEach((element, index) => {
            callback(element, index)
        })
        this.unlock();
        return true;
    }

    async animate(className: string, timeout?: number): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        const delay = timeout ?? this.#utils.setup.animationTime;
        return this.call((element) => {
            this.change(() => {
                element.classList.add(className);
                element.classList.add(CLASSES.animProgress);
                setTimeout(() => {
                    this.change(() => {
                        element.classList.remove(className);
                        element.classList.remove(CLASSES.animProgress);
                    })
                }, delay)
            })
        });
    }

    async open(openClass: string, animationClass: string, timeout?: number): Promise<boolean> {
        if (!is(openClass)) {
            return false
        }
        const delay = timeout ?? this.#utils.setup.animationTime;
        return this.call((element) => {
            this.change(() => {
                element.classList.add(animationClass);
                element.classList.add(CLASSES.animProgress);
                setTimeout(() => {
                    this.change(() => {
                        element.classList.remove(animationClass);
                        element.classList.remove(CLASSES.animProgress);
                        element.classList.add(openClass);
                    })
                }, delay)
            })
        });
    }

    async close(closeClass: string, animationClass: string, timeout?: number): Promise<boolean> {
        if (!is(closeClass)) {
            return false
        }
        const delay = timeout ?? this.#utils.setup.animationTime;
        return this.call((element) => {
            this.change(() => {
                element.classList.add(animationClass);
                element.classList.add(CLASSES.animProgress);
                setTimeout(() => {
                    this.change(() => {
                        element.classList.remove(animationClass);
                        element.classList.remove(CLASSES.animProgress);
                        element.classList.remove(closeClass);
                    })
                }, delay)
            })
        });
    }

    read(callback: any, ...args: any[]): void {
        this.#utils.interactions.fetch(callback, this, ...args)
    }

    change(callback: any, ...args: any[]): void {
        this.#utils.interactions.mutate(callback, this, ...args)
    }

    elements(): Element[] {
        return this.#elements;
    }

    count() {
        return this.#elements.length;
    }

    lock() {
        this.#isLocked = true;
    }

    unlock() {
        this.#isLocked = false;
    }

    isLocked(): boolean {
        return this.#isLocked;
    }

    refresh(): boolean {
        // Todo
        return (Date.now() - this.#cDt) < 360000;
    }
}