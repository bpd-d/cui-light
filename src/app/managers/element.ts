import { is, are } from "../../core/utlis/functions";
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

    async toggleClassAs(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            let classes = element.classList;
            this.#utils.interactions.fetch(() => {
                if (!classes.contains(className)) {
                    this.#utils.interactions.mutate(classes.add, classes, className);
                } else {
                    this.#utils.interactions.mutate(classes.remove, classes, className);
                }
            }, this)

        }, 'toggleClassAs');
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

    async setClassAs(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }

        return this.call((element) => {
            let classes = element.classList;
            this.#utils.interactions.fetch(() => {
                if (!classes.contains(className)) {
                    this.#utils.interactions.mutate(classes.add, classes, className);
                }
            }, this)

        }, 'setClassAs');
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

    async removeClassAs(className: string): Promise<boolean> {
        if (!is(className)) {
            return false;
        }
        return this.call((element) => {
            let classes = element.classList;
            this.#utils.interactions.fetch(() => {
                if (classes.contains(className)) {
                    this.#utils.interactions.mutate(classes.remove, classes, className);
                }
            }, this)
        }, 'removeClass');
    }

    getAttribute(attributeName: string): string[] {
        if (!is(attributeName)) {
            return null;
        }
        return this.#elements.reduce<string[]>((val: string[], current: Element) => {
            if (current.hasAttribute(attributeName)) {
                val.push(current.getAttribute(attributeName))
            } else {
                val.push(null);
            }
            return val;
        }, []);
    }

    async setAttribute(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            element.setAttribute(attributeName, attributeValue ?? "")
        }, 'setAttribute');
    }

    async setAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            this.#utils.interactions.mutate(element.setAttribute, element, attributeName, attributeValue ?? "")
        }, 'setAttributeAs');
    }

    async removeAttribute(attributeName: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            element.removeAttribute(attributeName)
        }, 'removeAttribute');
    }

    async removeAttributeAs(attributeName: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            this.#utils.interactions.mutate(element.removeAttribute, element, attributeName);
        }, 'removeAttributeAs');
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

    async toggleAttributeAs(attributeName: string, attributeValue?: string): Promise<boolean> {
        if (!is(attributeName)) {
            return false;
        }
        return this.call((element) => {
            this.#utils.interactions.fetch(() => {
                if (element.hasAttribute(attributeName)) {
                    this.#utils.interactions.mutate(element.removeAttribute, element, attributeName);
                } else {
                    this.#utils.interactions.mutate(element.setAttribute, element, attributeName, attributeValue ?? "")
                }
            }, this)

        }, 'toggleAttributeAs');
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
        if (!are(openClass, animationClass)) {
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
        if (!are(closeClass, animationClass)) {
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
        return (Date.now() - this.#cDt) < 360000;
    }
}