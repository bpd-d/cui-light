import { is } from "../../core/utils/functions";
import { ICuiObserver, CuiElement } from "../../core/models/interfaces";
import { OBSERVABLE_INTERSECTION } from "../../core/utils/statics";

export interface ICuiIntersectionObserver {
    observe(target: Element): void;
    unobserve(target: Element): void;
    disconnect(): void;
}

export class CuiIntersectionEntry {
    isInView: boolean;
    ratio: number;
}

export interface ICuiIntersectionHandler {
    onIntersection(entry: CuiIntersectionEntry): Promise<boolean>;
}

// export interface ICuiObserverHandler {
//     callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
// }

// export class CuiObserverHandler implements ICuiObserverHandler {
//     callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
//         entries.forEach((entry: any) => {
//             Object.values(entry.target.$handlers).forEach((handler: any) => {
//                 if (is(handler['onIntersection'])) {
//                     handler.onIntersection({
//                         isInView: entry.isIntersecting,
//                         ratio: entry.intersectionRatio
//                     });
//                 }
//             })
//         })
//     }
// }

export class CuiIntersectionObserver implements ICuiObserver {
    private observer: IntersectionObserver
    // #handler: ICuiObserverHandler;
    #root: Element;
    #threshold: number[];
    #callback: IntersectionObserverCallback;
    constructor(root: Element, threshold?: number[]) {
        this.#root = root;
        this.#threshold = threshold ?? [0, 0.1, 0.25, 0.5, 0.75];
        //this.#handler = observerHandler;
    }

    setCallback(callback: IntersectionObserverCallback) {
        this.#callback = callback;
    }

    connect(): void {
        this.observer = new IntersectionObserver(this.#callback, {
            root: this.#root,
            rootMargin: '0px',
            threshold: this.#threshold
        })
    }

    observe(target: Element): void {
        this.observer.observe(target)
    }

    unobserve(target: Element): void {
        this.observer.unobserve(target)
    }

    disconnect() {
        this.observer.disconnect()
    }

}